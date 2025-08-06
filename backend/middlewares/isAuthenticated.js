// middleware/isAuthenticated.js
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
const isAuthenticated = async (req, res, next) => {
    try {
        // Get token from cookies or Authorization header
        const token = req.cookies.token || 
                     req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                message: "Authentication required",
                success: false
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // Check if user exists
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false
            });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        
        let message = "Authentication failed";
        if (error.name === 'JsonWebTokenError') {
            message = "Invalid token";
        } else if (error.name === 'TokenExpiredError') {
            message = "Token expired";
        }

        return res.status(401).json({
            message,
            success: false
        });
    }
};

export default isAuthenticated;