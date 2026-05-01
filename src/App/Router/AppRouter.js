import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Auth from "../../Features/Auth/Components/Auth";
import DashboardLayout from "../DashboardLayout";
import SplashScreen from "../SplashPage";
import Dashboard from "../../Features/Dashboard/Components/Dashboard";
import LoginForm from "../../Features/Auth/Components/LoginCard";
import Verify2fa from "../../Features/Auth/Components/2FACard";
import ForgotPasswordPage from "../../Features/Auth/Components/ForgetPasswordCard";
import ResetPasswordPage from "../../Features/Auth/Components/ResetPasswordCard";
import { SettingsPage } from "../../Features/Settings/Components/SettingsPage";
import CreateCasePage from "../../Features/Cases/Pages/CreateCasePage";
import CasesPage from "../../Features/Cases/Pages/CasesPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Auth />}>
          <Route index element={<LoginForm />} />
          <Route path="verify2fa" element={<Verify2fa />} />
          <Route path="forget-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password/:email" element={<ResetPasswordPage />} />
        </Route>

        {/* Super Admin Routes */}
        <Route element={<ProtectedRoute allowedRole="super_admin" />}>
          <Route element={<DashboardLayout />}>
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Office Admin Routes */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route element={<DashboardLayout />}>
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/cases/create" element={<CreateCasePage />} />
          </Route>
        </Route>

        {/* Accountant Routes */}
        <Route element={<ProtectedRoute allowedRole="accountant" />}>
          <Route element={<DashboardLayout />}></Route>
        </Route>

        {/* Common */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>

        {/* Unauthorized fallback */}
        <Route
          path="/unauthorized"
          element={
            <div className="flex items-center justify-center">Unauthorized</div>
          }
        />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
