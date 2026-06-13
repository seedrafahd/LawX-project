import { useMemo } from "react";

export const useFilteredRequests = ({ allRequests, filters }) => {
  return useMemo(() => {
    const searchTerm = filters.title.trim().toLowerCase();

    return allRequests?.filter((item) => {
      if (filters.tab && item.type_request !== filters.tab) {
        return false;
      }

      if (filters.specialty && item.specialty !== filters.specialty) {
        return false;
      }

      if (filters.city && item.location_request !== filters.city) {
        return false;
      }

      if (filters.status && item.status !== filters.status) {
        return false;
      }

      if (searchTerm) {
        const searchableText = [item.title_request, item.description_request]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
  }, [allRequests, filters]);
};
