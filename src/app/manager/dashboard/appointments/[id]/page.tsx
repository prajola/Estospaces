"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ManagerDashboardLayout, Button } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import {
  getAppointmentById,
  confirmAppointment,
  rescheduleAppointment,
  rejectAppointment,
  assignAppointment,
  addAppointmentNote,
  completeAppointment,
  updateAppointmentStatus,
  type Appointment,
  type AppointmentStatus,
} from "@/lib/appointments";

export default function AppointmentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { effectiveTheme } = useTheme();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  
  // Form states
  const [confirmedDate, setConfirmedDate] = useState("");
  const [confirmedTime, setConfirmedTime] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [outcome, setOutcome] = useState("");
  const [followUpActions, setFollowUpActions] = useState<string[]>([]);
  const [completionNotes, setCompletionNotes] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [noteText, setNoteText] = useState("");
  const [noteType, setNoteType] = useState<"viewing_feedback" | "service_notes" | "general" | "outcome">("general");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const userType = localStorage.getItem("userType");
    
    if (!email || userType !== "manager") {
      router.push("/manager/login");
      return;
    }
    setUserEmail(email);
    
    const aptId = params.id as string;
    const apt = getAppointmentById(aptId);
    
    if (!apt) {
      router.push("/manager/dashboard/appointments");
      return;
    }
    
    setAppointment(apt);
    setConfirmedDate(apt.confirmedDate || apt.requestedDate);
    setConfirmedTime(apt.confirmedTime || apt.requestedTime);
    setNewDate(apt.confirmedDate || apt.requestedDate);
    setNewTime(apt.confirmedTime || apt.requestedTime);
    setIsLoading(false);
  }, [router, params]);

  const handleConfirm = () => {
    if (!appointment || !userEmail || !confirmedDate || !confirmedTime) return;
    
    confirmAppointment(appointment.id, userEmail, confirmedDate, confirmedTime);
    setAppointment(getAppointmentById(appointment.id));
    setShowConfirmModal(false);
  };

  const handleReschedule = () => {
    if (!appointment || !userEmail || !newDate || !newTime) return;
    
    rescheduleAppointment(appointment.id, userEmail, newDate, newTime, rescheduleReason);
    setAppointment(getAppointmentById(appointment.id));
    setShowRescheduleModal(false);
    setRescheduleReason("");
  };

  const handleReject = () => {
    if (!appointment || !userEmail || !rejectionReason.trim()) return;
    
    rejectAppointment(appointment.id, userEmail, rejectionReason);
    setAppointment(getAppointmentById(appointment.id));
    setShowRejectModal(false);
    setRejectionReason("");
  };

  const handleComplete = () => {
    if (!appointment || !userEmail || !outcome.trim()) return;
    
    completeAppointment(
      appointment.id,
      userEmail,
      outcome,
      followUpActions.length > 0 ? followUpActions : undefined,
      completionNotes
    );
    setAppointment(getAppointmentById(appointment.id));
    setShowCompleteModal(false);
    setOutcome("");
    setFollowUpActions([]);
    setCompletionNotes("");
  };

  const handleAssign = () => {
    if (!appointment || !userEmail || !assignedTo.trim()) return;
    
    assignAppointment(appointment.id, userEmail, assignedTo);
    setAppointment(getAppointmentById(appointment.id));
    setShowAssignModal(false);
    setAssignedTo("");
  };

  const handleAddNote = () => {
    if (!appointment || !userEmail || !noteText.trim()) return;
    
    addAppointmentNote(appointment.id, userEmail, noteText, noteType);
    setAppointment(getAppointmentById(appointment.id));
    setShowNoteModal(false);
    setNoteText("");
    setNoteType("general");
  };

  const handleMarkInProgress = () => {
    if (!appointment || !userEmail) return;
    
    updateAppointmentStatus(appointment.id, "In Progress", userEmail);
    setAppointment(getAppointmentById(appointment.id));
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const addFollowUpAction = () => {
    const action = prompt("Enter follow-up action:");
    if (action && action.trim()) {
      setFollowUpActions([...followUpActions, action.trim()]);
    }
  };

  if (isLoading || !appointment) {
    return (
      <ManagerDashboardLayout userEmail={userEmail || ""}>
        <div className={`min-h-[60vh] flex items-center justify-center ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-50" : "bg-gray-50"
        }`}>
          <div className="text-center">
            <div className="text-lg mb-4">Loading appointment details...</div>
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
              onClick={() => router.push("/manager/dashboard/appointments")}
              className={`mb-4 flex items-center gap-2 ${
                effectiveTheme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Appointments
            </button>
            <h1 className={`text-3xl font-bold ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              Appointment Details
            </h1>
            <p className={`text-sm mt-1 ${
              effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
            }`}>
              {appointment.title}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
              {appointment.status}
            </span>
          </div>
        </div>

        {/* Manager Actions */}
        <div className={`mb-6 p-4 rounded-lg ${
          effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
        } shadow-md`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
          }`}>
            Manager Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            {appointment.status === "Pending" && (
              <>
                <Button
                  variant="primary"
                  onClick={() => setShowConfirmModal(true)}
                >
                  Confirm Appointment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowRescheduleModal(true)}
                  className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                >
                  Reschedule
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowRejectModal(true)}
                  className="border-red-500 text-red-600 hover:bg-red-50"
                >
                  Reject
                </Button>
              </>
            )}
            {appointment.status === "Confirmed" && (
              <>
                <Button
                  variant="outline"
                  onClick={handleMarkInProgress}
                  className="border-purple-500 text-purple-600 hover:bg-purple-50"
                >
                  Mark as In Progress
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowRescheduleModal(true)}
                  className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                >
                  Reschedule
                </Button>
              </>
            )}
            {appointment.status === "In Progress" && (
              <Button
                variant="primary"
                onClick={() => setShowCompleteModal(true)}
              >
                Mark as Completed
              </Button>
            )}
            {appointment.status !== "Completed" && appointment.status !== "Rejected" && appointment.status !== "Cancelled" && (
              <Button
                variant="outline"
                onClick={() => setShowAssignModal(true)}
              >
                Assign Staff/Vendor
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setShowNoteModal(true)}
            >
              Add Note
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section A: Appointment Information */}
          <div className={`rounded-lg shadow-md p-6 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              A. Appointment Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className={`text-sm font-medium ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  User Details
                </label>
                <p className={`mt-1 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  {appointment.userName}
                </p>
                <p className={`text-sm mt-1 ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  {appointment.userEmail}
                </p>
                <p className={`text-sm mt-1 ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  {appointment.userPhone}
                </p>
              </div>
              <div>
                <label className={`text-sm font-medium ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Appointment Type
                </label>
                <p className={`mt-1 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  {appointment.type}
                </p>
              </div>
              <div>
                <label className={`text-sm font-medium ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Requested Date & Time
                </label>
                <p className={`mt-1 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  {new Date(appointment.requestedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })} at {appointment.requestedTime}
                </p>
              </div>
              {appointment.confirmedDate && (
                <div>
                  <label className={`text-sm font-medium ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                  }`}>
                    Confirmed Date & Time
                  </label>
                  <p className={`mt-1 ${
                    effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                  }`}>
                    {new Date(appointment.confirmedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })} at {appointment.confirmedTime}
                  </p>
                </div>
              )}
              <div>
                <label className={`text-sm font-medium ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Duration
                </label>
                <p className={`mt-1 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  {appointment.duration}
                </p>
              </div>
              <div>
                <label className={`text-sm font-medium ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Location
                </label>
                <p className={`mt-1 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  {appointment.location}
                </p>
              </div>
              {appointment.assignedTo && (
                <div>
                  <label className={`text-sm font-medium ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                  }`}>
                    Assigned To
                  </label>
                  <p className={`mt-1 ${
                    effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                  }`}>
                    {appointment.assignedTo}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section B: Property/Service Details */}
          <div className={`rounded-lg shadow-md p-6 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              B. Property / Service Details
            </h2>
            <div className="space-y-4">
              {appointment.propertyName ? (
                <>
                  <div>
                    <label className={`text-sm font-medium ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      Property Name
                    </label>
                    <p className={`mt-1 ${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>
                      {appointment.propertyName}
                    </p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      Property Address
                    </label>
                    <p className={`mt-1 ${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>
                      {appointment.propertyAddress}
                    </p>
                  </div>
                </>
              ) : appointment.serviceName ? (
                <>
                  <div>
                    <label className={`text-sm font-medium ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      Service Name
                    </label>
                    <p className={`mt-1 ${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>
                      {appointment.serviceName}
                    </p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${
                      effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      Service Type
                    </label>
                    <p className={`mt-1 ${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>
                      {appointment.serviceType || "N/A"}
                    </p>
                  </div>
                </>
              ) : (
                <p className={`${
                  effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  General appointment - no specific property or service
                </p>
              )}
              {appointment.description && (
                <div>
                  <label className={`text-sm font-medium ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                  }`}>
                    Description
                  </label>
                  <p className={`mt-1 ${
                    effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                  }`}>
                    {appointment.description}
                  </p>
                </div>
              )}
              {appointment.userNotes && (
                <div>
                  <label className={`text-sm font-medium ${
                    effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                  }`}>
                    Notes from User
                  </label>
                  <p className={`mt-1 ${
                    effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                  }`}>
                    {appointment.userNotes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section C: Notes & Feedback */}
          <div className={`rounded-lg shadow-md p-6 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              C. Notes & Feedback
            </h2>
            <div className="space-y-3">
              {appointment.notes.length === 0 ? (
                <p className={`text-sm ${
                  effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  No notes added yet
                </p>
              ) : (
                appointment.notes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-lg border ${
                      effectiveTheme === "dark"
                        ? "bg-gray-700 border-gray-600"
                        : effectiveTheme === "ocean"
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-medium ${
                        effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                      }`}>
                        {note.type.replace("_", " ").toUpperCase()}
                      </span>
                      <span className={`text-xs ${
                        effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                      }`}>
                        {formatDate(note.date)}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>
                      {note.note}
                    </p>
                    <p className={`text-xs mt-1 ${
                      effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"
                    }`}>
                      Added by {note.addedBy}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Section D: Appointment Timeline */}
          <div className={`rounded-lg shadow-md p-6 ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              D. Appointment Timeline
            </h2>
            <div className="space-y-4">
              {appointment.timeline
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((event) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        event.type === "created"
                          ? "bg-blue-500"
                          : event.type === "status_change"
                          ? "bg-green-500"
                          : event.type === "reschedule"
                          ? "bg-yellow-500"
                          : event.type === "note"
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

        {/* Outcome & Follow-up Actions (for completed appointments) */}
        {appointment.status === "Completed" && (
          <div className={`mt-6 p-6 rounded-lg ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          } shadow-md`}>
            <h3 className={`text-lg font-bold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              Outcome & Follow-up Actions
            </h3>
            {appointment.outcome && (
              <div className="mb-4">
                <label className={`text-sm font-medium ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Outcome
                </label>
                <p className={`mt-1 ${
                  effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                }`}>
                  {appointment.outcome}
                </p>
              </div>
            )}
            {appointment.followUpActions && appointment.followUpActions.length > 0 && (
              <div>
                <label className={`text-sm font-medium mb-2 block ${
                  effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Follow-up Actions
                </label>
                <ul className="list-disc list-inside space-y-1">
                  {appointment.followUpActions.map((action, index) => (
                    <li key={index} className={`${
                      effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                    }`}>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Reschedule History */}
        {appointment.rescheduleHistory && appointment.rescheduleHistory.length > 0 && (
          <div className={`mt-6 p-6 rounded-lg ${
            effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
          } shadow-md`}>
            <h3 className={`text-lg font-bold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
            }`}>
              Reschedule History
            </h3>
            <div className="space-y-3">
              {appointment.rescheduleHistory.map((reschedule, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  effectiveTheme === "dark"
                    ? "bg-gray-700 border-gray-600"
                    : effectiveTheme === "ocean"
                    ? "bg-blue-50 border-blue-200"
                    : "bg-gray-50 border-gray-200"
                }`}>
                  <p className={`text-sm ${
                    effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                  }`}>
                    Changed from {new Date(reschedule.oldDate).toLocaleDateString()} {reschedule.oldTime} to {new Date(reschedule.newDate).toLocaleDateString()} {reschedule.newTime}
                  </p>
                  {reschedule.reason && (
                    <p className={`text-xs mt-1 ${
                      effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"
                    }`}>
                      Reason: {reschedule.reason}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rejection Reason */}
        {appointment.rejectionReason && (
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
              {appointment.rejectionReason}
            </p>
          </div>
        )}
      </div>

      {/* Confirm Appointment Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg shadow-xl ${
            effectiveTheme === "dark" ? "bg-gray-800" : "bg-white"
          } p-6`}>
            <h3 className={`text-xl font-bold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : "text-gray-900"
            }`}>
              Confirm Appointment
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  effectiveTheme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Confirmed Date
                </label>
                <input
                  type="date"
                  value={confirmedDate}
                  onChange={(e) => setConfirmedDate(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                    effectiveTheme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  effectiveTheme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Confirmed Time
                </label>
                <input
                  type="time"
                  value={confirmedTime}
                  onChange={(e) => setConfirmedTime(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                    effectiveTheme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="primary"
                onClick={handleConfirm}
                disabled={!confirmedDate || !confirmedTime}
              >
                Confirm Appointment
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowConfirmModal(false);
                  setConfirmedDate(appointment.confirmedDate || appointment.requestedDate);
                  setConfirmedTime(appointment.confirmedTime || appointment.requestedTime);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg shadow-xl ${
            effectiveTheme === "dark" ? "bg-gray-800" : "bg-white"
          } p-6`}>
            <h3 className={`text-xl font-bold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : "text-gray-900"
            }`}>
              Reschedule Appointment
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  effectiveTheme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  New Date
                </label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                    effectiveTheme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  effectiveTheme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  New Time
                </label>
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                    effectiveTheme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  effectiveTheme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Reason (Optional)
                </label>
                <textarea
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                  placeholder="Enter reason for rescheduling..."
                  className={`w-full h-24 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                    effectiveTheme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="primary"
                onClick={handleReschedule}
                disabled={!newDate || !newTime}
              >
                Reschedule Appointment
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowRescheduleModal(false);
                  setNewDate(appointment.confirmedDate || appointment.requestedDate);
                  setNewTime(appointment.confirmedTime || appointment.requestedTime);
                  setRescheduleReason("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg shadow-xl ${
            effectiveTheme === "dark" ? "bg-gray-800" : "bg-white"
          } p-6`}>
            <h3 className={`text-xl font-bold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : "text-gray-900"
            }`}>
              Reject Appointment
            </h3>
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${
                effectiveTheme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                Rejection Reason
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason for rejecting this appointment..."
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
                Reject Appointment
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Complete Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg shadow-xl ${
            effectiveTheme === "dark" ? "bg-gray-800" : "bg-white"
          } p-6`}>
            <h3 className={`text-xl font-bold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : "text-gray-900"
            }`}>
              Complete Appointment
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  effectiveTheme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Outcome *
                </label>
                <select
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                    effectiveTheme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">Select outcome...</option>
                  <option value="Viewed">Viewed</option>
                  <option value="Interested">Interested</option>
                  <option value="Not Interested">Not Interested</option>
                  <option value="Service Completed">Service Completed</option>
                  <option value="Service Incomplete">Service Incomplete</option>
                  <option value="Documents Verified">Documents Verified</option>
                  <option value="Follow-up Required">Follow-up Required</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  effectiveTheme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Follow-up Actions
                </label>
                <div className="space-y-2">
                  {followUpActions.map((action, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className={`flex-1 px-3 py-2 rounded ${
                        effectiveTheme === "dark" ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"
                      }`}>
                        {action}
                      </span>
                      <button
                        onClick={() => setFollowUpActions(followUpActions.filter((_, i) => i !== index))}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addFollowUpAction}
                    className={`text-sm px-3 py-1 rounded border ${
                      effectiveTheme === "dark"
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    + Add Follow-up Action
                  </button>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  effectiveTheme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Completion Notes
                </label>
                <textarea
                  value={completionNotes}
                  onChange={(e) => setCompletionNotes(e.target.value)}
                  placeholder="Add any additional notes about the appointment..."
                  className={`w-full h-32 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                    effectiveTheme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="primary"
                onClick={handleComplete}
                disabled={!outcome.trim()}
              >
                Mark as Completed
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowCompleteModal(false);
                  setOutcome("");
                  setFollowUpActions([]);
                  setCompletionNotes("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg shadow-xl ${
            effectiveTheme === "dark" ? "bg-gray-800" : "bg-white"
          } p-6`}>
            <h3 className={`text-xl font-bold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : "text-gray-900"
            }`}>
              Assign Staff/Vendor
            </h3>
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${
                effectiveTheme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                Assign To
              </label>
              <input
                type="text"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="Enter staff name or vendor name..."
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                  effectiveTheme === "dark"
                    ? "bg-gray-700 border-gray-600 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={handleAssign}
                disabled={!assignedTo.trim()}
              >
                Assign
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAssignModal(false);
                  setAssignedTo("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg shadow-xl ${
            effectiveTheme === "dark" ? "bg-gray-800" : "bg-white"
          } p-6`}>
            <h3 className={`text-xl font-bold mb-4 ${
              effectiveTheme === "dark" ? "text-gray-100" : "text-gray-900"
            }`}>
              Add Note
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  effectiveTheme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Note Type
                </label>
                <select
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value as any)}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                    effectiveTheme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="general">General</option>
                  <option value="viewing_feedback">Viewing Feedback</option>
                  <option value="service_notes">Service Notes</option>
                  <option value="outcome">Outcome</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  effectiveTheme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Note
                </label>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Enter your note..."
                  className={`w-full h-32 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF7700] ${
                    effectiveTheme === "dark"
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="primary"
                onClick={handleAddNote}
                disabled={!noteText.trim()}
              >
                Add Note
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowNoteModal(false);
                  setNoteText("");
                  setNoteType("general");
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


