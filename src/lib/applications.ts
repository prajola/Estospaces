// Application Management System for Manager Dashboard

export type ApplicationStatus =
  | "Pending"
  | "Under Review"
  | "Shortlisted"
  | "Info Requested"
  | "Approved"
  | "Rejected"
  | "Withdrawn"
  | "Completed";

export type DocumentType = "ID Proof" | "Payslips" | "Bank Statements" | "References" | "Other";

export interface Document {
  id: string;
  type: DocumentType;
  name: string;
  url: string;
  uploadedAt: string;
  reviewed: boolean;
}

export interface TimelineEvent {
  id: string;
  date: string;
  action: string;
  description: string;
  performedBy: string;
  type: "submitted" | "document" | "manager_action" | "status_change";
}

export interface Application {
  id: string;
  // Applicant Information
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  employmentStatus: string;
  incomeRange: string;
  // Property Applied For
  propertyId: string;
  propertyName: string;
  propertyAddress: string;
  unitDetails: string;
  rentAmount: string;
  availabilityDate: string;
  // Application Details
  status: ApplicationStatus;
  submittedAt: string;
  documents: Document[];
  timeline: TimelineEvent[];
  // Manager Notes
  managerNotes?: string;
  rejectionReason?: string;
  infoRequestMessage?: string;
  // Metadata
  score?: number;
  budget?: string;
  lastContact?: string;
}

const STORAGE_KEY = "estospaces_applications";
const NOTIFICATIONS_KEY = "estospaces_application_notifications";

