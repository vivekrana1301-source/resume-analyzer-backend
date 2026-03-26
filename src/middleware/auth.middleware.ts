import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;


  if (!authHeader) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];


  try {
    const decoded = jwt.verify(token, "secretkey");


    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};