import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db-connect";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            role: "user",
        });
        await newUser.save();

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json(
            { error: "Failed to register user" },
            { status: 500 }
        );
    }
}
