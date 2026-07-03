import { useMemo } from "react";

export const useFilteredLibrary = ({ legislations, filters }) => {
  return useMemo(() => {
    const searchTerm = filters.title.trim().toLowerCase();

    return legislations?.filter((item) => {
      if (filters.country && item.country !== filters.country) {
        return false;
      }

      if (filters.status && item.status !== filters.status) {
        return false;
      }

      const itemCategory = item.category?.name ?? item.category ?? "";
      if (filters.category && itemCategory !== filters.category) {
        return false;
      }

      if (searchTerm) {
        const searchableText = [
          item.title,
          item.content,
          item.description,
          item.law_number,
          itemCategory,
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
  }, [legislations, filters]);
};
