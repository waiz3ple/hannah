// Centralized seed data for FreshEdit admin panel
// All data is consistent across pages with proper relationships

import { getLocalImage } from "../app/utils/localImageLibrary";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: "Active" | "Inactive";
}

export interface Order {
  id: string;
  orderId: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  packageType: "Starter" | "Professional" | "Premium";
  photoCount: number;
  urgency: "Standard" | "Express" | "Rush";
  status: "Pending" | "In Progress" | "Completed" | "Delivered";
  orderDate: string;
  deliveryDate: string;
  amount: number;
  paid: boolean;
}

export interface Review {
  id: string;
  orderId: string;
  customerName: string;
  rating: number;
  comment: string;
  submittedDate: string;
  status: "Pending" | "Approved" | "Rejected";
  allowGallery: boolean;
}

export interface GalleryPhoto {
  id: string;
  imageUrl: string;
  customerName: string;
  orderId: string;
  uploadDate: string;
  category: string;
  featured: boolean;
}

export interface Package {
  id: string;
  name: "Starter" | "Professional" | "Premium";
  photoLimit: number;
  price: number;
  features: string[];
  isActive: boolean;
}

export interface EventCode {
  id: string;
  code: string;
  eventName: string;
  eventType: "Event" | "Studio";
  eventDate: string;
  location: string;
  photoCount: number;
  customerCount: number;
  status: "Active" | "Completed" | "Expired";
  createdDate: string;
}

// Seed Users
export const seedUsers: User[] = [
  {
    id: "USR-001",
    name: "Amaka Johnson",
    email: "amaka.johnson@email.com",
    phone: "+234 803 456 7890",
    joinDate: "2024-01-15",
    totalOrders: 3,
    totalSpent: 125000,
    status: "Active",
  },
  {
    id: "USR-002",
    name: "Chidinma Okafor",
    email: "chidinma.okafor@email.com",
    phone: "+234 805 123 4567",
    joinDate: "2024-02-01",
    totalOrders: 2,
    totalSpent: 95000,
    status: "Active",
  },
  {
    id: "USR-003",
    name: "Blessing Adeyemi",
    email: "blessing.adeyemi@email.com",
    phone: "+234 807 890 1234",
    joinDate: "2024-02-10",
    totalOrders: 4,
    totalSpent: 180000,
    status: "Active",
  },
  {
    id: "USR-004",
    name: "Grace Nwankwo",
    email: "grace.nwankwo@email.com",
    phone: "+234 809 567 8901",
    joinDate: "2024-02-15",
    totalOrders: 1,
    totalSpent: 35000,
    status: "Active",
  },
  {
    id: "USR-005",
    name: "Funmi Adeleke",
    email: "funmi.adeleke@email.com",
    phone: "+234 810 234 5678",
    joinDate: "2024-02-20",
    totalOrders: 2,
    totalSpent: 75000,
    status: "Active",
  },
  {
    id: "USR-006",
    name: "Zainab Ibrahim",
    email: "zainab.ibrahim@email.com",
    phone: "+234 812 345 6789",
    joinDate: "2024-03-01",
    totalOrders: 1,
    totalSpent: 45000,
    status: "Active",
  },
];

