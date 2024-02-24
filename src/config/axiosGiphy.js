import axios from "axios";


const instance = axios.create({
  baseURL: "https://api.giphy.com/v1/gifs/search",
  timeout: 12000,
});
instance.interceptors.request.use(config => {
  config.params = {
    api_key: import.meta.env.VITE_REACT_APP_API_KEY_GIPHY,
    ...config.params
  };
  return config
});

export default instance;