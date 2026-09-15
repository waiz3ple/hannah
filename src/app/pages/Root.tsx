import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AuthModal } from "../components/AuthModal";
import { useAuthModal } from "../contexts/AuthModalContext";

export function Root() {
  const { isOpen, closeAuthModal } = useAuthModal();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AuthModal open={isOpen} onOpenChange={closeAuthModal} />
    </div>
  );
}