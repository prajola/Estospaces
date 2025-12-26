import { NextRequest, NextResponse } from "next/server";
import { createUser, userExists } from "@/lib/users";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, userType } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (userExists(email)) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Create user (in production, hash the password)
    const newUser = {
      email,
      password, // In production, hash this password
      userType: userType || "user",
    };

    createUser(newUser);

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: { email: newUser.email, userType: newUser.userType, name: name || null },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}

