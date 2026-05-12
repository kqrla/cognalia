import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCloudSync } from "@/features/auth/cloudSync";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Explain from "./pages/Explain";
import Onboarding from "./pages/Onboarding";
import About from "./pages/About";
import Features from "./pages/Features";
import Faq from "./pages/Faq";
import Graph from "./pages/Graph";
import History from "./pages/History";
import SharedPage from "./pages/Shared";
import Peripheral from "./pages/Peripheral";
import Suggest from "./pages/Suggest";
import PresetView from "./pages/PresetView";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Roadmap from "./pages/Roadmap";
import Goals from "./pages/Goals";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

// background hook: only does anything when the user is signed in.
const SyncRunner = () => {
  useCloudSync();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SyncRunner />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/explain" element={<Explain />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/history" element={<History />} />
          <Route path="/s/:id" element={<SharedPage />} />
          <Route path="/peripheral" element={<Peripheral />} />
          <Route path="/suggest" element={<Suggest />} />
          <Route path="/preset/:slug" element={<PresetView />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/goals" element={<Goals />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
