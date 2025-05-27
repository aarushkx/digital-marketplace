import mongoose, { Schema } from "mongoose";
import { IImageVariant, IProduct } from "@/types";

const imageVariantSchema = new Schema<IImageVariant>({
    type: {
        type: String,
        required: true,
        enum: ["SQUARE", "WIDE", "PORTRAIT"],
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    license: {
        type: String,
        required: true,
        enum: ["personal", "commercial"],
    },
});

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
            select: false,
        },
        variants: [imageVariantSchema],
    },
    { timestamps: true }
);

export const Product =
    (mongoose.models.Product as mongoose.Model<IProduct>) ||
    mongoose.model<IProduct>("Product", productSchema);
