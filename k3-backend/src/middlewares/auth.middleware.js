// src/middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: false,
        message: "Token wajib dikirim",
      });
    }

    // pastikan format Bearer TOKEN
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: false,
        message: "Format token harus 'Bearer <token>'",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, role, ... }

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        status: false,
        message: "Token expired",
      });
    }

    return res.status(401).json({
      status: false,
      message: "Token tidak valid",
    });
  }
}
