//
import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res, next) => {
    res.status(201).json({ message: "User registered successfully wai wai", success: true });
});

export { registerUser };
