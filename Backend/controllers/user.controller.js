import { mongo } from "mongoose";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import { paginate } from "../middlware/paginate.js";
import { loginSchema } from "../validations/authSchemas.js";
import { userRegistrationSchema } from "../validations/authSchemas.js";
import CloudinaryService from "../services/cloudinaryService.js";

// Create a new user
const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      if (req.file) {
        CloudinaryService.deleteLocalFile(req.file.path);
      }
      res.status(400);
      throw new Error("User already exists");
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
      role,
    };

    if (req.file) {
      try {
        const tempUser = new User(userData);
        const savedUser = await tempUser.save();

        // upload profile picture ot cloudinary
        const uploadResult = await CloudinaryService.uploadProfilePicture(
          req.file.path,
          savedUser._id
        );

        console.log(uploadResult);

        savedUser.profilePicture = {
          public_id: uploadResult.public_id,
          secure_url: uploadResult.secure_url,
        };

        await savedUser.save();

        // generate Jwt token
        generateToken(res, savedUser._id);

        res.status(201).json({
          success: true,
          message: "user created succefully with profile picture",
          data: savedUser,
        });
      } catch (uploadError) {
        console.error("profile picture upload failed:", uploadError);

        // still create user without profile picture
        const newUser = await User.create(userData);
        generateToken(res, newUser._id);

        res.status(201).json({
          success: true,
          message: "user created successfully (profile picture upload failed)",
          data: newUser,
          warning: "profile picture could not be uploaded",
        });
      }
    } else {
      const newUser = await User.create(userData);

      if (newUser) {
        // Generate token and set it as cookie

        generateToken(res, newUser._id);

        res.status(201).json({
          success: true,
          message: "User created successfully",
          data: {
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            role: newUser.role,
          },
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    }
  } catch (error) {
    if (req.file) {
      CloudinaryService.deleteLocalFile(req.file.path);
    }
    next(error);
  }
};

// Login a user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(200).json({ message: "User logged in" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

//logout user
const logoutUser = async (req, res, next) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

//Get all users
const getUsers = async (req, res, next) => {
  try {
    res.status(200).json({
      paginateDate: res.locals.paginatedResults,
    });
  } catch (error) {
    next(error);
  }
};

// Get a user by ID
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// Edit a users details
const editUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a user
const deleteUser = async (req, res, next) => {
  // console.log(req.user);
  // console.log(req.params.id);
  try {
    // const deletedUser = await User.findByIdAndDelete(req.params.id);
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Admin only - update user role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;

    // Prevent admin from demoting themselves
    if (userId === req.user._id.toString() && role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own admin role",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: `User role updated to ${role}`,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating user role",
      error: error.message,
    });
  }
};

const getUserbyName = async (req, res, next) => {
  try {
    const user = await User.find({
      $or: [{ firstName: "David" }, { lastName: "Daniels" }],
    });

    if (!user) {
      res.status(404).json({
        message: "No user with the name found",
      });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

//search for a user by name
const searchUsersByName = async (req, res, next) => {
  try {
    const name = req.query.name;

    const users = await User.find({
      $or: [
        { firstName: { $regex: name, $options: "i" } },
        { lastName: { $regex: name, $options: "i" } },
      ],
    });

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found with that name",
      });
    }

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// Search for users by name better version
const searchUsersByName2 = async (req, res, next) => {
  try {
    // Get the search term from query parameters
    const { name } = req.query;

    // Validate that search term is provided
    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search term 'name' is required",
      });
    }

    // Clean up the search term
    const searchTerm = name.trim();

    // Get optional limit parameter (default to 10 results)
    const limit = parseInt(req.query.limit) || 10;

    // Build search query using MongoDB regex
    // This searches across firstName, lastName, and username fields
    const searchQuery = {
      $or: [
        { firstName: { $regex: searchTerm, $options: "i" } },
        { lastName: { $regex: searchTerm, $options: "i" } },
      ],
    };

    // Execute the search
    const users = await User.find(searchQuery)
      .select("-password") // Exclude password field
      .limit(limit);

    // Count total matching users (for pagination info)
    const totalFound = await User.countDocuments(searchQuery);

    // Return results
    res.status(200).json({
      success: true,
      message: `Search completed for "${searchTerm}"`,
      data: {
        searchTerm: searchTerm,
        results: users,
        totalFound: totalFound,
        resultsShown: users.length,
        limitApplied: limit,
      },
    });
  } catch (error) {
    console.error("Search user error:", error);
    next(error);
  }
};

export {
  createUser,
  getUsers,
  getUserById,
  editUser,
  deleteUser,
  getUserbyName,
  searchUsersByName,
  loginUser,
  logoutUser,
  searchUsersByName2,
  updateUserRole,
};
