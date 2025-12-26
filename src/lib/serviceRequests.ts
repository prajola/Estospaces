// Shared service request management for user and manager dashboards

export type ServiceStatus = 
  | "Requested"      // Manager view: New request
  | "Assigned"        // Manager view: Vendor assigned
  | "In Progress"     // Both: Service in progress
  | "Completed"       // Both: Service completed
  | "Declined"        // Manager declined
  | "Pending"         // User view: Waiting for manager
  | "Scheduled"       // User view: Vendor assigned
  | "Cancelled";      // User cancelled

export type UrgencyLevel = "Low" | "Medium" | "High" | "Emergency";

export interface ServiceRequest {
  id: string;
  userId: string;              // User who requested
  userEmail: string;           // User email
  userName?: string;            // User name
  service: string;             // Service type name
  serviceId: string;           // Service ID (boiler-repair, etc.)
  description: string;
  location: string;
  propertyName?: string;        // Property name if available
  preferredDate: string;
  preferredTime: string;
  urgency: UrgencyLevel;
  status: ServiceStatus;
  assignedVendor?: string;     // Vendor name
  assignedVendorId?: string;   // Vendor ID
  scheduledDate?: string;
  scheduledTime?: string;
  cost?: string;
  createdAt: string;
  updatedAt: string;
  managerNotes?: string;
  vendorNotes?: string;
  photos?: string[];           // Image URLs
  videos?: string[];           // Video URLs
  workSummary?: string;
  completionDate?: string;
  invoiceUrl?: string;
  declinedReason?: string;     // If declined by manager
}

const STORAGE_KEY = "estospaces_service_requests";
const NOTIFICATIONS_KEY = "estospaces_notifications";

// Get all service requests
export function getAllServiceRequests(): ServiceRequest[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Get service requests for a specific user
export function getUserServiceRequests(userEmail: string): ServiceRequest[] {
  const allRequests = getAllServiceRequests();
  return allRequests.filter(req => req.userEmail === userEmail);
}

// Get service requests for managers (all requests)
export function getManagerServiceRequests(): ServiceRequest[] {
  return getAllServiceRequests();
}

// Create a new service request
export function createServiceRequest(
  userEmail: string,
  request: Omit<ServiceRequest, "id" | "userId" | "userEmail" | "createdAt" | "updatedAt" | "status"> & { photos?: string[]; videos?: string[] }
): ServiceRequest {
  const allRequests = getAllServiceRequests();
  const { photos, videos, ...requestData } = request;
  const newRequest: ServiceRequest = {
    ...requestData,
    id: `SR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId: userEmail,
    userEmail,
    status: "Requested", // Manager sees as "Requested", user sees as "Pending"
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    photos: photos || [],
    videos: videos || [],
  };

  allRequests.unshift(newRequest); // Add to beginning
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allRequests));

  // Create notification for manager
  createNotification({
    id: `notif-${Date.now()}`,
    userId: "manager", // All managers
    type: "service_request",
    title: "New Service Request",
    message: `${request.service} requested by ${userEmail}`,
    serviceRequestId: newRequest.id,
    read: false,
    createdAt: new Date().toISOString(),
  });

  return newRequest;
}

// Update service request
export function updateServiceRequest(
  requestId: string,
  updates: Partial<ServiceRequest>
): ServiceRequest | null {
  const allRequests = getAllServiceRequests();
  const index = allRequests.findIndex(req => req.id === requestId);
  
  if (index === -1) return null;

  const updatedRequest: ServiceRequest = {
    ...allRequests[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  allRequests[index] = updatedRequest;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allRequests));

  // Create notification for user if status changed
  if (updates.status && updates.status !== allRequests[index].status) {
    const statusMessages: Record<string, string> = {
      "Assigned": "Your service request has been assigned to a vendor",
      "In Progress": "Service work has started",
      "Completed": "Your service request has been completed",
      "Declined": "Your service request has been declined",
    };

    if (statusMessages[updates.status]) {
      createNotification({
        id: `notif-${Date.now()}`,
        userId: updatedRequest.userEmail,
        type: "service_status",
        title: "Service Request Update",
        message: statusMessages[updates.status],
        serviceRequestId: requestId,
        read: false,
        createdAt: new Date().toISOString(),
      });
    }
  }

  return updatedRequest;
}

// Delete service request
export function deleteServiceRequest(requestId: string): boolean {
  const allRequests = getAllServiceRequests();
  const filtered = allRequests.filter(req => req.id !== requestId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return filtered.length < allRequests.length;
}

// Notification interface
export interface Notification {
  id: string;
  userId: string;
  type: "service_request" | "service_status" | "general";
  title: string;
  message: string;
  serviceRequestId?: string;
  read: boolean;
  createdAt: string;
}

// Get notifications for a user
export function getNotifications(userId: string): Notification[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(NOTIFICATIONS_KEY);
  const allNotifications: Notification[] = stored ? JSON.parse(stored) : [];
  return allNotifications.filter(notif => notif.userId === userId || notif.userId === "manager");
}

// Create notification
export function createNotification(notification: Notification): void {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem(NOTIFICATIONS_KEY);
  const allNotifications: Notification[] = stored ? JSON.parse(stored) : [];
  allNotifications.unshift(notification);
  // Keep only last 100 notifications
  const limited = allNotifications.slice(0, 100);
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(limited));
}

// Mark notification as read
export function markNotificationAsRead(notificationId: string): void {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem(NOTIFICATIONS_KEY);
  const allNotifications: Notification[] = stored ? JSON.parse(stored) : [];
  const updated = allNotifications.map(notif =>
    notif.id === notificationId ? { ...notif, read: true } : notif
  );
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
}

// Mark all notifications as read for a user
export function markAllNotificationsAsRead(userId: string): void {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem(NOTIFICATIONS_KEY);
  const allNotifications: Notification[] = stored ? JSON.parse(stored) : [];
  const updated = allNotifications.map(notif =>
    (notif.userId === userId || notif.userId === "manager") && !notif.read
      ? { ...notif, read: true }
      : notif
  );
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
}

// Get unread notification count
export function getUnreadNotificationCount(userId: string): number {
  const notifications = getNotifications(userId);
  return notifications.filter(notif => !notif.read).length;
}

// Map manager status to user status
export function mapStatusForUser(status: ServiceStatus): ServiceStatus {
  switch (status) {
    case "Requested":
      return "Pending";
    case "Assigned":
      return "Scheduled";
    case "In Progress":
      return "In Progress";
    case "Completed":
      return "Completed";
    case "Declined":
      return "Cancelled";
    default:
      return status;
  }
}

// Map user status to manager status
export function mapStatusForManager(status: ServiceStatus): ServiceStatus {
  switch (status) {
    case "Pending":
      return "Requested";
    case "Scheduled":
      return "Assigned";
    case "In Progress":
      return "In Progress";
    case "Completed":
      return "Completed";
    case "Cancelled":
      return "Declined";
    default:
      return status;
  }
}

