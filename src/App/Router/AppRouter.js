import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../../Features/Auth/Components/Login";
import DashboardLayout from "../DashboardLayout";
import CasesPage from "../../Features/Cases/Components/CasesList";
import SplashScreen from "../SplashPage";
import Dashboard from "../../Features/Dashboard/Components/Dashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />

        {/* Office Admin Routes */}
        <Route element={<ProtectedRoute allowedRole="super_admin" />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>

        {/* Office Admin Routes */}
        <Route element={<ProtectedRoute allowedRole="office_admin" />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
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
