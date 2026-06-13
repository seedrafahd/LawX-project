import { useLocation, useNavigate, useParams } from "react-router-dom";
import RequestClientCard from "../components/requestDetails/requestClientCard";
import RequestAttachmentsCard from "../components/requestDetails/requestAttachmentsCard";
import RequestInfoCard from "../components/requestDetails/requestInfoCard";
import RequestDetailsActions from "../components/requestDetails/requestDetailsActions";
import { useRequestDetails } from "../hooks/useRequests";
import Loader from "../../../../shared/Components/Loading";

export default function RequestDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const sourceTab = location.state?.sourceTab || "public";
  const isDirectedRequest = sourceTab === "private";

  const { data, isPending } = useRequestDetails(id);
  const requestDetails = data?.data.data ?? {};

  const handleOpenOfferForm = () => {
    navigate(`/marketplace/requests/request/${requestDetails.id}`, {
      state: {
        title_request: requestDetails.title_request,
      },
    });
  };

  if (isPending && !requestDetails.length) return <Loader />;

  return (
    <section className="space-y-[22px]">
      <h1 className="text-xl font-bold text-gray-900">تفاصيل الطلب</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <RequestInfoCard request={requestDetails} />
          <RequestAttachmentsCard documents={requestDetails.documents} />
        </div>
        <aside className="space-y-6">
          <RequestClientCard request={requestDetails} />
          <RequestDetailsActions
            isDirectedRequest={isDirectedRequest}
            handleOpenOfferForm={handleOpenOfferForm}
          />
        </aside>
      </div>
    </section>
  );
}
