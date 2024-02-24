import axios from "axios";


const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_TICKETS,
  timeout: 12000,
});

export default instance;
