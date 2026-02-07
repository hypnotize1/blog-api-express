import prisma from "../utils/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import catchAsync from "../utils/catchAsync.js";

// Utility helper: create token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  });
};

// 1. SIGNUP
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // check the email and password fill
  if (!name || !email || !password) {
    const error = new Error("Name, email and password are required!");
    error.statusCode = 400;
    throw error;
  }
  // Check the email has been registered or not
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    const error = new Error("This email has already been registered!");
    error.statusCode = 400;
    throw error;
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // save into database
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // create token for login automatically
  const token = signToken(newUser.id);

  // send final response
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    },
  });
};

// 2. LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check the inputs
    if (!email || !password) {
      const error = new Error("Please provide email and password!");
      error.statusCode = 400;
      throw error;
    }

    // find user in database
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // check the password input
    // if user doesn't exist or password doesn't match = Error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new Error("Incorrect email or password!");
      err.statusCode = 401;
      throw error;
    }

    // create new token for user
    const token = signToken(user.id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};
