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

  const updateUser = (user) => { 

   return axios.put(`${API_URL}/user`, user, {headers: authHeader()});

 }

 const updatePassword = (passwords) => { 

   return axios.patch(`${API_URL}/user/auth`, passwords, {headers: authHeader()});

 }

 export {register, login, getUser, updateUser, updatePassword};