import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/errorHandler.js";


const protect = asyncHandler((req, res, next) => {
   const token = req.cookies['token'];
   if (!token) return next(new ApiError('Not authorized, no token provided', 401))

   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   if (!decoded?.id) {
      return next(new ApiError('Invalid token payload', 401))
   }
   req.userId = decoded.id;
   next();
})



export {  protect };
