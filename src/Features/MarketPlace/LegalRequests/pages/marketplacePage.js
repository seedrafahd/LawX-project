import { useMemo } from "react";
import { useRequests } from "../hooks/useRequests";
import Loader from "../../../../shared/Components/Loading";
import RequestCard from "../components/requestCard";
import FilterBar from "../components/filterBar";
import { useFilters } from "../../../../shared/Hooks/useFilters";
import { INITIAL_REQUESTS_FILTERS } from "../helpers/constants";
import { useFilteredRequests } from "../hooks/useFilteredRequests";
import { getMarketplaceStats } from "../helpers/getMarketplaceStats";
import { useNavigate } from "react-router-dom";
import StatsCards from "../../../Tasks/components/StatsCard";

export default function MarketplacePage() {
  const navigate = useNavigate();
  const { data, isPending } = useRequests();
  const allRequests = useMemo(() => {
    return data?.data?.data ?? [];
  }, [data]);
  // console.log(allRequests);

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

  const groupedRequests = useMemo(
    () => ({
      public: allRequests.filter((r) => r.type_request === "public"),
      private: allRequests.filter((r) => r.type_request === "private"),
    }),
    [allRequests],
  );

  const stats = getMarketplaceStats(groupedRequests);

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
            لا توجد طلبات بعد
          </div>
        )}
      </section>
    </main>
  );
}
