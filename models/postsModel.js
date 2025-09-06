import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const postSchema = new Schema({
  title: String,
  author: String,
  body: String,
  excerpt: String,
});

const Post = model("Post", postSchema);

export default Post;
