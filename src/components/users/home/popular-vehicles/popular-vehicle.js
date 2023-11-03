import React, { useEffect, useState } from 'react'
import "./popular-vehicle.scss";
import { Button, Col, Container, Row } from 'react-bootstrap';
import { settings } from '../../../../utils/settings';
import {RiGasStationFill, RiCarLine, RiCaravanLine} from "react-icons/ri";
import {IoIosSnow} from "react-icons/io";
import {MdOutlineAirlineSeatReclineExtra} from "react-icons/md";
import {GiJoystick, GiCalendarHalfYear} from "react-icons/gi";
import Spacer from '../../../common/spacer/spacer';
import { Link } from 'react-router-dom';
import { getVehicleImage } from '../../../../api/vehicle-service';
import Loading from '../../../common/loading/loading';



const PopularVehicle = (props) => {

  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const {activeVehicle} = props;
  const {id, image, model, age, airConditioning, doors, fuelType, luggage, pricePerHour, seats, transmission } = activeVehicle;
  
  const loadImage = async() => { 
    setLoading(true);
    try {
      const resp = await getVehicleImage(image);
      const uint8Array = new Uint8Array(resp.data);
      let base64String = btoa(String.fromCharCode.apply(null, uint8Array));
      //const imageBase64 = Buffer.from(resp.data).toString("base64");
      setImageSrc(`data:${resp.headers["content-type"]};base64,${base64String}`)
    } catch (err) {
      console.log(err);
    } finally{
      setLoading(false);
    }
   }


   useEffect(() => {
     loadImage()
   
   }, [activeVehicle])
   
  return ( 
    <Container className='popular-vehicle'>
      <div>{model?(<Row className='g-5'>
       <Col md={8}>{loading ? <Loading/> : <img src={imageSrc} className='img-fluid' alt={model}/>}
          
       </Col>
       <Col md={4}>
        <h2>
          <sup>$</sup>
          <span>{pricePerHour}</span>
        </h2>
        <p>rent per hour</p>

        <ul>
          <li><RiCarLine/>Model: {model}</li>
          <li><RiCarLine/>Doors: {doors}</li>
          <li><MdOutlineAirlineSeatReclineExtra/>Seats: {seats}</li>
          <li><RiCaravanLine/>Luggage: {luggage}</li>
          <li><GiJoystick/>Transmission: {transmission}</li>
          <li><IoIosSnow/>Air Conditioning: {airConditioning?"Available":"Not available"}</li>
          <li><RiGasStationFill/>Fuel Type: {fuelType}</li>
          <li><GiCalendarHalfYear/>Year: {age}</li>
        </ul>
        <Spacer height={50}/>
        <Button variant="primary" as={Link} to={`/vehicles/${id}`}>Rent Now</Button>
       </Col>
    </Row>):(<></>)}</div>
    
  </Container> 
  )
}

export default PopularVehicle;