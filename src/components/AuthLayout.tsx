"use client";

import React from "react";
import Link from "next/link";
import Logo from "./Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  userType?: "user" | "manager";
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, userType }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          }}
        />
      </div>

      {/* Right side - Content */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen bg-white">
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24">
          <div className="w-full max-w-md mx-auto">
            <Link href="/">
              <Logo className="mb-6" />
            </Link>
            
            {userType && (
              <div className="mb-6">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                  userType === "user" 
                    ? "bg-blue-100 text-blue-700" 
                    : "bg-purple-100 text-purple-700"
                }`}>
                  {userType === "user" ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      User
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Property Manager
                    </>
                  )}
                </span>
              </div>
            )}
            
            {children}
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-8 sm:px-12 lg:px-16 xl:px-24 py-6">
          <p className="text-xs text-gray-400 text-center">
            By continuing, you&apos;re agreeing to Estospaces&apos;s{" "}
            <a href="#" className="text-gray-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-gray-500 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
