"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout, Input, Button } from "@/components";

export default function UserEmailSignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"email" | "password">("email");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setErrors({ email: "Email is required" });
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ email: "Please enter a valid email address" });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail()) {
      setStep("password");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      setErrors({ password: "Password is required" });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ password: data.error || "Invalid credentials. Please try again or reset your password." });
        setIsSubmitting(false);
        return;
      }

      // Store user info in localStorage
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userType", data.user?.userType || "user");
      if (data.user?.name) {
        localStorage.setItem("userName", data.user.name);
      }

      // Store login time
      localStorage.setItem("loginTime", new Date().toISOString());

      // Redirect to dashboard immediately
      if (data.user?.userType === "manager") {
        router.push("/manager/dashboard");
      } else {
        router.push("/user/dashboard");
      }
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ password: "An error occurred. Please try again." });
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout userType="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Sign in to continue
          </h1>
        </div>

        {step === "email" ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              error={errors.email}
            />

            <Button type="submit" fullWidth>
              Continue
            </Button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              type="email"
              label="Email"
              value={email}
              disabled
              className="bg-gray-50"
            />

            <Input
              type="password"
              label="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              error={errors.password}
              showPasswordToggle
            />

            <Button type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        )}

        <div className="space-y-2 text-center">
          {step === "email" ? (
            <>
              <p className="text-sm text-gray-500">
                <Link
                  href="/user/reset-password"
                  className="text-[#FF7700] hover:text-[#F97316] font-medium"
                >
                  Forgot password?
                </Link>
              </p>
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/user/signup"
                  className="text-[#FF7700] hover:text-[#F97316] font-medium"
                >
                  Sign up
                </Link>
              </p>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setStep("email")}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Back
              </button>
              <p className="text-sm text-gray-500">
                <Link
                  href="/user/reset-password"
                  className="text-[#FF7700] hover:text-[#F97316] font-medium"
                >
                  Forgot password?
                </Link>
              </p>
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/user/signup"
                  className="text-[#FF7700] hover:text-[#F97316] font-medium"
                >
                  Sign up
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
