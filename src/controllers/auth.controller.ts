import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
const secretkey = "vivek" 

// REGISTER 
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, skills, info } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email & Password required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashed,
      skills,
      info,
    });

    const { password: _, ...userData } = user.toObject();

    res.json({ success: true, user: userData });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};



// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }


    const token = jwt.sign(
      { userId: user._id },
      "secretkey", 
      { expiresIn: "2h" }
    );

    const { password: _, ...userData } = user.toObject();

    res.json({
      success: true,
         token, 
      user: userData,
    });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};



