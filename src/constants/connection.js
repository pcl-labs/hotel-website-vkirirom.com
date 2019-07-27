const production_api = "https://api.whynot.earth/api/v0";
const development_api = "https://stagingapi.whynot.earth/api/v0";
let base_api = production_api;
if (process.env.NODE_ENV === "development") {
  base_api = development_api;
}

export const BASE_API = base_api;
