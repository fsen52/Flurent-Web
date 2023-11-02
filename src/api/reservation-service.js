import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;


 const isVehicleAvailable = (dto) => { 

    const {carId, pickUpDateTime, dropOffDateTime} = dto;

    return axios.get(`${API_URL}/reservations/auth?carId=${carId}&pickUpDateTime=${pickUpDateTime}&dropOffDateTime=${dropOffDateTime}`,
    {headers: authHeader()});

  }

 export {isVehicleAvailable};