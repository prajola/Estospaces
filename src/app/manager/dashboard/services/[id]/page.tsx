"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ManagerDashboardLayout, Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import {
  getManagerServiceRequests,
  updateServiceRequest,
  type ServiceRequest,
  type ServiceStatus,
} from "@/lib/serviceRequests";

// Legacy sample data for fallback
const sampleRequests: Record<string, any> = {
  "SR-001": {
    id: "SR-001",
    serviceType: "Boiler Repair",
    propertyName: "Downtown Luxury Apartment",
    userEmail: "Sarah Johnson",
    status: "Assigned",
    preferredDate: "2024-01-20",
    assignedVendor: "ABC Plumbing Co.",
    urgency: "High",
    requestedDate: "2024-01-15T10:30:00",
    description: "Boiler not heating properly, needs urgent repair. The heating system stopped working yesterday evening. Water temperature is cold and radiators are not warming up.",
    location: "123 Main St. Downtown, City, State 12345",
    photos: [
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400",
    ],
    vendorNotes: "Vendor accepted the assignment. Will arrive on Jan 20, 2024 at 9:00 AM.",
  },
  "SR-002": {
    id: "SR-002",
    serviceType: "House Cleaning",
    propertyName: "Family Home with Garden",
    userEmail: "Michel Chen",
    status: "In Progress",
    preferredDate: "2024-01-18",
    assignedVendor: "CleanPro Services",
    urgency: "Medium",
    requestedDate: "2024-01-12T14:20:00",
    description: "Deep cleaning required before move-in. All rooms need thorough cleaning including kitchen, bathrooms, and living areas.",
    location: "456 Oak Avenue, City, State 12345",
    photos: [],
    vendorNotes: "Cleaning in progress. Estimated completion: 2 hours.",
    managerNotes: "Tenant requested premium cleaning package.",
  },
  "SR-003": {
    id: "SR-003",
    serviceType: "Plumbing",
    propertyName: "Modern Studio Loft",
    userEmail: "Emily Rodriguez",
    status: "Requested",
    preferredDate: "2024-01-22",
    urgency: "High",
    requestedDate: "2024-01-16T08:15:00",
    description: "Leaky faucet in kitchen, water damage concern. Water is dripping continuously and has caused some water damage to the cabinet below.",
    location: "789 Park Boulevard, City, State 12345",
    photos: [
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400",
    ],
  },
  "SR-004": {
    id: "SR-004",
    serviceType: "Garden Cleaning",
    propertyName: "Suburban Townhouse",
    userEmail: "David Wilson",
    status: "Completed",
    preferredDate: "2024-01-10",
    assignedVendor: "GreenThumb Landscaping",
    urgency: "Low",
    requestedDate: "2024-01-05T11:00:00",
    description: "Regular garden maintenance and trimming. Need to trim hedges, mow lawn, and clean up fallen leaves.",
    location: "321 Elm Street, City, State 12345",
    photos: [],
    vendorNotes: "All work completed successfully. Garden is now clean and well-maintained.",
    managerNotes: "Tenant was very satisfied with the service.",
    completionDate: "2024-01-10T16:30:00",
    workSummary: "Completed garden maintenance including hedge trimming, lawn mowing, and leaf cleanup. All areas are now clean and well-maintained.",
  },
};

const timelineEvents = [
  { status: "Requested", date: "2024-01-15T10:30:00", description: "Service request created" },
  { status: "Assigned", date: "2024-01-16T09:00:00", description: "Vendor assigned: ABC Plumbing Co." },
  { status: "In Progress", date: "2024-01-20T09:00:00", description: "Vendor started work" },
];

