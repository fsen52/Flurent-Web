import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { getReservation, getReservations } from '../../../api/reservation-service';
import Loading from '../../common/loading/loading';
import { formatDateTimeLLL } from '../../../utils/functions/date-time';
import { useNavigate } from 'react-router-dom';

const Reservations = () => {

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadData = async () => { 
        setLoading(true);
        try {
            const resp = await getReservations();
            setReservations(resp.data);
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
    <Container>
        <Table responsive bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Vehicle</th>
                    <th>Pick-up</th>
                    <th>Drop-off</th>
                </tr>
            </thead>
            <tbody>
                {loading && (<tr><td colSpan={4}><Loading/></td></tr>)}

                {reservations.map((reservation,index)=> ( 
                <tr key={reservation.id} className={reservation.status === "CREATED" ? "table-success" 
                                                    : reservation.status === "COMPLETED" ? "table-info" 
                                                    : "table-secondary"}
                    style={{cursor:"pointer"}} onClick={()=> navigate(`/user/reservations/${reservation.id}`)}>
                    <td>{index+1}</td>

                    {/* //TODO car and carId must change */}
                    <td>{reservation.car.model}</td>
                    <td>{reservation.pickUpLocation}, {formatDateTimeLLL(reservation.pickUpTime)}</td>
                    <td>{reservation.dropOffLocation}, {formatDateTimeLLL(reservation.dropOffTime)}</td>
                </tr>))}

                {!loading && reservations.length <=0 && (<tr><td colSpan={4}>No reservation</td></tr>)}
            </tbody>
        </Table>
    </Container>
  )
}

export default Reservations