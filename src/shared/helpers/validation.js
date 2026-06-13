export function isBeforeToday(dateValue) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(`${dateValue}T00:00:00`);

  return selectedDate < today;
}
