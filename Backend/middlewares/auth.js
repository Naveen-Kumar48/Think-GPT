import jwt from "jsonwebtoken";
import User from "../models/Usermodel.js";
export const protect = async (req, res, next) => {
  let token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "Not Authorized ,user not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorised, token failed " });
  }
};
