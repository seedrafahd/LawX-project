import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Auth from "../../Features/Auth/Components/Auth";
import DashboardLayout from "../DashboardLayout";
import CasesPage from "../../Features/Cases/Components/CasesList";
import SplashScreen from "../SplashPage";
import Dashboard from "../../Features/Dashboard/Components/Dashboard";
import LoginForm from "../../Features/Auth/Components/LoginCard";
import Verify2fa from "../../Features/Auth/Components/2FACard";
import ForgotPasswordPage from "../../Features/Auth/Components/ForgetPasswordCard";
import ResetPasswordPage from "../../Features/Auth/Components/ResetPasswordCard";
import { SettingsPage } from "../../Features/Settings/Components/SettingsPage";

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
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Route>
        </Route>

        {/* Office Admin Routes */}
        <Route element={<ProtectedRoute allowedRole="office_admin" />}>
          <Route element={<DashboardLayout />}>
            {/* <Route path="/employee" element={<CasesPage />} /> */}
            <Route path="/cases" element={<CasesPage />} />
            {/* <Route path="/evaluation" element={<CasesPage />} />
            <Route path="/templates" element={<CasesPage />} />
            <Route path="/law" element={<CasesPage />} />
            <Route path="/settings" element={<CasesPage />} /> */}
          </Route>
        </Route>

        {/* Accountant Routes */}
        <Route element={<ProtectedRoute allowedRole="accountant" />}>
          <Route element={<DashboardLayout />}>
            {/* <Route path="/billing" element={<BillingPage />} /> */}
          </Route>
        </Route>

        {/* Common */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
          </Route>
        </Route>

        {/* Unauthorized fallback */}
        <Route path="/unauthorized" element={<div>Unauthorized</div>} />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
