import { BASE_API } from '@/constants/connection';
import { format } from 'date-fns';
import { languageCodes } from '@/constants/app';
import { capitalize, startCase, toLower } from 'lodash-es';
import store from './store';

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
export function getPassiveEventConfig() {
  const isSupported = isPassiveEventsSupported();
  return isSupported ? { passive: true } : false;
}

export function isPassiveEventsSupported() {
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true;
      }
    });
    // @ts-ignore
    window.addEventListener('testPassive', null, opts);
    // @ts-ignore
    window.removeEventListener('testPassive', null, opts);
  } catch (e) {}

  return supportsPassive;
}

export function changeUrlExtension(url: string, newExtension: string): string {
  const urlParts = url.split('.');
  const oldExtension = urlParts[urlParts.length - 1];
  if (oldExtension.length >= 5) {
    console.log('changeUrlExtension: Probably url has no extension.');
    return '';
  }
  const indexOfExtension = urlParts.length - 1;
  urlParts.splice(indexOfExtension, 1, newExtension);
  return urlParts.join('.');
}

export function transformCloudinaryUrl(resourceUrl: string, transformations: string): string {
  if (!resourceUrl || !transformations || resourceUrl.indexOf('cloudinary') < 0) {
    return resourceUrl;
  }
  const urlParts = resourceUrl.split('/');

  const indexOfUpload = urlParts.indexOf('upload');
  urlParts.splice(indexOfUpload + 1, 0, transformations);
  return urlParts.join('/');
}

export function getPosterImage(videoUrl: string, transformations: string): string | null {
  if (!videoUrl) {
    return null;
  }
  return transformCloudinaryUrl(changeUrlExtension(videoUrl, 'jpg'), transformations);
}

export function hasAudio(video: any) {
  return (
    video.mozHasAudio ||
    Boolean(video.webkitAudioDecodedByteCount) ||
    Boolean(video.audioTracks && video.audioTracks.length)
  );
}

export function getRandomsOf(items: any[]) {
  if (!(items.length > 0)) {
    return [];
  }
  return items.sort(() => 0.5 - Math.random());
}

export function APIPath(path: string) {
  return BASE_API + path;
}

export function formatDate(inputDate: Date | string | number, dateFormat = 'ddd, D MMM'): string {
  return format(inputDate, dateFormat);
}

export function cardDate(date?: string | number | Date) {
  const dateFormat = 'MMM D, YYYY';
  let formattedDate = '';
  if (date) {
    formattedDate = format(date, dateFormat);
  }
  return formattedDate;
}

export function reviewDateMonth(date?: string | number | Date) {
  const dateFormat = 'MMM D';
  let formattedDate = '';
  if (date) {
    formattedDate = format(date, dateFormat);
  }
  return formattedDate;
}
export function reviewDay(date?: string | number | Date) {
  const dateFormat = 'dddd';
  let formattedDate = '';
  if (date) {
    formattedDate = format(date, dateFormat);
  }
  return formattedDate;
}

export function setDocumentClassesOnToggleDialog(isOpen: boolean) {
  if (isOpen) {
    document.documentElement.classList.add('overflow-y-hidden', 'dialog--is-open');
  } else {
    document.documentElement.classList.remove('overflow-y-hidden', 'dialog--is-open');
  }
}

export function removeOtherLanguagesExcept(langCode, innherHTML) {
  const otherLanguageCodes = languageCodes.filter(code => code !== langCode);
  const virtualElement = document.createElement('div');
  virtualElement.innerHTML = innherHTML;
  otherLanguageCodes.forEach(langCodeToRemove => {
    const otherLanguageElements = virtualElement.getElementsByClassName(langCodeToRemove) as HTMLCollection;
    const otherLanguageElementsArray = Array.from(otherLanguageElements);

    if (otherLanguageElementsArray.length > 0) {
      for (let i = 0; i < otherLanguageElementsArray.length; i++) {
        try {
          // @ts-ignore
          otherLanguageElements[i].parentNode.removeChild(otherLanguageElements[i]);
        } catch (error) {}
      }
    }
  });
  return virtualElement;
}

export function toFixedNumber(number, decimals) {
  return Number(number.toFixed(decimals));
}

export function getFormattedMetaDescription(text) {
  return text.substring(0, 180).trim();
}

export function getFormattedMetaTitle(text, { titleCase = true, maxLength = 80 } = {}) {
  let result = text;
  if (titleCase) {
    result = startCase(toLower(result));
  }
  return result.substring(0, maxLength).trim();
}

export function getAuthHeaders() {
  const jwtToken = store.getters['auth/token'];
  if (!jwtToken) {
    return;
  }
  return { Authorization: `Bearer ${jwtToken}` };
}
