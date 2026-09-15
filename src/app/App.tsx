import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthModalProvider } from "./contexts/AuthModalContext";

export default function App() {
  return (
    <AuthProvider>
      <AuthModalProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" richColors />
      </AuthModalProvider>
    </AuthProvider>
  );
}