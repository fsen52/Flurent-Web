import React, { useEffect } from 'react'
import SectionHeader from '../../common/section-header/section-header'
import { useState } from 'react'
import { getVehiclesByPage } from '../../../../api/vehicle-service';
import Loading from '../../../common/loading/loading';
import VehicleBar from './vehicle-bar';
import PopularVehicle from './popular-vehicle';
import Spacer from '../../../common/spacer/spacer';
import PasswordInput from '../../common/auth/password-input';

const PopularVehicles = () => {

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeVehicle, setActiveVehicle] = useState({});

    


    const loadData = async ()=> {
        try {
            const resp = await getVehiclesByPage(/*Wir können hier default value benutzen*/ ); 
            const data = resp.data.content;

            setVehicles(data);
            if(data.length > 0 ) setActiveVehicle(data[0]);
    
            
        } catch (err) {
            console.log(err);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
           loadData();
    }, [])
    
    
  return (
    <div> <SectionHeader title="Popular Vehicle Models" subTitle="Lux &amp; Clasic" desc="To contribute to positive bla bla bla"/>
    <Spacer height={50}/>
    
    {loading ? (<Loading/>): <>
        <VehicleBar vehicles={vehicles} activeVehicle={activeVehicle} setActiveVehicle={setActiveVehicle}/>
        <Spacer height={50}/>
        <PopularVehicle activeVehicle={activeVehicle}/>
    </> 
    
    }
    
    </div>
  )
}

export default PopularVehicles