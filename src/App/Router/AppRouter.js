import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import NotConnectedPage from "../pages/NotConnectedPage";

import AuthPage from "../../Features/Auth/pages/AuthPage";
import DashboardLayout from "../DashboardLayout";
import SplashScreen from "../SplashPage";
import Dashboard from "../../Features/Dashboard/pages/Dashboard";
import LoginForm from "../../Features/Auth/Components/Forms/LoginForm";
import TwoFactorForm from "../../Features/Auth/Components/Forms/TwoFactorForm";
import ForgotPasswordForm from "../../Features/Auth/Components/Forms/ForgetPasswordForm";
import ResetPasswordForm from "../../Features/Auth/Components/Forms/ResetPasswordForm";
import CreateCasePage from "../../Features/Cases/pages/CreateCasePage";
import CasesPage from "../../Features/Cases/pages/CasesPage";
import CaseDetailsPage from "../../Features/Cases/pages/CaseDetailsPage";
import HearingsPage from "../../Features/Hearings/pages/HearingsPage";
import TasksPage from "../../Features/Tasks/pages/TasksPage";
import MyOffersPage from "../../Features/MarketPlace/Offers/pages/myOffersPage";
import MarketplacePage from "../../Features/MarketPlace/LegalRequests/pages/marketplacePage";
import SendOfferPage from "../../Features/MarketPlace/Offers/pages/sendOfferPage";
import RequestDetailsPage from "../../Features/MarketPlace/LegalRequests/pages/requestDetailsPage";
import OfferDetailsPage from "../../Features/MarketPlace/Offers/pages/offerDetailsPage";
import EditOfferPage from "../../Features/MarketPlace/Offers/pages/editOfferPage";
import CreateInvoicePage from "../../Features/Invoices/pages/CreateInvoicePage";
import NotificationsPage from "../../Features/Notifications/pages/NotificationsPage";
import LawsPage from "../../Features/LegislativeLibrary/pages/LawsPage";
import CreateLawPage from "../../Features/LegislativeLibrary/pages/CreateLawPage";
import LawDetailsPage from "../../Features/LegislativeLibrary/pages/LawDetailsPage";
import TemplatesPage from "../../Features/Templates/pages/TemplatesPage";
import TemplateDetailsPage from "../../Features/Templates/pages/TemplateDetailsPage";
import CreateTemplatePage from "../../Features/Templates/pages/CreateTemplatePage";
import GenerateDocumentPage from "../../Features/Templates/pages/GenerateDocumentPage";
import DocumentDetailsPage from "../../Features/Documents/pages/DocumentDetailsPage";
import VerifyIdentityForm from "../../Features/Auth/Components/Forms/VerifyIdentityForm";
import RegisterForm from "../../Features/Auth/Components/Forms/RegisterForm";
import LawyersPage from "../../Features/Lawers/pages/LawyersPage";
import CreateLawyerProfilePage from "../../Features/Lawers/pages/CreateLawyerPage";
import CreateOfficePage from "../../Features/OfficeManagement/pages/CreateOfficePage";
import MembersPage from "../../Features/Lawers/pages/MembersPage";
import OfficeManagementPage from "../../Features/OfficeManagement/pages/OfficeManagePage";
import LawyerDetailsPage from "../../Features/Lawers/pages/LawyerDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";
import SignatureRequestPage from "../../Features/ElectronicSignature/pages/SignatureRequestPage";
import ReviewDocToSignPage from "../../Features/ElectronicSignature/pages/ReviewDocToSignPage";
import SignatureIframePage from "../../Features/ElectronicSignature/pages/SignatureIframPage";
import InviteLawyerPage from "../../Features/OfficeManagement/pages/InviteLawyerPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={<AuthPage />}>
        <Route index element={<LoginForm />} />
        <Route path="verify2fa" element={<TwoFactorForm />} />
        <Route path="forget-password" element={<ForgotPasswordForm />} />
        <Route path="reset-password/:email" element={<ResetPasswordForm />} />
        <Route path="activate-account" element={<VerifyIdentityForm />} />
      </Route>

      <Route path="/register" element={<AuthPage />}>
        <Route index element={<RegisterForm />} />
      </Route>

      {/* Super Admin Routes */}
      {/* <Route element={<ProtectedRoute allowedRole="super_admin" />}>
          <Route element={<DashboardLayout />}>
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route> */}

      {/* Office Admin Routes */}
      <Route element={<ProtectedRoute allowedRole={["admin", "lawyer"]} />}>
        <Route element={<DashboardLayout />}>
          {/* OFFICE */}
          <Route path="/office_management">
            <Route index element={<OfficeManagementPage />} />
            <Route path="activate" element={<CreateOfficePage />} />
            <Route path="members" element={<MembersPage />} />
            <Route path="invitations" element={<MembersPage />} />
            <Route path="invite" element={<InviteLawyerPage />} />
          </Route>

          <Route path="/my_receive_invitations" element={<MembersPage />} />

          {/* CASES */}
          <Route path="/cases">
            <Route index element={<CasesPage />} />
            <Route path="create" element={<CreateCasePage />} />
            <Route path="case_details/:id" element={<CaseDetailsPage />} />
            <Route
              path="case_details/:id/hearings"
              element={<HearingsPage />}
            />
            <Route path="document_details/:id">
              <Route index element={<DocumentDetailsPage />} />
              <Route path="sign_request" element={<SignatureRequestPage />} />
              <Route path="review" element={<ReviewDocToSignPage />} />
            </Route>
            <Route
              path="send_sign_request"
              element={<SignatureRequestPage />}
            />
            <Route
              path="required_signatures/:id/sign"
              element={<SignatureIframePage />}
            />
          </Route>
          <Route path="/tasks" element={<TasksPage />} />

          {/* INVOICES */}
          <Route path="/invoices">
            <Route path="create/:case_id" element={<CreateInvoicePage />} />
          </Route>

          {/* MARKET PLACE */}
          <Route path="/marketplace">
            <Route path="requests">
              <Route index element={<MarketplacePage />} />
              <Route
                path="request_details/:id"
                element={<RequestDetailsPage />}
              />
              <Route path="request/:id" element={<SendOfferPage />} />
            </Route>
            <Route path="my_offers">
              <Route index element={<MyOffersPage />} />
              <Route path="offer_details/:id" element={<OfferDetailsPage />} />
              <Route path="edit_offer/:id" element={<EditOfferPage />} />
            </Route>
          </Route>
        </Route>
      </Route>

      {/*---------------- Syndicate Routes ----------------*/}
      <Route element={<ProtectedRoute allowedRole="syndicate" />}>
        <Route element={<DashboardLayout />}>
          {/* LAWYERS */}
          <Route path="/lawyers">
            <Route index element={<LawyersPage />} />
            <Route path="lawyer_details/:id" element={<LawyerDetailsPage />} />
            <Route path="create" element={<CreateLawyerProfilePage />} />
            <Route path="edit/:id" element={<CreateLawyerProfilePage />} />
          </Route>

          {/* Laws */}
          <Route path="/laws">
            <Route path="create" element={<CreateLawPage />} />
            <Route path="edit/:id" element={<CreateLawPage />} />
          </Route>

          {/* Templates */}
          <Route path="/templates">
            <Route path="create" element={<CreateTemplatePage />} />
            <Route path="edit/:id" element={<CreateTemplatePage />} />
          </Route>
        </Route>
      </Route>

      {/* Common */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Laws */}
          <Route path="/laws">
            <Route index element={<LawsPage />} />
            <Route path="law_details/:id" element={<LawDetailsPage />} />
          </Route>

          {/* Templates */}
          <Route path="/templates">
            <Route index element={<TemplatesPage />} />
            <Route
              path="template_details/:id"
              element={<TemplateDetailsPage />}
            />
            <Route path="generate/:id" element={<GenerateDocumentPage />} />
          </Route>

          {/* Notifications */}
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>
      </Route>

      {/* Unauthorized fallback */}
      <Route
        path="/unauthorized"
        element={
          <div className="flex items-center justify-center">Unauthorized</div>
        }
      />
      {/* Not Connect */}
      <Route path="/not_connect" element={<NotConnectedPage />} />

      {/* Not Found */}
      <Route path="/not_found" element={<NotFoundPage />} />

      {/* Catch All */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
