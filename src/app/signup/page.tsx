"use client";

import React from "react";
import Link from "next/link";
import { AuthLayout, GoogleButton, Button } from "@/components";

export default function SignUpPage() {
  const handleGoogleSignUp = () => {
    // Handle Google sign-up
    console.log("Google sign-up clicked");
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Sign up for Estospaces
          </h1>
        </div>

        <div className="space-y-4">
          <GoogleButton onClick={handleGoogleSignUp} text="Sign up with Google" />

          <Link href="/signup/email">
            <Button variant="outline" fullWidth className="mt-3">
              Sign up with Email
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#F97316] hover:text-[#EA580C] font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
