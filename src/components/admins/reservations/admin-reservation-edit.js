import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { deleteReservationByIdAdmin, getReservationByIdAdmin, updateReservationByIdAdmin } from "../../../api/reservation-service";
import { question, toast } from "../../../utils/functions/swal";
import { useFormik } from "formik";
import { getVehicles } from "../../../api/vehicle-service";
import { combineDateTime, getDate, getTime } from "../../../utils/functions/date-time";
import Loading from "../../common/loading/loading";
import { Button, ButtonGroup, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";

const AdminReservationEdit = () => {

    const [loading, setLoading] = useState(true)
    const {reservationId} = useParams();
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(false)
    const [saving, setSaving] = useState(false)

    const [initialValues, setInitialValues] = useState({

        pickUpLocation:"",
        dropOffLocation:"",
        pickUpDate:"",
        pickUpTime:"",
        dropOffDate:"",
        dropOffTime:"",
        carId:"",
        status:"",
        userId:"",

    })

    const validationSchema = Yup.object({
        pickUpLocation:Yup.string().required(" pickUpLocation"),
        dropOffLocation:Yup.string().required(" dropOffLocation"),
        pickUpDate:Yup.string().required("pickUpDate "),
        pickUpTime:Yup.string().required("pickUpTime "),
        dropOffDate:Yup.string().required("dropOffDate "),
        dropOffTime:Yup.string().required("dropOffTime "),
        carId:Yup.number().required("carId "),
        status:Yup.string().required(" status"),
        
    })

    const onSubmit = async(values) => {

        setSaving(true);
        const { pickUpLocation, dropOffLocation ,  pickUpDate ,  pickUpTime , dropOffDate ,  dropOffTime , carId , status } = values;


        try {

            const dto = {
                
                    pickUpTime: combineDateTime(pickUpDate,pickUpTime),
                    dropOffTime: combineDateTime(dropOffDate , dropOffTime),
                    pickUpLocation,
                    dropOffLocation,
                    status,
                  
            };

            await updateReservationByIdAdmin(carId , reservationId , dto );
            toast("success","Reservation Updated");
            
        } catch (error) {
            console.log(error);
            toast("error",error.response.data.message);
        }finally{
            setSaving(false);
        }

    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true
    });

    const statusData = ["CREATED" , "CANCELLED" , "DONE"];

    const loadData =async () => { 
        
        setLoading(true);

        try {
  
            const respReservations = await getReservationByIdAdmin(reservationId);
            const respVehicles = await getVehicles();
            //TODO car must be change with carId
            const { pickUpLocation , dropOffLocation , dropOffTime ,  pickUpTime , status , userId , car} = respReservations.data;

            const dto = {

                pickUpLocation,
                dropOffLocation,
                pickUpDate:getDate(pickUpTime),
                pickUpTime:getTime(pickUpTime),
                dropOffDate:getDate(dropOffTime),
                dropOffTime:getTime(dropOffTime),
                //TODO car must be change with carId
                carId:car.carId,
                status:status,
                userId:userId,

            }
            
            setInitialValues(dto);
            setVehicles(respVehicles.data);
            
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }

     }


     const removeReservation =async () => { 
        
        setDeleting(true);

        try {
            
            await deleteReservationByIdAdmin(reservationId);
            toast("success","Reservation was deleted");
            navigate(-1)

        } catch (error) {
            toast("error",error.response.data.message);
        }finally{
            setDeleting(false);
        }

      }
     
     const handleDelete = () => { 
        
       question("Are you sure to delete" , "You wont be able to revert this!").
       then((result) => {
        if(result.isConfirmed){
            removeReservation();
        }
       })

      }



     useEffect(() => {
    
        loadData();
     }, [])
     


  return (
    loading ? (<Loading/>):(
    
    <Form noValidate onSubmit={formik.handleSubmit}>
        <Row>

            <Form.Group as={Col} md={6} lg={4} className='md-3'>
                <Form.Label>Pick Up Location</Form.Label>
                <Form.Control
                type='text'
                {...formik.getFieldProps("pickUpLocation")}
                isInvalid={formik.touched.pickUpLocation && formik.errors.pickUpLocation}/>
                <Form.Control.Feedback type='invalid'>{formik.errors.pickUpLocation}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={6} lg={4}  className='md-3'>
                <Form.Label>Drop Off Location</Form.Label>
                <Form.Control
                type='text'
                {...formik.getFieldProps("dropOffLocation")}
                isInvalid={formik.touched.dropOffLocation && formik.errors.dropOffLocation}/>
                <Form.Control.Feedback type='invalid'>{formik.errors.dropOffLocation}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={6} lg={4}  className='md-3'>
                <Form.Label>Pick Up Time</Form.Label>
                <InputGroup className='mb-3'>
                    
                    <Form.Control
                    type='date'
                    {...formik.getFieldProps("pickUpDate")}
                    isInvalid={formik.touched.pickUpDate && formik.errors.pickUpDate}/>

                    <Form.Control
                    type='time'
                    {...formik.getFieldProps("pickUpTime")}
                    isInvalid={formik.touched.pickUpTime && formik.errors.pickUpTime}/>

                    <Form.Control.Feedback type='invalid'>{formik.errors.pickUpDate  || formik.errors.pickUpTime}</Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md={6} lg={4}  className='md-3'>
                <Form.Label>Drop Off Time</Form.Label>
                <InputGroup className='mb-3'>
                    
                    <Form.Control
                    type='date'
                    {...formik.getFieldProps("dropOffDate")}
                    isInvalid={formik.touched.dropOffDate && formik.errors.dropOffDate}/>

                    <Form.Control
                    type='time'
                    {...formik.getFieldProps("dropOffTime")}
                    isInvalid={formik.touched.dropOffTime && formik.errors.dropOffTime}/>

                    <Form.Control.Feedback type='invalid'>{formik.errors.dropOffDate  || formik.errors.dropOffTime}</Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md={6} lg={4}  className='md-3'>
                <Form.Label>Vehicle</Form.Label>
                <Form.Select
                {...formik.getFieldProps("carId")}
                isInvalid={formik.touched.carId && formik.errors.carId}>
                    
                    {vehicles.map((vehicle) => 
                    //TODO car must be change with carId
                    <option value={vehicle.carId} key={vehicle.carId}>{vehicle.model}</option>
                        
                    )}
                    
                    
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{formik.errors.carId}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={6} lg={4}  className='md-3'>
                <Form.Label>Status</Form.Label>
                <Form.Select
                {...formik.getFieldProps("status")}
                isInvalid={formik.touched.status && formik.errors.status}>

                    {
                        statusData.map((status , index)=>(

                            <option key={index} value={status}>{status}</option>
                            
                        ))
                    }
                    
               
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{formik.errors.status}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={6} lg={4}  className='md-3'>

                    <Form.Label>Customer</Form.Label>
                    <div>
                        <Link to={`/rentadmin/users/${initialValues.userId}`}>Get Customer</Link>
                    </div>

            </Form.Group>

        </Row>

        <div className='text-end'>
                <ButtonGroup aria-label="Basic example">
                    <Button variant='primary' type='submit' disabled={saving}>{saving && <Spinner animation='border' size='sm' />}Save</Button>
                    <Button variant='secondary' type='button' onClick={()=>navigate("/admin/reservations")}>Cancel</Button>
                    <Button variant='danger' type='button' onClick={handleDelete} disabled={deleting}>{deleting && <Spinner animation='border' size='sm' />}Delete</Button>
                </ButtonGroup>
        </div>

    </Form>
    )
  )
}

export default AdminReservationEdit