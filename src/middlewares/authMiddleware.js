import { promisify } from "util";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";

export const protect = async (req, res, next) => {
  try {
    // get token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in! Please log in to get access",
      });
    }

    // token validation
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // check if user exist
    const currentUser = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "The user belonging to this token does no longer exist.",
      });
    }

    // passage permission
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid token or token expired!",
    });
  }
};