// Initialize with sample data
function getInitialApplications(): Application[] {
  if (typeof window === "undefined") return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  // Sample applications
  const sampleApps: Application[] = [
    {
      id: "app-1",
      applicantName: "Sarah Johnson",
      applicantEmail: "sarah.johnson@email.com",
      applicantPhone: "+1 (555) 123-4567",
      employmentStatus: "Full-time",
      incomeRange: "$60,000 - $80,000",
      propertyId: "prop-1",
      propertyName: "Modern Downtown Apartment",
      propertyAddress: "123 Main St, Downtown, NY 10001",
      unitDetails: "Unit 4B - 2 Bedroom, 1 Bath",
      rentAmount: "$2,500/month",
      availabilityDate: "2024-02-01",
      status: "Pending",
      submittedAt: "2024-01-15T10:30:00Z",
      documents: [
        {
          id: "doc-1",
          type: "ID Proof",
          name: "driver_license.pdf",
          url: "#",
          uploadedAt: "2024-01-15T10:35:00Z",
          reviewed: false,
        },
        {
          id: "doc-2",
          type: "Payslips",
          name: "payslip_jan_2024.pdf",
          url: "#",
          uploadedAt: "2024-01-15T10:40:00Z",
          reviewed: false,
        },
        {
          id: "doc-3",
          type: "Bank Statements",
          name: "bank_statement_dec_2023.pdf",
          url: "#",
          uploadedAt: "2024-01-15T10:45:00Z",
          reviewed: false,
        },
        {
          id: "doc-4",
          type: "References",
          name: "reference_letter.pdf",
          url: "#",
          uploadedAt: "2024-01-15T10:50:00Z",
          reviewed: false,
        },
      ],
      timeline: [
        {
          id: "timeline-1",
          date: "2024-01-15T10:30:00Z",
          action: "Application Submitted",
          description: "Application submitted for Modern Downtown Apartment",
          performedBy: "Sarah Johnson",
          type: "submitted",
        },
        {
          id: "timeline-2",
          date: "2024-01-15T10:50:00Z",
          action: "Documents Uploaded",
          description: "All required documents have been uploaded",
          performedBy: "Sarah Johnson",
          type: "document",
        },
      ],
      score: 95,
      budget: "$2000-$3000",
      lastContact: "01/15/2024",
    },
    {
      id: "app-2",
      applicantName: "Michael Chen",
      applicantEmail: "michael.chen@email.com",
      applicantPhone: "+1 (555) 234-5678",
      employmentStatus: "Full-time",
      incomeRange: "$80,000 - $100,000",
      propertyId: "prop-2",
      propertyName: "Luxury Family Home",
      propertyAddress: "456 Oak Avenue, Suburbia, NY 10002",
      unitDetails: "Entire House - 4 Bedroom, 3 Bath",
      rentAmount: "$4,500/month",
      availabilityDate: "2024-02-15",
      status: "Approved",
      submittedAt: "2024-01-04T09:00:00Z",
      documents: [
        {
          id: "doc-5",
          type: "ID Proof",
          name: "passport.pdf",
          url: "#",
          uploadedAt: "2024-01-04T09:10:00Z",
          reviewed: true,
        },
        {
          id: "doc-6",
          type: "Payslips",
          name: "payslips_q4_2023.pdf",
          url: "#",
          uploadedAt: "2024-01-04T09:15:00Z",
          reviewed: true,
        },
        {
          id: "doc-7",
          type: "Bank Statements",
          name: "bank_statements_2023.pdf",
          url: "#",
          uploadedAt: "2024-01-04T09:20:00Z",
          reviewed: true,
        },
        {
          id: "doc-8",
          type: "References",
          name: "employer_reference.pdf",
          url: "#",
          uploadedAt: "2024-01-04T09:25:00Z",
          reviewed: true,
        },
      ],
      timeline: [
        {
          id: "timeline-3",
          date: "2024-01-04T09:00:00Z",
          action: "Application Submitted",
          description: "Application submitted for Luxury Family Home",
          performedBy: "Michael Chen",
          type: "submitted",
        },
        {
          id: "timeline-4",
          date: "2024-01-04T09:25:00Z",
          action: "Documents Uploaded",
          description: "All required documents have been uploaded",
          performedBy: "Michael Chen",
          type: "document",
        },
        {
          id: "timeline-5",
          date: "2024-01-05T14:00:00Z",
          action: "Status Changed",
          description: "Application marked as Under Review",
          performedBy: "Manager",
          type: "manager_action",
        },
        {
          id: "timeline-6",
          date: "2024-01-06T11:00:00Z",
          action: "Status Changed",
          description: "Application Approved",
          performedBy: "Manager",
          type: "status_change",
        },
      ],
      score: 78,
      budget: "$4000-$5000",
      lastContact: "01/06/2024",
    },
    {
      id: "app-3",
      applicantName: "Emily Rodriguez",
      applicantEmail: "emily.rodriguez@email.com",
      applicantPhone: "+1 (555) 345-6789",
      employmentStatus: "Part-time",
      incomeRange: "$40,000 - $60,000",
      propertyId: "prop-3",
      propertyName: "Cozy Studio Loft",
      propertyAddress: "789 Pine Street, Arts District, NY 10003",
      unitDetails: "Studio - 1 Bath",
      rentAmount: "$1,800/month",
      availabilityDate: "2024-02-20",
      status: "Under Review",
      submittedAt: "2024-01-04T15:00:00Z",
      documents: [
        {
          id: "doc-9",
          type: "ID Proof",
          name: "state_id.pdf",
          url: "#",
          uploadedAt: "2024-01-04T15:10:00Z",
          reviewed: false,
        },
        {
          id: "doc-10",
          type: "Payslips",
          name: "payslip_dec_2023.pdf",
          url: "#",
          uploadedAt: "2024-01-04T15:15:00Z",
          reviewed: false,
        },
      ],
      timeline: [
        {
          id: "timeline-7",
          date: "2024-01-04T15:00:00Z",
          action: "Application Submitted",
          description: "Application submitted for Cozy Studio Loft",
          performedBy: "Emily Rodriguez",
          type: "submitted",
        },
        {
          id: "timeline-8",
          date: "2024-01-04T15:15:00Z",
          action: "Documents Uploaded",
          description: "Initial documents uploaded (ID Proof, Payslips)",
          performedBy: "Emily Rodriguez",
          type: "document",
        },
      ],
      score: 45,
      budget: "$1500-$2000",
      lastContact: "01/04/2024",
    },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleApps));
  return sampleApps;
}

export function getAllApplications(): Application[] {
  if (typeof window === "undefined") return [];
  return getInitialApplications();
}

export function getApplicationById(id: string): Application | null {
  const applications = getAllApplications();
  return applications.find((app) => app.id === id) || null;
}

