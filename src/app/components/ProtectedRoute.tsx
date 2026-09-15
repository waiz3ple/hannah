import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useAuthModal } from "../contexts/AuthModalContext";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const { openAuthModal } = useAuthModal();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      // Show the login modal instead of redirecting
      openAuthModal();
    }
  }, [loading, user, openAuthModal]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-pink-500" />
      </div>
    );
  }

  if (!user) {
    // Redirect to home with a return path
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}