// Seed Orders
export const seedOrders: Order[] = [
  {
    id: "1",
    orderId: "ORD-2024-001",
    userId: "USR-001",
    customerName: "Amaka Johnson",
    customerEmail: "amaka.johnson@email.com",
    packageType: "Professional",
    photoCount: 25,
    urgency: "Standard",
    status: "Completed",
    orderDate: "2024-03-01",
    deliveryDate: "2024-03-08",
    amount: 45000,
    paid: true,
  },
  {
    id: "2",
    orderId: "ORD-2024-002",
    userId: "USR-002",
    customerName: "Chidinma Okafor",
    customerEmail: "chidinma.okafor@email.com",
    packageType: "Starter",
    photoCount: 8,
    urgency: "Express",
    status: "Completed",
    orderDate: "2024-03-02",
    deliveryDate: "2024-03-06",
    amount: 35000,
    paid: true,
  },
  {
    id: "3",
    orderId: "ORD-2024-003",
    userId: "USR-003",
    customerName: "Blessing Adeyemi",
    customerEmail: "blessing.adeyemi@email.com",
    packageType: "Premium",
    photoCount: 45,
    urgency: "Standard",
    status: "In Progress",
    orderDate: "2024-03-03",
    deliveryDate: "2024-03-13",
    amount: 75000,
    paid: true,
  },
  {
    id: "4",
    orderId: "ORD-2024-004",
    userId: "USR-004",
    customerName: "Grace Nwankwo",
    customerEmail: "grace.nwankwo@email.com",
    packageType: "Starter",
    photoCount: 10,
    urgency: "Rush",
    status: "Delivered",
    orderDate: "2024-03-04",
    deliveryDate: "2024-03-07",
    amount: 35000,
    paid: true,
  },
  {
    id: "5",
    orderId: "ORD-2024-005",
    userId: "USR-005",
    customerName: "Funmi Adeleke",
    customerEmail: "funmi.adeleke@email.com",
    packageType: "Professional",
    photoCount: 30,
    urgency: "Express",
    status: "Completed",
    orderDate: "2024-03-05",
    deliveryDate: "2024-03-09",
    amount: 55000,
    paid: true,
  },
  {
    id: "6",
    orderId: "ORD-2024-006",
    userId: "USR-001",
    customerName: "Amaka Johnson",
    customerEmail: "amaka.johnson@email.com",
    packageType: "Premium",
    photoCount: 50,
    urgency: "Standard",
    status: "Pending",
    orderDate: "2024-03-06",
    deliveryDate: "2024-03-16",
    amount: 80000,
    paid: false,
  },
];

// Seed Reviews (only for completed/delivered orders)
export const seedReviews: Review[] = [
  {
    id: "1",
    orderId: "ORD-2024-001",
    customerName: "Amaka Johnson",
    rating: 5,
    comment: "Absolutely stunning work! The editing brought out the best in every photo. The team was professional and delivered exactly what I wanted. Highly recommend FreshEdit!",
    submittedDate: "2024-03-09",
    status: "Approved",
    allowGallery: true,
  },
  {
    id: "2",
    orderId: "ORD-2024-002",
    customerName: "Chidinma Okafor",
    rating: 4,
    comment: "Great service and beautiful results. The express delivery was worth it. My photos look amazing!",
    submittedDate: "2024-03-07",
    status: "Approved",
    allowGallery: true,
  },
  {
    id: "3",
    orderId: "ORD-2024-004",
    customerName: "Grace Nwankwo",
    rating: 5,
    comment: "I'm blown away by the quality! The rush service was incredibly fast and the results exceeded my expectations. Thank you FreshEdit!",
    submittedDate: "2024-03-08",
    status: "Pending",
    allowGallery: false,
  },
  {
    id: "4",
    orderId: "ORD-2024-005",
    customerName: "Funmi Adeleke",
    rating: 5,
    comment: "Perfect editing on all my fashion photos. The colors are vibrant and the details are crisp. Will definitely order again!",
    submittedDate: "2024-03-10",
    status: "Approved",
    allowGallery: true,
  },
];

