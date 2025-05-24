import mongoose, { Schema } from "mongoose";
import { TImageVariant, IOrder } from "@/types";

const orderSchema = new Schema<IOrder>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        variant: {
            type: {
                type: String,
                required: true,
                enum: ["SQUARE", "WIDE", "PORTRAIT"] as TImageVariant[],
                set: (val: string) => val.toUpperCase(),
            },
            price: {
                type: Number,
                required: true,
            },
            license: {
                type: String,
                required: true,
                enum: ["personal", "commercial"],
            },
        },
        paymentId: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["pending", "purchased", "failed"],
            default: "pending",
        },
        downloadUrl: {
            type: String,
        },
        previewUrl: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Order =
    (mongoose.models.Order as mongoose.Model<IOrder>) ||
    mongoose.model<IOrder>("Order", orderSchema);
