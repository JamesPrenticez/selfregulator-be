import { type Request, type Response } from "express";
// import prisma from '../prisma';
import jwt from "jsonwebtoken";
import { createHashedPassword, verifyPassword } from "../utils";
import { PrismaClient } from "@prisma/client";

// const secret = process.env.SECRET_KEY

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && (await verifyPassword(password, user.passwordHash))) {
      // Generate a JWT token
      // TODO
      // accessToken
      // refreshToken
      // SPAToken?
      const token = jwt.sign(
        { username: user.email, userId: user.id },
        "your_secret_key_goes_here",
        { expiresIn: "1h" },
      );

      // Destructure user object and replace null values with empty strings
      const {
        firstName,
        lastName,
        phone,
        profilePicture,
        locale,
        country,
        permissions,
        subscription,
        dateCreated,
        lastModified,
      } = user || {};

      // Set default values for properties that might be null
      const userData = {
        firstName: firstName ?? "",
        lastName: lastName ?? "",
        email,
        phone: phone ?? "",
        profilePicture: profilePicture ?? "",
        locale: locale ?? "",
        country: country ?? "",
        permissions: permissions ?? [],
        subscription: subscription ?? "",
        dateCreated: dateCreated ?? "",
        lastModified: lastModified ?? "",
      };

      // Set JWT token as cookie and return user data
      return res
        .status(200)
        .cookie("JWT_TOKEN", `Bearer ${token}`, {
          secure: true,
          httpOnly: true,
          sameSite: "strict",
        })
        .json({ data: userData });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Logout
export const logout = async (req: Request, res: Response): Promise<any> => {
  // Clear the JWT token cookie by setting it with an empty value and an expiration date in the past
  try {
    res.cookie("JWT_TOKEN", "", {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(0),
    });
    return res.status(200).json({ data: null });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// SignUp
export const register = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    console.log("try?");
    // Check if the username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    console.log(existingUser);

    if (existingUser) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    // Create a hashed password
    const hashedPassword = await createHashedPassword(password);

    // Save the user to the database
    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
      },
    });

    // Get that user after creation
    const user = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    });

    console.log(newUser);

    // Destructure user object and replace null values with empty strings
    const {
      firstName,
      lastName,
      phone,
      profilePicture,
      locale,
      country,
      permissions,
      subscription,
      dateCreated,
      lastModified,
    } = user || {};

    // Set default values for properties that might be null
    const userData = {
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      email,
      phone: phone ?? "",
      profilePicture: profilePicture ?? "",
      locale: locale ?? "",
      country: country ?? "",
      permissions: permissions ?? [],
      subscription: subscription ?? "",
      dateCreated: dateCreated ?? "",
      lastModified: lastModified ?? "",
    };

    // Generate a JWT token for the newly registered user
    const token = jwt.sign(
      { email: newUser.email, userId: newUser.id },
      "your_secret_key_goes_here",
      { expiresIn: "1h" },
    );

    // Set JWT token as cookie and return user data
    return res
      .status(200)
      .cookie("JWT_TOKEN", `Bearer ${token}`, {
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ data: userData });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
