import { useMemo } from "react";
import { useAuth } from "../../Auth/hooks/useAuth";

export const useFilteredCases = ({ cases, filters }) => {
  const { user } = useAuth();

  return useMemo(() => {
    return cases?.filter((c) => {
      if (filters.tab === "my" && c.lawyer_id !== user?.ID) return false;
      if (filters.tab === "office" && c.lawyer_id === user?.ID) return false;

      if (filters.status && c.status !== filters.status) return false;
      if (
        filters.lawyer &&
        !(c.team || []).some((m) => (m.name || m) === filters.lawyer)
      )
        return false;
      if (filters.type && c.type !== filters.type) return false;
      if (filters.court && c.court !== filters.court) return false;

      return true;
    });
  }, [cases, filters, user?.ID]);
};
