import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;


 const isVehicleAvailable = (dto) => { 

    const {carId, pickUpDateTime, dropOffDateTime} = dto;

    return axios.get(`${API_URL}/reservations/auth?carId=${carId}&pickUpDateTime=${pickUpDateTime}&dropOffDateTime=${dropOffDateTime}`,
    {headers: authHeader()});

  }

  const createReservation = (carId, reservation) => { 

    return axios.post(`${API_URL}/reservations/add?carId=${carId}`, reservation,
    {headers: authHeader()});

   }

   const getReservations = () => { 

    return axios.get(`${API_URL}/reservations/auth/all`,
    {headers: authHeader(),});

   }

   const getReservation = (id) => { 

    return axios.get(`${API_URL}/reservations/${id}/auth`,
    {headers: authHeader()});

   }

 export {isVehicleAvailable, createReservation, getReservations, getReservation};