import { Schema, model } from "mongoose";
import jwt from  'jsonwebtoken';

const UserSchema = new Schema(
  {
    Name: {
      type: String,
      required: [true, "Please provide your full name"],
      minLength: [3, "min imum length is 3"],
      maxLength: [20, "Maximum Length Exceeded"],
      teim: true,
      lowercase: true,
    },

    userName: {
      type: String,
      required: [true, "Please provide your full name"],
      minLength: [3, "min imum length is 3"],
      maxLength: [20, "Maximum Length Exceeded"],
      teim: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Minimum length of Password should be 8"],
      maxLength: [100, "Maximum length for password exceeded"],
      select: false, // to hide the password in response
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods = {
  genarateJWTToken: function () {
    return jwt.sign(
      { id: this._id,role: this.role }, 
      process.env.JWT_PASSWORD,
       {
      expiresIn: process.env.JWT_EXPIRE
    });
  },
};

const User = model("User", UserSchema);
export default User;

// export interface IUser extends Document
