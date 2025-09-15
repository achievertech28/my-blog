import express from "express";
import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  editPost,
  deletePost,
} from "../controllers/postsController.js";
import {
  protect,
  authorizePostAccess,
  adminOnly,
} from "../middlware/authMiddleware.js";

const router = Router();

router.post("/", createPost);
router.get("/:id", getPostById);

router.use(protect);
router.get("/", adminOnly, getPosts);
router.patch("/:id", authorizePostAccess, editPost);
router.delete("/:id", authorizePostAccess, deletePost);

export default router;