// Seed Gallery Photos (only from approved reviews with allowGallery: true)
export const seedGalleryPhotos: GalleryPhoto[] = [
  {
    id: "1",
    imageUrl: getLocalImage(4),
    customerName: "Amaka Johnson",
    orderId: "ORD-2024-001",
    uploadDate: "2024-03-09",
    category: "Portrait",
    featured: true,
  },
  {
    id: "2",
    imageUrl: getLocalImage(11),
    customerName: "Chidinma Okafor",
    orderId: "ORD-2024-002",
    uploadDate: "2024-03-07",
    category: "Fashion",
    featured: false,
  },
  {
    id: "3",
    imageUrl: getLocalImage(19),
    customerName: "Amaka Johnson",
    orderId: "ORD-2024-001",
    uploadDate: "2024-03-09",
    category: "Lifestyle",
    featured: true,
  },
  {
    id: "4",
    imageUrl: getLocalImage(26),
    customerName: "Funmi Adeleke",
    orderId: "ORD-2024-005",
    uploadDate: "2024-03-10",
    category: "Portrait",
    featured: false,
  },
  {
    id: "5",
    imageUrl: getLocalImage(34),
    customerName: "Funmi Adeleke",
    orderId: "ORD-2024-005",
    uploadDate: "2024-03-10",
    category: "Fashion",
    featured: true,
  },
];

// Seed Packages
export const seedPackages: Package[] = [
  {
    id: "1",
    name: "Starter",
    photoLimit: 10,
    price: 25000,
    features: [
      "Up to 10 photos",
      "Basic color correction",
      "Skin smoothing",
      "Standard delivery (7 days)",
    ],
    isActive: true,
  },
  {
    id: "2",
    name: "Professional",
    photoLimit: 30,
    price: 45000,
    features: [
      "Up to 30 photos",
      "Advanced color grading",
      "Professional retouching",
      "Background enhancement",
      "Priority support",
    ],
    isActive: true,
  },
  {
    id: "3",
    name: "Premium",
    photoLimit: 50,
    price: 75000,
    features: [
      "Up to 50 photos",
      "Expert-level editing",
      "Full photo manipulation",
      "Custom background replacement",
      "Facial feature refinement",
      "24/7 dedicated support",
    ],
    isActive: true,
  },
];

// Seed Events
export const seedEvents: EventCode[] = [
  {
    id: "1",
    code: "EVENT2024WEDDING",
    eventName: "Adebayo-Johnson Wedding",
    eventType: "Event",
    eventDate: "2024-03-15",
    location: "Lagos Oriental Hotel",
    photoCount: 250,
    customerCount: 45,
    status: "Active",
    createdDate: "2024-03-01",
  },
  {
    id: "2",
    code: "STUDIO2024MARCH",
    eventName: "March Studio Sessions",
    eventType: "Studio",
    eventDate: "2024-03-10",
    location: "FreshEdit Studio - Victoria Island",
    photoCount: 120,
    customerCount: 8,
    status: "Completed",
    createdDate: "2024-02-28",
  },
  {
    id: "3",
    code: "EVENT2024BIRTHDAY",
    eventName: "Chioma's 25th Birthday Party",
    eventType: "Event",
    eventDate: "2024-03-20",
    location: "Radisson Blu Hotel",
    photoCount: 180,
    customerCount: 32,
    status: "Active",
    createdDate: "2024-03-02",
  },
  {
    id: "4",
    code: "STUDIO2024CORP",
    eventName: "Corporate Headshots",
    eventType: "Studio",
    eventDate: "2024-02-25",
    location: "FreshEdit Studio - Lekki",
    photoCount: 50,
    customerCount: 12,
    status: "Completed",
    createdDate: "2024-02-20",
  },
];

// Calculate dashboard stats from seed data
export const calculateDashboardStats = () => {
  return {
    totalOrders: seedOrders.length,
    activeOrders: seedOrders.filter(o => o.status === "In Progress" || o.status === "Pending").length,
    completedOrders: seedOrders.filter(o => o.status === "Completed" || o.status === "Delivered").length,
    totalRevenue: seedOrders.reduce((sum, order) => sum + order.amount, 0),
    totalUsers: seedUsers.length,
    pendingReviews: seedReviews.filter(r => r.status === "Pending").length,
    galleryPhotos: seedGalleryPhotos.length,
    activeEvents: seedEvents.filter(e => e.status === "Active").length,
  };
};
