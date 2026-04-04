import lawXImage from "./Assets/law_X.png";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import StarIcon from "@mui/icons-material/Star";
import BalanceIcon from "@mui/icons-material/Balance";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import MenuIcon from "@mui/icons-material/Menu";
import ArticleIcon from "@mui/icons-material/Article";

import LogoutIcon from "@mui/icons-material/Logout";

import { NavLink } from "react-router-dom";
import { useAuth } from "../Features/Auth/Hooks/useAuth";
import { useState } from "react";
import ConfirmDialog from "../shared/Components/ConfirmDialog";

const drawerWidth = 230;

export default function MyDrawer() {
  const { logout } = useAuth();
  const { user } = useAuth();
  const role = user?.role;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const superAdminMenuItems = [
    { icon: <DashboardIcon />, label: "لوحة التحكم", link: "dashboard" },
    {
      icon: <ArticleIcon />,
      label: "الباقات والخطط",
      link: "packages",
    },
    { icon: <LocalAtmIcon />, label: "إشتراكات ودفعات", link: "subscribes" },
    { icon: <StarsOutlinedIcon />, label: "ميزات", link: "features" },
    {
      icon: <AccountCircleOutlinedIcon />,
      label: "الملف الشخصي",
      link: "profile",
    },
    // { icon: <ArticleIcon />, label: "التقارير", link: "reports" },
    {
      icon: <SettingsIcon />,
      label: "الإعدادات",
      link: "settings",
    },
  ];

  const officeAdminMenuItems = [
    { icon: <DashboardIcon />, label: "لوحة التحكم", link: "dashboard" },
    {
      icon: <PersonIcon />,
      label: "الموظف",
      link: "employee",
    },
    { icon: <BusinessCenterIcon />, label: "القضايا", link: "cases" },
    { icon: <StarIcon />, label: "التقييم", link: "evaluation" },
    {
      icon: <ArticleIcon />,
      label: "القوالب",
      link: "templates",
    },
    {
      icon: <BalanceIcon />,
      label: "قانون",
      link: "law",
    },
    {
      icon: <SettingsIcon />,
      label: "الإعدادات",
      link: "settings",
    },
  ];

  const accountantMenuItems = [
    { icon: <DashboardIcon />, label: "لوحة التحكم", link: "dashboard" },
  ];

  const menuItems =
    role === "super_admin"
      ? superAdminMenuItems
      : role === "office_admin"
        ? officeAdminMenuItems
        : superAdminMenuItems;

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        py: "16px",
        px: "24px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Avatar alt="Logo" src={lawXImage} sx={{ width: 60, height: 60 }} />
        {/* <Box sx={{ display: "flex", alignItems: "center" }}> */}
        <Typography sx={{ fontSize: 20, color: "#868686" }}>
          Powersed by FetureX
        </Typography>
        {/* </Box> */}
      </Box>

      {/* MENU */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "100px" }}>
        <List
          sx={{
            // flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <ListItem disablePadding>
                  <ListItemButton
                    sx={(theme) => ({
                      gap: "10px",
                      borderRadius: 5,
                      backgroundColor: isActive
                        ? theme.palette.primary.main
                        : "transparent",
                      color: !isActive ? "gray" : "white",
                      "&:hover": {
                        bgcolor: theme.palette.primary.light,
                        color: "white",
                      },
                    })}
                  >
                    <ListItemIcon sx={{ color: "inherit", minWidth: "auto" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              )}
            </NavLink>
          ))}
        </List>

        {/* Logout */}
        <Box sx={{ p: 2 }}>
          <ListItemButton
            onClick={() => setShowModal(true)}
            sx={{
              borderRadius: 5,
              color: "#DC3545",
              "&:hover": { bgcolor: "#DC3545", color: "white" },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="تسجيل خروج" />
          </ListItemButton>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* TOP APP BAR MOBILE */}
      <AppBar
        position="fixed"
        sx={{ display: { sm: "none" }, boxShadow: "none" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Menu
          </Typography>
        </Toolbar>
      </AppBar>

      {/* DRAWERS */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* MOBILE */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              gap: 1.4,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* DESKTOP */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderLeft: "1px solid #eee",
              background: "#fff",
            },
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
      </Box>

      {/* LOGOUT MODAL */}
      <ConfirmDialog
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={logout}
        title="تأكيد تسجيل الخروج"
        description="
            هل أنت متأكد من رغبتك في تسجيل الخروج؟ سيتم إنهاء جلستك الحالية
            وستحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى بياناتك."
        confirmText="تسجيل الخروج"
      />
    </Box>
  );
}
