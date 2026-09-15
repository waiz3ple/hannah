import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Pricing } from "./pages/Pricing";
import { Upload } from "./pages/Upload";
import { Dashboard } from "./pages/Dashboard";
import { Gallery } from "./pages/Gallery";
import { OrderDetails } from "./pages/OrderDetails";
import { EventAccess } from "./pages/EventAccess";
import { HelpCenter } from "./pages/HelpCenter";
import { TermsOfService } from "./pages/TermsOfService";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { ContactUs } from "./pages/ContactUs";
import { AboutUs } from "./pages/AboutUs";
import { Root } from "./pages/Root";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminOrders } from "./pages/admin/AdminOrders";
import { AdminUsers } from "./pages/admin/AdminUsers";
import { AdminPackages } from "./pages/admin/AdminPackages";
import { AdminReviews } from "./pages/admin/AdminReviews";
import { AdminGallery } from "./pages/admin/AdminGallery";
import { AdminEvents } from "./pages/admin/AdminEvents";

// Wrap protected components
function ProtectedUpload() {
  return (
    <ProtectedRoute>
      <Upload />
    </ProtectedRoute>
  );
}

function ProtectedDashboard() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

function ProtectedOrderDetails() {
  return (
    <ProtectedRoute>
      <OrderDetails />
    </ProtectedRoute>
  );
}

function ProtectedEventAccess() {
  return (
    <ProtectedRoute>
      <EventAccess />
    </ProtectedRoute>
  );
}

// Admin protected routes
function ProtectedAdminDashboard() {
  return (
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  );
}

function ProtectedAdminOrders() {
  return (
    <AdminRoute>
      <AdminOrders />
    </AdminRoute>
  );
}

function ProtectedAdminUsers() {
  return (
    <AdminRoute>
      <AdminUsers />
    </AdminRoute>
  );
}

function ProtectedAdminPackages() {
  return (
    <AdminRoute>
      <AdminPackages />
    </AdminRoute>
  );
}

function ProtectedAdminReviews() {
  return (
    <AdminRoute>
      <AdminReviews />
    </AdminRoute>
  );
}

function ProtectedAdminGallery() {
  return (
    <AdminRoute>
      <AdminGallery />
    </AdminRoute>
  );
}

function ProtectedAdminEvents() {
  return (
    <AdminRoute>
      <AdminEvents />
    </AdminRoute>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "pricing", Component: Pricing },
      { path: "upload", Component: ProtectedUpload },
      { path: "dashboard", Component: ProtectedDashboard },
      { path: "gallery", Component: Gallery },
      { path: "order/:id", Component: ProtectedOrderDetails },
      { path: "event-access", Component: ProtectedEventAccess },
      { path: "help", Component: HelpCenter },
      { path: "terms", Component: TermsOfService },
      { path: "privacy", Component: PrivacyPolicy },
      { path: "contact", Component: ContactUs },
      { path: "about", Component: AboutUs },
    ],
  },
  // Admin login (no auth required)
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  // Admin routes (require admin auth)
  {
    path: "/admin",
    Component: ProtectedAdminDashboard,
  },
  {
    path: "/admin/orders",
    Component: ProtectedAdminOrders,
  },
  {
    path: "/admin/users",
    Component: ProtectedAdminUsers,
  },
  {
    path: "/admin/packages",
    Component: ProtectedAdminPackages,
  },
  {
    path: "/admin/reviews",
    Component: ProtectedAdminReviews,
  },
  {
    path: "/admin/gallery",
    Component: ProtectedAdminGallery,
  },
  {
    path: "/admin/events",
    Component: ProtectedAdminEvents,
  },
]);