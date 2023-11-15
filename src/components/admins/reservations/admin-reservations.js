import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import Loading from '../../common/loading/loading'
import { useNavigate } from 'react-router-dom'
import { downloadReservations, getReservationsAdmin } from '../../../api/reservation-service'
import fileDownload from 'js-file-download'

const columns = [
    {
  
    name: "Vehicle", 
    //TODO car must be changed with carId
    selector : (row) => row.car.model
    
    },
    {
  
    name: "Pick Up", 
    selector : (row) => row.pickUpLocation
      
    },
    {
  
    name: "Drop Off", 
    selector : (row) => row.dropOffLocation
        
    },
    {
  
      name: "Price", 
      selector : (row) =>` $${row.totalPrice}`
      
      },
    
  ];


const AdminReservations = () => {
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true)
    try {
        const resp = await getReservationsAdmin();
        setReservations(resp.data)
    } catch (err) {
        console.log(err);
    }finally{
        setLoading(false)
    }
}

const handleDownload = async () => {
    setDownloading(true);
    try {
      const resp = await downloadReservations();
      fileDownload(resp.data, `reservations-${new Date().valueOf()}.xlsx`)
    } catch (err) {
      console.log(err);
    }finally{
      setDownloading(false);
    }
  }

  const handleRowClick = (row) => { 
      navigate(`/rentadmin/reservations/${row.id}`);
   }


  useEffect(() => {
    loadData()
  
  }, [])
    


  return (
    <div>
    <Button variant="secondary" onClick={handleDownload} disabled={downloading}>{downloading && 
        <Spinner animation='border' size='sm'/>}Download Reservations
    </Button>
    <DataTable columns={columns} data={reservations} progressPending={loading} progressComponent={<Loading/>} pagination
         onRowClicked={handleRowClick} pointerOnHover={true}/>
  </div>
  )
}

export default AdminReservations