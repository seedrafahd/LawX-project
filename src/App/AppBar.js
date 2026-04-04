import { useLocation } from "react-router-dom";
import { pageConfig } from "./Config/pageConfig";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";

const sorce = "/assets/logo.png";

export default function MyAppBar() {
  const location = useLocation();
  const currentPage = pageConfig[location.pathname] || {};
  return (
    <Box>
      <AppBar
        position="fixed"
        sx={(theme) => ({
          color: theme.palette.primary.main,
          backgroundColor: "#fff",
          boxShadow: "none",
          borderBottom: "1px solid #CAC4D080",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        })}
      >
        <Toolbar>
          {/* Title //////////////////////////////////*/}
          {currentPage.type === "dashboard" ? (
            <Box>
              <Typography
                variant="h5"
                noWrap
                component="div"
                color="#464646"
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontWeight: "bold",
                }}
              >
                {currentPage.title || "لوحة التحكم"}
              </Typography>
              <Typography
                variant="h7"
                noWrap
                component="div"
                color="gray"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {currentPage.subtitle}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: "8px" }}>
              <currentPage.icon sx={{ height: "32px" }} />
              <Typography
                variant="h6"
                noWrap
                component="div"
                color="#464646"
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontWeight: "bold",
                }}
              >
                {currentPage.title}
              </Typography>
            </Box>
          )}
          {/*left //////////////////// */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, padding: {} }}>
            <Grid container spacing={1}>
              <Grid size={8}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="🔍 بحث"
                  size="small"
                  fullWidth
                  color="#EFF1F8"
                  placeholder={currentPage.search}
                  // value={searchTerm}
                  // onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Grid>
              <Grid size={4}>
                {currentPage.type === "dashboard" ? (
                  <Button
                    // onClick={handleCreateUser}
                    size="small"
                    style={{ height: "100%", borderRadius: "15px" }}
                    variant="contained"
                    startIcon={<AddIcon />}
                  >
                    إضافة
                  </Button>
                ) : (
                  <Box sx={{ display: "flex", gap: "8px" }}>
                    <NotificationsIcon
                      sx={{ height: 36, width: 36, color: "#868686" }}
                    />
                    <Avatar
                      src={sorce}
                      alt="profile"
                      style={{ height: 40, background: "#868686" }}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
