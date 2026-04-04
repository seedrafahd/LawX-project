import "./App.css";
import Cookies from "universal-cookie";
import { setUserDetails } from "./Features/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AppRouter from "./App/Router/AppRouter";
import Loader from "./shared/Components/Loading";
import { useAuth } from "./Features/Auth/Hooks/useAuth";

function AppInitializer({ children }) {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
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
    <div className="App">
      {loading && <Loader />}
      <AppInitializer>
        <AppRouter />
      </AppInitializer>
    </div>
  );
}

export default App;
