import { formatDistance } from "date-fns";

export function formatDate(startDate) {
  const start = new Date(startDate);
  const endDate = new Date();
  const distance = formatDistance(start, endDate);

  return distance;
}
