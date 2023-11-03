import React, { useState } from 'react'
import SectionHeader from '../common/section-header/section-header'
import { Alert, Button, ButtonGroup, FloatingLabel, Form, FormCheck, InputGroup, Spinner } from 'react-bootstrap'
import * as Yup from "yup"
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { checkDates, checkExpireDate, combineDateTime, getCurrentDate, getDate } from '../../../utils/functions/date-time'
import { createReservation, isVehicleAvailable } from '../../../api/reservation-service'
import { toast } from '../../../utils/functions/swal'
import InputMask from 'react-input-mask-next';
import { useNavigate } from 'react-router-dom'

const BookingForm = () => {

    const [loading, setLoading] = useState(false);
    const isUserLogin = useSelector(state => state.auth.isUserLogin);
    const vehicle = useSelector(state => state.reservation.vehicle);
    const [carAvailable, setCarAvailable] = useState(false);
    const [totalPrice, setTotalPrice] = useState();
    const navigate = useNavigate();


    const checkVehicleAvailability = async () => { 
        const {pickUpDate, pickUpTime, dropOffDate, dropOffTime} = formik.values;
        
        setLoading(true);
        try {

            if(!checkDates(formik.values)) throw new Error("Drop-off date cannot be before pick-up date")

            const dto = {carId:vehicle.id, pickUpDateTime: combineDateTime(pickUpDate,pickUpTime), 
                        dropOffDateTime: combineDateTime(dropOffDate,dropOffTime)};

            const resp = await isVehicleAvailable(dto);
            const {available, totalPrice} = resp.data;
            setCarAvailable(available);
            setTotalPrice(totalPrice)
            

            if(!available) throw new Error("The car you selected is not available during this date range.");
            
            
        } catch (err) {
            toast("error", err.message || err.response.data.message)
        } finally {
            setLoading(false);
        }
     };

    const initialValues = {
        pickUpLocation:"",
        dropOffLocation:"",
        pickUpDate:"",
        pickUpTime:"",
        dropOffDate:"",
        dropOffTime:"",
        cardNo:"",
        nameOnCard:"",
        expireDate:"",
        ccv:"",
        contract:false
    }

    const validationSchema= Yup.object({
        pickUpLocation:Yup.string().required("Enter a pick-up location"),
        dropOffLocation:Yup.string().required("Enter a drop-off location"),
        pickUpDate:Yup.string().required("Select a pick up date"),
        pickUpTime:Yup.string().required("Select a pick up time"),
        dropOffDate:Yup.string().required("Select a drop off date"),
        dropOffTime:Yup.string().required("Select a drop off time"),
        cardNo:Yup.string().required("Please Enter your card number"),
        nameOnCard:Yup.string().required("Please enter name on card"),
        expireDate:Yup.string().required("Please your expire date").
            test("month_check", "Enter a valid expire date (MM/YY)" , (value)=> checkExpireDate(value)),
        ccv:Yup.number().typeError("Must be number").required().min(1).max(999, "Please enter ccv"),
        contract:Yup.boolean().oneOf([true], "Please read the contract and check the box")
    })

    const onSubmit = async (values) => {
        const {pickUpDate, pickUpTime, dropOffDate, dropOffTime, pickUpLocation, dropOffLocation} = formik.values;
        setLoading(true)
        try {

            const dto = {
                pickUpTime: combineDateTime(pickUpDate, pickUpTime),
                dropOffTime: combineDateTime(dropOffDate, dropOffTime),
                pickUpLocation,
                dropOffLocation
            }
            await createReservation(vehicle.id, dto);
            toast("success", "Reservation created")
            formik.resetForm()
            navigate("/");
            
        } catch (err) {
            toast("error",err.response.data.message)
            
        } finally{
            setLoading(false)
        }


    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

  return (
    <>
        <SectionHeader title="Booking Form"/>
        {!isUserLogin && (<Alert>Please login first to check availability</Alert>)}
        <Form noValidate onSubmit={formik.handleSubmit}>
            <fieldset disabled={!isUserLogin || carAvailable}>
            <FloatingLabel label="Pick-up Location" className='mb-3'>
                <Form.Control type="text" placeholder='Pick-up Location'
                {...formik.getFieldProps("pickUpLocation")} 
                isInvalid={formik.touched.pickUpLocation && formik.errors.pickUpLocation}
                isValid={formik.touched.pickUpLocation && !formik.errors.pickUpLocation}/>
                <Form.Control.Feedback type="invalid">{formik.errors.pickUpLocation}</Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel label="Drop-off Location" className='mb-3'>
                <Form.Control type="text" placeholder='Drop-off Location'
                {...formik.getFieldProps("dropOffLocation")} 
                isInvalid={formik.touched.dropOffLocation && formik.errors.dropOffLocation}
                isValid={formik.touched.dropOffLocation && !formik.errors.dropOffLocation}/>
                 <Form.Control.Feedback type="invalid">{formik.errors.dropOffLocation}</Form.Control.Feedback>
            </FloatingLabel>

            <InputGroup className='mb-3'>
                <FloatingLabel label="Pick-up Date" >
                    <Form.Control type="date" min={getCurrentDate()} placeholder='Pick-up Date'
                {...formik.getFieldProps("pickUpDate")} 
                isInvalid={formik.touched.pickUpDate && formik.errors.pickUpDate}
                isValid={formik.touched.pickUpDate && !formik.errors.pickUpDate}/>
                 <Form.Control.Feedback type="invalid">{formik.errors.pickUpDate}</Form.Control.Feedback>
                 </FloatingLabel>

                 <FloatingLabel label="Time" >
                     <Form.Control type="time" placeholder='Time'
                {...formik.getFieldProps("pickUpTime")} 
                isInvalid={formik.touched.pickUpTime && formik.errors.pickUpTime}
                isValid={formik.touched.pickUpTime && !formik.errors.pickUpTime}/>
                 <Form.Control.Feedback type="invalid">{formik.errors.pickUpTime}</Form.Control.Feedback>
                </FloatingLabel>
            </InputGroup>

            <InputGroup className='mb-3'>
                <FloatingLabel label="Drop-off Date" >
                    <Form.Control type="date" min={getDate(formik.values.pickUpDate)} placeholder='Drop-off Date'
                {...formik.getFieldProps("dropOffDate")} 
                isInvalid={formik.touched.dropOffDate && formik.errors.dropOffDate}
                isValid={formik.touched.dropOffDate && !formik.errors.dropOffDate}/>
                 <Form.Control.Feedback type="invalid">{formik.errors.dropOffDate}</Form.Control.Feedback>
                 </FloatingLabel>

                 <FloatingLabel label="Time" >
                     <Form.Control type="time" placeholder='Time'
                {...formik.getFieldProps("dropOffTime")} 
                isInvalid={formik.touched.dropOffTime && formik.errors.dropOffTime}
                isValid={formik.touched.dropOffTime && !formik.errors.dropOffTime}/>
                 <Form.Control.Feedback type="invalid">{formik.errors.dropOffTime}</Form.Control.Feedback>
                </FloatingLabel>
            </InputGroup>

            <Button variant='secondary' type='button' disabled={loading}
                className={`w-100 ${carAvailable ? "d-none" : "d-block"}`}
                onClick={checkVehicleAvailability}>{loading && <Spinner animation='border' size="sm"/>}
                Check Availability</Button>                
            </fieldset>
            <fieldset  className={`mt-5 ${carAvailable ? "d-block" : "d-none"}`}>
                <Alert variant='info' ><h2>Total Price: ${totalPrice}</h2></Alert>
                <FloatingLabel label="Card Number" className='mb-3'>
                <Form.Control type="text" placeholder='Card Number'
                as={InputMask} mask="9999-9999-9999-9999"
                {...formik.getFieldProps("cardNo")} 
                isInvalid={formik.touched.cardNo && formik.errors.cardNo}
                isValid={formik.touched.cardNo && !formik.errors.cardNo}/>
                 <Form.Control.Feedback type="invalid">{formik.errors.cardNo}</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel label="Name On Card" className='mb-3'>
                <Form.Control type="text" placeholder='Name On Card'
                {...formik.getFieldProps("nameOnCard")} 
                isInvalid={formik.touched.nameOnCard && formik.errors.nameOnCard}
                isValid={formik.touched.nameOnCard && !formik.errors.nameOnCard}/>
                 <Form.Control.Feedback type="invalid">{formik.errors.nameOnCard}</Form.Control.Feedback>
            </FloatingLabel>
            <InputGroup className='mb-3'>
                <FloatingLabel label="Expire Date">
                    <Form.Control type="text" placeholder='Expire Date'
                    as={InputMask} mask="99/99"
                {...formik.getFieldProps("expireDate")} 
                isInvalid={formik.touched.expireDate && formik.errors.expireDate}
                isValid={formik.touched.expireDate && !formik.errors.expireDate}/>
                 <Form.Control.Feedback type="invalid">{formik.errors.expireDate}</Form.Control.Feedback>
                 </FloatingLabel>

                 <FloatingLabel label="CCV" >
                     <Form.Control type="text" placeholder='CCV'
                     as={InputMask} mask="999"
                {...formik.getFieldProps("ccv")} 
                isInvalid={formik.touched.ccv && formik.errors.ccv}
                isValid={formik.touched.ccv && !formik.errors.ccv}/>
                 <Form.Control.Feedback type="invalid">{formik.errors.ccv}</Form.Control.Feedback>
                </FloatingLabel>
            </InputGroup>

            <FormCheck type='checkbox' id="contract" label="I have read and aggree the contract"
            {...formik.getFieldProps("contract")} 
            isInvalid={formik.touched.contract && formik.errors.contract}
            isValid={formik.touched.contract && !formik.errors.contract}/>

            <ButtonGroup className='mt-3 w-100'>
                <Button variant='secondary' type='button'  disabled={loading}
                    onClick={()=>setCarAvailable(false)}
                    >{loading && <Spinner animation='border' size="sm"/>}
                    Edit
                </Button>                
                <Button variant='primary' type="submit"  disabled={loading}
                    >{loading && <Spinner animation='border' size="sm"/>}
                    Book Now
                </Button>                
                
            </ButtonGroup>

            
            </fieldset>
        </Form>
    </>
  )
}

export default BookingForm