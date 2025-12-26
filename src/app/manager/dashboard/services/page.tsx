"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ManagerDashboardLayout, Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import {
  getManagerServiceRequests,
  updateServiceRequest,
  getUnreadNotificationCount,
  type ServiceRequest,
  type ServiceStatus,
} from "@/lib/serviceRequests";

// Legacy sample data for fallback - will be replaced by real data from storage
const sampleServiceRequests: any[] = [
  {
    id: "SR-001",
    service: "Boiler Repair",
    propertyName: "Downtown Luxury Apartment",
    requestedBy: "Sarah Johnson",
    status: "Assigned",
    preferredDate: "2024-01-20",
    assignedVendor: "ABC Plumbing Co.",
    urgency: "High",
    requestedDate: "2024-01-15",
    description: "Boiler not heating properly, needs urgent repair",
    propertyAddress: "123 Main St. Downtown",
  },
  {
    id: "SR-002",
    service: "House Cleaning",
    propertyName: "Family Home with Garden",
    requestedBy: "Michel Chen",
    status: "In Progress",
    preferredDate: "2024-01-18",
    assignedVendor: "CleanPro Services",
    urgency: "Medium",
    requestedDate: "2024-01-12",
    description: "Deep cleaning required before move-in",
    propertyAddress: "456 Oak Avenue",
  },
  {
    id: "SR-003",
    service: "Plumbing",
    propertyName: "Modern Studio Loft",
    requestedBy: "Emily Rodriguez",
    status: "Requested",
    preferredDate: "2024-01-22",
    urgency: "High",
    requestedDate: "2024-01-16",
    description: "Leaky faucet in kitchen, water damage concern",
    propertyAddress: "789 Park Boulevard",
  },
  {
    id: "SR-004",
    service: "Garden Cleaning",
    propertyName: "Suburban Townhouse",
    requestedBy: "David Wilson",
    status: "Completed",
    preferredDate: "2024-01-10",
    assignedVendor: "GreenThumb Landscaping",
    urgency: "Low",
    requestedDate: "2024-01-05",
    description: "Regular garden maintenance and trimming",
    propertyAddress: "321 Elm Street",
  },
];

const vendors = [
  { id: "1", name: "ABC Plumbing Co.", services: ["Boiler Repair", "Plumbing"], availability: "Available", rating: 4.8 },
  { id: "2", name: "CleanPro Services", services: ["House Cleaning"], availability: "Available", rating: 4.9 },
  { id: "3", name: "GreenThumb Landscaping", services: ["Garden Cleaning"], availability: "Available", rating: 4.7 },
  { id: "4", name: "FixIt All Repairs", services: ["Boiler Repair", "Plumbing", "House Painting"], availability: "Busy", rating: 4.6 },
];

