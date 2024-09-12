import User from "@models/user";
import { sign as generateJWT } from "jsonwebtoken";
import { RequestHandler } from "express";

export const getUserFlights: RequestHandler = async (req, res) => {
  const { auth_user } = req.body;
  const { id } = req.params;
  if (auth_user.id !== id)
    return res.status(400).json({message: "Cannot get flights from another user"});

  const user = await User.findById(id)?.populate("flights");
  if (!user) 
    return res.status(404).json({message: "User not found"});

  res.status(200).json({
    flights: user.flights
  });
};

export const register: RequestHandler = async (req, res, next) => {
  const { username, password, role } = req.body;
  if (password!.length < 6)
    return res
      .status(400)
      .json({ message: "Password must have a minimum of 6 characters" });

  try {
    const user = new User({
      username,
      role,
    });

    user.setPassword(password as string);
    const registeredUser = await user.save();

    const maxAge = 3 * 60 * 60; // 3hrs in sec
    const token = generateJWT(
      {id: registeredUser._id, username, role: registeredUser.role},
      process.env.JWT_SECRET!,
      {
        expiresIn: maxAge
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000 // 3hrs in ms
    });
    res.status(201).json({
      id: registeredUser._id,
    });
  } catch (error) {
    next(new Error("Could not create user"));
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Incomplete credentials" });

    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({
        message: "Login failed – user not found",
      });

    if (!user.passwordIsValid(password as string))
      return res.status(401).json({
        message: "Login failed – password is incorrect",
      });

    const maxAge = 3 * 60 * 60; // 3hrs in sec
    const token = generateJWT(
      {id: user._id, username, role: user.role},
      process.env.JWT_SECRET!,
      {
        expiresIn: maxAge
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000 // 3hrs in ms
    });
    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    next(new Error("Could not login"));
  }
};

export const updateUserRole: RequestHandler = async (req, res, next) => {
  const { role } = req.body;
  try {
    if (role !== "admin")
      return res.status(400).json({ message: "Role is not admin" });

    const user = await User.findById(req.params.id);
    if (user!.role === "admin")
      return res.status(400).json({ message: "User is already an admin" });

    user!.role = role;
    const updatedUser = await user!.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    next(new Error("Could not update user"));
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "User deletion successful", ...deletedUser});
  } catch (error) {
    next(new Error("Could not delete user"));
  }
};
