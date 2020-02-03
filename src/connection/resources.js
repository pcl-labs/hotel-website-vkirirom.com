/** Generate by swagger-axios-codegen */
import axiosStatic from 'axios'
// Add default options
export const serviceOptions = {}
// Instance selector
function axios(configs) {
  return serviceOptions.axios ? serviceOptions.axios.request(configs) : axiosStatic(configs)
}
export class AuthenticationService {
  /**
   *
   */
  static login(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'post' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/authentication/login'
      configs.url = temporaryUrlFix(url)
      let data = Object.assign({}, params['model'])
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  /**
   *
   */
  static logout(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'post' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/authentication/logout'
      configs.url = temporaryUrlFix(url)
      let data = null
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  /**
   *
   */
  static providerLogin(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'get' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/authentication/provider/login'
      configs.url = temporaryUrlFix(url)
      configs.params = params
      let data = null
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  /**
   *
   */
  static register(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'post' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/authentication/register'
      configs.url = temporaryUrlFix(url)
      let data = Object.assign({}, params['model'])
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  /**
   *
   */
  static ping(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'get' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/authentication/ping'
      configs.url = temporaryUrlFix(url)
      let data = null
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
export class CardService {
  /**
   *
   */
  static related(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'get' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/cards/{id}/related'
      url = url.replace('{id}', params['id'] + '')
      configs.url = temporaryUrlFix(url)
      ;['id'].forEach(key => {
        params[key] = null
      })
      let data = null
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
export class CategoryService {
  /**
   *
   */
  static get(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'get' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/categories'
      configs.url = temporaryUrlFix(url)
      let data = null
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
export class CompanyService {
  /**
   *
   */
  static create(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'post' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/companies'
      configs.url = temporaryUrlFix(url)
      configs.params = params
      let data = null
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  /**
   *
   */
  static stripePublishableKey(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'get' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/companies/{companyId}/stripe/keys/publishable'
      url = url.replace('{companyId}', params['companyId'] + '')
      configs.url = temporaryUrlFix(url)
      ;['companyId'].forEach(key => {
        params[key] = null
      })
      let data = null
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
export class PageService {
  /**
   *
   */
  static get(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'get' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/pages/slug/{companySlug}/{pageSlug}'
      url = url.replace('{companySlug}', params['companySlug'] + '')
      url = url.replace('{pageSlug}', params['pageSlug'] + '')
      configs.url = temporaryUrlFix(url)
      ;['companySlug', 'pageSlug'].forEach(key => {
        params[key] = null
      })
      let data = null
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  /**
   *
   */
  static getPages(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'get' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/pages/slug/{companySlug}'
      url = url.replace('{companySlug}', params['companySlug'] + '')
      configs.url = temporaryUrlFix(url)
      ;['companySlug'].forEach(key => {
        params[key] = null
      })
      let data = null
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  /**
   *
   */
  static byCompanyByCategoryName(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'get' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/pages/slug/{companySlug}/categories/by-name/{categoryName}'
      url = url.replace('{companySlug}', params['companySlug'] + '')
      url = url.replace('{categoryName}', params['categoryName'] + '')
      configs.url = temporaryUrlFix(url)
      ;['companySlug', 'categoryName'].forEach(key => {
        params[key] = null
      })
      let data = null
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
export class PlanetCollageService {
  /**
   *
   */
  static get(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'get' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/planetcollage/by-tag/{tag}'
      url = url.replace('{tag}', params['tag'] + '')
      configs.url = temporaryUrlFix(url)
      ;['tag'].forEach(key => {
        params[key] = null
      })
      let data = null
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  /**
   *
   */
  static fullResolution(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'post' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/planetcollage/full'
      configs.url = temporaryUrlFix(url)
      let data = Object.assign({}, params['model'])
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
export class PriceService {
  /**
   *
   */
  static create(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'post' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/prices'
      configs.url = temporaryUrlFix(url)
      configs.params = params
      let data = null
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
export class ReservationService {
  /**
   *
   */
  static get(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'get' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/reservations/{reservationId}'
      url = url.replace('{reservationId}', params['reservationId'] + '')
      configs.url = temporaryUrlFix(url)
      ;['reservationId'].forEach(key => {
        params[key] = null
      })
      let data = null
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  /**
   *
   */
  static payReservation(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'post' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/reservations/{reservationId}/pay'
      url = url.replace('{reservationId}', params['reservationId'] + '')
      configs.url = temporaryUrlFix(url)
      ;['reservationId'].forEach(key => {
        params[key] = null
      })
      let data = Object.assign({}, params['model'])
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  /**
   *
   */
  static reserveByRoomType(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'post' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/reservations/roomtype/{roomTypeId}/reserve'
      url = url.replace('{roomTypeId}', params['roomTypeId'] + '')
      configs.url = temporaryUrlFix(url)
      ;['roomTypeId'].forEach(key => {
        params[key] = null
      })
      let data = Object.assign({}, params['model'])
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
export class RoomTypeService {
  /**
   *
   */
  static prices(params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      const configs = Object.assign({}, options, { method: 'get' })
      configs.headers = Object.assign({}, options.headers, { 'Content-Type': 'application/json' })
      let url = '/api/v0/roomtypes/{roomTypeId}/prices'
      url = url.replace('{roomTypeId}', params['roomTypeId'] + '')
      configs.url = temporaryUrlFix(url)
      ;['roomTypeId'].forEach(key => {
        params[key] = null
      })
      configs.params = params
      let data = null
      configs.data = data
      axios(configs)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
export class LoginModel {
  constructor(data) {
    if (data) {
      this['email'] = data['email']
      this['password'] = data['password']
    }
  }
}
export class RegisterModel {
  constructor(data) {
    if (data) {
      this['email'] = data['email']
      this['password'] = data['password']
    }
  }
}
export class FullResolutionModel {
  constructor(data) {
    if (data) {
      this['id'] = data['id']
    }
  }
}
export class PayModel {
  constructor(data) {
    if (data) {
      this['amount'] = data['amount']
      this['metadata'] = data['metadata']
    }
  }
}
export class PayReservationResult {
  constructor(data) {
    if (data) {
      this['clientSecret'] = data['clientSecret']
    }
  }
}
export class ReservationModel {
  constructor(data) {
    if (data) {
      this['email'] = data['email']
      this['end'] = data['end']
      this['message'] = data['message']
      this['name'] = data['name']
      this['numberOfGuests'] = data['numberOfGuests']
      this['payment'] = data['payment']
      this['phone'] = data['phone']
      this['start'] = data['start']
    }
  }
}

function temporaryUrlFix(url) {
  const url2 = new URL(`${'http://example.com'}${url}`)
  url2.searchParams.set('culture', 'en-US')
  const url3 = url2.toString().replace('http://example.com', '')
  return url3
}
