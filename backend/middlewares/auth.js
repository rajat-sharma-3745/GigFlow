import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { CustomError } from "../utils/CustomError.js";


const protect = asyncHandler((req, res, next) => {
   const token = req.cookies['token'];
   if (!token) return next(new CustomError('Not authorized, no token provided', 401))

   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   if (!decoded?.id) {
      return next(new ApiError('Invalid token payload', 401))
   }
   req.userId = decoded.id;
   next();
})


const socketAuth = async (err, socket, next) => {
   try {
      if (err) return next(err);
      const authToken = socket.request.cookies.token;
      if (!authToken) {
         return next(new CustomError("Not authorized, no token provided", 401));
      }
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
      
      socket.userId = decoded.id;
      
      return next();
   } catch (error) {
      return next(new CustomError(error, 400));
   }
}

export {  protect, socketAuth };
