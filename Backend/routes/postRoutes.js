import express from "express";
import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  editPost,
  deletePost,
} from "../controllers/postsController.js";
import { postSchema } from "../validations/postSchema.js";
import { validateBody } from "../middlware/schemaValidation.js";
import {
  protect,
  authorizePostAccess,
  adminOnly,
} from "../middlware/authMiddleware.js";
import { paginate } from "../middlware/paginate.js";
import Post from "../models/postsModel.js";
import { populate } from "dotenv";

const router = Router();

router.post("/", validateBody(postSchema), createPost);
router.get("/:id", getPostById);
router.get(
  "/",
  paginate(Post, { populate: { path: "author", select: "-password" } }),
  getPosts
);

router.use(protect);
// router.get("/", adminOnly, getPosts);
router.patch("/:id", authorizePostAccess, editPost);
router.delete("/:id", authorizePostAccess, deletePost);

export default router;