export default function ServiceRequestDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { effectiveTheme } = useTheme();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [managerNote, setManagerNote] = useState("");
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const userType = localStorage.getItem("userType");
    
    if (!email || userType !== "manager") {
      router.push("/manager/login");
      return;
    }
    setUserEmail(email);
    
    const requestId = params.id as string;
    // Try to get from shared storage first
    const allRequests = getManagerServiceRequests();
    const foundRequest = allRequests.find(r => r.id === requestId) || sampleRequests[requestId];
    
    if (foundRequest) {
      setRequest(foundRequest as ServiceRequest);
      setManagerNote(foundRequest.managerNotes || "");
    }
  }, [router, params]);

  if (!userEmail || !request) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const vendors = [
    { id: "1", name: "ABC Plumbing Co.", serviceTypes: ["Boiler Repair", "Plumbing"], availability: "Available", rating: 4.8 },
    { id: "2", name: "CleanPro Services", serviceTypes: ["House Cleaning"], availability: "Available", rating: 4.9 },
    { id: "3", name: "GreenThumb Landscaping", serviceTypes: ["Garden Cleaning"], availability: "Available", rating: 4.7 },
    { id: "4", name: "FixIt All Repairs", serviceTypes: ["Boiler Repair", "Plumbing", "House Painting"], availability: "Busy", rating: 4.6 },
  ];

  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case "Requested":
        return "bg-blue-100 text-blue-800";
      case "Assigned":
        return "bg-purple-100 text-purple-800";
      case "In Progress":
        return "bg-orange-100 text-orange-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Emergency":
        return "bg-red-200 text-red-900";
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSaveNote = () => {
    if (!request) return;
    updateServiceRequest(request.id, {
      managerNotes: managerNote,
    });
    alert("Manager note saved");
  };

  const handleApproveCompletion = () => {
    if (!request) return;
    updateServiceRequest(request.id, {
      status: "Completed",
      completionDate: new Date().toISOString(),
    });
    alert("Service completion approved. User will be notified.");
    // Reload the request
    const allRequests = getManagerServiceRequests();
    const updated = allRequests.find(r => r.id === request.id);
    if (updated) {
      setRequest(updated);
    }
  };

  const handleAssignVendor = () => {
    setShowVendorModal(true);
  };

  const handleConfirmAssignment = () => {
    if (selectedVendor && request) {
      const vendor = vendors.find(v => v.id === selectedVendor);
      if (vendor) {
        updateServiceRequest(request.id, {
          status: "Assigned",
          assignedVendor: vendor.name,
          assignedVendorId: vendor.id,
        });
        
        // Reload the request
        const allRequests = getManagerServiceRequests();
        const updated = allRequests.find(r => r.id === request.id);
        if (updated) {
          setRequest(updated);
        }
        
        alert(`Vendor ${vendor.name} assigned successfully. User will be notified.`);
        setShowVendorModal(false);
        setSelectedVendor("");
      }
    }
  };

  return (
    <ManagerDashboardLayout userEmail={userEmail}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/manager/dashboard/services")}
              className={`p-2 rounded-lg ${
                effectiveTheme === "dark" ? "text-gray-300 hover:bg-gray-700" : effectiveTheme === "ocean" ? "text-blue-700 hover:bg-blue-200" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className={`text-2xl font-bold ${
                effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
              }`}>
                Service Request: {request.id}
              </h1>
              <p className={`text-sm mt-1 ${
                effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
              }`}>
                {request.service} - {request.propertyName}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            {request.status === "Requested" && (
              <Button variant="primary" onClick={handleAssignVendor}>
                Assign Vendor
              </Button>
            )}
            {request.status === "Completed" && (
              <Button variant="primary" onClick={handleApproveCompletion}>
                Approve Completion
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status and Urgency */}
            <div className={`rounded-lg shadow-md p-6 ${
              effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                  }`}>
                    Service Details
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(request.urgency)}`}>
                      {request.urgency} Priority
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className={`text-sm font-medium mb-1 ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                  }`}>Service Category</p>
                  <p className={`${
                    effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                  }`}>{request.service}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium mb-1 ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                  }`}>Issue Description</p>
                  <p className={`${
                    effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                  }`}>{request.description}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium mb-1 ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                  }`}>Requested Date/Time</p>
                  <p className={`${
                    effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                  }`}>
                    {new Date(request.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className={`text-sm font-medium mb-1 ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                  }`}>Preferred Date</p>
                  <p className={`${
                    effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                  }`}>{request.preferredDate}</p>
                </div>
                {request.assignedVendor && (
                  <div>
                    <p className={`text-sm font-medium mb-1 ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>Assigned Vendor</p>
                    <p className={`${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>{request.assignedVendor}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Photos */}
            {request.photos && request.photos.length > 0 && (
              <div className={`rounded-lg shadow-md p-6 ${
                effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  Uploaded Photos
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {request.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Service photo ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Property Address & Map */}
            <div className={`rounded-lg shadow-md p-6 ${
              effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
              }`}>
                Property Location
              </h3>
              <p className={`mb-4 ${
                effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
              }`}>{request.location || request.location}</p>
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className={`text-sm ${
                  effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                }`}>Map View (Mini Map)</p>
              </div>
            </div>

            {/* Vendor Notes */}
            {request.vendorNotes && (
              <div className={`rounded-lg shadow-md p-6 ${
                effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  Vendor Notes
                </h3>
                <p className={`${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>{request.vendorNotes}</p>
              </div>
            )}

            {/* Work Summary (for completed services) */}
            {request.workSummary && (
              <div className={`rounded-lg shadow-md p-6 ${
                effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  Work Summary
                </h3>
                <p className={`mb-4 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>{request.workSummary}</p>
                {request.completionDate && (
                  <p className={`text-sm ${
                    effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                  }`}>
                    Completed: {new Date(request.completionDate).toLocaleString()}
                  </p>
                )}
                {request.invoiceUrl && (
                  <div className="mt-4">
                    <a
                      href={request.invoiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF7700] hover:underline"
                    >
                      View Invoice →
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Request Info */}
            <div className={`rounded-lg shadow-md p-6 ${
              effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
              }`}>
                Request Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className={`text-sm font-medium mb-1 ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                  }`}>Requested By</p>
                  <p className={`${
                    effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                  }`}>{request.userEmail || request.userEmail}</p>
                </div>
                <div>
                  <p className={`text-sm font-medium mb-1 ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                  }`}>Property</p>
                  <p className={`${
                    effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                  }`}>{request.propertyName || request.location}</p>
                </div>
              </div>
            </div>

            {/* Service Timeline */}
            <div className={`rounded-lg shadow-md p-6 ${
              effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
              }`}>
                Service Timeline
              </h3>
              <div className="space-y-4">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        index === timelineEvents.length - 1 ? "bg-[#FF7700]" : "bg-gray-300"
                      }`}></div>
                      {index < timelineEvents.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-300"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className={`font-medium ${
                        effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                      }`}>{event.status}</p>
                      <p className={`text-sm ${
                        effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                      }`}>{event.description}</p>
                      <p className={`text-xs mt-1 ${
                        effectiveTheme === "dark" ? "text-gray-500" : effectiveTheme === "ocean" ? "text-blue-500" : "text-gray-400"
                      }`}>
                        {new Date(event.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Manager Notes */}
            <div className={`rounded-lg shadow-md p-6 ${
              effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
              }`}>
                Manager Notes
              </h3>
              <textarea
                value={managerNote}
                onChange={(e) => setManagerNote(e.target.value)}
                placeholder="Add internal notes..."
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] mb-3 ${
                  effectiveTheme === "dark"
                    ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    : effectiveTheme === "ocean"
                    ? "bg-blue-50 border-blue-300 text-blue-900 placeholder-blue-600"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
              <Button variant="primary" onClick={handleSaveNote}>
                Save Note
              </Button>
            </div>
          </div>
        </div>

        {/* Vendor Assignment Modal */}
        {showVendorModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowVendorModal(false)}>
            <div
              className={`rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4 ${
                effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  Assign Vendor - {request.service}
                </h3>
                <button
                  onClick={() => setShowVendorModal(false)}
                  className={`${
                    effectiveTheme === "dark" ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {vendors
                            .filter(v => v.serviceTypes.includes(request.service))
                  .map((vendor) => (
                    <div
                      key={vendor.id}
                      onClick={() => setSelectedVendor(vendor.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedVendor === vendor.id
                          ? "border-[#FF7700] bg-orange-50"
                          : effectiveTheme === "dark"
                          ? "border-gray-600 bg-gray-700 hover:border-gray-500"
                          : effectiveTheme === "ocean"
                          ? "border-blue-300 bg-blue-50 hover:border-blue-400"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-semibold ${
                            effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                          }`}>{vendor.name}</p>
                          <p className={`text-sm ${
                            effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                          }`}>
                            Services: {vendor.serviceTypes.join(", ")}
                          </p>
                          <p className={`text-sm ${
                            effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                          }`}>
                            Availability: {vendor.availability} | Rating: {vendor.rating} ⭐
                          </p>
                        </div>
                        {selectedVendor === vendor.id && (
                          <svg className="w-6 h-6 text-[#FF7700]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowVendorModal(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleConfirmAssignment}
                  disabled={!selectedVendor}
                >
                  Assign Vendor
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ManagerDashboardLayout>
  );
}

