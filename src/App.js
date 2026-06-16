import Cookies from "universal-cookie";
import { setUserDetails, setInitialized } from "./Features/Auth/AuthSlice";
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

function AppInitializer({ children }) {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  usePusherNotifications();

  useEffect(() => {
    const cookies = new Cookies();
    const savedAuth =
      cookies.get("auth") || JSON.parse(sessionStorage.getItem("auth"));
    if (savedAuth) {
      dispatch(setUserDetails(savedAuth));
    }
    dispatch(setInitialized());
    setReady(true);

    Axios.get("/test")
      .then(() => console.log("Backend ready"))
      .catch((err) => console.log("Backend not ready", err.message));
  }, [dispatch]);
  if (!ready) return <Loader />;
  return children;
}

function App() {
  const { loading } = useAuth();
  return (
    <div>
      {loading && <Loader />}
      <QueryClientProvider client={queryClient}>
        <AppInitializer>
          <AppRouter />
        </AppInitializer>
        <Toaster position="top-center" />
      </QueryClientProvider>
    </div>
  );
}

export default App;
