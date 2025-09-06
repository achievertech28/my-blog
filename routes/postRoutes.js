import express from "express";
import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  editPost,
  deletePost,
} from "../controllers/postsController.js";

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPostById);
router.patch("/:id", editPost);
router.delete("/:id", deletePost);

export default router;
