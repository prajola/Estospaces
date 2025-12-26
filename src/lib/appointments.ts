// Appointment Management System for Manager Dashboard

export type AppointmentStatus =
  | "Pending"
  | "Confirmed"
  | "Rescheduled"
  | "In Progress"
  | "Completed"
  | "Cancelled"
  | "Rejected";

export type AppointmentType =
  | "Property Viewing"
  | "Document Verification"
  | "Service Visit"
  | "General Meeting"
  | "Application Follow-up";

export interface AppointmentNote {
  id: string;
  date: string;
  note: string;
  addedBy: string;
  type: "viewing_feedback" | "service_notes" | "general" | "outcome";
}

export interface AppointmentTimeline {
  id: string;
  date: string;
  action: string;
  description: string;
  performedBy: string;
  type: "created" | "status_change" | "reschedule" | "note" | "assignment";
}

export interface Appointment {
  id: string;
  // User Information
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  // Appointment Details
  type: AppointmentType;
  title: string;
  description: string;
  // Property/Service Information
  propertyId?: string;
  propertyName?: string;
  propertyAddress?: string;
  serviceId?: string;
  serviceName?: string;
  serviceType?: string;
  // Scheduling
  requestedDate: string;
  requestedTime: string;
  confirmedDate?: string;
  confirmedTime?: string;
  duration: string; // e.g., "1 hour", "30 minutes"
  location: string;
  // Status & Management
  status: AppointmentStatus;
  assignedTo?: string; // Agent/Service Vendor name
  assignedToId?: string;
  // Notes & Feedback
  userNotes?: string;
  managerNotes?: string;
  outcome?: string; // "Viewed", "Interested", "Not Interested", "Service Completed", etc.
  followUpActions?: string[];
  notes: AppointmentNote[];
  timeline: AppointmentTimeline[];
  // Reschedule History
  rescheduleHistory?: {
    oldDate: string;
    oldTime: string;
    newDate: string;
    newTime: string;
    requestedBy: string;
    reason?: string;
  }[];
  // Rejection
  rejectionReason?: string;
  // Metadata
  createdAt: string;
  completedAt?: string;
  cancelledAt?: string;
}

const STORAGE_KEY = "estospaces_appointments";
const NOTIFICATIONS_KEY = "estospaces_appointment_notifications";

