import express from "express";
import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  editUser,
  deleteUser,
  searchUsersByName,
  getUserbyName,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { protect } from "../middlware/authMiddleware.js";

const router = Router();

router.get("/", getUsers);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/name", getUserbyName);
router.post("/", createUser);
router.get("/search", searchUsersByName);
router.get("/:id", getUserById);
router.use(protect);
router.patch("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;
