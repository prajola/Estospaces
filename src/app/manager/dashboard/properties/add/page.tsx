"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ManagerDashboardLayout, Input, Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";

type Step = "basic" | "specification" | "media" | "contact";

const steps: { id: Step; label: string }[] = [
  { id: "basic", label: "Basic Info" },
  { id: "specification", label: "Property Details" },
  { id: "media", label: "Media & Features" },
  { id: "contact", label: "Contact & Published" },
];

export default function AddPropertyPage() {
  const router = useRouter();
  const { effectiveTheme } = useTheme();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>("basic");
  const [formData, setFormData] = useState({
    // Basic Info
    propertyTitle: "",
    propertyType: "",
    listingType: "",
    propertyStatus: "",
    price: "",
    area: "",
    unit: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    neighborhood: "",
    // Specification
    beds: "",
    baths: "",
    garages: "",
    yearBuilt: "",
    propertySize: "",
    lotSize: "",
    rooms: "",
    floors: "",
    furnished: false,
    airConditioning: false,
    heating: false,
    description: "",
    // Media & Features
    images: [] as File[],
    videos: [] as File[],
    rebootTourURL: "",
    features: [] as string[],
    // Contact & Publish
    availableFrom: "",
    minimumStay: "",
    propertyToRentSale: false,
    contactName: "",
    phoneNumber: "",
    emailAddress: "",
    website: "",
  });

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const userType = localStorage.getItem("userType");
    
    if (!email || userType !== "manager") {
      router.push("/manager/login");
      return;
    }
    setUserEmail(email);
  }, [router]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(e.target.files || [])],
      }));
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        videos: [...prev.videos, ...Array.from(e.target.files || [])],
      }));
    }
  };

  const getCurrentStepIndex = () => {
    return steps.findIndex((s) => s.id === currentStep);
  };

  const handleNext = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const handleSaveDraft = () => {
    // Save to localStorage
    if (userEmail) {
      const properties = JSON.parse(localStorage.getItem(`properties_${userEmail}`) || "[]");
      properties.push({ ...formData, id: Date.now().toString(), status: "draft" });
      localStorage.setItem(`properties_${userEmail}`, JSON.stringify(properties));
    }
    router.push("/manager/dashboard");
  };

  const handlePublish = () => {
    // Save to localStorage
    if (userEmail) {
      const properties = JSON.parse(localStorage.getItem(`properties_${userEmail}`) || "[]");
      properties.push({ ...formData, id: Date.now().toString(), status: "published" });
      localStorage.setItem(`properties_${userEmail}`, JSON.stringify(properties));
    }
    router.push("/manager/dashboard");
  };

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const currentStepIndex = getCurrentStepIndex();

  return (
    <ManagerDashboardLayout userEmail={userEmail}>
      <div>
        {/* Header with Back, Title, and Action Buttons */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/manager/dashboard")}
              className={`p-2 rounded-lg transition-colors ${
                effectiveTheme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : effectiveTheme === "ocean"
                  ? "text-blue-900 hover:bg-blue-200"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className={`text-2xl font-bold ${
                effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
              }`}>
                Add New Property
              </h1>
              <p className={`text-sm mt-1 ${
                effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
              }`}>
                Create a comprehensive property listing
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSaveDraft}>
              Save Draft
            </Button>
            <Button variant="primary" onClick={handlePublish}>
              Publish Property
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className={`h-2 rounded-full overflow-hidden ${
            effectiveTheme === "dark" ? "bg-gray-700" : effectiveTheme === "ocean" ? "bg-blue-200" : "bg-gray-200"
          }`}>
            <div
              className="h-full bg-[#FF7700] transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Steps Navigation */}
        <div className="flex gap-2 mb-6 border-b">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`px-4 py-2 font-medium transition-colors border-b-2 capitalize ${
                index === currentStepIndex
                  ? "text-[#FF7700] border-[#FF7700]"
                  : effectiveTheme === "dark"
                  ? "text-gray-400 border-transparent hover:text-gray-200"
                  : effectiveTheme === "ocean"
                  ? "text-blue-600 border-transparent hover:text-blue-900"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              {step.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className={`rounded-lg shadow-md p-6 ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
        }`}>
          {/* Step 1: Basic Info */}
          {currentStep === "basic" && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  Basic Property Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      label="Property Title"
                      placeholder="e.g. Luxury 3BR Apartment with city View"
                      value={formData.propertyTitle}
                      onChange={(e) => handleInputChange("propertyTitle", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                    }`}>
                      Property Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => handleInputChange("propertyType", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                        effectiveTheme === "dark"
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : effectiveTheme === "ocean"
                          ? "bg-blue-50 border-blue-300 text-blue-900"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      <option value="">Select Property Type</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="villa">Villa</option>
                      <option value="condo">Condo</option>
                      <option value="penthouse">Penthouse</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                    }`}>
                      Listing Type
                    </label>
                    <select
                      value={formData.listingType}
                      onChange={(e) => handleInputChange("listingType", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                        effectiveTheme === "dark"
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : effectiveTheme === "ocean"
                          ? "bg-blue-50 border-blue-300 text-blue-900"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      <option value="">Select Listing Type</option>
                      <option value="sale">For Sale</option>
                      <option value="rent">For Rent</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                    }`}>
                      Property Status
                    </label>
                    <select
                      value={formData.propertyStatus}
                      onChange={(e) => handleInputChange("propertyStatus", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                        effectiveTheme === "dark"
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : effectiveTheme === "ocean"
                          ? "bg-blue-50 border-blue-300 text-blue-900"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      <option value="">Select status</option>
                      <option value="available">Available</option>
                      <option value="pending">Pending</option>
                      <option value="sold">Sold</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-2 ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                    }`}>
                      Price
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="$ Enter Price"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        className={`flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                          effectiveTheme === "dark"
                            ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                            : effectiveTheme === "ocean"
                            ? "bg-blue-50 border-blue-300 text-blue-900 placeholder-blue-600"
                            : "border-gray-300 bg-white"
                        }`}
                      />
                      <select
                        className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                          effectiveTheme === "dark"
                            ? "bg-gray-700 border-gray-600 text-gray-100"
                            : effectiveTheme === "ocean"
                            ? "bg-blue-50 border-blue-300 text-blue-900"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className={`text-lg font-semibold mb-4 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  Location Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      label="Street Address"
                      placeholder="e.g. 123 Main street, Apt 48"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                    }`}>
                      City
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                        effectiveTheme === "dark"
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : effectiveTheme === "ocean"
                          ? "bg-blue-50 border-blue-300 text-blue-900"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      <option value="">City</option>
                      <option value="new-york">New York</option>
                      <option value="los-angeles">Los Angeles</option>
                      <option value="chicago">Chicago</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                    }`}>
                      State
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                        effectiveTheme === "dark"
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : effectiveTheme === "ocean"
                          ? "bg-blue-50 border-blue-300 text-blue-900"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      <option value="">State</option>
                      <option value="ny">New York</option>
                      <option value="ca">California</option>
                      <option value="il">Illinois</option>
                    </select>
                  </div>
                  <div>
                    <Input
                      label="Zip/Postal Code"
                      placeholder="Zip Code"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                    }`}>
                      Country
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                        effectiveTheme === "dark"
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : effectiveTheme === "ocean"
                          ? "bg-blue-50 border-blue-300 text-blue-900"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      <option value="">Select Country</option>
                      <option value="us">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="ca">Canada</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Property Specification */}
          {currentStep === "specification" && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  Property Specification
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      label="Beds"
                      type="number"
                      placeholder="Number of bedrooms"
                      value={formData.beds}
                      onChange={(e) => handleInputChange("beds", e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      label="Baths"
                      type="number"
                      placeholder="Number of bathrooms"
                      value={formData.baths}
                      onChange={(e) => handleInputChange("baths", e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      label="Garages"
                      type="number"
                      placeholder="Number of garages"
                      value={formData.garages}
                      onChange={(e) => handleInputChange("garages", e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      label="Year Built"
                      type="number"
                      placeholder="Year built"
                      value={formData.yearBuilt}
                      onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      label="Property Size"
                      type="number"
                      placeholder="Property size"
                      value={formData.propertySize}
                      onChange={(e) => handleInputChange("propertySize", e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      label="Lot Size"
                      type="number"
                      placeholder="Lot size"
                      value={formData.lotSize}
                      onChange={(e) => handleInputChange("lotSize", e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      label="Rooms"
                      type="number"
                      placeholder="Number of rooms"
                      value={formData.rooms}
                      onChange={(e) => handleInputChange("rooms", e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      label="Floors"
                      type="number"
                      placeholder="Number of floors"
                      value={formData.floors}
                      onChange={(e) => handleInputChange("floors", e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4 flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.furnished}
                      onChange={(e) => handleInputChange("furnished", e.target.checked)}
                      className="mr-2"
                    />
                    <span className={effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"}>
                      Furnished
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.airConditioning}
                      onChange={(e) => handleInputChange("airConditioning", e.target.checked)}
                      className="mr-2"
                    />
                    <span className={effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"}>
                      Air Conditioning
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.heating}
                      onChange={(e) => handleInputChange("heating", e.target.checked)}
                      className="mr-2"
                    />
                    <span className={effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"}>
                      Heating
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className={`text-lg font-semibold mb-4 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  Property Description
                </h3>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter detailed property description..."
                  rows={8}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                    effectiveTheme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : effectiveTheme === "ocean"
                      ? "bg-blue-50 border-blue-300 text-blue-900"
                      : "border-gray-300 bg-white"
                  }`}
                />
              </div>
            </div>
          )}

          {/* Step 3: Media & Features */}
          {currentStep === "media" && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  Property Images
                </h3>
                <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  effectiveTheme === "dark" ? "border-gray-600 bg-gray-700" : effectiveTheme === "ocean" ? "border-blue-300 bg-blue-50" : "border-gray-300 bg-gray-50"
                }`}>
                  <input
                    type="file"
                    multiple
                    accept="image/png,image/jpg,image/jpeg"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer"
                  >
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className={`mt-2 text-sm ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      Click to upload images
                    </p>
                    <p className={`text-xs ${
                      effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                    }`}>
                      PNG, JPG, JPEG up to 10MB each
                    </p>
                  </label>
                  {formData.images.length > 0 && (
                    <p className={`mt-2 text-sm ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      {formData.images.length} image(s) selected
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h3 className={`text-lg font-semibold mb-4 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  Property Videos
                </h3>
                <div className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 ${
                  effectiveTheme === "dark" ? "border-gray-600 bg-gray-700" : effectiveTheme === "ocean" ? "border-blue-300 bg-blue-50" : "border-gray-300 bg-gray-50"
                }`}>
                  <input
                    type="file"
                    multiple
                    accept="video/mp4,video/mov,video/avi"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="cursor-pointer"
                  >
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className={`mt-2 text-sm ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      Click to upload videos
                    </p>
                    <p className={`text-xs ${
                      effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                    }`}>
                      MP4, MOV, AVI up to 500MB each
                    </p>
                  </label>
                  {formData.videos.length > 0 && (
                    <p className={`mt-2 text-sm ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      {formData.videos.length} video(s) selected
                    </p>
                  )}
                </div>
                <Input
                  label="Reboot Tour URL/Videos"
                  placeholder="Enter virtual tour URL"
                  value={formData.rebootTourURL}
                  onChange={(e) => handleInputChange("rebootTourURL", e.target.value)}
                />
              </div>

              <div>
                <h3 className={`text-lg font-semibold mb-4 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  Property Features
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[
                    "Balcony",
                    "Garden",
                    "Swimming pool",
                    "Gym / Fitness Center",
                    "Parking",
                    "Security",
                    "Elevator",
                    "Air conditioning",
                    "Central heating",
                    "WiFi included",
                    "Near Shopping",
                    "Near School",
                    "Near Hospital",
                    "Near Airport",
                  ].map((feature) => (
                    <label
                      key={feature}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                        formData.features.includes(feature)
                          ? "bg-[#FF7700] text-white border-[#FF7700]"
                          : effectiveTheme === "dark"
                          ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                          : effectiveTheme === "ocean"
                          ? "bg-blue-50 border-blue-300 text-blue-900 hover:bg-blue-200"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                        className="mr-2"
                      />
                      <span className="text-sm">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Contact & Publish */}
          {currentStep === "contact" && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      label="Available from"
                      type="date"
                      value={formData.availableFrom}
                      onChange={(e) => handleInputChange("availableFrom", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                    }`}>
                      Minimum stay (nights)
                    </label>
                    <select
                      value={formData.minimumStay}
                      onChange={(e) => handleInputChange("minimumStay", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                        effectiveTheme === "dark"
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : effectiveTheme === "ocean"
                          ? "bg-blue-50 border-blue-300 text-blue-900"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      <option value="">Select minimum stay</option>
                      <option value="1">1 night</option>
                      <option value="7">7 nights</option>
                      <option value="30">30 nights</option>
                      <option value="90">90 nights</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.propertyToRentSale}
                      onChange={(e) => handleInputChange("propertyToRentSale", e.target.checked)}
                      className="mr-2"
                    />
                    <span className={effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"}>
                      Property to Rent/Sale
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className={`text-lg font-semibold mb-4 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      label="Contact Name"
                      placeholder="Enter contact name"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange("contactName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.emailAddress}
                      onChange={(e) => handleInputChange("emailAddress", e.target.value)}
                    />
                  </div>
                  <div>
                    <Input
                      label="Website"
                      type="url"
                      placeholder="Enter website URL"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg bg-green-100 border border-green-300 ${
                effectiveTheme === "dark" ? "bg-green-900 border-green-700" : ""
              }`}>
                <p className={`text-sm font-medium ${
                  effectiveTheme === "dark" ? "text-green-300" : "text-green-800"
                }`}>
                  ✓ Your property is ready to be published. You can save it as a draft or publish it immediately.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-end mt-8 pt-6 border-t border-gray-200">
            {currentStep === "contact" ? (
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleSaveDraft}>
                  Save as Draft
                </Button>
                <Button variant="primary" onClick={handlePublish}>
                  Publish Property
                </Button>
              </div>
            ) : (
              <Button variant="primary" onClick={handleNext} className="flex items-center gap-2">
                Next: {steps[currentStepIndex + 1].label}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            )}
          </div>
        </div>
      </div>
    </ManagerDashboardLayout>
  );
}

