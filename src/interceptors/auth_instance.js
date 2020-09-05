import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/'
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