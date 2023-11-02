import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

const register = (user) => { 

    return axios.post(`${API_URL}/register`, user);
 }

 const login = (credentials) => { 

    return axios.post(`${API_URL}/login`, credentials);
 }

 const getUser = () => { 

    return axios.get(`${API_URL}/user`, {headers: authHeader()});

  }

 export {register, login, getUser};