// Initialize with sample data
function getInitialAppointments(): Appointment[] {
  if (typeof window === "undefined") return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  // Sample appointments
  const sampleAppointments: Appointment[] = [
    {
      id: "apt-1",
      userId: "user-1",
      userName: "Sarah Johnson",
      userEmail: "sarah.johnson@email.com",
      userPhone: "+1 (555) 123-4567",
      type: "Property Viewing",
      title: "Property Viewing Request",
      description: "Interested in viewing the Modern Downtown Apartment",
      propertyId: "prop-1",
      propertyName: "Modern Downtown Apartment",
      propertyAddress: "123 Main St, Downtown, NY 10001",
      requestedDate: "2024-02-05",
      requestedTime: "10:00 AM",
      duration: "1 hour",
      location: "123 Main St, Downtown, NY 10001",
      status: "Pending",
      userNotes: "I'm available weekdays after 9 AM. Please confirm if this time works.",
      notes: [],
      timeline: [
        {
          id: "timeline-1",
          date: new Date().toISOString(),
          action: "Appointment Requested",
          description: "Property viewing requested for Modern Downtown Apartment",
          performedBy: "Sarah Johnson",
          type: "created",
        },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: "apt-2",
      userId: "user-2",
      userName: "Michael Chen",
      userEmail: "michael.chen@email.com",
      userPhone: "+1 (555) 234-5678",
      type: "Service Visit",
      title: "Boiler Repair Service",
      description: "Boiler not working, needs urgent repair",
      serviceId: "svc-1",
      serviceName: "Boiler Repair",
      serviceType: "boiler-repair",
      requestedDate: "2024-02-03",
      requestedTime: "2:00 PM",
      confirmedDate: "2024-02-03",
      confirmedTime: "2:00 PM",
      duration: "2 hours",
      location: "456 Oak Avenue, Suburbia, NY 10002",
      status: "Confirmed",
      assignedTo: "John's Plumbing Services",
      assignedToId: "vendor-1",
      userNotes: "Boiler stopped working yesterday. Please send technician as soon as possible.",
      notes: [],
      timeline: [
        {
          id: "timeline-2",
          date: new Date(Date.now() - 86400000).toISOString(),
          action: "Appointment Requested",
          description: "Boiler repair service requested",
          performedBy: "Michael Chen",
          type: "created",
        },
        {
          id: "timeline-3",
          date: new Date(Date.now() - 43200000).toISOString(),
          action: "Appointment Confirmed",
          description: "Appointment confirmed for 2024-02-03 at 2:00 PM",
          performedBy: "Manager",
          type: "status_change",
        },
        {
          id: "timeline-4",
          date: new Date(Date.now() - 43200000).toISOString(),
          action: "Vendor Assigned",
          description: "Assigned to John's Plumbing Services",
          performedBy: "Manager",
          type: "assignment",
        },
      ],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "apt-3",
      userId: "user-3",
      userName: "Emily Rodriguez",
      userEmail: "emily.rodriguez@email.com",
      userPhone: "+1 (555) 345-6789",
      type: "Document Verification",
      title: "Document Verification Meeting",
      description: "Need to verify documents for application",
      propertyId: "prop-3",
      propertyName: "Cozy Studio Loft",
      propertyAddress: "789 Pine Street, Arts District, NY 10003",
      requestedDate: "2024-02-07",
      requestedTime: "11:00 AM",
      duration: "30 minutes",
      location: "789 Pine Street, Arts District, NY 10003",
      status: "Rescheduled",
      userNotes: "I can bring all original documents for verification.",
      notes: [],
      rescheduleHistory: [
        {
          oldDate: "2024-02-06",
          oldTime: "10:00 AM",
          newDate: "2024-02-07",
          newTime: "11:00 AM",
          requestedBy: "Manager",
          reason: "Manager requested reschedule due to conflict",
        },
      ],
      timeline: [
        {
          id: "timeline-5",
          date: new Date(Date.now() - 172800000).toISOString(),
          action: "Appointment Requested",
          description: "Document verification meeting requested",
          performedBy: "Emily Rodriguez",
          type: "created",
        },
        {
          id: "timeline-6",
          date: new Date(Date.now() - 86400000).toISOString(),
          action: "Appointment Rescheduled",
          description: "Rescheduled from 2024-02-06 10:00 AM to 2024-02-07 11:00 AM",
          performedBy: "Manager",
          type: "reschedule",
        },
      ],
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: "apt-4",
      userId: "user-1",
      userName: "Sarah Johnson",
      userEmail: "sarah.johnson@email.com",
      userPhone: "+1 (555) 123-4567",
      type: "Property Viewing",
      title: "Property Viewing - Completed",
      description: "Second viewing of Modern Downtown Apartment",
      propertyId: "prop-1",
      propertyName: "Modern Downtown Apartment",
      propertyAddress: "123 Main St, Downtown, NY 10001",
      requestedDate: "2024-01-20",
      requestedTime: "3:00 PM",
      confirmedDate: "2024-01-20",
      confirmedTime: "3:00 PM",
      duration: "1 hour",
      location: "123 Main St, Downtown, NY 10001",
      status: "Completed",
      outcome: "Interested",
      followUpActions: ["Send application link", "Schedule follow-up call"],
      managerNotes: "Applicant showed strong interest. Property was in good condition.",
      notes: [
        {
          id: "note-1",
          date: new Date(Date.now() - 2592000000).toISOString(),
          note: "Applicant was very interested in the property. Asked about parking and nearby amenities.",
          addedBy: "Manager",
          type: "viewing_feedback",
        },
      ],
      timeline: [
        {
          id: "timeline-7",
          date: new Date(Date.now() - 2592000000).toISOString(),
          action: "Appointment Requested",
          description: "Property viewing requested",
          performedBy: "Sarah Johnson",
          type: "created",
        },
        {
          id: "timeline-8",
          date: new Date(Date.now() - 2592000000).toISOString(),
          action: "Appointment Confirmed",
          description: "Appointment confirmed for 2024-01-20 at 3:00 PM",
          performedBy: "Manager",
          type: "status_change",
        },
        {
          id: "timeline-9",
          date: new Date(Date.now() - 2592000000).toISOString(),
          action: "Appointment Completed",
          description: "Viewing completed. Outcome: Interested",
          performedBy: "Manager",
          type: "status_change",
        },
      ],
      createdAt: new Date(Date.now() - 2592000000).toISOString(),
      completedAt: new Date(Date.now() - 2592000000).toISOString(),
    },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleAppointments));
  return sampleAppointments;
}

export function getAllAppointments(): Appointment[] {
  if (typeof window === "undefined") return [];
  return getInitialAppointments();
}

export function getAppointmentById(id: string): Appointment | null {
  const appointments = getAllAppointments();
  return appointments.find((apt) => apt.id === id) || null;
}

