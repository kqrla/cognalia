// /demo/dashboard - read-only walkthrough of the signed-in dashboard,
// populated with mock recents/presets. no auth, no writes, no real
// preferences. lets a visitor feel the shape of an account before
// deciding to make one.

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DashboardView } from "@/features/analogy/DashboardView";
import { demoPresets, demoRecents } from "@/features/analogy/demoData";
import { SiteFooter, SiteNav } from "@/components/SiteNav";

const DemoDashboard = () => {
  // local-only toggle that simulates the analytics opt-in without
  // touching real preferences. starts ON so visitors see the full
  // analytics panel rendered.
  const [analyticsOn, setAnalyticsOn] = useState(true);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <DashboardView
        greeting={
          <>
            welcome back, <span className="italic">demo</span>.
          </>
        }
        subtitle="this is a sandbox tour of what your dashboard would look like once you've translated a few concepts. nothing here is real, nothing is saved."
        recents={demoRecents}
        presets={demoPresets}
        analyticsEnabled={analyticsOn}
        analyticsControl={
          <label className="inline-flex shrink-0 cursor-pointer items-center gap-2 text-xs">
            <span className="text-muted-foreground">{analyticsOn ? "on" : "off"}</span>
            <input
              type="checkbox"
              checked={analyticsOn}
              onChange={(e) => setAnalyticsOn(e.target.checked)}
              className="h-4 w-4"
            />
          </label>
        }
        links={{
          app: "/demo",
          history: "/demo",
          topics: "/demo",
          account: "/demo",
          recentHref: () => "/demo",
        }}
        banner={
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-primary/30 bg-primary/5 px-4 py-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">demo</span>
              <span className="text-muted-foreground">a sandbox tour. no account needed, nothing is saved.</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/demo" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-3 w-3" /> demo home
              </Link>
              <Link to="/register" className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                create the real thing
              </Link>
            </div>
          </div>
        }
      />
      <SiteFooter />
    </div>
  );
};

export default DemoDashboard;
