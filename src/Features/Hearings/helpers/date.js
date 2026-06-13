export default function splitHearingDate(hearing) {
  const dateValue = String(hearing.date).split(" ")[0];
  const hearingDate = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(hearingDate.getTime())) {
    return {
      day: hearing.date,
      month: "",
      year: "",
    };
  }

  return {
    day: String(hearingDate.getDate()),
    month: new Intl.DateTimeFormat("ar", { month: "long" }).format(hearingDate),
    year: new Intl.DateTimeFormat("ar", { year: "numeric" }).format(
      hearingDate,
    ),
  };
}
