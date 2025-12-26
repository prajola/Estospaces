"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components";
import { Button, Input } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import {
  BoilerIcon,
  WashingMachineIcon,
  CleaningIcon,
  PlumbingIcon,
  PaintingIcon,
  MoversIcon,
  GardenIcon,
} from "@/components/DashboardIcons";
import {
  getUserServiceRequests,
  createServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,
  mapStatusForUser,
  getUnreadNotificationCount,
  type ServiceRequest,
  type UrgencyLevel,
} from "@/lib/serviceRequests";

// AI-Generated Images Configuration
// Replace these image URLs with your AI-generated images of professionals wearing Estospaces T-shirts
// Recommended AI Tools: DALL-E, Midjourney, Stable Diffusion, Leonardo.ai, or similar
// 
// AI Prompt Template for each service:
// "Professional [service worker type] wearing bright orange Estospaces branded T-shirt with logo,
// [service-specific action], high quality professional photography, natural lighting, 
// friendly professional appearance, modern work environment, 4K, detailed"

const availableServices = [
  {
    id: "boiler-repair",
    name: "Boiler Repair",
    icon: BoilerIcon,
    description: "Professional boiler repair and maintenance services",
    category: "Heating & Cooling",
    // AI Prompt: "Professional heating technician wearing bright orange Estospaces branded T-shirt fixing boiler system, high quality professional photography"
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "washing-machine-repair",
    name: "Washing Machine Repair",
    icon: WashingMachineIcon,
    description: "Expert washing machine repair and servicing",
    category: "Appliances",
    // AI Prompt: "Professional appliance repair technician wearing bright orange Estospaces branded T-shirt fixing washing machine, high quality professional photography"
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "house-cleaning",
    name: "House Cleaning",
    icon: CleaningIcon,
    description: "Professional house cleaning services",
    category: "Cleaning",
    // AI Prompt: "Professional cleaner wearing bright orange Estospaces branded T-shirt cleaning modern house interior, high quality professional photography"
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: PlumbingIcon,
    description: "Plumbing repairs and installations",
    category: "Repairs",
    // AI Prompt: "Professional plumber wearing bright orange Estospaces branded T-shirt doing plumbing work under sink, high quality professional photography"
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "house-painting",
    name: "House Painting",
    icon: PaintingIcon,
    description: "Interior and exterior house painting",
    category: "Renovation",
    // AI Prompt: "Professional painter wearing bright orange Estospaces branded T-shirt painting house interior wall, high quality professional photography"
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "pickup-movers",
    name: "Pick Pack & Movers",
    icon: MoversIcon,
    description: "Moving and relocation services",
    category: "Moving",
    // AI Prompt: "Professional mover wearing bright orange Estospaces branded T-shirt carrying furniture from home and putting it in moving truck, high quality professional photography"
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "garden-cleaning",
    name: "Garden Cleaning",
    icon: GardenIcon,
    description: "Garden maintenance and cleaning services",
    category: "Outdoor",
    // AI Prompt: "Professional gardener wearing bright orange Estospaces branded T-shirt maintaining garden with tools, high quality professional photography"
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&q=80",
  },
];

