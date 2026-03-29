import "./App.css";
import Cookies from "universal-cookie";
import { setUserDetails } from "./Features/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AppRouter from "./App/Router/AppRouter";

function AppInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const cookies = new Cookies();
    const savedAuth = cookies.get("auth");
    if (savedAuth) {
      console.log(savedAuth);
      dispatch(setUserDetails(savedAuth));
    }
  }, [dispatch]);

  return children;
}

function App() {
  return (
    <div className="App">
      <AppInitializer>
        <AppRouter />
      </AppInitializer>
    </div>
  );
}

export default App;
