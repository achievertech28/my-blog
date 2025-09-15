import jwt from "jsonwebtoken";
import Post from "../models/postsModel.js";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authourized, toke failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authenticated. Please create an account or login",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Required role(s): ${roles.join(
          ", "
        )}. Your role: ${req.user.role}`,
      });
    }

    next();
  };
};

// export const authorizeUserAccess = async (req, res, next) => {
//   try {
//     const targetUserId = req.params.id;

//     // admin can modify any user
//     if (req.user.role === "admin") {
//       return next();
//     }

//     // user can only modify thier own account
//     if (req.user._id.toString() !== targetUserId.toString()) {
//       return res.status(403).json({
//         message: "Acess denied. you can only modify your own account",
//       });
//     }

//     next();
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "server error", error: error.message });
//   }
// };

// Authoriztion middlware - check if user can modify a resource
export const authorizePostAccess = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post cannot not be found" });
    }

    // Admin can access any post
    if (req.user.role === "admin") {
      req.post = post; // attach post to request for use in controller
      return next();
    }

    // Authors can access their own posts
    if (post.author._id.toString() === req.user._id.toString()) {
      req.post = post;
      return next();
    }

    return res.status(403).json({
      message: "Access denied. You can only modify your own posts",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Authorization middleware - check if user can modify user account
export const authorizeUserAccess = async (req, res, next) => {
  try {
    const targetUserId = req.params.id;

    // Admin can modify any user
    if (req.user.role === "admin") {
      return next();
    }

    // Users can only modify their own account
    if (req.user._id.toString() !== targetUserId.toString()) {
      return res.status(403).json({
        message: "Access denied. You can only modify your own account.",
      });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Middleware to check minimum role requirement
export const requireMinRole = (minRole) => {
  return (req, res, next) => {
    if (!req.user.hasRole(minRole)) {
      return res.status(403).json({
        message: `Access denied. Minimum required role: ${minRole}`,
      });
    }
    next();
  };
};

// Middleware for admin-only routes
export const adminOnly = authorize("admin");

// Middleware for author and admin routes
export const authorOrAdmin = authorize("author", "admin");
