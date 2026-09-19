import { createBrowserRouter, RouterProvider } from "react-router";
import { MotionConfig } from "motion/react";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Portfolio, CaseStudy } from "./pages/Portfolio";
import { Expertise } from "./pages/Expertise";
import { BehindTheProgramme, ArticlePage } from "./pages/BehindTheProgramme";
import { Media } from "./pages/Media";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "portfolio", Component: Portfolio },
      { path: "portfolio/:slug", Component: CaseStudy },
      { path: "expertise", Component: Expertise },
      { path: "behind-the-programme", Component: BehindTheProgramme },
      { path: "behind-the-programme/:slug", Component: ArticlePage },
      { path: "media", Component: Media },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  );
}
