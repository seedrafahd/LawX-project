import { useState } from "react";
import { Outlet } from "react-router-dom";
import MyAppBar from "./AppBar";
import MyDrawer from "./Drawer";

export default function DashboardLayout() {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <MyDrawer
        mobileOpen={isMobileDrawerOpen}
        onMobileClose={() => setIsMobileDrawerOpen(false)}
      />

      <div className="min-w-0 flex-1">
        <MyAppBar onMenuClick={() => setIsMobileDrawerOpen(true)} />

        <div className="mt-16 h-[calc(100vh-64px)] overflow-y-auto bg-[#eff1f8] p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
