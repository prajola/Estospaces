"use client";

import React from "react";
import Link from "next/link";
import { AuthLayout, GoogleButton, Button } from "@/components";

export default function LoginPage() {
  const handleGoogleSignIn = () => {
    // Handle Google sign-in
    console.log("Google sign-in clicked");
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Sign in to Estospaces
          </h1>
        </div>

        <div className="space-y-4">
          <GoogleButton onClick={handleGoogleSignIn} text="Sign in with Google" />

          <Link href="/login/email">
            <Button variant="outline" fullWidth className="mt-3">
              Sign in with email
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#F97316] hover:text-[#EA580C] font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
