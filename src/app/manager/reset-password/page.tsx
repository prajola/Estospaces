"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuthLayout, Input, Button } from "@/components";

export default function ManagerResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    if (!email) {
      setError("Email is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    setError(undefined);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Manager reset password for:", email);
      setIsSuccess(true);
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout userType="manager">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Check your email
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              We&apos;ve sent a password reset link to {email}
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/manager/login"
              className="text-[#FF7700] hover:text-[#F97316] font-medium text-sm"
            >
              Back to Sign in
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout userType="manager">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Reset Your Password
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(undefined);
            }}
            error={error}
          />

          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send email"}
          </Button>
        </form>

        <div className="text-center">
          <Link
            href="/manager/login/email"
            className="text-[#FF7700] hover:text-[#F97316] font-medium text-sm"
          >
            Back to Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