export function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  managerEmail: string,
  notes?: string,
  rejectionReason?: string
): boolean {
  const applications = getAllApplications();
  const appIndex = applications.findIndex((app) => app.id === id);
  
  if (appIndex === -1) return false;

  const app = applications[appIndex];
  const oldStatus = app.status;
  app.status = status;
  
  if (notes) app.managerNotes = notes;
  if (rejectionReason) app.rejectionReason = rejectionReason;

  // Add timeline event
  app.timeline.push({
    id: `timeline-${Date.now()}`,
    date: new Date().toISOString(),
    action: "Status Changed",
    description: `Status changed from ${oldStatus} to ${status}${rejectionReason ? ` - Reason: ${rejectionReason}` : ""}`,
    performedBy: managerEmail,
    type: "status_change",
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  
  // Create notification
  createNotification({
    id: `notif-${Date.now()}`,
    applicationId: id,
    applicantEmail: app.applicantEmail,
    type: "status_change",
    message: `Your application status has been updated to ${status}`,
    read: false,
    createdAt: new Date().toISOString(),
  });

  return true;
}

export function shortlistApplication(id: string, managerEmail: string): boolean {
  return updateApplicationStatus(id, "Shortlisted", managerEmail);
}

export function approveApplication(id: string, managerEmail: string): boolean {
  const applications = getAllApplications();
  const app = applications.find((a) => a.id === id);
  
  if (!app) return false;

  // Check if property is available (simplified check)
  // In a real app, you'd check against property availability
  
  // Auto-flag other applications for the same property
  applications.forEach((otherApp) => {
    if (otherApp.propertyId === app.propertyId && otherApp.id !== id && otherApp.status === "Pending") {
      updateApplicationStatus(otherApp.id, "Rejected", managerEmail, undefined, "Property already approved to another applicant");
    }
  });

  return updateApplicationStatus(id, "Approved", managerEmail);
}

export function rejectApplication(id: string, managerEmail: string, reason: string): boolean {
  return updateApplicationStatus(id, "Rejected", managerEmail, undefined, reason);
}

export function requestMoreInfo(id: string, managerEmail: string, message: string): boolean {
  const applications = getAllApplications();
  const appIndex = applications.findIndex((app) => app.id === id);
  
  if (appIndex === -1) return false;

  const app = applications[appIndex];
  app.status = "Info Requested";
  app.infoRequestMessage = message;

  // Add timeline event
  app.timeline.push({
    id: `timeline-${Date.now()}`,
    date: new Date().toISOString(),
    action: "Information Requested",
    description: message,
    performedBy: managerEmail,
    type: "manager_action",
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  
  // Create notification
  createNotification({
    id: `notif-${Date.now()}`,
    applicationId: id,
    applicantEmail: app.applicantEmail,
    type: "info_request",
    message: `Manager has requested more information: ${message}`,
    read: false,
    createdAt: new Date().toISOString(),
  });

  return true;
}

export function markDocumentAsReviewed(applicationId: string, documentId: string): boolean {
  const applications = getAllApplications();
  const appIndex = applications.findIndex((app) => app.id === applicationId);
  
  if (appIndex === -1) return false;

  const docIndex = applications[appIndex].documents.findIndex((doc) => doc.id === documentId);
  if (docIndex === -1) return false;

  applications[appIndex].documents[docIndex].reviewed = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  
  return true;
}

export function markApplicationAsCompleted(id: string, managerEmail: string): boolean {
  return updateApplicationStatus(id, "Completed", managerEmail);
}

export function getApplicationsByStatus(status: ApplicationStatus): Application[] {
  return getAllApplications().filter((app) => app.status === status);
}

export function getApplicationsByProperty(propertyId: string): Application[] {
  return getAllApplications().filter((app) => app.propertyId === propertyId);
}

// Notifications System
export interface ApplicationNotification {
  id: string;
  applicationId: string;
  applicantEmail: string;
  type: "status_change" | "info_request" | "new_application" | "withdrawal";
  message: string;
  read: boolean;
  createdAt: string;
}

function createNotification(notification: ApplicationNotification): void {
  if (typeof window === "undefined") return;
  
  const notifications = getNotifications();
  notifications.push(notification);
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
}

export function getNotifications(): ApplicationNotification[] {
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

