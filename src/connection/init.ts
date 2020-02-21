import { ajax } from './ajax';
// @ts-ignore
import { serviceOptions } from './resources.js';
serviceOptions.axios = ajax;
