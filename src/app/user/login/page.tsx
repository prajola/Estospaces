"use client";

import React from "react";
import Link from "next/link";
import { AuthLayout, GoogleButton, Button } from "@/components";

export default function UserLoginPage() {
  const handleGoogleSignIn = () => {
    console.log("User Google sign-in clicked");
  };

  return (
    <AuthLayout userType="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Sign in to Estospaces
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Access your account to find and book properties
          </p>
        </div>

        <div className="space-y-4">
          <GoogleButton onClick={handleGoogleSignIn} text="Sign in with Google" />

          <Link href="/user/login/email">
            <Button variant="outline" fullWidth className="mt-3">
              Sign in with email
            </Button>
          </Link>
        </div>

        <div className="space-y-2 text-center">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/user/signup"
              className="text-[#F97316] hover:text-[#EA580C] font-medium"
            >
              Sign up
            </Link>
          </p>
          <p className="text-sm text-gray-500">
            <Link
              href="/"
              className="text-gray-400 hover:text-gray-600"
            >
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
