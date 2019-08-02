import { BASE_API } from "@/constants/connection";
import axios from 'axios'

export const ajax = axios.create({
  baseURL: BASE_API,
  timeout: 20000,
  withCredentials: true
});
