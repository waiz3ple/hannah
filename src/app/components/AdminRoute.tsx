import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "motion/react";
import { Camera } from "lucide-react";

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setChecking(false);
        return;
      }

      // For development, these emails are admins
      // In production, this should check against a database
      const adminEmails = [
        "admin@freshedit.com",
        "support@freshedit.com",
        "owner@freshedit.com"
      ];

      const isUserAdmin = adminEmails.includes(user.email.toLowerCase());
      setIsAdmin(isUserAdmin);
      setChecking(false);
    };

    if (!loading) {
      checkAdminStatus();
    }
  }, [user, loading]);

  // Show loading screen while checking auth
  if (loading || checking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-600 mb-4"
          >
            <Camera className="w-10 h-10 text-white" />
          </motion.div>
          <p className="text-gray-600 font-medium">Verifying admin access...</p>
        </motion.div>
      </div>
    );
  }

  // Redirect to admin login if not authenticated or not admin
  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
