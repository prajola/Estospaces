"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout, GoogleButton, Button } from "@/components";

export default function UserSignUpPage() {
  const router = useRouter();

  const handleGoogleSignUp = () => {
    console.log("User Google sign-up clicked");
    // Simulate Google sign-up and redirect to dashboard
    router.push("/user/dashboard");
  };

  return (
    <AuthLayout userType="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign up to find and book amazing properties
          </p>
        </div>

        <div className="space-y-4">
          <GoogleButton onClick={handleGoogleSignUp} text="Sign up with Google" />

          <Link href="/user/signup/email">
            <Button variant="outline" fullWidth className="mt-3">
              Sign up with Email
            </Button>
          </Link>
        </div>

        <div className="space-y-2 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/user/login"
              className="text-[#F97316] hover:text-[#EA580C] font-medium"
            >
              Sign in
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
