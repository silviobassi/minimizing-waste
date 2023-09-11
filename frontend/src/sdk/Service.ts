import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import handleAxiosResponseError from './utils/handleAxiosResponseError';
import handleAxiosResponseSuccess from './utils/handleAxiosResponseSuccess';

const Http = axios.create();

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL

class Service {
  public static Http = Http;
  protected static getData = getData;
  protected static getStatus = getStatus;

  public static setBaseUrl(baseURL: string) {
    this.Http.defaults.baseURL = baseURL;
  }

  public static setRequestInterceptors(
    onFulfilled: (
      request: AxiosRequestConfig,
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
    onRejected?: (error: any) => any,
  ) {
    //@ts-ignore
    Http.interceptors.request.use(onFulfilled, onRejected);
  }

  public static setResponseInterceptors(
    onFulfilled: (
      response: AxiosResponse,
    ) => AxiosResponse | Promise<AxiosResponse>,
    onRejected: (error: any) => any,
  ) {
    Http.interceptors.response.use(onFulfilled, onRejected);
  }
}

function getData<T>(res: AxiosResponse<T>) {
  return res.data;
}

function getStatus<T>(res: AxiosResponse<T>) {
  return res.status;
}

Http.defaults.baseURL = API_BASE_URL;

Http.interceptors.response.use(
  handleAxiosResponseSuccess,
  handleAxiosResponseError,
);

export default Service;
