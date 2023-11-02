import React from 'react'
import "./popular-vehicle.scss";
import { Button, Col, Container, Row } from 'react-bootstrap';
import { settings } from '../../../../utils/settings';
import {RiGasStationFill, RiCarLine, RiCaravanLine} from "react-icons/ri";
import {IoIosSnow} from "react-icons/io";
import {MdOutlineAirlineSeatReclineExtra} from "react-icons/md";
import {GiJoystick, GiCalendarHalfYear} from "react-icons/gi";
import Spacer from '../../../common/spacer/spacer';
import { getVehicleImage } from '../../../../utils/functions/vehicle-functions';
import { Link } from 'react-router-dom';



const PopularVehicle = (props) => {
  
  const {activeVehicle} = props;
  const {id, image, model, year, airConditioning, doors, fuelType, luggage, pricePerHour, seats, transmission } = activeVehicle;
  
  return ( 
    <Container className='popular-vehicle'>
      <div>{model?(<Row className='g-5'>
       <Col md={8}>
          <img src={getVehicleImage(image)} className='img-fluid' alt={model}/>
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
          <li><GiCalendarHalfYear/>Year: {year}</li>
        </ul>
        <Spacer height={50}/>
        <Button variant="primary" as={Link} to={`/vehicles/${id}`}>Rent Now</Button>
       </Col>
    </Row>):(<></>)}</div>
    
  </Container> 
  )
}

export default PopularVehicle;