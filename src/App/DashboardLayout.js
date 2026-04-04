import { Outlet } from "react-router-dom";
import MyAppBar from "./AppBar";
import MyDrawer from "./Drawer";
import { Box, Toolbar } from "@mui/material";

export default function DashboardLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <MyDrawer />

      <Box sx={{ flexGrow: 1 }}>
        <MyAppBar />

        {/* المحتوى */}
        <Box
          sx={{
            padding: "32px",
            background: "#f5f7fb",
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
