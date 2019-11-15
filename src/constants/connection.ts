const production_api = 'https://api.whynot.earth'
const development_api = 'https://stagingapi.whynot.earth'
let base_api = development_api
if (process.env.API_ENDPOINT === 'master') {
  base_api = production_api
}

console.log('base_api', base_api)

// FIXME: update url
const OAUTH_RETURN_URL = 'https://www.example.com'

export { base_api as BASE_API, OAUTH_RETURN_URL }
