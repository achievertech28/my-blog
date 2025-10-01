import mongoose from "mongoose";
import { Schema, SchemaTypes, model } from "mongoose";

const postSchema = new Schema({
  title: { type: String, require: true },
  body: { type: String, require: true },
  excerpt: { type: String, require: true },
  author: { type: SchemaTypes.ObjectId, ref: "User", require: true },
});

const Post = model("Post", postSchema);

export default Post;
