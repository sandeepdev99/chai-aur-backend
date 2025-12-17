//
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.models.js";
import { testingCode } from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res, next) => {
    //get user data from frontend
    const [fullName, email, username, password] = [
        req.body.fullName,
        req.body.email,
        req.body.username,
        req.body.password
    ];
        
    //validate user data
    if (
    [fullName, email, username, password].some((field) => !field || field.trim() === "")
    ) {
        // return next(new ApiError("All fields are required", 400));
        throw new ApiError("All fields are required", 400);
    }
    
    //check if user already exists - username/email
    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })
    if (existedUser) {
        return next(new ApiError("User with given username/email already exists", 409));
    }

    //check for images, avatar img required
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    console.log("avatarLocalPath",avatarLocalPath);
    if (!avatarLocalPath) {
        throw new ApiError("Avatar image is required", 400);
    }

    //upload to cloudinary then test upload
    console.log("uploading to cloudinary", avatarLocalPath, coverImageLocalPath);
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = coverImageLocalPath
        ? await uploadOnCloudinary(coverImageLocalPath)
        : null;

    if (!avatar) {
        throw new ApiError("Error in uploading avatar image", 500);
    }
    //create user object - creation call to db
    const newUser = await User.create({
        fullName,
        email,
        username : username.toLowerCase(),
        password,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        password
    });
    testingCode();
    const createdUser = await User.findById(newUser._id).select("-password -refreshToken");
    //hash password, remove pass and refresh token from response
    if (!createdUser) {
        throw new ApiError("Error in user creation", 500);
    }

    //send welcome email
    return res.status(201).json(new ApiResponse(
        "User registered successfully",
        200,
        createdUser, "User registered successfully"
    ));
});

export { registerUser };
