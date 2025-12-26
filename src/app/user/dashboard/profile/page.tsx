"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout, Input } from "@/components";
import { Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DocumentIcon,
  ClockIcon,
  CheckmarkIcon,
  EyeIcon,
  HouseIcon,
} from "@/components/DashboardIcons";

export default function ProfilePage() {
  const router = useRouter();
  const { effectiveTheme } = useTheme();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"personal" | "verifications" | "preferences">(
    "personal"
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    occupation: "",
    company: "",
    dateOfBirth: "",
    bio: "",
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [notifications, setNotifications] = useState({
    emailNotification1: true,
    smsNotification1: false,
    emailNotification2: true,
    smsNotification2: false,
  });
  const [privacy, setPrivacy] = useState({
    publicProfile1: true,
    publicProfile2: false,
    publicProfile3: true,
  });
  const [verifications, setVerifications] = useState({
    emailVerified: false,
    phoneVerified: false,
    identityVerified: false,
  });
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (isDataLoaded) return; // Prevent re-running after initial load
    
    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/user/login");
      return;
    }
    setUserEmail(email);
    
    // Load saved profile data
    const savedProfile = localStorage.getItem(`profile_${email}`);
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setFormData({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          email: profile.email || email,
          phone: profile.phone || "",
          address: profile.address || "",
          occupation: profile.occupation || "",
          company: profile.company || "",
          dateOfBirth: profile.dateOfBirth || "",
          bio: profile.bio || "",
        });
      } catch (error) {
        console.error("Error loading profile:", error);
        setFormData({
          firstName: "",
          lastName: "",
          email: email,
          phone: "",
          address: "",
          occupation: "",
          company: "",
          dateOfBirth: "",
          bio: "",
        });
      }
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: email,
        phone: "",
        address: "",
        occupation: "",
        company: "",
        dateOfBirth: "",
        bio: "",
      });
    }
    
    // Load saved preferences
    const savedNotifications = localStorage.getItem(`notifications_${email}`);
    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications));
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    }
    
    const savedPrivacy = localStorage.getItem(`privacy_${email}`);
    if (savedPrivacy) {
      try {
        setPrivacy(JSON.parse(savedPrivacy));
      } catch (error) {
        console.error("Error loading privacy:", error);
      }
    }
    
    const savedVerifications = localStorage.getItem(`verifications_${email}`);
    if (savedVerifications) {
      try {
        setVerifications(JSON.parse(savedVerifications));
      } catch (error) {
        console.error("Error loading verifications:", error);
      }
    }
    
    setIsDataLoaded(true);
  }, [router, isDataLoaded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) {
      setSaveMessage({ type: "error", text: "Please log in to save your profile." });
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }
    
    try {
      // Ensure email is always set
      const dataToSave = {
        ...formData,
        email: formData.email || userEmail,
      };
      
      // Save profile data
      localStorage.setItem(`profile_${userEmail}`, JSON.stringify(dataToSave));
      
      // Update formData to reflect saved state
      setFormData(dataToSave);
      
      setSaveMessage({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
      setSaveMessage({ type: "error", text: "Failed to save profile. Please try again." });
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleSavePreferences = () => {
    if (!userEmail) return;
    
    try {
      localStorage.setItem(`notifications_${userEmail}`, JSON.stringify(notifications));
      localStorage.setItem(`privacy_${userEmail}`, JSON.stringify(privacy));
      
      setSaveMessage({ type: "success", text: "Preferences saved successfully!" });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage({ type: "error", text: "Failed to save preferences. Please try again." });
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleVerifyEmail = () => {
    if (!userEmail) return;
    
    // Simulate email verification
    setTimeout(() => {
      setVerifications((prev) => ({ ...prev, emailVerified: true }));
      localStorage.setItem(`verifications_${userEmail}`, JSON.stringify({
        ...verifications,
        emailVerified: true,
      }));
      setSaveMessage({ type: "success", text: "Verification email sent! Please check your inbox." });
      setTimeout(() => setSaveMessage(null), 3000);
    }, 500);
  };

  const handleVerifyPhone = () => {
    if (!userEmail) return;
    
    // Simulate phone verification
    setTimeout(() => {
      setVerifications((prev) => ({ ...prev, phoneVerified: true }));
      localStorage.setItem(`verifications_${userEmail}`, JSON.stringify({
        ...verifications,
        phoneVerified: true,
      }));
      setSaveMessage({ type: "success", text: "Verification code sent to your phone!" });
      setTimeout(() => setSaveMessage(null), 3000);
    }, 500);
  };

  const handleVerifyIdentity = () => {
    if (!userEmail) return;
    
    // Simulate identity verification
    setTimeout(() => {
      setVerifications((prev) => ({ ...prev, identityVerified: true }));
      localStorage.setItem(`verifications_${userEmail}`, JSON.stringify({
        ...verifications,
        identityVerified: true,
      }));
      setSaveMessage({ type: "success", text: "Identity verification submitted! We'll review it shortly." });
      setTimeout(() => setSaveMessage(null), 3000);
    }, 500);
  };

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <DashboardLayout userEmail={userEmail}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-600">
          Manage your account information and preferences
        </p>
      </div>

      {/* User Header Card */}
      <div 
        className="relative rounded-xl p-6 mb-6 text-white overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#FF7700]/80"></div>
        <div className="relative flex items-start gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <HouseIcon className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1">
              {formData.firstName && formData.lastName
                ? `${formData.firstName} ${formData.lastName}`
                : userEmail}
            </h2>
            <p className="text-white/90 text-sm mb-2">
              {formData.address || "123 Main Street, New York"}
            </p>
            <p className="text-white/90 text-sm mb-2">
              {formData.phone || "+11259554455555"}
            </p>
            <p className="text-white/90 text-sm mb-2">
              Member Since: 1/12/2025
            </p>
            <p className="text-white/90 text-sm">
              {formData.bio || "Discover your perfect home from our curated collection"}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DocumentIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">2</p>
              <p className="text-sm text-gray-600">Total applications</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">1</p>
              <p className="text-sm text-gray-600">Under reviews</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckmarkIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <EyeIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex gap-2 mb-6 border-b ${
        effectiveTheme === "dark" ? "border-gray-700" : effectiveTheme === "ocean" ? "border-blue-300" : "border-gray-200"
      }`}>
        <button
          onClick={() => setActiveTab("personal")}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === "personal"
              ? "text-[#FF7700] border-[#FF7700]"
              : effectiveTheme === "dark"
              ? "text-gray-400 border-transparent hover:text-gray-200"
              : effectiveTheme === "ocean"
              ? "text-blue-600 border-transparent hover:text-blue-900"
              : "text-gray-600 border-transparent hover:text-gray-900"
          }`}
        >
          Personal Info
        </button>
        <button
          onClick={() => setActiveTab("verifications")}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === "verifications"
              ? "text-[#FF7700] border-[#FF7700]"
              : effectiveTheme === "dark"
              ? "text-gray-400 border-transparent hover:text-gray-200"
              : effectiveTheme === "ocean"
              ? "text-blue-600 border-transparent hover:text-blue-900"
              : "text-gray-600 border-transparent hover:text-gray-900"
          }`}
        >
          Verifications
        </button>
        <button
          onClick={() => setActiveTab("preferences")}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === "preferences"
              ? "text-[#FF7700] border-[#FF7700]"
              : effectiveTheme === "dark"
              ? "text-gray-400 border-transparent hover:text-gray-200"
              : effectiveTheme === "ocean"
              ? "text-blue-600 border-transparent hover:text-blue-900"
              : "text-gray-600 border-transparent hover:text-gray-900"
          }`}
        >
          Preferences
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === "personal" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal info
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName || ""}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, firstName: e.target.value }));
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7700] focus:border-[#FF7700] transition-colors"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>
                    Personal info
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName || ""}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, lastName: e.target.value }));
                    }}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] focus:border-[#FF7700] transition-colors ${
                      effectiveTheme === "dark"
                        ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                        : effectiveTheme === "ocean"
                        ? "bg-blue-50 border-blue-300 text-blue-900 placeholder-blue-600"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>
                    Personal info
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email || ""}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, email: e.target.value }));
                    }}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] focus:border-[#FF7700] transition-colors ${
                      effectiveTheme === "dark"
                        ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                        : effectiveTheme === "ocean"
                        ? "bg-blue-50 border-blue-300 text-blue-900 placeholder-blue-600"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>
                    Personal info
                  </label>
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone || ""}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, phone: e.target.value }));
                    }}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] focus:border-[#FF7700] transition-colors ${
                      effectiveTheme === "dark"
                        ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                        : effectiveTheme === "ocean"
                        ? "bg-blue-50 border-blue-300 text-blue-900 placeholder-blue-600"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>
                    Personal info
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    value={formData.address || ""}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, address: e.target.value }));
                    }}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] focus:border-[#FF7700] transition-colors ${
                      effectiveTheme === "dark"
                        ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                        : effectiveTheme === "ocean"
                        ? "bg-blue-50 border-blue-300 text-blue-900 placeholder-blue-600"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${
                effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
              }`}>
                Professional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>
                    Occupation
                  </label>
                  <input
                    type="text"
                    placeholder="Occupation"
                    value={formData.occupation || ""}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, occupation: e.target.value }));
                    }}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] focus:border-[#FF7700] transition-colors ${
                      effectiveTheme === "dark"
                        ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                        : effectiveTheme === "ocean"
                        ? "bg-blue-50 border-blue-300 text-blue-900 placeholder-blue-600"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Company"
                    value={formData.company || ""}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, company: e.target.value }));
                    }}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] focus:border-[#FF7700] transition-colors ${
                      effectiveTheme === "dark"
                        ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                        : effectiveTheme === "ocean"
                        ? "bg-blue-50 border-blue-300 text-blue-900 placeholder-blue-600"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth || ""}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }));
                    }}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] focus:border-[#FF7700] transition-colors ${
                      effectiveTheme === "dark"
                        ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                        : effectiveTheme === "ocean"
                        ? "bg-blue-50 border-blue-300 text-blue-900 placeholder-blue-600"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>
                    Bio
                  </label>
                  <textarea
                    placeholder="Bio"
                    value={formData.bio || ""}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, bio: e.target.value }));
                    }}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7700] focus:border-[#FF7700] transition-colors resize-vertical ${
                      effectiveTheme === "dark"
                        ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                        : effectiveTheme === "ocean"
                        ? "bg-blue-50 border-blue-300 text-blue-900 placeholder-blue-600"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </form>
        )}

        {activeTab === "verifications" && (
          <div className="space-y-6">
            <div>
              <h3 className={`text-2xl font-bold mb-2 ${
                effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
              }`}>
                Account Verification
              </h3>
              <p className={
                effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
              }>
                Make your account to increase trust and unlock more features.
              </p>
            </div>

            {/* Email Address Verification */}
            <div className={`border rounded-lg p-6 ${
              effectiveTheme === "dark" ? "border-gray-700" : effectiveTheme === "ocean" ? "border-blue-300" : "border-gray-200"
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    verifications.emailVerified
                      ? effectiveTheme === "dark" ? "bg-green-900" : effectiveTheme === "ocean" ? "bg-green-200" : "bg-green-100"
                      : effectiveTheme === "dark" ? "bg-gray-700" : effectiveTheme === "ocean" ? "bg-blue-200" : "bg-gray-100"
                  }`}>
                    <svg
                      className={`w-6 h-6 ${
                        verifications.emailVerified
                          ? effectiveTheme === "dark" ? "text-green-300" : effectiveTheme === "ocean" ? "text-green-800" : "text-green-600"
                          : effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-lg font-semibold mb-1 ${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>
                      Email Address
                    </h4>
                    <p className={`text-sm ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      {verifications.emailVerified
                        ? `Verified: ${formData.email || userEmail}`
                        : "Verify your email address."}
                    </p>
                  </div>
                </div>
                {verifications.emailVerified ? (
                  <span className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    effectiveTheme === "dark" ? "bg-green-900 text-green-300" : effectiveTheme === "ocean" ? "bg-green-200 text-green-800" : "bg-green-100 text-green-700"
                  }`}>
                    Verified
                  </span>
                ) : (
                  <Button
                    variant="primary"
                    className="bg-green-500 hover:bg-green-600 border-green-500"
                    onClick={handleVerifyEmail}
                  >
                    Verify
                  </Button>
                )}
              </div>
            </div>

            {/* Phone Number Verification */}
            <div className={`border rounded-lg p-6 ${
              effectiveTheme === "dark" ? "border-gray-700" : effectiveTheme === "ocean" ? "border-blue-300" : "border-gray-200"
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    verifications.phoneVerified
                      ? effectiveTheme === "dark" ? "bg-green-900" : effectiveTheme === "ocean" ? "bg-green-200" : "bg-green-100"
                      : effectiveTheme === "dark" ? "bg-gray-700" : effectiveTheme === "ocean" ? "bg-blue-200" : "bg-gray-100"
                  }`}>
                    <svg
                      className={`w-6 h-6 ${
                        verifications.phoneVerified
                          ? effectiveTheme === "dark" ? "text-green-300" : effectiveTheme === "ocean" ? "text-green-800" : "text-green-600"
                          : effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-lg font-semibold mb-1 ${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>
                      Phone Number
                    </h4>
                    <p className={`text-sm ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      {verifications.phoneVerified
                        ? `Verified: ${formData.phone || "Not provided"}`
                        : "Verify your phone number."}
                    </p>
                  </div>
                </div>
                {verifications.phoneVerified ? (
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                    Verified
                  </span>
                ) : (
                  <Button
                    variant="primary"
                    className="bg-green-500 hover:bg-green-600 border-green-500"
                    onClick={handleVerifyPhone}
                  >
                    Verify
                  </Button>
                )}
              </div>
            </div>

            {/* Identity Verification */}
            <div className={`border rounded-lg p-6 ${
              effectiveTheme === "dark" ? "border-gray-700" : effectiveTheme === "ocean" ? "border-blue-300" : "border-gray-200"
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    verifications.identityVerified
                      ? effectiveTheme === "dark" ? "bg-green-900" : effectiveTheme === "ocean" ? "bg-green-200" : "bg-green-100"
                      : effectiveTheme === "dark" ? "bg-gray-700" : effectiveTheme === "ocean" ? "bg-blue-200" : "bg-gray-100"
                  }`}>
                    <svg
                      className={`w-6 h-6 ${
                        verifications.identityVerified
                          ? effectiveTheme === "dark" ? "text-green-300" : effectiveTheme === "ocean" ? "text-green-800" : "text-green-600"
                          : effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`text-lg font-semibold ${
                        effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                      }`}>
                        Identity Verification
                      </h4>
                      {verifications.identityVerified ? (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          effectiveTheme === "dark" ? "bg-green-900 text-green-300" : effectiveTheme === "ocean" ? "bg-green-200 text-green-800" : "bg-green-100 text-green-600"
                        }`}>
                          Verified
                        </span>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          effectiveTheme === "dark" ? "bg-orange-900 text-orange-300" : effectiveTheme === "ocean" ? "bg-orange-200 text-orange-800" : "bg-orange-100 text-orange-600"
                        }`}>
                          Pending
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      {verifications.identityVerified
                        ? "Your identity has been verified."
                        : "Upload government issued ID."}
                    </p>
                  </div>
                </div>
                {verifications.identityVerified ? (
                  <span className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    effectiveTheme === "dark" ? "bg-green-900 text-green-300" : effectiveTheme === "ocean" ? "bg-green-200 text-green-800" : "bg-green-100 text-green-700"
                  }`}>
                    Verified
                  </span>
                ) : (
                  <Button variant="primary" onClick={handleVerifyIdentity}>
                    Verify Now
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="space-y-6">
            {/* Notification Settings */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${
                effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
              }`}>
                Notification Settings
              </h3>
              <div className="space-y-4">
                <div className={`flex items-center justify-between p-4 border rounded-lg ${
                  effectiveTheme === "dark" ? "border-gray-700" : effectiveTheme === "ocean" ? "border-blue-300" : "border-gray-200"
                }`}>
                  <div>
                    <p className={`font-medium ${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>
                      Email Notification
                    </p>
                    <p className={`text-sm ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      Received update via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.emailNotification1}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          emailNotification1: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      SMS Notification
                    </p>
                    <p className="text-sm text-gray-600">
                      Received update via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.smsNotification1}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          smsNotification1: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                <div className={`flex items-center justify-between p-4 border rounded-lg ${
                  effectiveTheme === "dark" ? "border-gray-700" : effectiveTheme === "ocean" ? "border-blue-300" : "border-gray-200"
                }`}>
                  <div>
                    <p className={`font-medium ${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>
                      Email Notification
                    </p>
                    <p className={`text-sm ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      Received update via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.emailNotification2}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          emailNotification2: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      SMS Notification
                    </p>
                    <p className="text-sm text-gray-600">
                      Received update via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.smsNotification2}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          smsNotification2: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Privacy Settings
              </h3>
              <div className="space-y-4">
                <div className={`flex items-center justify-between p-4 border rounded-lg ${
                  effectiveTheme === "dark" ? "border-gray-700" : effectiveTheme === "ocean" ? "border-blue-300" : "border-gray-200"
                }`}>
                  <div>
                    <p className={`font-medium ${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>Public Profile</p>
                    <p className={`text-sm ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      Make your profile visible to others
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacy.publicProfile1}
                      onChange={(e) =>
                        setPrivacy({
                          ...privacy,
                          publicProfile1: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                <div className={`flex items-center justify-between p-4 border rounded-lg ${
                  effectiveTheme === "dark" ? "border-gray-700" : effectiveTheme === "ocean" ? "border-blue-300" : "border-gray-200"
                }`}>
                  <div>
                    <p className={`font-medium ${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>Public Profile</p>
                    <p className={`text-sm ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      Make your profile visible to others
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacy.publicProfile2}
                      onChange={(e) =>
                        setPrivacy({
                          ...privacy,
                          publicProfile2: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                <div className={`flex items-center justify-between p-4 border rounded-lg ${
                  effectiveTheme === "dark" ? "border-gray-700" : effectiveTheme === "ocean" ? "border-blue-300" : "border-gray-200"
                }`}>
                  <div>
                    <p className={`font-medium ${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>Public Profile</p>
                    <p className={`text-sm ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      Make your profile visible to others
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacy.publicProfile3}
                      onChange={(e) =>
                        setPrivacy({
                          ...privacy,
                          publicProfile3: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Save Preferences Button */}
            <div className="mt-6">
              <Button variant="primary" onClick={handleSavePreferences}>
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
