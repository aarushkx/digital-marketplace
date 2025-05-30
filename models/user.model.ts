import mongoose, { Schema } from "mongoose";
import { IUser } from "@/types";

const userSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    { timestamps: true }
);

export const User =
    (mongoose.models.User as mongoose.Model<IUser>) ||
    mongoose.model<IUser>("User", userSchema);