export function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus,
  managerEmail: string,
  notes?: string
): boolean {
  const appointments = getAllAppointments();
  const aptIndex = appointments.findIndex((apt) => apt.id === id);
  
  if (aptIndex === -1) return false;

  const apt = appointments[aptIndex];
  const oldStatus = apt.status;
  apt.status = status;
  
  if (notes) apt.managerNotes = notes;

  // Update completion/cancellation dates
  if (status === "Completed") {
    apt.completedAt = new Date().toISOString();
  } else if (status === "Cancelled" || status === "Rejected") {
    apt.cancelledAt = new Date().toISOString();
  }

  // Add timeline event
  apt.timeline.push({
    id: `timeline-${Date.now()}`,
    date: new Date().toISOString(),
    action: "Status Changed",
    description: `Status changed from ${oldStatus} to ${status}`,
    performedBy: managerEmail,
    type: "status_change",
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  
  // Create notification
  createNotification({
    id: `notif-${Date.now()}`,
    appointmentId: id,
    userEmail: apt.userEmail,
    type: "status_change",
    message: `Your appointment status has been updated to ${status}`,
    read: false,
    createdAt: new Date().toISOString(),
  });

  return true;
}

export function confirmAppointment(
  id: string,
  managerEmail: string,
  confirmedDate: string,
  confirmedTime: string
): boolean {
  const appointments = getAllAppointments();
  const aptIndex = appointments.findIndex((apt) => apt.id === id);
  
  if (aptIndex === -1) return false;

  const apt = appointments[aptIndex];
  apt.status = "Confirmed";
  apt.confirmedDate = confirmedDate;
  apt.confirmedTime = confirmedTime;

  // Add timeline event
  apt.timeline.push({
    id: `timeline-${Date.now()}`,
    date: new Date().toISOString(),
    action: "Appointment Confirmed",
    description: `Appointment confirmed for ${confirmedDate} at ${confirmedTime}`,
    performedBy: managerEmail,
    type: "status_change",
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  
  // Create notification
  createNotification({
    id: `notif-${Date.now()}`,
    appointmentId: id,
    userEmail: apt.userEmail,
    type: "confirmed",
    message: `Your appointment has been confirmed for ${confirmedDate} at ${confirmedTime}`,
    read: false,
    createdAt: new Date().toISOString(),
  });

  return true;
}

export function rescheduleAppointment(
  id: string,
  managerEmail: string,
  newDate: string,
  newTime: string,
  reason?: string
): boolean {
  const appointments = getAllAppointments();
  const aptIndex = appointments.findIndex((apt) => apt.id === id);
  
  if (aptIndex === -1) return false;

  const apt = appointments[aptIndex];
  const oldDate = apt.confirmedDate || apt.requestedDate;
  const oldTime = apt.confirmedTime || apt.requestedTime;
  
  apt.status = "Rescheduled";
  apt.confirmedDate = newDate;
  apt.confirmedTime = newTime;
  
  if (!apt.rescheduleHistory) {
    apt.rescheduleHistory = [];
  }
  
  apt.rescheduleHistory.push({
    oldDate: oldDate,
    oldTime: oldTime,
    newDate: newDate,
    newTime: newTime,
    requestedBy: managerEmail,
    reason: reason,
  });

  // Add timeline event
  apt.timeline.push({
    id: `timeline-${Date.now()}`,
    date: new Date().toISOString(),
    action: "Appointment Rescheduled",
    description: `Rescheduled from ${oldDate} ${oldTime} to ${newDate} ${newTime}${reason ? ` - Reason: ${reason}` : ""}`,
    performedBy: managerEmail,
    type: "reschedule",
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  
  // Create notification
  createNotification({
    id: `notif-${Date.now()}`,
    appointmentId: id,
    userEmail: apt.userEmail,
    type: "rescheduled",
    message: `Your appointment has been rescheduled to ${newDate} at ${newTime}`,
    read: false,
    createdAt: new Date().toISOString(),
  });

  return true;
}

export function rejectAppointment(
  id: string,
  managerEmail: string,
  reason: string
): boolean {
  const appointments = getAllAppointments();
  const aptIndex = appointments.findIndex((apt) => apt.id === id);
  
  if (aptIndex === -1) return false;

  const apt = appointments[aptIndex];
  apt.status = "Rejected";
  apt.rejectionReason = reason;
  apt.cancelledAt = new Date().toISOString();

  // Add timeline event
  apt.timeline.push({
    id: `timeline-${Date.now()}`,
    date: new Date().toISOString(),
    action: "Appointment Rejected",
    description: `Appointment rejected - Reason: ${reason}`,
    performedBy: managerEmail,
    type: "status_change",
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  
  // Create notification
  createNotification({
    id: `notif-${Date.now()}`,
    appointmentId: id,
    userEmail: apt.userEmail,
    type: "rejected",
    message: `Your appointment has been rejected. Reason: ${reason}`,
    read: false,
    createdAt: new Date().toISOString(),
  });

  return true;
}

export function assignAppointment(
  id: string,
  managerEmail: string,
  assignedTo: string,
  assignedToId?: string
): boolean {
  const appointments = getAllAppointments();
  const aptIndex = appointments.findIndex((apt) => apt.id === id);
  
  if (aptIndex === -1) return false;

  const apt = appointments[aptIndex];
  apt.assignedTo = assignedTo;
  apt.assignedToId = assignedToId;

  // Add timeline event
  apt.timeline.push({
    id: `timeline-${Date.now()}`,
    date: new Date().toISOString(),
    action: "Assigned",
    description: `Assigned to ${assignedTo}`,
    performedBy: managerEmail,
    type: "assignment",
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  
  return true;
}

export function addAppointmentNote(
  id: string,
  managerEmail: string,
  note: string,
  noteType: AppointmentNote["type"] = "general"
): boolean {
  const appointments = getAllAppointments();
  const aptIndex = appointments.findIndex((apt) => apt.id === id);
  
  if (aptIndex === -1) return false;

  const apt = appointments[aptIndex];
  apt.notes.push({
    id: `note-${Date.now()}`,
    date: new Date().toISOString(),
    note: note,
    addedBy: managerEmail,
    type: noteType,
  });

  // Add timeline event
  apt.timeline.push({
    id: `timeline-${Date.now()}`,
    date: new Date().toISOString(),
    action: "Note Added",
    description: note,
    performedBy: managerEmail,
    type: "note",
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  
  return true;
}

export function completeAppointment(
  id: string,
  managerEmail: string,
  outcome: string,
  followUpActions?: string[],
  notes?: string
): boolean {
  const appointments = getAllAppointments();
  const aptIndex = appointments.findIndex((apt) => apt.id === id);
  
  if (aptIndex === -1) return false;

  const apt = appointments[aptIndex];
  apt.status = "Completed";
  apt.outcome = outcome;
  apt.followUpActions = followUpActions;
  apt.completedAt = new Date().toISOString();
  
  if (notes) {
    apt.managerNotes = notes;
    addAppointmentNote(id, managerEmail, notes, "outcome");
  }

  // Add timeline event
  apt.timeline.push({
    id: `timeline-${Date.now()}`,
    date: new Date().toISOString(),
    action: "Appointment Completed",
    description: `Appointment completed. Outcome: ${outcome}`,
    performedBy: managerEmail,
    type: "status_change",
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  
  // Create notification
  createNotification({
    id: `notif-${Date.now()}`,
    appointmentId: id,
    userEmail: apt.userEmail,
    type: "completed",
    message: `Your appointment has been completed. Outcome: ${outcome}`,
    read: false,
    createdAt: new Date().toISOString(),
  });

  return true;
}

export function getAppointmentsByStatus(status: AppointmentStatus): Appointment[] {
  return getAllAppointments().filter((apt) => apt.status === status);
}

export function getAppointmentsByType(type: AppointmentType): Appointment[] {
  return getAllAppointments().filter((apt) => apt.type === type);
}

export function getAppointmentsByProperty(propertyId: string): Appointment[] {
  return getAllAppointments().filter((apt) => apt.propertyId === propertyId);
}

// Notifications System
export interface AppointmentNotification {
  id: string;
  appointmentId: string;
  userEmail: string;
  type: "status_change" | "confirmed" | "rescheduled" | "rejected" | "completed" | "new_appointment";
  message: string;
  read: boolean;
  createdAt: string;
}

function createNotification(notification: AppointmentNotification): void {
  if (typeof window === "undefined") return;
  
  const notifications = getNotifications();
  notifications.push(notification);
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
}

export function getNotifications(): AppointmentNotification[] {
  if (typeof window === "undefined") return [];
  
  const stored = localStorage.getItem(NOTIFICATIONS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getUnreadNotificationCount(): number {
  return getNotifications().filter((n) => !n.read).length;
}

export function markNotificationAsRead(id: string): void {
  if (typeof window === "undefined") return;
  
  const notifications = getNotifications();
  const notifIndex = notifications.findIndex((n) => n.id === id);
  if (notifIndex !== -1) {
    notifications[notifIndex].read = true;
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  }
}

export function markAllNotificationsAsRead(): void {
  if (typeof window === "undefined") return;
  
  const notifications = getNotifications();
  notifications.forEach((n) => (n.read = true));
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
}


