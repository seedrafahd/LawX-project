import Cookies from "universal-cookie";
import {
  setUserDetails,
  setInitialized,
  setLawyerProfile,
} from "./Features/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AppRouter from "./App/Router/AppRouter";
import Loader from "./shared/components/Loading";
import { useAuth } from "./Features/Auth/hooks/useAuth";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./App/QueryClient";
import { Toaster } from "react-hot-toast";
import { Axios } from "./App/Axios";
import { usePusherNotifications } from "./Features/Notifications/hooks/usePusherNotifications";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { getLawyerProfileRequest } from "./Features/Auth/services/AuthApi";

function AppInitializer({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  usePusherNotifications();

  useEffect(() => {
    const initializeApp = async () => {
      const cookies = new Cookies();
      const savedAuth =
        cookies.get("auth") || JSON.parse(sessionStorage.getItem("auth"));

      if (savedAuth) {
        dispatch(setUserDetails(savedAuth));
      }

      if (savedAuth?.token) {
        try {
          const profile = await getLawyerProfileRequest();
          dispatch(setLawyerProfile(profile));
        } catch (err) {
          console.log("Failed to load lawyer profile", err.message);
        }
      }

      dispatch(setInitialized());

      try {
        await Axios.get("/test");
        setReady(true);
      } catch (err) {
        console.log("Backend not ready", err.message);
        setReady(true);
        navigate("/not_connect");
      }
    };

    initializeApp();
  }, [dispatch, navigate]);

  if (!ready) return <Loader />;
  return children;
}

function App() {
  const { loading } = useAuth();
  return (
    <BrowserRouter>
      <div>
        {loading && <Loader />}
        <QueryClientProvider client={queryClient}>
          <AppInitializer>
            <AppRouter />
          </AppInitializer>
          <Toaster position="top-center" />
        </QueryClientProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
