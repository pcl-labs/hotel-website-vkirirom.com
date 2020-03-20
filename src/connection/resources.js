// Add default options
export const serviceOptions = {};
// Instance selector
function axios(configs, resolve, reject) {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}
function getConfigs(method, contentType, url, options) {
  const configs = Object.assign({}, options, { method, url });
  configs.headers = Object.assign({}, options.headers, { 'Content-Type': contentType });
  return configs;
}
export class IList extends Array {}
export class List extends Array {}
export class ListResultDto {}
export class PagedResultDto {}
// customer definition
// empty
export class AuthenticationService {
  /**
   *
   */
  static login(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/authentication/login';
      const configs = getConfigs('post', 'application/json', url, options);
      let data = params.body;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static logout(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/authentication/logout';
      const configs = getConfigs('post', 'application/json', url, options);
      let data = null;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static login1(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/authentication/provider/login';
      const configs = getConfigs('get', 'application/json', url, options);
      configs.params = { provider: params['provider'], returnUrl: params['returnUrl'] };
      let data = null;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static logout1(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/authentication/provider/logout';
      const configs = getConfigs('post', 'application/json', url, options);
      configs.params = { provider: params['provider'] };
      let data = null;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static register(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/authentication/register';
      const configs = getConfigs('post', 'application/json', url, options);
      let data = params.body;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static ping(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/authentication/ping';
      const configs = getConfigs('get', 'application/json', url, options);
      let data = null;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}
export class CardService {
  /**
   *
   */
  static related(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/cards/{id}/related';
      url = url.replace('{id}', params['id'] + '');
      const configs = getConfigs('get', 'application/json', url, options);
      let data = null;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}
export class CategoryService {
  /**
   *
   */
  static categories(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/categories';
      const configs = getConfigs('get', 'application/json', url, options);
      let data = null;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}
export class CompanyService {
  /**
   *
   */
  static companies(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/companies';
      const configs = getConfigs('post', 'application/json', url, options);
      let data = params.body;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static publishable(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/companies/{companyId}/stripe/keys/publishable';
      url = url.replace('{companyId}', params['companyId'] + '');
      const configs = getConfigs('get', 'application/json', url, options);
      let data = null;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}
export class PageService {
  /**
   *
   */
  static slug(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/pages/slug/{companySlug}/{pageSlug}';
      url = url.replace('{companySlug}', params['companySlug'] + '');
      url = url.replace('{pageSlug}', params['pageSlug'] + '');
      const configs = getConfigs('get', 'application/json', url, options);
      let data = null;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static slug1(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/pages/slug/{companySlug}';
      url = url.replace('{companySlug}', params['companySlug'] + '');
      const configs = getConfigs('get', 'application/json', url, options);
      let data = null;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static byName(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/pages/slug/{companySlug}/categories/by-name/{categoryName}';
      url = url.replace('{companySlug}', params['companySlug'] + '');
      url = url.replace('{categoryName}', params['categoryName'] + '');
      const configs = getConfigs('get', 'application/json', url, options);
      let data = null;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}
export class PlanetCollageService {
  /**
   *
   */
  static byTag(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/planetcollage/by-tag/{tag}';
      url = url.replace('{tag}', params['tag'] + '');
      const configs = getConfigs('get', 'application/json', url, options);
      let data = null;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static full(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/planetcollage/full';
      const configs = getConfigs('post', 'application/json', url, options);
      let data = params.body;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}
export class PriceService {
  /**
   *
   */
  static prices(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/prices';
      const configs = getConfigs('post', 'application/json', url, options);
      let data = params.body;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}
export class ReservationService {
  /**
   *
   */
  static reservations(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/reservations/{reservationId}';
      url = url.replace('{reservationId}', params['reservationId'] + '');
      const configs = getConfigs('get', 'application/json', url, options);
      let data = null;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static pay(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/reservations/{reservationId}/pay';
      url = url.replace('{reservationId}', params['reservationId'] + '');
      const configs = getConfigs('post', 'application/json', url, options);
      let data = params.body;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static reserve(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/reservations/roomtype/{roomTypeId}/reserve';
      url = url.replace('{roomTypeId}', params['roomTypeId'] + '');
      const configs = getConfigs('post', 'application/json', url, options);
      let data = params.body;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}
export class RoomTypeService {
  /**
   *
   */
  static prices(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      let url = '/api/v0/roomtypes/{roomTypeId}/prices';
      url = url.replace('{roomTypeId}', params['roomTypeId'] + '');
      const configs = getConfigs('get', 'application/json', url, options);
      configs.params = { startDate: params['startDate'], endDate: params['endDate'] };
      let data = null;
      configs.data = data;
      axios(configs, resolve, reject);
    });
  }
}
