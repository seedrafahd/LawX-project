import { useEffect, useState } from "react";
import splashImage from "./Assets/splash_img.png";
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
    <div className="fixed left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center bg-white">
      <img
        src={splashImage}
        alt="Splash"
        className="h-full w-full   object-cover"
      />
    </div>
  );
}
