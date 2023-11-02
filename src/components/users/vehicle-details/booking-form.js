import React from 'react'
import SectionHeader from '../common/section-header/section-header'
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap'
import * as Yup from "yup"
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { combineDateTime } from '../../../utils/functions/date-time'
import { isVehicleAvailable } from '../../../api/reservation-service'

const BookingForm = () => {

    const vehicle = useSelector(state => state.reservation.vehicle);
    const checkVehicleAvailability = async () => { 
        const {pickUpDate, pickUpTime, dropOffDate, dropOffTime} = formik.values;
        try {

            const dto = {carId:vehicle.id, pickUpDateTime: combineDateTime(pickUpDate,pickUpTime), 
                        dropOffDateTime: combineDateTime(dropOffDate,dropOffTime)};

            const resp = await isVehicleAvailable(dto);
          
            
        } catch (err) {
            
        }
     };

    const initialValues = {
        pickUpLocation:"",
        dropOffLocation:"",
        pickUpDate:"",
        pickUpTime:"",
        dropOffDate:"",
        dropOffTime:""
    }

    const validationSchema= Yup.object({
        pickUpLocation:Yup.string().required("Enter a pick-up location"),
        dropOffLocation:Yup.string().required("Enter a drop-off location"),
        pickUpDate:Yup.string().required("Select a pick up date"),
        pickupTime:Yup.string().required("Select a pick up time"),
        dropOffDate:Yup.string().required("Select a drop off date"),
        dropOffTime:Yup.string().required("Select a drop off time"),
    })

    const onSubmit = () => {

    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

  return (
    <>
        <SectionHeader title="BookingForm"/>
        <Form noValidate >
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
                    <Form.Control type="date" placeholder='Pick-up Date'
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
                    <Form.Control type="date" placeholder='Drop-off Date'
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

            <Button variant='secondary' type='button' className='w-100'
                onClick={checkVehicleAvailability}>Check Availability</Button>                
        </Form>
    </>
  )
}

export default BookingForm