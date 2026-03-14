import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Admin from "./pages/Admin";
import ConceptDetail from "./pages/ConceptDetail";
import Concepts from "./pages/Concepts";
import Explained from "./pages/Explained";
import ExplainedDetail from "./pages/ExplainedDetail";
import Home from "./pages/Home";
import Projects from "./pages/Projects";

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const conceptsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/concepts",
  component: Concepts,
});
const conceptDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/concepts/$id",
  component: ConceptDetail,
});
const explainedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/explained",
  component: Explained,
});
const explainedDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/explained/$id",
  component: ExplainedDetail,
});
const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects",
  component: Projects,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: Admin,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  conceptsRoute,
  conceptDetailRoute,
  explainedRoute,
  explainedDetailRoute,
  projectsRoute,
  aboutRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
