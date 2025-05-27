import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db-connect";
import { Product } from "@/models/product.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { IProduct } from "@/types";

export async function GET() {
    try {
        await connectToDatabase();

        const products = await Product.find({}).lean();
        if (!products || products.length === 0) {
            return NextResponse.json(
                { message: "No products found" },
                { status: 404 }
            );
        }

        // TODO: Add watermark to images

        return NextResponse.json({ products }, { status: 200 });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Error fetching products" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectToDatabase();

        const body: IProduct = await request.json();

        if (
            !body.name ||
            !body.description ||
            !body.imageUrl ||
            body.variants.length === 0
        ) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const newProduct = new Product(body);
        await newProduct.save();

        return NextResponse.json({ newProduct }, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            { error: "Failed to create product" },
            { status: 500 }
        );
    }
}
