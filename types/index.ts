import mongoose, { Document } from "mongoose";
import { IMAGE_VARIANTS } from "@/lib/constants";

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: {
        type: String;
        enum: ["admin", "user"];
        default: "user";
    };
    createdAt?: Date;
    updatedAt?: Date;
}

export type TImageVariant = keyof typeof IMAGE_VARIANTS;

export interface IImageVariant extends Document {
    type: TImageVariant;
    price: number;
    license: "personal" | "commercial";
}

export interface IProduct extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    imageUrl: string;
    variants: TImageVariant[];
}

export interface IPopulatedUser extends Document {
    _id: mongoose.Types.ObjectId;
    email: string;
}

export interface IPopulatedProduct extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    imageUrl: string;
}

export interface IOrder extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId | IPopulatedUser;
    productId: mongoose.Types.ObjectId | IPopulatedProduct;
    variant: IImageVariant;
    paymentId: string;
    amount: number;
    status: "pending" | "purchased" | "failed";
    downloadUrl?: string;
    previewUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
