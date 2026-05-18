// /dashboard - signed-in personal home. real data from local stores.

import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";
import { usePreferences, useRecents } from "@/features/analogy/store";
import { usePresets } from "@/features/analogy/presets";
import { DashboardView } from "@/features/analogy/DashboardView";
import { AnalyticsToggle } from "@/features/analogy/AnalyticsToggle";
import { SiteFooter, SiteNav } from "@/components/SiteNav";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { recents } = useRecents();
  const { preferences } = usePreferences();
  const presets = usePresets();

  if (loading) {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <section className="container max-w-3xl py-16 text-sm text-muted-foreground">checking…</section>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen">
      <SiteNav />
      <DashboardView
        greeting={
          <>
            welcome back, <span className="italic">{user.email?.split("@")[0] ?? "thinker"}</span>.
          </>
        }
        subtitle="a quiet home base. your translations, references, and topics in one place. nothing is computed about your searches unless you opt in below."
        recents={recents}
        presets={presets}
        analyticsEnabled={!!preferences.analyticsOptIn}
        analyticsControl={<AnalyticsToggle variant="inline" />}
        links={{
          app: "/app",
          history: "/history",
          topics: "/topics",
          account: "/account",
          recentHref: (id) => `/explain?recent=${id}`,
        }}
      />
      <SiteFooter />
    </div>
  );
};

export default Dashboard;
