import instance from '../http/axios.service';

import { getCookie } from '../../../utils/GetTokenCookie.utils';
import { environment } from '../../../../environments/environment';

const axiosApiInstance = instance;

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config: any) => {
    const ACCESS_TOKEN =
      getCookie('ACCESS_TOKEN') || localStorage.getItem('ACCESS_TOKEN');
    console.log(ACCESS_TOKEN);

    if (ACCESS_TOKEN) {
      config.headers.common['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
    }
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    console.log(error.response.status, 'statusCode error');

    if (error.response.status === 403 || error.response.status === 401) {
      location.replace(environment.redirectLogin);
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
