import React, { useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import { getReservation } from '../../../api/reservation-service';
import Loading from '../../common/loading/loading';
import { formatDateTimeLLL } from '../../../utils/functions/date-time';
import {BsArrowBarLeft} from "react-icons/bs"
import { getVehicleImage } from '../../../utils/functions/vehicle-functions';

const ReservationDetails = () => {

  const {reservationId} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState({});

  const loadData = async() => { 
    try {

      const resp = await getReservation(reservationId);
      setReservation(resp.data);
      
    } catch (err) {
      console.log(err);
      
    }finally{
      setLoading(false);
    }
   }

   useEffect(() => {
     loadData()
   
    
   }, [])

 
   
   return (
    // TODO car and carId must change
    <Container>
      {loading ?  <Loading/> : (
      <Row>
        <Col md={6}>
          <h2 className='text-center'>{reservation.car.model}</h2>
          <img src={getVehicleImage(reservation.car.image)} alt={reservation.car.model} className='img-fluid'/>
          <Button variant='primary' onClick={()=> navigate(-1)}>
            <BsArrowBarLeft/> Back to reservations
          </Button>
        </Col>
        <Col md={6}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey='0'>
              <Accordion.Header>Reservation Details</Accordion.Header>
              <Accordion.Body>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                     <td>Pick-up Location</td>
                     <td>{reservation.pickUpLocation}</td>
                    </tr>
                    <tr>
                     <td>Drop-off Location</td>
                     <td>{reservation.dropOffLocation}</td>
                    </tr>
                    <tr>
                     <td>Pick-up Time</td>
                     <td>{formatDateTimeLLL(reservation.pickUpTime)}</td>
                    </tr>
                    <tr>
                     <td>Drop-off Time</td>
                     <td>{formatDateTimeLLL(reservation.dropOffTime)}</td>
                    </tr>
                    <tr>
                     <td>Status</td>
                     <td>{reservation.status}</td>
                    </tr>
                    <tr>
                     <td>Price</td>
                     <td>{reservation.totalPrice}</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
              <Accordion.Header>Vehicle Details</Accordion.Header>
              <Accordion.Body>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                     <td>Model</td>
                     <td>{reservation.car.model}</td>
                    </tr>
                    <tr>
                     <td>Doors</td>
                     <td>{reservation.car.doors}</td>
                    </tr>
                    <tr>
                     <td>Seats</td>
                     <td>{reservation.car.seats}</td>
                    </tr>
                    <tr>
                     <td>Luggage</td>
                     <td>{reservation.car.luggage}</td>
                    </tr>
                    <tr>
                     <td>Transmission</td>
                     <td>{reservation.car.transmission}</td>
                    </tr>
                    <tr>
                     <td>Air Conditioning</td>
                     <td>{reservation.car.airConditioning ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                     <td>Fuel Type</td>
                     <td>{reservation.car.fuelType}</td>
                    </tr>
                     <tr>
                     <td>Year</td>
                     <td>{reservation.car.year}</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
      )}
    </Container>
  )
}

export default ReservationDetails