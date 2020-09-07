import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://83.136.219.54:8010/'
});

let storedToken = localStorage.getItem('Token');
if(storedToken) {
  axiosInstance.defaults.headers.common = {
    'Authorization': `Token ${storedToken}`
  }
}
else {
  axiosInstance.defaults.headers.common = null;
}

// Logging requests for debugging
// axiosInstance.interceptors.request.use(request => {
//   console.log('Starting Request', request)
//   return request;
// })

export default axiosInstance;