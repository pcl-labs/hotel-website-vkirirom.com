// swagger API docs: https://stagingapi.whynot.earth/index.html
const { codegen } = require('swagger-axios-codegen');
const { BASE_API } = require('../constants/connection');
console.log('BASE_API', BASE_API);

codegen({
  methodNameMode: 'operationId',
  remoteUrl: `${BASE_API}/swagger/v0/swagger.json`,
  useStaticMethod: true,
  outputDir: './temp/',
  fileName: 'resources.ts'
});
