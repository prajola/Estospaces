"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import {
  VirtualTourIcon,
  ClockIcon,
  SpeedIcon,
  AnalyticsIcon,
  CheckmarkIcon,
  NetworkIcon,
  GrowthIcon,
  BillIcon,
  DocumentIcon,
  PaymentIcon,
  ServiceIcon,
  EducationIcon,
} from "@/components/LandingIcons";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
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
      staggerChildren: 0.1
    }
  }
};

// Scroll animation wrapper
function ScrollAnimation({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      // Start animation immediately if element is already in view
      const timer = setTimeout(() => {
        if (ref.current) {
          const rect = (ref.current as HTMLElement).getBoundingClientRect();
          if (rect.top < window.innerHeight + 100) {
            controls.start("visible");
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: "linear-gradient(to bottom, #FFFFFF 0%, #FFF5E6 20%, #FFE5CC 40%, #FFD699 60%, #FFCC99 80%, #FF7700 100%)",
          backgroundAttachment: "fixed",
        }}
      />
      
      {/* Fixed Building Image */}
      <div 
        className="fixed inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Link 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[#FF7700] font-bold text-xl hover:text-[#FF6600] transition-colors cursor-pointer"
              >
                Estospaces
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#how-it-works" className="text-gray-700 hover:text-[#FF7700] transition-colors">How It Works</Link>
              <Link href="#features" className="text-gray-700 hover:text-[#FF7700] transition-colors">Features</Link>
              <Link href="#for-brokers" className="text-gray-700 hover:text-[#FF7700] transition-colors">For Brokers</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="primary" className="bg-[#FF7700] hover:bg-[#FF6600] text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 1️⃣ HERO SECTION */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[600px] z-10">
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              An AI-First Platform for Modern Real Estate.
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Virtual tours, verified brokers, instant responses, digital contracts, and connected services — all in one place.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center relative"
            >
              <Link href="/login" className="relative group inline-block">
                <Button variant="primary" className="bg-[#FF7700] hover:bg-[#FF6600] text-white px-8 py-4 text-lg relative z-10 shadow-lg">
                  For Brokers
                </Button>
                {/* Animated Arrow pointing to button */}
                <motion.div
                  className="absolute -right-14 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center"
                  animate={{
                    x: [0, 8, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg
                    className="w-10 h-10 text-[#FF7700] drop-shadow-lg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </motion.div>
                {/* Pulsing ring animation around button */}
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 border-[#FF7700]"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ HOW ESTOSPACES WORKS */}
      <section id="how-it-works" className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How Estospaces Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Three simple steps to transform your property journey
              </p>
            </div>
          </ScrollAnimation>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center"
            >
              <div className="w-16 h-16 bg-[#FF7700] rounded-full flex items-center justify-center mx-auto mb-6">
                <VirtualTourIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Discover</h3>
              <p className="text-gray-600 leading-relaxed">
                Explore properties with immersive virtual tours. See every detail from anywhere, anytime.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center"
            >
              <div className="w-16 h-16 bg-[#FF7700] rounded-full flex items-center justify-center mx-auto mb-6">
                <NetworkIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Connect</h3>
              <p className="text-gray-600 leading-relaxed">
                Get matched with verified nearby brokers in minutes. AI-powered matching for instant connections.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center"
            >
              <div className="w-16 h-16 bg-[#FF7700] rounded-full flex items-center justify-center mx-auto mb-6">
                <DocumentIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Close & Manage</h3>
              <p className="text-gray-600 leading-relaxed">
                Digital contracts, payments, services & bills. Everything you need in one platform.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3️⃣ FEATURES SECTION - Dark Theme with 6 Cards */}
      <section id="features" className="relative py-20 z-10 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Features
              </h2>
            </div>
          </ScrollAnimation>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-[#FF7700]/50 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <NetworkIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Brokers Network</h3>
              <p className="text-gray-300 leading-relaxed">
                Connect with a network of trusted real estate professionals
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-[#FF7700]/50 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <GrowthIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Broker Growth</h3>
              <p className="text-gray-300 leading-relaxed">
                Tools and insights to help brokers scale their business
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-[#FF7700]/50 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <BillIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Bills</h3>
              <p className="text-gray-300 leading-relaxed">
                Automated billing and payment management system
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-[#FF7700]/50 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <PaymentIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Flexible Payments</h3>
              <p className="text-gray-300 leading-relaxed">
                Multiple payment options including installments and financing
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-[#FF7700]/50 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <ServiceIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Connecting Nearest Services</h3>
              <p className="text-gray-300 leading-relaxed">
                Connect with local service providers instantly
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-[#FF7700]/50 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <EducationIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Skilling Real Estate Brokers</h3>
              <p className="text-gray-300 leading-relaxed">
                Training and certification programs for professional growth
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* IMMERSIVE PROPERTY DISCOVERY - Additional Section */}
      <section className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Immersive Property Discovery
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience properties like never before with cutting-edge technology
              </p>
            </div>
          </ScrollAnimation>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <VirtualTourIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Virtual Tours</h3>
              <p className="text-gray-600 leading-relaxed">
                Immersive 360° property tours from anywhere, anytime. Explore every corner before you visit.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <ClockIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">24-Hour Process & Keys</h3>
              <p className="text-gray-600 leading-relaxed">
                From listing to keys in just 24 hours with automated workflows and digital processing.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <SpeedIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">10-Minute Broker Response</h3>
              <p className="text-gray-600 leading-relaxed">
                AI-powered broker matching in under 10 minutes. Get connected with verified professionals instantly.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4️⃣ TRUST & VERIFICATION LAYER */}
      <section className="relative py-20 z-10 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Trust & Verification Layer
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-2">
                Only verified users. Only trusted transactions.
              </p>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Solve the biggest real-estate problem: trust
              </p>
            </div>
          </ScrollAnimation>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-[#FF7700]/50 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <CheckmarkIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Verified Customers & Brokers</h3>
              <p className="text-gray-300 leading-relaxed">
                100% verified users with identity and credential validation. Every user is authenticated.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-[#FF7700]/50 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <DocumentIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Broker Identity & Document Checks</h3>
              <p className="text-gray-300 leading-relaxed">
                Comprehensive background checks and professional credentials validation for all brokers.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-[#FF7700]/50 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <CheckmarkIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Secure Digital Records</h3>
              <p className="text-gray-300 leading-relaxed">
                All transactions and documents are securely stored and encrypted for your peace of mind.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5️⃣ BROKER-POWERED NETWORK */}
      <section id="for-brokers" className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Broker-Powered Network
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Showcase marketplace strength with our extensive broker network
              </p>
            </div>
          </ScrollAnimation>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <NetworkIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Brokers Network</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with thousands of verified brokers across the network. Expand your reach.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <SpeedIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Connecting Nearest Broker Automatically</h3>
              <p className="text-gray-600 leading-relaxed">
                AI-powered location matching connects you with the nearest available broker instantly.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <ClockIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">10-Minute Response Commitment</h3>
              <p className="text-gray-600 leading-relaxed">
                Guaranteed response time from verified brokers. Fast, reliable, and professional.
              </p>
            </motion.div>
          </motion.div>
      </div>
      </section>

      {/* 6️⃣ BROKER GROWTH & CRM TOOLS */}
      <section className="relative py-20 z-10 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Broker Growth & CRM Tools
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-2">
                Built to help brokers close faster and grow smarter.
              </p>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Sell Estospaces to brokers & agencies
              </p>
            </div>
          </ScrollAnimation>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-[#FF7700]/50 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <AnalyticsIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Broker CRM with Real-Time Monitoring</h3>
              <p className="text-gray-300 leading-relaxed">
                Track leads, monitor performance, and grow your business with comprehensive CRM tools.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-[#FF7700]/50 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <GrowthIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Broker Growth Tools</h3>
              <p className="text-gray-300 leading-relaxed">
                Advanced analytics and insights to help you expand your portfolio and increase revenue.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-[#FF7700]/50 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <AnalyticsIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Performance & Portfolio Visibility</h3>
              <p className="text-gray-300 leading-relaxed">
                Real-time dashboards showing your performance metrics and portfolio status at a glance.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7️⃣ DIGITAL TRANSACTIONS & PAYMENTS */}
      <section className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Digital Transactions & Payments
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Modern experience with secure, flexible payment options
              </p>
            </div>
          </ScrollAnimation>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <DocumentIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Digital Contracts</h3>
              <p className="text-gray-600 leading-relaxed">
                Sign contracts digitally with legally binding e-signatures. Fast, secure, and paperless.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <PaymentIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Flexible Payments</h3>
              <p className="text-gray-600 leading-relaxed">
                Multiple payment options including installments, financing, and rent-to-own plans.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mb-6">
                <BillIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Bills & Expense Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Track all property-related expenses and bills in one place. Automated reminders and reports.
              </p>
            </motion.div>
          </motion.div>
          <ScrollAnimation delay={0.3}>
            <div className="mt-12 text-center">
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckmarkIcon className="w-5 h-5 text-[#FF7700]" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckmarkIcon className="w-5 h-5 text-[#FF7700]" />
                  <span>PCI Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckmarkIcon className="w-5 h-5 text-[#FF7700]" />
                  <span>Bank-Level Security</span>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* 8️⃣ CONNECTED SERVICES ECOSYSTEM */}
      <section className="relative py-20 z-10 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Connected Services Ecosystem
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-2">
                Everything your property needs, one click away.
              </p>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Differentiate Estospaces from listing portals
              </p>
            </div>
          </ScrollAnimation>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-[#FF7700]/50 hover:shadow-xl transition-all text-center"
            >
              <div className="w-12 h-12 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ServiceIcon className="w-6 h-6 text-[#FF7700]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Cleaning</h3>
              <p className="text-sm text-gray-300">Professional cleaning services</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-[#FF7700]/50 hover:shadow-xl transition-all text-center"
            >
              <div className="w-12 h-12 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ServiceIcon className="w-6 h-6 text-[#FF7700]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Repairs</h3>
              <p className="text-sm text-gray-300">Quick repair and maintenance</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-[#FF7700]/50 hover:shadow-xl transition-all text-center"
            >
              <div className="w-12 h-12 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ServiceIcon className="w-6 h-6 text-[#FF7700]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Moving</h3>
              <p className="text-sm text-gray-300">Reliable moving services</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-[#FF7700]/50 hover:shadow-xl transition-all text-center"
            >
              <div className="w-12 h-12 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ServiceIcon className="w-6 h-6 text-[#FF7700]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Painting</h3>
              <p className="text-sm text-gray-300">Professional painting services</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 9️⃣ SKILLING & ENABLEMENT PLATFORM */}
      <section className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Skilling & Enablement Platform
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
                Empowering the next generation of real-estate professionals.
              </p>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Long-term ecosystem vision
              </p>
            </div>
          </ScrollAnimation>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <EducationIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Training Programs</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive training modules covering all aspects of real estate transactions and management.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <CheckmarkIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Certifications</h3>
              <p className="text-gray-600 leading-relaxed">
                Earn industry-recognized certifications to enhance your professional credibility and skills.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center"
            >
              <div className="w-16 h-16 bg-[#FF7700]/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <EducationIcon className="w-8 h-8 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Best Practices</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from industry experts and adopt proven strategies for success in real estate.
              </p>
            </motion.div>
          </motion.div>
                      </div>
      </section>

      {/* 🔟 WHY ESTOSPACES */}
      <section className="relative py-20 z-10 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Why Estospaces
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Summarise benefits clearly
                        </p>
                      </div>
          </ScrollAnimation>
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollAnimation>
              <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <h3 className="text-3xl font-bold text-white mb-6">For Users</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckmarkIcon className="w-6 h-6 text-[#FF7700] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Faster Decisions</h4>
                      <p className="text-gray-300">Get instant access to properties and brokers, reducing decision time significantly.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckmarkIcon className="w-6 h-6 text-[#FF7700] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Zero Friction</h4>
                      <p className="text-gray-300">Seamless experience from discovery to closing with automated workflows.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckmarkIcon className="w-6 h-6 text-[#FF7700] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Verified Ecosystem</h4>
                      <p className="text-gray-300">Trust in a platform where every user and broker is verified and authenticated.</p>
                    </div>
                  </li>
                </ul>
                  </div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.1}>
              <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <h3 className="text-3xl font-bold text-white mb-6">For Brokers</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckmarkIcon className="w-6 h-6 text-[#FF7700] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">More Visibility</h4>
                      <p className="text-gray-300">Reach more clients through our extensive network and AI-powered matching.</p>
                      </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckmarkIcon className="w-6 h-6 text-[#FF7700] mt-1 flex-shrink-0" />
                      <div>
                      <h4 className="font-semibold text-white mb-1">Better Tools</h4>
                      <p className="text-gray-300">Advanced CRM and analytics tools to manage leads and grow your business.</p>
                      </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckmarkIcon className="w-6 h-6 text-[#FF7700] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Faster Growth</h4>
                      <p className="text-gray-300">Scale your operations with automated processes and professional training programs.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* 1️⃣1️⃣ CTA SECTION */}
      <section className="relative py-20 bg-[#FF7700] text-white z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Ready to experience smarter real estate?
              </h2>
              <p className="text-lg md:text-xl text-gray-100 mb-8">
                Join thousands of users and brokers transforming the real estate industry.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/login" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#FF7700] hover:bg-gray-100 font-semibold rounded-lg transition-colors text-lg">
                  Get Started
                </button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold rounded-lg transition-colors text-lg">
                  Join as a Broker
                </button>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* 1️⃣2️⃣ FOOTER */}
      <footer className="relative bg-gray-900 text-white py-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 lg:gap-6 mb-12">
            {/* About Estospaces */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Link 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#FF7700] font-bold text-2xl hover:text-[#FF6600] transition-colors cursor-pointer"
                >
                  Estospaces
                </Link>
              </div>
              <p className="text-gray-400 mb-6">
                The intelligent platform that connects properties, brokers, and customers seamlessly.
              </p>
              {/* Social Media Links */}
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#FF7700] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#FF7700] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#FF7700] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Privacy & Terms */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/privacy-policy" className="hover:text-[#FF7700] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-use" className="hover:text-[#FF7700] transition-colors">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/cookie-policy" className="hover:text-[#FF7700] transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="ml-0 md:ml-4">
              <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-[#FF7700] transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#FF7700] transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#FF7700] transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#FF7700] transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-gray-400 text-sm">
                <p>© 2025 Estospaces. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
