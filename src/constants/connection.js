const production_api = "https://api.whynot.earth";
const development_api = "https://stagingapi.whynot.earth";
let base_api = development_api;
if (process.env.API_ENDPOINT === "master") {
  base_api = production_api;
}

console.log({ base_api });

module.exports = {
  BASE_API: base_api,
  OAUTH_RETURN_URL: "https://www.vkirirom.com"
};
