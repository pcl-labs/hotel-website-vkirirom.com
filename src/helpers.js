import Vue from "vue";
import format from "date-fns/format";

export function computePrice(resort, dateOne, dateTwo) {
  return Vue.http.get(
    "https://stagingapi.whynot.earth/api/v0/roomtypes/" +
      resort.modules.hotel.roomTypes[0].id +
      "/prices?startDate=" +
      dateOne +
      "&endDate=" +
      dateTwo
  );
}

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
