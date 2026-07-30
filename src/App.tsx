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
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Account from "./pages/Account";
import Roadmap from "./pages/Roadmap";
import Goals from "./pages/Goals";
import Mechanisms from "./pages/Mechanisms";
import Philosophy from "./pages/Philosophy";
import Graphical from "./pages/Graphical";
import Pricing from "./pages/Pricing";
import Substrate from "./pages/Substrate";
import SubstrateApp from "./pages/SubstrateApp";
import Dashboard from "./pages/Dashboard";
import Topics from "./pages/Topics";
import Demo from "./pages/Demo";
import DemoDashboard from "./pages/DemoDashboard";
import DemoAccount from "./pages/DemoAccount";
import DemoHistory from "./pages/DemoHistory";
import DemoGraph from "./pages/DemoGraph";
import DemoPersonalize from "./pages/DemoPersonalize";
import DemoPreferences from "./pages/DemoPreferences";
import WhyRegister from "./pages/WhyRegister";
import NotFound from "./pages/NotFound.tsx";
import Examples from "./pages/Examples";
import ExampleTopic from "./pages/ExampleTopic";
import Contact from "./pages/Contact";
import BrowseAll from "./pages/BrowseAll";
import Compare from "./pages/Compare";
import Studio from "./pages/Studio";
import Team from "./pages/Team";
import LandingClone from "./pages/LandingClone";
import AuthorsNote from "./pages/AuthorsNote";
import AnnotationsGuide from "./pages/AnnotationsGuide";
import Subjects from "./pages/Subjects";
import Subject from "./pages/Subject";
import SubSubject from "./pages/SubSubject";
import Anthropomorphize from "./pages/Anthropomorphize";

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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/account" element={<Account />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/mechanisms" element={<Mechanisms />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/graphical" element={<Graphical />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/substrate" element={<Substrate />} />
          <Route path="/substrate/app" element={<SubstrateApp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/demo/dashboard" element={<DemoDashboard />} />
          <Route path="/demo/account" element={<DemoAccount />} />
          <Route path="/demo/history" element={<DemoHistory />} />
          <Route path="/demo/graph" element={<DemoGraph />} />
          <Route path="/demo/personalize" element={<DemoPersonalize />} />
          <Route path="/demo/preferences" element={<DemoPreferences />} />
          <Route path="/whyregister" element={<WhyRegister />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/examples/:topic" element={<ExampleTopic />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/browseall" element={<BrowseAll />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/studio/team" element={<Team />} />
          <Route path="/team" element={<Team />} />
          <Route path="/landingclone" element={<LandingClone />} />
          <Route path="/authorsnote" element={<AuthorsNote />} />
          <Route path="/annotations-guide" element={<AnnotationsGuide />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subject/:subject" element={<Subject />} />
          <Route path="/subject/:subject/:sub" element={<SubSubject />} />
          <Route path="/anthropomorphize" element={<Anthropomorphize />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
