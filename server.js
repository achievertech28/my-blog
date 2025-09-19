import express from "express";
import { connectDatabase } from "./config/dbConn.js";
import "dotenv/config";
import postsRoutes from "./routes/postRoutes.js";
import usersRoutes from "./routes/user.routes.js";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import { notFound, errorHandler } from "./middlware/errorMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:3000"],
    credentials: true,
  })
);
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Blog API");
});
app.use(notFound);
app.use(errorHandler);

// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
// 	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
// 	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
// 	// store: ... , // Redis, Memcached, etc. See below.
// })
// app.use(limiter);

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
