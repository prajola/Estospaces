"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components";

export default function HomePage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-red-600/20"></div>
        </div>
      </div>

      {/* Right side - Content */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24">
          <div className="w-full max-w-md mx-auto">
            <Logo className="mb-8" />
            
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Welcome to Estospaces
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                  Choose how you want to continue
                </p>
              </div>

              <div className="space-y-4">
                {/* User Option */}
                <Link href="/user/login" className="block">
                  <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#F97316] hover:bg-orange-50 transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <svg
                          className="w-6 h-6 text-[#F97316]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          I&apos;m a User
                        </h3>
                        <p className="text-sm text-gray-500">
                          Find and book properties
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 ml-auto group-hover:text-[#F97316] transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>

                {/* Property Manager Option */}
                <Link href="/manager/login" className="block">
                  <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#F97316] hover:bg-orange-50 transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <svg
                          className="w-6 h-6 text-[#F97316]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          I&apos;m a Property Manager
                        </h3>
                        <p className="text-sm text-gray-500">
                          List and manage your properties
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 ml-auto group-hover:text-[#F97316] transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 sm:px-12 lg:px-16 xl:px-24 py-6">
          <p className="text-xs text-gray-400 text-center">
            By continuing, you agree to Estospaces&apos;s{" "}
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
}
