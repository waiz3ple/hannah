import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "motion/react";
import { Camera, Lock, Mail, AlertCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Check if user is admin first
      const isAdmin = checkAdminStatus(email);
      
      if (!isAdmin) {
        setError("Access denied. This email is not authorized as an admin.");
        setLoading(false);
        return;
      }

      // Try to sign in
      await signIn(email, password);
      
      // If sign in successful, navigate to admin
      navigate("/admin");
    } catch (err: any) {
      setError(err?.message || "Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  const checkAdminStatus = (email: string): boolean => {
    // For development, these emails are admins
    // In production, this should check against a database
    const adminEmails = [
      "admin@freshedit.com",
      "support@freshedit.com",
      "owner@freshedit.com"
    ];
    
    return adminEmails.includes(email.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-600 mb-4"
          >
            <Camera className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">FreshEdit Admin</h1>
          <p className="text-gray-600">Secure administrative access</p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your admin credentials to access the control panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800 text-sm"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Admin Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@freshedit.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6 text-base"
                disabled={loading}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  "Sign In to Admin Panel"
                )}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-xs text-gray-600 text-center">
                  <Lock className="w-3 h-3 inline mr-1" />
                  This is a secure admin area. All access is logged and monitored.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs font-semibold text-blue-900 mb-2">Development Access:</p>
                <div className="space-y-1 text-xs text-blue-800">
                  <p>• Create an account with email: <span className="font-mono font-semibold">admin@freshedit.com</span></p>
                  <p>• Then sign in here with that account</p>
                  <p className="text-blue-700 mt-2 italic">Note: You must first create this account on the main site, then use it to log in here.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <a
            href="/"
            className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            ← Back to FreshEdit Home
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
