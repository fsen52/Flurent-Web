import axios from "axios";
import { settings } from "../utils/settings";


const API_URL = settings.apiURL;

const getVehicles = () => {
    return axios.get(`${API_URL}/car/visitors/all`);

};

const getVehicle = (id) => {
    return axios.get(`${API_URL}/car/visitors/${id}`);

};

const getVehiclesByPage = (page=0, size=10, sort="model", direction="ASC")=> {
    return axios.get(`${API_URL}/car/visitors/pages?page=${page}&size=${size}&sort=${sort}&direction=${direction}`);

}

const getVehicleImage = (id) => { 
    if(Array.isArray(id))id=id[0];
    return axios.get(`${settings.apiURL}/files/display/${id}`, {responseType:"arraybuffer"})
 }

export {getVehicles, getVehicle, getVehiclesByPage, getVehicleImage};