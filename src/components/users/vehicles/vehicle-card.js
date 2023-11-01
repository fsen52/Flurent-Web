import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { getVehicleImage } from '../../../utils/functions/vehicle-functions';
import "./vehicle-card.scss";

const VehicleCard = (props) => {
    //TODO "id" must change with "carId" 
  const { id, model, image, pricePerHour } = props;
  
    return (
    <Card className="vehicle-card">
        <Card.Img variant='top' src={getVehicleImage(image)}/>
        <Card.Body>
            <Card.Title>{model}</Card.Title>
            <Card.Text><sup>$</sup>{pricePerHour}
            <span>/hour</span>
            </Card.Text>
        </Card.Body>
        <Card.Footer>
            <Button variant='dark'>Rent a Car</Button>
            <Button variant='primary'>Details</Button>
        </Card.Footer>
    </Card>
  )
}

export default VehicleCard