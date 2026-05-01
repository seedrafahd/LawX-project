import Cookies from "universal-cookie";
import { setUserDetails } from "./Features/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AppRouter from "./App/Router/AppRouter";
import Loader from "./shared/Components/Loading";
import { useAuth } from "./Features/Auth/Hooks/useAuth";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./App/QueryClient";
import { Toaster } from "react-hot-toast";
import { Axios } from "./App/Axios";

function AppInitializer({ children }) {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Axios.get("/test")
      .then(() => console.log("Backend ready"))
      .catch((err) => console.log("Backend not ready", err.message));
    const cookies = new Cookies();
    const savedAuth =
      cookies.get("auth") || JSON.parse(sessionStorage.getItem("auth"));
    console.log(savedAuth);
    if (savedAuth) {
      dispatch(setUserDetails(savedAuth));
    }
    setReady(true);
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
