"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ManagerDashboardLayout, Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import {
  getAllAppointments,
  getAppointmentsByStatus,
  type Appointment,
  type AppointmentStatus,
} from "@/lib/appointments";

export default function ManagerAppointmentsPage() {
  const router = useRouter();
  const { effectiveTheme } = useTheme();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filterStatus, setFilterStatus] = useState<AppointmentStatus | "all">("all");
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const userType = localStorage.getItem("userType");
    
    if (!email || userType !== "manager") {
      router.push("/manager/login");
      return;
    }
    setUserEmail(email);
    
    // Load appointments
    const allApts = getAllAppointments();
    setAppointments(allApts);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [router]);

  // Filter appointments
  const filteredAppointments = appointments.filter((apt) => {
    // Status filter
    if (filterStatus !== "all" && apt.status !== filterStatus) {
      return false;
    }
    
    // Type filter
    if (filterType !== "all" && apt.type !== filterType) {
      return false;
    }
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        apt.userName.toLowerCase().includes(query) ||
        apt.userEmail.toLowerCase().includes(query) ||
        (apt.propertyName && apt.propertyName.toLowerCase().includes(query)) ||
        (apt.serviceName && apt.serviceName.toLowerCase().includes(query)) ||
        apt.title.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Get status counts
  const statusCounts = {
    all: appointments.length,
    Pending: getAppointmentsByStatus("Pending").length,
    Confirmed: getAppointmentsByStatus("Confirmed").length,
    Rescheduled: getAppointmentsByStatus("Rescheduled").length,
    "In Progress": getAppointmentsByStatus("In Progress").length,
    Completed: getAppointmentsByStatus("Completed").length,
    Cancelled: getAppointmentsByStatus("Cancelled").length,
    Rejected: getAppointmentsByStatus("Rejected").length,
  };

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-800";
      case "Confirmed":
        return "bg-blue-100 text-blue-800";
      case "Rescheduled":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-purple-100 text-purple-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-gray-100 text-gray-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <ManagerDashboardLayout userEmail={userEmail}>
        <div className={`min-h-[60vh] flex flex-col items-center justify-center ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-50" : "bg-gray-50"
        }`}>
          <div className="text-center mb-8">
            <svg className="w-64 h-64 mx-auto mb-4" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="200" fill="#E0F2FE"/>
              <rect x="20" y="140" width="40" height="40" fill="#EF4444" rx="4"/>
              <rect x="70" y="120" width="40" height="60" fill="#3B82F6" rx="4"/>
              <rect x="120" y="100" width="40" height="80" fill="#10B981" rx="4"/>
              <rect x="170" y="130" width="20" height="50" fill="#F59E0B" rx="4"/>
              <path d="M40 140 L60 120 L80 100 L100 90 L120 100 L140 120 L160 130" stroke="#3B82F6" strokeWidth="3" fill="none"/>
              <circle cx="50" cy="110" r="8" fill="#3B82F6"/>
              <circle cx="100" cy="90" r="8" fill="#3B82F6"/>
              <circle cx="150" cy="100" r="8" fill="#3B82F6"/>
              <circle cx="80" cy="60" r="15" fill="#FBBF24"/>
              <path d="M60 50 Q80 40 100 50" stroke="#FBBF24" strokeWidth="2" fill="none"/>
            </svg>
            <p className={`text-lg ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>
              Loading...
            </p>
            <div className="flex gap-1 justify-center mt-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </ManagerDashboardLayout>
    );
  }

  return (
    <ManagerDashboardLayout userEmail={userEmail}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className={`text-2xl font-bold ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              Appointment
            </h1>
            <p className={`text-sm mt-1 ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>
              Manage your leads and clients relationships.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Calendar
            </Button>
            <Button variant="primary">
              Publish Property
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-orange-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>{statusCounts.Pending}</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Pending</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-blue-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>{statusCounts.Confirmed}</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Confirmed</p>
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
            }`}>{statusCounts.Completed}</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Completed</p>
          </div>
          <div className={`rounded-lg shadow-md p-6 border-l-4 border-purple-500 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>{statusCounts.all}</p>
            <p className={`text-sm ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>Total Appointments</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Q Search Leads"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                effectiveTheme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  : effectiveTheme === "ocean"
                  ? "bg-blue-50 border-blue-300 text-blue-900 placeholder-blue-600"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
            <svg
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as AppointmentStatus | "all")}
            className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
              effectiveTheme === "dark"
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : effectiveTheme === "ocean"
                ? "bg-blue-50 border-blue-300 text-blue-900"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="all">All Status ({statusCounts.all})</option>
            <option value="Pending">Pending ({statusCounts.Pending})</option>
            <option value="Confirmed">Confirmed ({statusCounts.Confirmed})</option>
            <option value="Rescheduled">Rescheduled ({statusCounts.Rescheduled})</option>
            <option value="In Progress">In Progress ({statusCounts["In Progress"]})</option>
            <option value="Completed">Completed ({statusCounts.Completed})</option>
            <option value="Cancelled">Cancelled ({statusCounts.Cancelled})</option>
            <option value="Rejected">Rejected ({statusCounts.Rejected})</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
              effectiveTheme === "dark"
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : effectiveTheme === "ocean"
                ? "bg-blue-50 border-blue-300 text-blue-900"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="all">All Types</option>
            <option value="Property Viewing">Property Viewing</option>
            <option value="Document Verification">Document Verification</option>
            <option value="Service Visit">Service Visit</option>
            <option value="General Meeting">General Meeting</option>
            <option value="Application Follow-up">Application Follow-up</option>
          </select>
        </div>

        {/* Appointments List */}
        <div className={`rounded-lg shadow-md overflow-hidden ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
        }`}>
          <div className="p-4 border-b border-gray-200">
            <h3 className={`font-semibold ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              Appointments ({filteredAppointments.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredAppointments.length === 0 ? (
              <div className={`p-8 text-center ${
                effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
              }`}>
                No appointments found
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`p-6 hover:${
                    effectiveTheme === "dark" ? "bg-gray-700" : effectiveTheme === "ocean" ? "bg-blue-50" : "bg-gray-50"
                  } cursor-pointer`}
                  onClick={() => router.push(`/manager/dashboard/appointments/${appointment.id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div>
                          <p className={`font-semibold ${
                            effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                          }`}>{appointment.userName}</p>
                          <p className={`text-sm ${
                            effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                          }`}>{appointment.userEmail}</p>
                          <p className={`text-sm ${
                            effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                          }`}>{appointment.userPhone}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <div className="mt-3 space-y-1">
                        <p className={`text-sm ${
                          effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                        }`}>
                          <span className="font-medium">Type:</span> {appointment.type}
                        </p>
                        <p className={`text-sm ${
                          effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                        }`}>
                          <span className="font-medium">Date:</span> {new Date(appointment.requestedDate).toLocaleDateString()} at {appointment.requestedTime}
                        </p>
                        {appointment.confirmedDate && (
                          <p className={`text-sm ${
                            effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                          }`}>
                            <span className="font-medium">Confirmed:</span> {new Date(appointment.confirmedDate).toLocaleDateString()} at {appointment.confirmedTime}
                          </p>
                        )}
                        {(appointment.propertyName || appointment.serviceName) && (
                          <p className={`text-sm ${
                            effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                          }`}>
                            <span className="font-medium">{appointment.propertyName ? "Property" : "Service"}:</span> {appointment.propertyName || appointment.serviceName}
                          </p>
                        )}
                        {appointment.userNotes && (
                          <p className={`text-sm ${
                            effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                          }`}>
                            <span className="font-medium">Note:</span> {appointment.userNotes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="outline"
                        className="text-sm px-3 py-1"
                        onClick={() => router.push(`/manager/dashboard/appointments/${appointment.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </ManagerDashboardLayout>
  );
}
