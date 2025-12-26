"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export default function LoginSelectionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Fixed Background Image with Fade */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('https://i.pinimg.com/originals/17/73/29/17732992278044515.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          opacity: 0.15,
        }}
      />
      {/* White to Orange Gradient Overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: "linear-gradient(to bottom, #FFFFFF 0%, #FFF5E6 20%, #FFE5CC 40%, #FFD699 60%, #FFCC99 80%, #FF7700 100%)",
        }}
      />
      <div className="relative z-10 w-full max-w-4xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            Choose Your Dashboard
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600"
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            Select your account type to continue
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Dashboard Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#FF7700] transition-all"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#FF7700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">User Dashboard</h2>
              <p className="text-gray-600 mb-6">
                Access your property search, saved listings, applications, viewings, and service requests.
              </p>
              <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#FF7700] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Browse properties</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#FF7700] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Track applications</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#FF7700] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Manage viewings</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#FF7700] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Request services</span>
                </li>
              </ul>
              <Link href="/user/login">
                <Button variant="primary" className="w-full">
                  Login as User
                </Button>
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                Don't have an account?{" "}
                <Link href="/user/signup" className="text-[#FF7700] hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Property Manager Dashboard Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-100 hover:border-[#FF7700] transition-all"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#FF7700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Property Manager Dashboard</h2>
              <p className="text-gray-600 mb-6">
                Manage your properties, leads, applications, appointments, and service requests.
              </p>
              <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#FF7700] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Manage properties</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#FF7700] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Track leads & clients</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#FF7700] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Handle applications</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#FF7700] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Manage services</span>
                </li>
              </ul>
              <Link href="/manager/login">
                <Button variant="primary" className="w-full">
                  Login as Manager
                </Button>
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                Don't have an account?{" "}
                <Link href="/manager/signup" className="text-[#FF7700] hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mt-8"
        >
          <Link href="/" className="text-gray-600 hover:text-[#FF7700] transition-colors">
            ← Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

