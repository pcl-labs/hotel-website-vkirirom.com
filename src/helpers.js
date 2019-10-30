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

export function changeUrlExtension(url, newExtension) {
  const urlParts = url.split('.')
  const oldExtension = urlParts[urlParts.length - 1]
  if (oldExtension.length >= 5) {
    console.log('changeUrlExtension: Probably url has no extension.')
    return ''
  }
  const indexOfExtension = urlParts.length - 1
  urlParts.splice(indexOfExtension, 1, newExtension)
  return urlParts.join('.')
}

export function transformCloudinaryUrl(
  resourceUrl,
  transformations
) {
  if (
    !resourceUrl ||
    !transformations ||
    resourceUrl.indexOf('cloudinary') < 0
  ) {
    return resourceUrl
  }
  const urlParts = resourceUrl.split('/')

  const indexOfUpload = urlParts.indexOf('upload')
  urlParts.splice(indexOfUpload + 1, 0, transformations)
  return urlParts.join('/')
}


export function getPosterImage(
  videoUrl,
  transformations
) {
  if (!videoUrl) {
    return null
  }
  return transformCloudinaryUrl(
    changeUrlExtension(videoUrl, 'jpg'),
    transformations
  )
}