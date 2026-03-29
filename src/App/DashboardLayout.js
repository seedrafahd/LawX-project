import { Outlet } from "react-router-dom";
import MyAppBar from "./AppBar";
import MyDrawer from "./Drawer";

export default function DashboardLayout() {
  return (
    <div className="flex flex-row h-screen bg-gray-50">
      <MyDrawer />
      <div className="flex-1 flex flex-col overflow-hidden">
        <MyAppBar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
