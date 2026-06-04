import { useMemo } from "react";
import StatsCards from "../../../Tasks/Components/StatsCard";
import { useRequests } from "../hooks/useRequests";
import Loader from "../../../../shared/Components/Loading";
import RequestCard from "../components/requestCard";
import FilterBar from "../components/filterBar";
import { useFilters } from "../../../../shared/Hooks/useFilters";
import { INITIAL_REQUESTS_FILTERS } from "../helpers/constants";
import { useFilteredRequests } from "../hooks/useFilteredRequests";
import { getMarketplaceStats } from "../helpers/getMarketplaceStats";
import { useNavigate } from "react-router-dom";

export default function MarketplacePage() {
  const navigate = useNavigate();
  const { data, isPending } = useRequests();
  const allRequests = data?.data?.data ?? [];

  const cityOptions = useMemo(() => {
    const cities = [
      ...new Set(allRequests.map((r) => r.location_request).filter(Boolean)),
    ];
    return [
      { value: "", label: "الكل" },
      ...cities.map((c) => ({ value: c, label: c })),
    ];
  }, [allRequests]);

  const { filters, updateFilter } = useFilters(INITIAL_REQUESTS_FILTERS);

  const filteredRequests = useFilteredRequests({
    allRequests,
    filters,
  });
  console.log(filteredRequests);

  const stats = getMarketplaceStats(filters);

  const handleOpenDetails = (item) => {
    navigate(`/marketplace/requests/request_details/${item.id}`, {
      state: { request: item, sourceTab: filters.tab },
    });
  };

  const handleOpenOfferForm = (event, item) => {
    event.stopPropagation();
    navigate(`/marketplace/requests/request/${item.id}`, {
      state: { request: item, sourceTab: filters.tab },
    });
  };

  return (
    <main className="space-y-[22px]">
      {isPending && <Loader />}
      <FilterBar
        filters={filters}
        onFilterChange={updateFilter}
        cityOptions={cityOptions}
      />

      <StatsCards stats={stats} />

      <section className="space-y-6">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((item) => (
            <RequestCard
              key={item.id}
              item={item}
              tab={filters.tab}
              onOpenDetails={handleOpenDetails}
              onOpenOffer={handleOpenOfferForm}
            />
          ))
        ) : (
          <div className="rounded-xl bg-white p-8 text-center text-sm font-semibold text-gray-500">
            لا توجد طلبات مطابقة للفلاتر المحددة
          </div>
        )}
      </section>
    </main>
  );
}
