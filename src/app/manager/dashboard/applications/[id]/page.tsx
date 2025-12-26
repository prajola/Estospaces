"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ManagerDashboardLayout, Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import {
  getApplicationById,
  updateApplicationStatus,
  shortlistApplication,
  approveApplication,
  rejectApplication,
  requestMoreInfo,
  markDocumentAsReviewed,
  markApplicationAsCompleted,
  type Application,
  type ApplicationStatus,
} from "@/lib/applications";

export default function ApplicationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { effectiveTheme } = useTheme();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [application, setApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [infoRequestMessage, setInfoRequestMessage] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedRejectionType, setSelectedRejectionType] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const userType = localStorage.getItem("userType");
    
    if (!email || userType !== "manager") {
      router.push("/manager/login");
      return;
    }
    setUserEmail(email);
    
    const appId = params.id as string;
    const app = getApplicationById(appId);
    
    if (!app) {
      router.push("/manager/dashboard/applications");
      return;
    }
    
    setApplication(app);
    setIsLoading(false);
  }, [router, params]);

  const handleStatusChange = (status: ApplicationStatus) => {
    if (!application || !userEmail) return;
    
    if (status === "Under Review") {
      updateApplicationStatus(application.id, status, userEmail);
      setApplication(getApplicationById(application.id));
    } else if (status === "Shortlisted") {
      shortlistApplication(application.id, userEmail);
      setApplication(getApplicationById(application.id));
    } else if (status === "Approved") {
      if (confirm("Are you sure you want to approve this application? This will reject other pending applications for the same property.")) {
        approveApplication(application.id, userEmail);
        setApplication(getApplicationById(application.id));
      }
    } else if (status === "Rejected") {
      setShowRejectModal(true);
    } else if (status === "Completed") {
      if (confirm("Mark this application as completed?")) {
        markApplicationAsCompleted(application.id, userEmail);
        setApplication(getApplicationById(application.id));
      }
    }
  };

  const handleRequestInfo = () => {
    if (!application || !userEmail || !infoRequestMessage.trim()) return;
    
    requestMoreInfo(application.id, userEmail, infoRequestMessage);
    setApplication(getApplicationById(application.id));
    setShowRequestInfoModal(false);
    setInfoRequestMessage("");
  };

  const handleReject = () => {
    if (!application || !userEmail || !rejectionReason.trim()) return;
    
    rejectApplication(application.id, userEmail, rejectionReason);
    setApplication(getApplicationById(application.id));
    setShowRejectModal(false);
    setRejectionReason("");
    setSelectedRejectionType("");
  };

  const handleDocumentReview = (docId: string) => {
    if (!application) return;
    
    markDocumentAsReviewed(application.id, docId);
    setApplication(getApplicationById(application.id));
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-800";
      case "Under Review":
        return "bg-purple-100 text-purple-800";
      case "Shortlisted":
        return "bg-blue-100 text-blue-800";
      case "Info Requested":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Withdrawn":
        return "bg-gray-100 text-gray-800";
      case "Completed":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading || !application) {
    return (
      <ManagerDashboardLayout userEmail={userEmail || ""}>
        <div className={`min-h-[60vh] flex items-center justify-center ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-50" : "bg-gray-50"
        }`}>
          <div className="text-center">
            <div className="text-lg mb-4">Loading application details...</div>
            <div className="flex gap-1 justify-center">
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
    <ManagerDashboardLayout userEmail={userEmail || ""}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <button
              onClick={() => router.push("/manager/dashboard/applications")}
              className={`mb-4 flex items-center gap-2 ${
                effectiveTheme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Applications
            </button>
            <h1 className={`text-3xl font-bold ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              Application Details
            </h1>
            <p className={`text-sm mt-1 ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>
              Review and manage application for {application.propertyName}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
              {application.status}
            </span>
          </div>
        </div>

        {/* Manager Review Actions */}
        <div className={`mb-6 p-4 rounded-lg ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
        } shadow-md`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
          }`}>
            Manager Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            {application.status !== "Under Review" && application.status !== "Rejected" && application.status !== "Completed" && (
              <Button
                variant="outline"
                onClick={() => handleStatusChange("Under Review")}
              >
                Mark as Under Review
              </Button>
            )}
            {application.status !== "Shortlisted" && application.status !== "Rejected" && application.status !== "Completed" && (
              <Button
                variant="outline"
                onClick={() => handleStatusChange("Shortlisted")}
                className="border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                Shortlist
              </Button>
            )}
            {application.status !== "Info Requested" && application.status !== "Rejected" && application.status !== "Completed" && (
              <Button
                variant="outline"
                onClick={() => setShowRequestInfoModal(true)}
                className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
              >
                Request More Info
              </Button>
            )}
            {application.status === "Approved" && (
              <Button
                variant="primary"
                onClick={() => handleStatusChange("Completed")}
              >
                Mark as Completed
              </Button>
            )}
            {application.status !== "Rejected" && application.status !== "Completed" && (
              <Button
                variant="outline"
                onClick={() => setShowRejectModal(true)}
                className="border-red-500 text-red-600 hover:bg-red-50"
              >
                Reject
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section A: Applicant Information */}
          <div className={`rounded-lg shadow-md p-6 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              A. Applicant Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className={`text-sm font-medium ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Full Name
                </label>
                <p className={`mt-1 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  {application.applicantName}
                </p>
              </div>
              <div>
                <label className={`text-sm font-medium ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Contact Details
                </label>
                <p className={`mt-1 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  {application.applicantEmail}
                </p>
                <p className={`mt-1 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  {application.applicantPhone}
                </p>
              </div>
              <div>
                <label className={`text-sm font-medium ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Employment Status
                </label>
                <p className={`mt-1 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  {application.employmentStatus}
                </p>
              </div>
              <div>
                <label className={`text-sm font-medium ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Income Range
                </label>
                <p className={`mt-1 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  {application.incomeRange}
                </p>
              </div>
            </div>
          </div>

          {/* Section B: Property Applied For */}
          <div className={`rounded-lg shadow-md p-6 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              B. Property Applied For
            </h2>
            <div className="space-y-4">
              <div>
                <label className={`text-sm font-medium ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Property Name
                </label>
                <p className={`mt-1 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  {application.propertyName}
                </p>
              </div>
              <div>
                <label className={`text-sm font-medium ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Address
                </label>
                <p className={`mt-1 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  {application.propertyAddress}
                </p>
              </div>
              <div>
                <label className={`text-sm font-medium ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Unit Details
                </label>
                <p className={`mt-1 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  {application.unitDetails}
                </p>
              </div>
              <div>
                <label className={`text-sm font-medium ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Rent Amount
                </label>
                <p className={`mt-1 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  {application.rentAmount}
                </p>
              </div>
              <div>
                <label className={`text-sm font-medium ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Availability Date
                </label>
                <p className={`mt-1 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  {new Date(application.availabilityDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Section C: Documents Submitted */}
          <div className={`rounded-lg shadow-md p-6 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              C. Documents Submitted
            </h2>
            <div className="space-y-3">
              {application.documents.map((doc) => (
                <div
                  key={doc.id}
                  className={`p-4 rounded-lg border ${
                    effectiveTheme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : effectiveTheme === "ocean"
                      ? "bg-blue-50 border-blue-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div>
                        <p className={`font-medium ${
                          effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                        }`}>
                          {doc.name}
                        </p>
                        <p className={`text-sm ${
                          effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                        }`}>
                          {doc.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.reviewed && (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          Reviewed
                        </span>
                      )}
                      <button
                        onClick={() => window.open(doc.url, "_blank")}
                        className={`px-3 py-1 text-sm rounded ${
                          effectiveTheme === "dark"
                            ? "bg-gray-600 text-gray-100 hover:bg-gray-500"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = doc.url;
                          link.download = doc.name;
                          link.click();
                        }}
                        className={`px-3 py-1 text-sm rounded ${
                          effectiveTheme === "dark"
                            ? "bg-gray-600 text-gray-100 hover:bg-gray-500"
                            : "bg-gray-500 text-white hover:bg-gray-600"
                        }`}
                      >
                        Download
                      </button>
                      {!doc.reviewed && (
                        <button
                          onClick={() => handleDocumentReview(doc.id)}
                          className="px-3 py-1 text-sm rounded bg-green-500 text-white hover:bg-green-600"
                        >
                          Mark as Reviewed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section D: Application Timeline */}
          <div className={`rounded-lg shadow-md p-6 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              D. Application Timeline
            </h2>
            <div className="space-y-4">
              {application.timeline
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((event) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        event.type === "submitted"
                          ? "bg-blue-500"
                          : event.type === "document"
                          ? "bg-green-500"
                          : event.type === "manager_action"
                          ? "bg-purple-500"
                          : "bg-orange-500"
                      }`}></div>
                      <div className={`w-0.5 h-full ${
                        effectiveTheme === "dark" ? "bg-gray-600" : "bg-gray-300"
                      }`}></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <p className={`font-medium ${
                        effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                      }`}>
                        {event.action}
                      </p>
                      <p className={`text-sm mt-1 ${
                        effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                      }`}>
                        {event.description}
                      </p>
                      <p className={`text-xs mt-1 ${
                        effectiveTheme === "dark" ? "text-gray-500" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                      }`}>
                        {formatDate(event.date)} by {event.performedBy}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Info Request Message Display */}
        {application.infoRequestMessage && (
          <div className={`mt-6 p-4 rounded-lg ${
            effectiveTheme === "dark" ? "bg-yellow-900/30 border-yellow-700" : "bg-yellow-50 border-yellow-200"
          } border`}>
            <h3 className={`font-semibold mb-2 ${
              effectiveTheme === "dark" ? "text-yellow-300" : "text-yellow-900"
            }`}>
              Information Requested
            </h3>
            <p className={`${
              effectiveTheme === "dark" ? "text-yellow-200" : "text-yellow-800"
            }`}>
              {application.infoRequestMessage}
            </p>
          </div>
        )}

        {/* Rejection Reason Display */}
        {application.rejectionReason && (
          <div className={`mt-6 p-4 rounded-lg ${
            effectiveTheme === "dark" ? "bg-red-900/30 border-red-700" : "bg-red-50 border-red-200"
          } border`}>
            <h3 className={`font-semibold mb-2 ${
              effectiveTheme === "dark" ? "text-red-300" : "text-red-900"
            }`}>
              Rejection Reason
            </h3>
            <p className={`${
              effectiveTheme === "dark" ? "text-red-200" : "text-red-800"
            }`}>
              {application.rejectionReason}
            </p>
          </div>
        )}
      </div>

      {/* Request More Info Modal */}
      {showRequestInfoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg shadow-xl ${
            effectiveTheme === "dark" ? "bg-gray-800" : "bg-white"
          } p-6`}>
            <h3 className={`text-xl font-bold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : "text-gray-900"
            }`}>
              Request More Information
            </h3>
            <textarea
              value={infoRequestMessage}
              onChange={(e) => setInfoRequestMessage(e.target.value)}
              placeholder="Enter the information you need from the applicant..."
              className={`w-full h-32 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                effectiveTheme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
            <div className="flex gap-3 mt-4">
              <Button
                variant="primary"
                onClick={handleRequestInfo}
                disabled={!infoRequestMessage.trim()}
              >
                Send Request
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowRequestInfoModal(false);
                  setInfoRequestMessage("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Application Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg shadow-xl ${
            effectiveTheme === "dark" ? "bg-gray-800" : "bg-white"
          } p-6`}>
            <h3 className={`text-xl font-bold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : "text-gray-900"
            }`}>
              Reject Application
            </h3>
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${
                effectiveTheme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                Reason Type
              </label>
              <select
                value={selectedRejectionType}
                onChange={(e) => setSelectedRejectionType(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                  effectiveTheme === "dark"
                    ? "bg-gray-700 border-gray-600 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option value="">Select a reason...</option>
                <option value="Incomplete Documents">Incomplete Documents</option>
                <option value="Income Insufficient">Income Insufficient</option>
                <option value="Poor Credit History">Poor Credit History</option>
                <option value="Property Already Approved">Property Already Approved</option>
                <option value="Does Not Meet Requirements">Does Not Meet Requirements</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${
                effectiveTheme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                Additional Details
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Provide additional details about the rejection..."
                className={`w-full h-32 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                  effectiveTheme === "dark"
                    ? "bg-gray-700 border-gray-600 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
                className="bg-red-600 hover:bg-red-700"
              >
                Reject Application
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason("");
                  setSelectedRejectionType("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </ManagerDashboardLayout>
  );
}


