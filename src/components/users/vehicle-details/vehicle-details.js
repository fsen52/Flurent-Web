import React from 'react'
import { Badge, Card, Col, Container, Row } from 'react-bootstrap'
import { getVehicleImage } from '../../../utils/functions/vehicle-functions'
import Spacer from '../../common/spacer/spacer'
import { RiCarLine, RiCaravanLine, RiGasStationFill } from 'react-icons/ri'
import { MdOutlineAirlineSeatReclineExtra } from 'react-icons/md'
import { GiCalendarHalfYear, GiJoystick } from 'react-icons/gi'
import { IoIosSnow } from 'react-icons/io'
import { useSelector } from 'react-redux'
import "./vehicle-details.scss"
import BookingForm from './booking-form'

const VehicleDetails = () => {

  const vehicle =  useSelector((state) => state.reservation.vehicle);
  const {image, model, age, airConditioning, doors, 
    fuelType, luggage, pricePerHour, seats, transmission } = vehicle;
console.log(vehicle);

  return (
    <Container className='vehicle-details'>
      <Row className='g-5'>
       <Col md={8}>
        <div className='title'>
          <h1>{model}</h1>
          <h3><Badge bg="primary">${pricePerHour}/hour</Badge></h3> 
        </div>
        <Card>
          <img src={getVehicleImage(image)} alt='car' className='img-fluid'/>
        </Card>
        <Spacer height={30}/>
        <h2>Property Highlights</h2>
        <ul>
          <li><RiCarLine/>{model}</li>
          <li><RiCarLine/>{doors} Doors</li>
          <li><MdOutlineAirlineSeatReclineExtra/> {seats} Seats</li>
          <li><RiCaravanLine/>{luggage} lt</li>
          <li><GiJoystick/>{transmission}</li>
          <li><IoIosSnow/>{airConditioning?"Available":"Not available"}</li>
          <li><RiGasStationFill/>{fuelType}</li>
          <li><GiCalendarHalfYear/>{age} Years</li>
        </ul>
       </Col>
       <Col md={4}><BookingForm/> </Col> 
      </Row>
    </Container>
  )
}

export default VehicleDetails   