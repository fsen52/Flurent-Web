import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { downloadVehicles, getVehiclesByPage } from "../../../api/vehicle-service";
import fileDownload from "js-file-download";
import { Button, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Loading from "../../common/loading/loading";

const columns = [
    {
        name: 'Car Name',
        selector: row => row.model,
    },
    {
        name: 'Doors',
        selector: row => row.doors,
    },
    {
        name: 'Seats',
        selector: row => row.seats,
    },
    {
        name: 'Luggage',
        selector: row => row.luggage,
    },
    {
        name: 'Transmission',
        selector: row => row.transmission,
    },
    {
        name: 'Fuel Type',
        selector: row => row.fuelType,
    },
    {
        name: 'Year',
        selector: row => row.year,
    },
    {
        name: 'Price Per Hour',
        selector: row =>` $${row.pricePerHour}`,
    },
  
  ];



const AdminVehicles = () => {

    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)
    const [downloading, setDownloading] = useState(false)
    const [totalRows, setTotalRows] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const navigate=useNavigate();

    const loadData = async(page) => {
        setLoading(true);
    
        try {
          
          const resp = await getVehiclesByPage(page , perPage);
          setVehicles(resp.data.content);
          setTotalRows(resp.data.totalElements);
     
    
        } catch (error) {
          
          console.log(error);
    
        }finally{
          setLoading(false);
        }
    
      }

      const handlePageChange = page => {
        //data table component start with "1" but our data start with "0"
            loadData(page-1);
        };
    
        const handlePerRowsChange = async (newPerPage, page) => {
    
    
        loadData(page-1);
        setPerPage(newPerPage);
        
        };

        useEffect(() => {
    
            loadData(0);
            
          }, [ ])


          const handleDownload =async () => {

            setDownloading(true);
      
            try {
      
              const resp =await downloadVehicles();
              fileDownload(resp.data , `vehicles-${new Date().valueOf()}.xlsx`)
              
            } catch (error) {
              console.log(error);
            }finally{
              setDownloading(false);
            }
      
          }

          const handleRowClick = (row) => { 
         
            //TODO "carId" must be change wit "id"
            navigate(`/rentadmin/vehicles/${row.carId}`);
     
           }
      
           const handleNavigate = () => {
            navigate("new");
           }

  return (
    <div>


     <Button variant='primary' type='button' onClick={handleNavigate} >
      {downloading && <Spinner animation='border' size='sm' />}  New Car
      </Button>
      
    <Button variant='secondary' onClick={handleDownload} disabled={downloading}>
     {downloading && <Spinner animation='border' size='sm' />} Download Vehicles
      </Button>

    <DataTable  
    columns={columns} 
    data={vehicles} 
    progressPending={loading}
    progressComponent={<Loading/>}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange} 
    onRowClicked={handleRowClick}
    />

  </div>
  )
}

export default AdminVehicles