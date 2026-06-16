import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setError } from "../AuthSlice";

export function useAuthError() {
  const dispatch = useDispatch();

  return useCallback(
    (message) => {
      dispatch(setError(message || "حدث خطأ غير متوقع"));
      setTimeout(() => {
        dispatch(setError(null));
      }, 5000);
    },
    [dispatch],
  );
}
