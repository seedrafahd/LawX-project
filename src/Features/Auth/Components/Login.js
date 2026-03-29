import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../AuthSlice";
import { loginRequest } from "../Services/AuthApi";
import Cookies from "universal-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Alert,
} from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginRequest({ email, password });
      dispatch(setUserDetails(data));
      cookies.set("auth", data);
      if (data.user.role === "office_admin") {
        navigate("/cases");
      } else if (data.user.role === "accountant") {
        navigate("/billing");
      }
    } catch (err) {
      setError("بيانات غير صحيحة");
    }
  };

  // if already logged in //
  if (token && user) {
    if (user.role === "office_admin") return <Navigate to="/cases" replace />;
    if (user.role === "accountant") return <Navigate to="/billing" replace />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "grey.100",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: { xs: "100%", sm: 400 },
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4" fontWeight={700} textAlign="center">
          مرحباً! دعنا نبدأ الآن
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="center"
          color="text.secondary"
        >
          سجل الدخول للاستمرار.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="الإيميل"
            variant="outlined"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="كلمة المرور"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            تسجيل دخول
          </Button>

          {error && <Alert severity="error">{error}</Alert>}
          <Button size="large"> هل نسيت كلمة المرور؟</Button>
        </Box>
      </Paper>
    </Box>
  );
}
