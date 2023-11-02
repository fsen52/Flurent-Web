import React, { useEffect, useState } from "react";
import PageHeader from "../../components/users/common/page-header/page-header";
import Spacer from "../../components/common/spacer/spacer";
import VehicleDetails from "../../components/users/vehicle-details/vehicle-details";
import { useParams } from "react-router-dom";
import { getVehicle } from "../../api/vehicle-service";
import { setVehicle } from "../../store/slices/reservation-slice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/common/loading/loading";

const VehicleDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const {vehicleId} = useParams();
  const dispatch = useDispatch();
  const vehicle = useSelector(state => state.reservation.vehicle);

  const loadData = async ()=> {
  
      try {
        const resp = await getVehicle(vehicleId);
        dispatch(setVehicle(resp.data));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
  }
  
  useEffect(() => {
    loadData()
  
  
  },[] )

  
  
  return <>
    <PageHeader title={vehicle?.model}/>
    <Spacer/>
    {loading ? <Loading/> : <VehicleDetails/> }
      </>;
};

export default VehicleDetailsPage;
