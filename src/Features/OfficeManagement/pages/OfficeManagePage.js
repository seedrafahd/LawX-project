import { useNavigate } from "react-router-dom";
import OfficeHeader from "../components/OfficeHeader";
import OfficeInfoCard from "../components/OfficeInfoCard";
import QuickActions from "../components/QuickActions";
import StatsCards from "../components/StatsCards";

export default function OfficeManagementPage() {
  const navigate = useNavigate();

  const handleAction = (action) => {
    switch (action) {
      case "invite":
        navigate("/office_management/invite");
        break;
      case "invitations":
        navigate("/office_management/invitations");
        break;
      default:
        navigate("/office_management/members");
    }
  };

  return (
    <div className="space-y-4">
      <OfficeHeader />

      <OfficeInfoCard />

      <StatsCards />

      <QuickActions handleAction={handleAction} />
    </div>
  );
}
