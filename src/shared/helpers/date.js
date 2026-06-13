export const getDate = (dateString) =>
  dateString?.substring(0, 10) || "";

export const getTime = (dateString) =>
  new Date(dateString).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
