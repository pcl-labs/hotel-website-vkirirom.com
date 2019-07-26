import format from "date-fns/format";

export function formatDates(dateOne, dateTwo) {
  const dateFormat = "ddd, D MMM";
  let formattedDates = "";
  if (dateOne) {
    formattedDates = format(dateOne, dateFormat);
  }
  if (dateTwo && dateTwo != dateOne) {
    formattedDates += " - " + format(dateTwo, dateFormat);
  }
  return formattedDates;
}
