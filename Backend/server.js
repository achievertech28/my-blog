import express from "express";
import { connectDatabase } from "./config/dbConn.js";
import "dotenv/config";
import postsRoutes from "./routes/postRoutes.js";
import usersRoutes from "./routes/user.routes.js";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import { notFound, errorHandler } from "./middlware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import multer from "multer";
import uploadImageRoutes from "./routes/uploadImageRoutes.js";

// const upload = multer({ dest: "Backend/uploads/" });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/upload", uploadImageRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Blog API");
});
app.use(notFound);
app.use(errorHandler);

const limiter = rateLimit({
  windowMs: 1000 * 60, // 15 minutes
  limit: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes).
  message: {
    error: "Too many requests",
    message: "you have exceede the rate limit. please try again later",
  },
});
app.use(limiter);

// Connect to database FIRST, then start server
const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
