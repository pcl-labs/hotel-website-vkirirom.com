import { BASE_API } from "@/constants/connection";
import format from "date-fns/format";

export function APIPath(path) {
  return BASE_API + path
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

export function cardDate(date) {
  const dateFormat = "MMM D, YYYY";
  let formattedDate = "";
  if (date) {
    formattedDate = format(date, dateFormat);
  }
  return formattedDate;
}

export function reviewDateMonth(date) {
  const dateFormat = "MMM D";
  let formattedDate = "";
  if (date) {
    formattedDate = format(date, dateFormat);
  }
  return formattedDate;
}
export function reviewDay(date) {
  const dateFormat = "dddd";
  let formattedDate = "";
  if (date) {
    formattedDate = format(date, dateFormat);
  }
  return formattedDate;
}