export default function ServicesPage() {
  const router = useRouter();
  const { effectiveTheme } = useTheme();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "scheduled" | "in-progress" | "completed">("all");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    service: "",
    description: "",
    location: "",
    preferredDate: "",
    preferredTime: "",
    urgency: "Medium" as "Low" | "Medium" | "High" | "Emergency",
  });

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/user/login");
      return;
    }
    setUserEmail(email);

    // Load service requests from shared storage
    const requests = getUserServiceRequests(email);
    setServiceRequests(requests);

    // Check for notifications
    const unreadCount = getUnreadNotificationCount(email);
    if (unreadCount > 0) {
      // You can show a notification badge or toast here
      console.log(`You have ${unreadCount} unread notifications`);
    }

    // Set up interval to check for updates
    const interval = setInterval(() => {
      const updatedRequests = getUserServiceRequests(email);
      setServiceRequests(updatedRequests);
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [router]);

  // Prevent body scroll when modal is open and reset scroll position
  useEffect(() => {
    if (showRequestModal) {
      document.body.style.overflow = 'hidden';
      // Reset scroll position when modal opens - wait for DOM update
      setTimeout(() => {
        const modalContent = document.querySelector('[data-modal-content]') as HTMLElement;
        if (modalContent) {
          modalContent.scrollTop = 0;
        }
      }, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showRequestModal]);

  const handleServiceSelect = (serviceId: string) => {
    const service = availableServices.find((s) => s.id === serviceId);
    setSelectedService(serviceId);
    setFormData((prev) => ({
      ...prev,
      service: service?.name || "",
    }));
    setShowRequestModal(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!isImage && !isVideo) {
        alert(`${file.name} is not a valid image or video file.`);
        return false;
      }
      
      if (file.size > maxSize) {
        alert(`${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      
      return true;
    });

    if (validFiles.length === 0) return;

    const newFiles = [...uploadedFiles, ...validFiles];
    setUploadedFiles(newFiles);
    
    // Create preview URLs for images and videos
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input to allow selecting the same file again
    e.target.value = '';
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    setPreviewUrls(newUrls);
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userEmail) return;

    const selectedServiceObj = availableServices.find(s => s.id === selectedService);
    
    // Separate images and videos
    const imageUrls: string[] = [];
    const videoUrls: string[] = [];
    
    previewUrls.forEach((url, index) => {
      const file = uploadedFiles[index];
      if (file?.type.startsWith('video/')) {
        videoUrls.push(url);
      } else {
        imageUrls.push(url);
      }
    });
    
    const newRequest = createServiceRequest(userEmail, {
      service: formData.service,
      serviceId: selectedService || "",
      description: formData.description,
      location: formData.location,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      urgency: formData.urgency as UrgencyLevel,
      photos: imageUrls.length > 0 ? imageUrls : undefined,
      videos: videoUrls.length > 0 ? videoUrls : undefined,
    });

    // Reload requests to get updated list
    const updatedRequests = getUserServiceRequests(userEmail);
    setServiceRequests(updatedRequests);

    // Reset form
    setFormData({
      service: "",
      description: "",
      location: "",
      preferredDate: "",
      preferredTime: "",
      urgency: "Medium",
    });
    setUploadedFiles([]);
    setPreviewUrls([]);
    setShowRequestModal(false);
    setSelectedService("");

    // Show success message
    alert("Service request submitted! A manager will review it shortly.");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-pink-100 text-pink-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Emergency":
        return "bg-red-100 text-red-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRequests = serviceRequests
    .map(request => ({
      ...request,
      status: mapStatusForUser(request.status) as ServiceRequest["status"],
    }))
    .filter((request) => {
      if (filter === "all") return true;
      if (filter === "pending") return request.status === "Pending";
      if (filter === "scheduled") return request.status === "Scheduled";
      if (filter === "in-progress") return request.status === "In Progress";
      if (filter === "completed") return request.status === "Completed";
      return true;
    });

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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Property Services
            </h1>
            <p className="text-gray-600 text-sm">
              Request and manage maintenance services for your property
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowRequestModal(true)}
          >
            + Request New Service
          </Button>
        </div>
      </div>

      {/* Available Services Grid */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {availableServices.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceSelect(service.id)}
              className={`rounded-lg shadow-md overflow-hidden border transition-all cursor-pointer ${
                effectiveTheme === "dark"
                  ? "bg-gray-800 border-gray-700 hover:border-[#FF7700]"
                  : effectiveTheme === "ocean"
                  ? "bg-blue-100 border-blue-200 hover:border-[#FF7700]"
                  : "bg-white border-gray-200 hover:border-[#FF7700]"
              } hover:shadow-lg`}
            >
              {/* Service Image */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                <img
                  src={service.image}
                  alt={`${service.name} - Estospaces professional service`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to a placeholder with Estospaces branding
                    e.currentTarget.src = `https://via.placeholder.com/800x600/FF7700/FFFFFF?text=Estospaces+${encodeURIComponent(service.name)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-white">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      {service.name}
                    </h3>
                  </div>
                </div>
              </div>
              
              {/* Service Details */}
              <div className="p-4">
                <p className={`text-sm mb-2 ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>{service.description}</p>
                <span className={`text-xs ${
                  effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                }`}>{service.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Service Requests */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">My Service Requests</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-[#FF7700] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "pending"
                  ? "bg-[#FF7700] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("scheduled")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "scheduled"
                  ? "bg-[#FF7700] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Scheduled
            </button>
            <button
              onClick={() => setFilter("in-progress")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "in-progress"
                  ? "bg-[#FF7700] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "completed"
                  ? "bg-[#FF7700] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-sm mb-4">No service requests found</p>
            <Button variant="primary" onClick={() => setShowRequestModal(true)}>
              Request Your First Service
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#FF7700] hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(
                          request.urgency
                        )}`}
                      >
                        {request.urgency} Priority
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      {request.service}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                    <p className="text-sm text-gray-600 mb-3">
                      📍 {request.location}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>📅 Preferred: {request.preferredDate}</span>
                      <span>🕐 {request.preferredTime}</span>
                    </div>
                    {request.scheduledDate && (
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Scheduled:</span>{" "}
                        {request.scheduledDate} at {request.scheduledTime}
                      </div>
                    )}
                    {request.assignedVendor && (
                      <div className="mt-3 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm">👤</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Assigned Vendor: {request.assignedVendor}
                          </p>
                        </div>
                      </div>
                    )}
                    {request.cost && (
                      <div className="mt-3">
                        <span className="text-sm font-medium text-gray-900">
                          Estimated Cost: {request.cost}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    {request.status === "Pending" && (
                      <Button
                        variant="outline"
                        className="text-sm"
                        onClick={() => {
                          if (deleteServiceRequest(request.id)) {
                            const updatedRequests = getUserServiceRequests(userEmail!);
                            setServiceRequests(updatedRequests);
                            alert("Service request cancelled");
                          }
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Request Service Modal */}
      {showRequestModal && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowRequestModal(false);
              setSelectedService("");
              setFormData({
                service: "",
                description: "",
                location: "",
                preferredDate: "",
                preferredTime: "",
                urgency: "Medium",
              });
              setUploadedFiles([]);
              setPreviewUrls([]);
            }
          }}
        >
          <div 
            data-modal-content
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed Header */}
            <div className="flex-shrink-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Request New Service
              </h2>
              <button
                onClick={() => {
                  setShowRequestModal(false);
                  setSelectedService("");
                  setFormData({
                    service: "",
                    description: "",
                    location: "",
                    preferredDate: "",
                    preferredTime: "",
                    urgency: "Medium",
                  });
                  setUploadedFiles([]);
                  setPreviewUrls([]);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto">
              <form onSubmit={handleSubmitRequest} className="p-6 space-y-4">
              {/* Service Selection */}
              {!selectedService && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Service
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {availableServices.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => {
                          setSelectedService(service.id);
                          setFormData((prev) => ({
                            ...prev,
                            service: service.name,
                          }));
                        }}
                        className={`p-0 border-2 rounded-lg hover:border-[#FF7700] transition-all text-left overflow-hidden ${
                          effectiveTheme === "dark"
                            ? "border-gray-700 hover:bg-gray-700"
                            : effectiveTheme === "ocean"
                            ? "border-blue-200 hover:bg-blue-200"
                            : "border-gray-200 hover:bg-orange-50"
                        }`}
                      >
                        <div className="relative h-32 w-full overflow-hidden bg-gray-200">
                          <img
                            src={service.image}
                            alt={`${service.name} - Estospaces professional service with branded T-shirt`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback to a placeholder with Estospaces branding
                              // Replace with AI-generated image URL when available
                              e.currentTarget.src = `https://via.placeholder.com/400x200/FF7700/FFFFFF?text=AI+Generated+${encodeURIComponent(service.name)}+with+Estospaces+T-Shirt`;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                          <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                            <div className="text-white">
                              <service.icon className="w-4 h-4" />
                            </div>
                            <div className="text-white font-medium text-sm">
                              {service.name}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedService && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service
                    </label>
                    <Input
                      type="text"
                      value={formData.service}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Describe the issue or service needed..."
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7700] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location/Address
                    </label>
                    <Input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="Enter property address or location"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date
                      </label>
                      <Input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            preferredDate: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time
                      </label>
                      <Input
                        type="time"
                        value={formData.preferredTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            preferredTime: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(["Low", "Medium", "High", "Emergency"] as const).map(
                        (level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, urgency: level })
                            }
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              formData.urgency === level
                                ? getUrgencyColor(level) + " border-2 border-[#FF7700]"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {level}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* File Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Images or Videos (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#FF7700] transition-colors">
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <svg
                          className="w-12 h-12 text-gray-400 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">
                          Click to upload or drag and drop
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          Images or Videos (max 10MB each)
                        </span>
                      </label>
                    </div>

                    {/* Preview Uploaded Files */}
                    {previewUrls.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">
                          {previewUrls.length} file{previewUrls.length > 1 ? 's' : ''} uploaded
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {previewUrls.map((url, index) => {
                            const file = uploadedFiles[index];
                            const isVideo = file?.type.startsWith('video/');
                            
                            return (
                              <div key={index} className="relative group">
                                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200">
                                  {isVideo ? (
                                    <video
                                      src={url}
                                      className="w-full h-full object-cover"
                                      controls
                                    />
                                  ) : (
                                    <img
                                      src={url}
                                      alt={`Preview ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                  <div className="absolute top-2 right-2">
                                    {isVideo && (
                                      <span className="bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M8 5v14l11-7z"/>
                                        </svg>
                                        Video
                                      </span>
                                    )}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveFile(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </button>
                                </div>
                                <p className="mt-1 text-xs text-gray-500 truncate" title={file?.name}>
                                  {file?.name}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setShowRequestModal(false);
                        setSelectedService("");
                        setFormData({
                          service: "",
                          description: "",
                          location: "",
                          preferredDate: "",
                          preferredTime: "",
                          urgency: "Medium",
                        });
                        setUploadedFiles([]);
                        setPreviewUrls([]);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" className="flex-1">
                      Submit Request
                    </Button>
                  </div>
                </>
              )}
              </form>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
