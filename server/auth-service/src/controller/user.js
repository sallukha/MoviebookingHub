import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
export const register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(new ApiError(400, " all filled  are required"));
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ApiError(409, "User already exists"));
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    return res.status(201).json(
        new ApiResponse(201, "User created", user)
    );
});



export const createAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let exist = await User.findOne({ email });
        if (exist) return res.status(400).json({ message: "Admin already exists" });

        const hash = await bcrypt.hash(password, 10);

        const admin = await User.create({
            name,
            email,
            password: hash,
            role: "admin",
        });

        res.status(201).json({ message: "Admin created", admin });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
 export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const loginType = req.query.type; // "admin" or "user"

    if (!email || !password) {
        return next(new ApiError(400, "Email and password are required"));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ApiError(404, "User not found"));
    }

    // compare password 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new ApiError(400, "Invalid password"));
    }


    // Admin Login Page
    if (loginType === "admin" && user.role !== "admin") {
        return next(new ApiError(403, "You are not allowed to login as Admin"));
    }

    // User Login Page
    if (loginType === "user" && user.role !== "user") {
        return next(new ApiError(403, "Admins cannot login from user page"));
    }

    // Token generate
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    // Set cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // production me true
        maxAge: 24 * 60 * 60 * 1000,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, `${user.role} login successful`, { user, token }));
});
