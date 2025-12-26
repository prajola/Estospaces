import { Property } from "@/components/PropertyCard";

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    location: "123 Main St, Downtown",
    price: 2500,
    priceType: "month",
    beds: 2,
    baths: 2,
    sqft: 1200,
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Modern Downtown Apartment",
    location: "456 Oak Ave, Midtown",
    price: 3200,
    priceType: "month",
    beds: 3,
    baths: 2,
    sqft: 1500,
    rating: 4.6,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    isFeatured: true,
  },
  {
    id: "3",
    title: "Modern Downtown Apartment",
    location: "789 Pine Rd, Uptown",
    price: 1800,
    priceType: "month",
    beds: 1,
    baths: 1,
    sqft: 850,
    rating: 4.5,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    isNew: true,
  },
  {
    id: "4",
    title: "Modern Downtown Apartment",
    location: "321 Elm St, Westside",
    price: 4500,
    priceType: "month",
    beds: 4,
    baths: 3,
    sqft: 2200,
    rating: 4.9,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    isFeatured: true,
  },
  {
    id: "5",
    title: "Modern Downtown Apartment",
    location: "555 Beach Blvd, Seaside",
    price: 2800,
    priceType: "month",
    beds: 2,
    baths: 2,
    sqft: 1100,
    rating: 4.7,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    title: "Modern Downtown Apartment",
    location: "777 Hill Dr, Heights",
    price: 3500,
    priceType: "month",
    beds: 3,
    baths: 2,
    sqft: 1650,
    rating: 4.8,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
    isNew: true,
    isFeatured: true,
  },
];

export interface Application {
  id: string;
  property: Property;
  status: "under_review" | "approved" | "rejected" | "pending" | "scheduled";
  appliedDate: string;
  nextStep?: string;
  nextStepDate?: string;
  viewingDate?: string;
}

export const mockApplications: Application[] = [
  {
    id: "app1",
    property: mockProperties[0],
    status: "under_review",
    appliedDate: "2025-01-15",
    nextStep: "Schedule viewing",
    nextStepDate: "2025-01-20",
  },
  {
    id: "app2",
    property: mockProperties[1],
    status: "scheduled",
    appliedDate: "2025-01-10",
    nextStep: "Attend viewing",
    viewingDate: "2025-01-22",
  },
  {
    id: "app3",
    property: mockProperties[2],
    status: "pending",
    appliedDate: "2025-01-18",
  },
];

export const mockSavedProperties = mockProperties.slice(0, 4);

export const mockAIPicks = mockProperties.slice(2, 6);

export const dashboardStats = {
  propertiesAvailable: 156,
  savedFavorites: 12,
  activeApplications: 3,
};
