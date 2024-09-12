import { RequestHandler } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export const adminUserAuth: RequestHandler = (req, res, next) => {
  try {
    const tokenFromCookie = req.cookies.jwt;
    if (!tokenFromCookie)
      return res.status(401).json({ message: "Not authorized – token not available" });

    const decodedToken = verify(tokenFromCookie, process.env.JWT_SECRET!) as JwtPayload;
    if (decodedToken.role !== "admin")
      return res.status(401).json({ message: "Not authorized" });

    req.body.auth_user = decodedToken as { id: string }
    next();
  } catch (error) {
    next(new Error("Could not authenticate user"));
  }
};

export const basicUserAuth: RequestHandler = (req, res, next) => {
  try {
    const tokenFromCookie = req.cookies.jwt;
    if (!tokenFromCookie)
      return res.status(401).json({ message: "Not authorized – token not available" });

    const decodedToken = verify(tokenFromCookie, process.env.JWT_SECRET!) as JwtPayload;
    if (decodedToken.role !== "basic")
      return res.status(401).json({ message: "Not authorized" });

    req.body.auth_user = decodedToken as { id: string }
    next();
  } catch (error) {
    next(new Error("Could not authenticate user"));
  }
};