import { Outlet } from "react-router-dom";
import MyAppBar from "./AppBar";
import MyDrawer from "./Drawer";
import { Box } from "@mui/material";
import { useProfile } from "../Features/Settings/Hooks/useProfile";
import Loader from "../shared/Components/Loading";

export default function DashboardLayout() {
  // const { isError, error, isLoading } = useProfile();

  // if (isLoading) return <Loader />;
  // if (isError) return <div>{error.message}</div>;
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <MyDrawer />

      <Box sx={{ flexGrow: 1, minWidth: 0, height: "100vh" }}>
        <MyAppBar />

        {/* المحتوى */}
        <Box
          sx={{
            // p-4 sm:p-6 md:p-8
            padding: "32px",
            background: "#eff1f8",
            height: "calc(100vh - 64px)",
            marginTop: "64px",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
