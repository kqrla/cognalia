// /demo/dashboard - read-only walkthrough of the signed-in dashboard,
// populated with mock recents/presets. uses the demo navbar so the
// chrome itself reflects what the signed-in experience looks like.

import { useState } from "react";
import { DashboardView } from "@/features/analogy/DashboardView";
import { demoPresets, demoRecents } from "@/features/analogy/demoData";
import { SiteFooter } from "@/components/SiteNav";
import { DemoBanner, DemoNav } from "@/components/DemoNav";

const DemoDashboard = () => {
  const [analyticsOn, setAnalyticsOn] = useState(true);

  return (
    <div className="min-h-screen">
      <DemoNav />
      <DemoBanner />
      <DashboardView
        greeting={<>welcome back, <span className="italic">demo</span>.</>}
        subtitle="this is what your dashboard looks like once you've translated a few concepts. every link in the navbar above routes within the demo."
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
          app: "/demo/dashboard",
          history: "/demo/history",
          topics: "/demo/personalize",
          account: "/demo/account",
          recentHref: () => "/demo/history",
        }}
      />
      <SiteFooter />
    </div>
  );
};

export default DemoDashboard;
