import axios from "axios";


const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_TICKETS,
  timeout: 12000,
});

// instance.interceptors.request.use(
//   (config) => {
//     if (config.params && config.params.param) {
//       const name =  config.params.param.split('=')[0]
//       const value =  config.params.param.split('=')[1]
//       config.params = {
//         [name] : value,
//       };
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default instance;
