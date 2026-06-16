import React, { useMemo, useState } from "react";
import OfferCard from "../components/offerCard";
import FilterTabs from "../components/filterTabs";
import { getOffersStats } from "../helpers/getOffersStats";
import StatCard from "../../../../shared/components/statCard";
import { useNavigate } from "react-router-dom";
import { useOffers } from "../hooks/useOffers";
import Loader from "../../../../shared/components/Loading";

export default function MyOffersPage() {
  const navigate = useNavigate();
  const { data, isPending } = useOffers();
  const offers = useMemo(() => {
    return data?.data.data || [];
  }, [data]);

  const [activeTab, setActiveTab] = useState("all");
  const filteredOffers = useMemo(() => {
    if (activeTab === "all") return offers;
    return offers.filter((offer) => offer.status === activeTab);
  }, [activeTab, offers]);

  const stats = getOffersStats(offers);

  const handleOfferAction = (offer) => {
    switch (offer.status) {
      case "pending":
        navigate(`/marketplace/my_offers/edit_offer/${offer.proposal_id}`);
        break;

      case "accepted":
        // navigate(`/offers/${offer.proposal_id}/contract`);
        break;

      default:
        break;
    }
  };

  const handleOpenDetails = (item) => {
    navigate(`/marketplace/my_offers/offer_details/${item.proposal_id}`, {
      state: { offer: item },
    });
  };

  if (isPending) return <Loader />;
  return (
    <main className="text-slate-900 space-y-4">
      <header className="grid gap-6 lg:grid-cols-[1fr_auto] ">
        <div>
          <h3 className="font-bold text-gray-900">إدارة العروض القانونية</h3>
          <p className="mt-2 max-w-3xl text-gray-700">
            تتبع ومراجعة كافة العروض المالية والزمنية المقدمة لعملائك، يمكنك
            تصفية العروض حسب الحالة لمتابعة الإجراءات المطلوبة.
          </p>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:justify-end">
          {stats.map((item, index) => (
            <StatCard key={index} item={item} />
          ))}
        </div>
      </header>
      {/* Filters */}
      <div>
        <FilterTabs activeTab={activeTab} onChange={setActiveTab} />
      </div>
      {filteredOffers.length > 0 ? (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xl:auto-rows-fr">
          {filteredOffers.map((offer) => (
            <OfferCard
              key={offer.proposal_id}
              offer={offer}
              onOpenDetails={handleOpenDetails}
              onActionClick={handleOfferAction}
            />
          ))}
        </section>
      ) : (
        <div className="rounded-xl bg-white p-8 text-center text-sm font-semibold text-gray-500">
          لا يوجد عروض بعد
        </div>
      )}
    </main>
  );
}
