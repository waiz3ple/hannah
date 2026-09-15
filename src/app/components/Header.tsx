import { Link } from "react-router";
import { Camera, Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";
import { useAuthModal } from "../contexts/AuthModalContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { toast } from "sonner";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { openAuthModal } = useAuthModal();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error: any) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Camera className="size-8 text-pink-500" />
          <span className="text-2xl font-bold text-gray-900">
            FreshEdit
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-pink-500 transition-colors">
            Home
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-pink-500 transition-colors">
            Pricing
          </Link>
          <Link to="/gallery" className="text-sm font-medium hover:text-pink-500 transition-colors">
            Gallery
          </Link>
          {user && (
            <>
              <Link to="/event-access" className="text-sm font-medium hover:text-pink-500 transition-colors">
                Event Photos
              </Link>
              <Link to="/dashboard" className="text-sm font-medium hover:text-pink-500 transition-colors">
                My Orders
              </Link>
            </>
          )}
          
          {user ? (
            <>
              <Link to="/upload">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Upload Photos
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 size-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              onClick={() => openAuthModal()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-sm font-medium hover:text-pink-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium hover:text-pink-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/gallery"
              className="text-sm font-medium hover:text-pink-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-pink-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            {user && (
              <>
                <Link
                  to="/event-access"
                  className="text-sm font-medium hover:text-pink-500 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Event Photos
                </Link>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium hover:text-pink-500 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Orders
                </Link>
              </>
            )}
            
            {user ? (
              <>
                <Link to="/upload" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Upload Photos
                  </Button>
                </Link>
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-1">{user.name}</p>
                  <p className="text-xs text-gray-600 mb-3">{user.email}</p>
                  <Button
                    variant="outline"
                    className="w-full text-red-600"
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 size-4" />
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <Button
                onClick={() => {
                  openAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}