export default function ManagerServicesPage() {
  const router = useRouter();
  const { effectiveTheme } = useTheme();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterServiceType, setFilterServiceType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterProperty, setFilterProperty] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<string>("");
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const userType = localStorage.getItem("userType");
    
    if (!email || userType !== "manager") {
      router.push("/manager/login");
      return;
    }
    setUserEmail(email);

    // Load service requests from shared storage
    const requests = getManagerServiceRequests();
    setServiceRequests(requests);

    // Check for notifications
    const unreadCount = getUnreadNotificationCount("manager");
    if (unreadCount > 0) {
      console.log(`You have ${unreadCount} unread notifications`);
    }

    // Set up interval to check for updates
    const interval = setInterval(() => {
      const updatedRequests = getManagerServiceRequests();
      setServiceRequests(updatedRequests);
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [router]);

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const filteredRequests = serviceRequests.filter((request) => {
    const matchesSearch = request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (request.propertyName || request.location).toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesServiceType = filterServiceType === "All" || request.service === filterServiceType;
    const matchesStatus = filterStatus === "All" || request.status === filterStatus;
    const matchesProperty = filterProperty === "All" || (request.propertyName || request.location) === filterProperty;
    return matchesSearch && matchesServiceType && matchesStatus && matchesProperty;
  });

  const uniqueServiceTypes = Array.from(new Set(serviceRequests.map(r => r.service)));
  const uniqueProperties = Array.from(new Set(serviceRequests.map(r => r.propertyName || r.location).filter(Boolean)));
  const statusOptions = ["All", "Requested", "Assigned", "In Progress", "Completed", "Assigned", "Declined"];

  const handleAssignVendor = (requestId: string) => {
    const request = serviceRequests.find(r => r.id === requestId);
    if (request) {
      setSelectedRequest(request);
      setShowVendorModal(true);
    }
  };

  const handleConfirmAssignment = () => {
    if (selectedRequest && selectedVendor) {
      const vendor = vendors.find(v => v.id === selectedVendor);
      if (vendor) {
        updateServiceRequest(selectedRequest.id, {
          status: "Assigned",
          assignedVendor: vendor.name,
          assignedVendorId: vendor.id,
        });
        
        // Reload requests
        const updatedRequests = getManagerServiceRequests();
        setServiceRequests(updatedRequests);
        
        alert(`Vendor ${vendor.name} assigned to ${selectedRequest.id}`);
        setShowVendorModal(false);
        setSelectedVendor("");
        setSelectedRequest(null);
      }
    }
  };

  const handleDeclineRequest = () => {
    if (selectedRequest && declineReason.trim()) {
      updateServiceRequest(selectedRequest.id, {
        status: "Declined",
        declinedReason: declineReason,
      });
      
      // Reload requests
      const updatedRequests = getManagerServiceRequests();
      setServiceRequests(updatedRequests);
      
      alert("Service request declined. User will be notified.");
      setShowDeclineModal(false);
      setDeclineReason("");
      setSelectedRequest(null);
    }
  };

  const handleAcceptRequest = (requestId: string) => {
    // Accepting means we're ready to assign a vendor
    updateServiceRequest(requestId, {
      status: "Requested", // Keep as requested until vendor assigned
    });
    
    const updatedRequests = getManagerServiceRequests();
    setServiceRequests(updatedRequests);
    
    alert("Service request accepted. Please assign a vendor.");
  };

  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case "Requested":
        return "bg-blue-100 text-blue-800";
      case "Assigned":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-orange-100 text-orange-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Assigned":
        return "bg-purple-100 text-purple-800";
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

  return (
    <ManagerDashboardLayout userEmail={userEmail}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className={`text-2xl font-bold ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              Services
            </h1>
            <p className={`text-sm mt-1 ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>
              Manage service requests and vendor assignments
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-blue-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              {serviceRequests.filter(r => r.status === "Requested").length}
            </p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>New Requests</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-yellow-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              {serviceRequests.filter(r => r.status === "Assigned" || r.status === "In Progress").length}
            </p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Active Services</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-green-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              {serviceRequests.filter(r => r.status === "Completed").length}
            </p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Completed</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-[#FF7700] ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#FF7700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              {serviceRequests.length}
            </p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Total Requests</p>
          </div>
        </div>

        {/* Filters */}
        <div className={`rounded-lg shadow-md p-4 mb-6 ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
        }`}>
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                  effectiveTheme === "dark"
                    ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    : effectiveTheme === "ocean"
                    ? "bg-blue-50 border-blue-300 text-blue-900 placeholder-blue-600"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
            <select
              value={filterServiceType}
              onChange={(e) => setFilterServiceType(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                effectiveTheme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100"
                  : effectiveTheme === "ocean"
                  ? "bg-blue-50 border-blue-300 text-blue-900"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option>All</option>
              {uniqueServiceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                effectiveTheme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100"
                  : effectiveTheme === "ocean"
                  ? "bg-blue-50 border-blue-300 text-blue-900"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <select
              value={filterProperty}
              onChange={(e) => setFilterProperty(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                effectiveTheme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100"
                  : effectiveTheme === "ocean"
                  ? "bg-blue-50 border-blue-300 text-blue-900"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option>All</option>
              {uniqueProperties.map(property => (
                <option key={property} value={property}>{property}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Service Requests Table */}
        <div className={`rounded-lg shadow-md overflow-hidden ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${
                effectiveTheme === "dark" ? "bg-gray-700" : effectiveTheme === "ocean" ? "bg-blue-200" : "bg-gray-50"
              }`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Service Type</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Property Name</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Requested By</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Status</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Preferred Date</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Assigned Vendor</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                  }`}>Action</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                effectiveTheme === "dark" ? "divide-gray-700" : effectiveTheme === "ocean" ? "divide-blue-200" : "divide-gray-200"
              }`}>
                {filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    onClick={() => router.push(`/manager/dashboard/services/${request.id}`)}
                    className={`cursor-pointer hover:${
                      effectiveTheme === "dark" ? "bg-gray-700" : effectiveTheme === "ocean" ? "bg-blue-50" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency}
                        </span>
                        <span className={`${
                          effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                        }`}>{request.service}</span>
                      </div>
                    </td>
                    <td className={`px-6 py-4 ${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>{request.propertyName || request.location}</td>
                    <td className={`px-6 py-4 ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>{request.userEmail}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>{request.preferredDate}</td>
                    <td className={`px-6 py-4 ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      {request.assignedVendor || "-"}
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-2">
                        {request.status === "Requested" && (
                          <>
                            <Button
                              variant="primary"
                              className="text-xs px-3 py-1"
                              onClick={() => handleAssignVendor(request.id)}
                            >
                              Assign Vendor
                            </Button>
                            <Button
                              variant="outline"
                              className="text-xs px-3 py-1"
                              onClick={() => {
                                setSelectedRequest(request);
                                setShowDeclineModal(true);
                              }}
                            >
                              Decline
                            </Button>
                          </>
                        )}
                        {request.status !== "Requested" && request.status !== "Declined" && (
                          <Button
                            variant="outline"
                            className="text-xs px-3 py-1"
                            onClick={() => router.push(`/manager/dashboard/services/${request.id}`)}
                          >
                            View Details
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vendor Assignment Modal */}
        {showVendorModal && selectedRequest && (
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
                  Assign Vendor - {selectedRequest.service}
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
              <div className="mb-4">
                <p className={`text-sm mb-2 ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Property: {selectedRequest.propertyName}
                </p>
                <p className={`text-sm mb-4 ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Description: {selectedRequest.description}
                </p>
              </div>
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {vendors
                  .filter(v => v.services.includes(selectedRequest.service))
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
                            Services: {vendor.services.join(", ")}
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

        {/* Decline Request Modal */}
        {showDeclineModal && selectedRequest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowDeclineModal(false)}>
            <div
              className={`rounded-lg shadow-xl p-6 max-w-md w-full mx-4 ${
                effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  Decline Service Request
                </h3>
                <button
                  onClick={() => setShowDeclineModal(false)}
                  className={`${
                    effectiveTheme === "dark" ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mb-4">
                <p className={`text-sm mb-2 ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Service: {selectedRequest.service}
                </p>
                <p className={`text-sm mb-4 ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Requested by: {selectedRequest.userEmail}
                </p>
                <label className={`block text-sm font-medium mb-2 ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-700"
                }`}>
                  Reason for declining (optional):
                </label>
                <textarea
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  placeholder="Enter reason for declining this request..."
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                    effectiveTheme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                      : effectiveTheme === "ocean"
                      ? "bg-blue-50 border-blue-300 text-blue-900 placeholder-blue-600"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowDeclineModal(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleDeclineRequest}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Decline Request
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ManagerDashboardLayout>
  );
}

