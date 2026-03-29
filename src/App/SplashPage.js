import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import splashImage from "./Assets/law_X.png";
import { Navigate } from "react-router-dom";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return <Navigate to="/login" replace />;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "white",
        zIndex: 9999,
      }}
    >
      <Box
        component="img"
        src={splashImage}
        alt="Splash"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Box>
  );
}
