import * as React from "react";
import futureXImage from "./Assets/future_x.png";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Avatar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import StarIcon from "@mui/icons-material/Star";
import BalanceIcon from "@mui/icons-material/Balance";
import SettingsIcon from "@mui/icons-material/Settings";

import MenuIcon from "@mui/icons-material/Menu";
import ArticleIcon from "@mui/icons-material/Article";

import LogoutIcon from "@mui/icons-material/Logout";

import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAuth } from "../Features/Auth/Hooks/useAuth";
import { useState } from "react";

const drawerWidth = 290;

export default function MyDrawer() {
  const cookie = new Cookies();
  const { Logout } = useAuth();
  const user = cookie.get("user");
  const role = user?.role;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const superAdminMenuItems = [
    { icon: <DashboardIcon />, label: "لوحة التحكم", link: "dashboard" },
    {
      icon: <PersonIcon />,
      label: "مكاتب المحاماة",
      link: "offices",
    },
    { icon: <ArticleIcon />, label: "خطط الاشتراك", link: "plans" },
    { icon: <ArticleIcon />, label: "التقارير", link: "reports" },
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
        : accountantMenuItems;

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3.4,
        py: "21px",
        px: "30px",
      }}
    >
      <Box sx={{ display: "flex", gap: 2.5 }}>
        <Avatar alt="Logo" src={futureXImage} sx={{ width: 78, height: 78 }} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{ fontWeight: 700, fontSize: 36, width: 98, color: "#868686" }}
          >
            LAWX
          </Typography>
        </Box>
      </Box>

      {/* MENU */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "180px" }}>
        <List
          sx={{
            flexGrow: 1,
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
                    <ListItemIcon sx={{ color: "inherit" }}>
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
              color: "red",
              "&:hover": { bgcolor: "red", color: "white" },
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
      <AppBar position="fixed" sx={{ display: { sm: "none" } }}>
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
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* LOGOUT MODAL */}
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>هل أنت متأكد من أنك تريد تسجيل الخروج؟</DialogTitle>
        <DialogContent>
          <DialogContentText>لن تستطيع التراجع بعد التأكيد</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>إغلاق</Button>
          <Button onClick={Logout} autoFocus>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
