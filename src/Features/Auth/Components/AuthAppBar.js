import lawXImage from "../../../App/Assets/law_X.png";
import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

export default function AuthAppBar() {
  return (
    <Box>
      <AppBar
        position="fixed"
        sx={(theme) => ({
          color: theme.palette.primary.main,
          backgroundColor: "#fff",
          boxShadow: "none",
          borderBottom: "1px solid #CAC4D080",
          paddingY: "10px",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        })}
      >
        <Toolbar>
          {/* right //////////////////////////////////*/}
          <Box sx={{ display: "flex", width: 200 }}>
            <Avatar alt="Logo" src={lawXImage} sx={{ width: 60, height: 60 }} />
            <Typography sx={{ fontSize: 20, color: "#868686" }}>
              Powersed by FetureX
            </Typography>
          </Box>

          {/*left //////////////////// */}
          <Box sx={{ flexGrow: 1 }} />
          {/* <Box sx={{ display: { xs: "none", md: "flex" }, padding: {} }}> */}
          <Box sx={{ display: "flex", gap: "16px" }}>
            <DarkModeOutlinedIcon sx={{ color: "#868686" }} />
            <HelpOutlineOutlinedIcon sx={{ color: "#868686" }} />
          </Box>
          {/* </Box> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
