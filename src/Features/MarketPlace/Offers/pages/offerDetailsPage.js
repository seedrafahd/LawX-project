import { CalendarDays, DollarSign } from "lucide-react";
import StatCard from "../components/offerDetails/statCard";
import { useNavigate, useParams } from "react-router-dom";
import DeleteOfferAction from "../components/deleteOfferAction";
import SharedBadge from "../../../../shared/components/sharedBadge";
import { useOfferDetails } from "../hooks/useOffers";
import RequestAttachmentsCard from "../../LegalRequests/components/requestDetails/requestAttachmentsCard";
import Loader from "../../../../shared/components/Loading";

export default function OfferDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isPending } = useOfferDetails(id);
  const offerDetails = data?.data.data || {};
  const handleOpenEdit = (item) => {
    navigate(`/marketplace/my_offers/edit_offer/${id}`);
  };

  if (isPending && !offerDetails.length) return <Loader />;
  console.log(offerDetails);
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* ================= MAIN CONTENT ================= */}
      <div className="lg:col-span-8 space-y-6 order-1">
        {/* ===== Stats Cards ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Price Card */}
          <StatCard
            title="قيمة العرض"
            value={offerDetails.price + " " + offerDetails.price_currency}
            icon={<DollarSign size={18} />}
            color="primary"
          />

          {/* Duration Card */}
          <StatCard
            title="مدة التنفيذ"
            value={offerDetails.estimated_days}
            icon={<CalendarDays size={18} />}
          />
        </div>

        {/* ===== Legal Plan Card ===== */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 space-y-6 p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <h3 className="text-lg font-bold text-gray-900">
              تفاصيل الخطة القانونية
            </h3>
            <div>
              <p className="text-sm text-gray-500">تاريخ النشر</p>

              <p className="text-sm font-semibold text-gray-900">
                {offerDetails.created_at}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <p className="text-[#64748B] leading-9 text-lg">
              {offerDetails.message_for_client}
            </p>
          </div>
          {/* Valid Until */}
          <div className="flex gap-2 mt-10">
            <h3 className="font-bold text-[#1E293B]">العرض متاح حتى:</h3>
            <p className="text-[#64748B]">{offerDetails.valid_until}</p>
          </div>
          {/* Payment Plan */}
          <div className="flex gap-2 mt-10">
            <h3 className="font-bold text-[#1E293B]">خطة الدفع:</h3>
            <p className="text-[#64748B]">{offerDetails.payment_terms}</p>
          </div>

          {/* Footer Status */}
          <div className="border-t border-gray-100 pt-6 flex items-center justify-center gap-3">
            <span className="text-sm font-bold text-gray-900">حالة العرض:</span>

            <SharedBadge text={offerDetails.status} color="yellow" />
          </div>
        </div>
        {/* Attachments */}
        <RequestAttachmentsCard documents={offerDetails.documents} />
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="lg:col-span-4 space-y-6 order-2">
        {/* ===== Request Info ===== */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 px-6 py-4">
            <h3 className="font-bold text-gray-900">معلومات الطلب</h3>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">نوع القضية</p>

              <h3 className="font-bold text-gray-700">
                {offerDetails.title_request}
              </h3>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">وصف الطلب</p>

              <p className="text-xs text-gray-500">
                {offerDetails.title_description}
              </p>
            </div>
          </div>
        </div>

        {/* ===== Quick Actions ===== */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 space-y-4 p-6">
          <h3 className="font-bold text-gray-900">إجراءات سريعة</h3>

          <div className="space-y-3">
            {/* Edit Button */}
            <button
              onClick={() => handleOpenEdit(offerDetails)}
              className="w-full h-14 rounded-lg bg-[#4D5B95] hover:bg-[#445186] transition-all
                  duration-300 text-white font-semibold text-lg flex items-center justify-center"
            >
              تعديل العرض
            </button>

            {/* Delete Button */}
            <DeleteOfferAction offerId={offerDetails.id}>
              <button
                className="w-full h-14 rounded-lg bg-[#E1E3E4]/30 hover:bg-[#EEF2F7] transition-all 
              duration-300 text-[#64748B] font-semibold text-lg flex items-center justify-center"
              >
                حذف العرض
              </button>
            </DeleteOfferAction>
          </div>
        </div>
      </div>
    </div>
  );
}
