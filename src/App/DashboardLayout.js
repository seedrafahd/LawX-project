import { Outlet } from "react-router-dom";
import MyAppBar from "./AppBar";
import MyDrawer from "./Drawer";
import { Box, Toolbar } from "@mui/material";
import { useProfile } from "../Features/Settings/Hooks/useProfile";
import Loader from "../shared/Components/Loading";

export default function DashboardLayout() {
  // const { isError, error, isLoading } = useProfile();

  // if (isLoading) return <Loader />;
  // if (isError) return <div>{error.message}</div>;
  return (
    <Box sx={{ display: "flex" }}>
      <MyDrawer />

      <Box sx={{ flexGrow: 1 }}>
        <MyAppBar />

        {/* المحتوى */}
        <Box
          sx={{
            // p-4 sm:p-6 md:p-8
            padding: "32px",
            background: "#eff1f8",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
