import React from 'react'
import "./popular-vehicle.scss";
import { Button, Col, Container, Row } from 'react-bootstrap';
import { settings } from '../../../../utils/settings';
import {RiGasStationFill, RiCarLine, RiCaravanLine} from "react-icons/ri";
import {IoIosSnow} from "react-icons/io";
import {MdOutlineAirlineSeatReclineExtra} from "react-icons/md";
import {GiJoystick, GiCalendarHalfYear} from "react-icons/gi";
import Spacer from '../../../common/spacer/spacer';


const PopularVehicle = (props) => {
  
  const {activeVehicle} = props;
  console.log(activeVehicle);
  const {image, model, year, airConditioning, doors, fuelType, luggage, pricePerHour, seats, transmission } = activeVehicle;
  
  return (
    <Container className='popular-vehicle'>
      <Row className='g-5'>
         <Col md={8}>
            <img src={`${settings.apiURL}/files/display/${image[0]}`} className='img-fluid' alt={model}/>
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
          <Button variant="primary">Rent Now</Button>
         </Col>
      </Row>
    </Container> 
  )
}

export default PopularVehicle;