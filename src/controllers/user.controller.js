import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//Steps for Logic Building for registering Users
const registerUser = asyncHandler(async (req, res) => {
  //1.get user details from frontend
  //2.validation - not empty,email
  //3.check if user already exist? //check username,email
  //4.check for avatar, images
  //5.upload them to cloudinary,avatar check
  //6.create a user object - create entry in db
  //7.remove password and refresh token field from response
  //8.check for user creation
  //9.return response

  const { fullName, username, email, password } = req.body;
  console.log("email: ", email);
  console.log(req.body, "req.body");

  //   if(fullName==="") {
  //     throw new ApiError(400,"fullname is required")
  //   }

  if (
    [fullName, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw ApiError(409, "User with email or username already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" //Removing password and refresh token as this isnt required to be displayed to the user
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

export { registerUser };
