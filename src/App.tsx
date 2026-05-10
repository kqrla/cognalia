import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
