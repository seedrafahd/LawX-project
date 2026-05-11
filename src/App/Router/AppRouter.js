import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import AuthPage from "../../Features/Auth/Pages/AuthPage";
import DashboardLayout from "../DashboardLayout";
import SplashScreen from "../SplashPage";
import Dashboard from "../../Features/Dashboard/Components/Dashboard";
import LoginForm from "../../Features/Auth/Components/Forms/LoginForm";
import TwoFactorForm from "../../Features/Auth/Components/Forms/TwoFactorForm";
import ForgotPasswordForm from "../../Features/Auth/Components/Forms/ForgetPasswordForm";
import ResetPasswordForm from "../../Features/Auth/Components/Forms/ResetPasswordForm";
import { SettingsPage } from "../../Features/Settings/Components/SettingsPage";
import CreateCasePage from "../../Features/Cases/Pages/CreateCasePage";
import CasesPage from "../../Features/Cases/Pages/CasesPage";
import CaseDetailsPage from "../../Features/Cases/Pages/CaseDetailsPage";
import HearingsPsge from "../../Features/Hearings/Pages/HearingsPage";
import TasksPage from "../../Features/Tasks/Pages/TasksPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<AuthPage />}>
          <Route index element={<LoginForm />} />
          <Route path="verify2fa" element={<TwoFactorForm />} />
          <Route path="forget-password" element={<ForgotPasswordForm />} />
          <Route path="reset-password/:email" element={<ResetPasswordForm />} />
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
            <Route path="/cases">
              <Route index element={<CasesPage />} />
              <Route path="create" element={<CreateCasePage />} />
              <Route path="case_details/:id" element={<CaseDetailsPage />} />
              <Route
                path="case_details/:id/hearings"
                element={<HearingsPsge />}
              />
            </Route>
            <Route path="/tasks" element={<TasksPage />} />
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
