import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import ReactInputMask from 'react-input-mask-next';
import * as Yup from "yup"
import PasswordInput from './password-input';

const RegisterForm = ({setDefaultTab}) => {

    const [loading, setLoading] = useState(false);
    const initialValues = {
        firstName : "",
        lastName : "",
        phoneNumber : "",
        address : "",
        zipCode : "",
        email : "",
        password : "",
        confirmPassword : ""
    }

    const validationSchema = Yup.object({
        firstName : Yup.string().required("Please enter your first name"),
        lastName : Yup.string().required("Please enter your last name"),
        phoneNumber : Yup.string().required("Please enter your phone number"),
        address : Yup.string().required("Please enter your address"),
        zipCode : Yup.string().required("Please enter your zip code"),
        email : Yup.string().email().required("Please enter your e-mail address"),
        password : Yup.string().required("Please enter your password")
                                .min(8, "Must be at least 8 characters")
                                .matches(/[a-z]+/, "Must be at least one lowercase")
                                .matches(/[A-Z]+/, "Must be at least one lowercase")
                                .matches(/\d+/,"Must be at least one digit"),
        confirmPassword : Yup.string().required("Please re-enter your password")
                                .oneOf([Yup.ref("password")] , "Please enter same password"),
        
    })

    const onSubmit = async (values)=>{

    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit 
     })


  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
    <Form.Group className='mb-3'>
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text"
        {...formik.getFieldProps("firstName")}
        isInvalid={formik.touched.firstName && formik.errors.firstName}
        isValid={formik.touched.firstName && !formik.errors.firstName}
        />
        <Form.Control.Feedback>{formik.errors.firstName}</Form.Control.Feedback>
    </Form.Group>
   
    <Form.Group className='mb-3'>
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text"
        {...formik.getFieldProps("lastName")}
        isInvalid={formik.touched.lastName && formik.errors.lastName}
        isValid={formik.touched.lastName && !formik.errors.lastName}
        />
        <Form.Control.Feedback>{formik.errors.lastName}</Form.Control.Feedback>
    </Form.Group>

    <Form.Group className='mb-3'>
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="text"
        as = {ReactInputMask} mask="(999) 999-9999"
        {...formik.getFieldProps("phoneNumber")}
        isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber}
        isValid={formik.touched.phoneNumber && !formik.errors.phoneNumber}
        />
        <Form.Control.Feedback>{formik.errors.phoneNumber}</Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3" >
        <Form.Label>Address</Form.Label>
        <Form.Control
        type='text'
        {...formik.getFieldProps("address")} 
        isInvalid={formik.touched.address && formik.errors.address}
        isValid={formik.touched.address && !formik.errors.address}/>
        <Form.Control.Feedback>{formik.errors.address}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Zip Code</Form.Label>
        <Form.Control
        type='text'
        {...formik.getFieldProps("zipcode")} 
        isInvalid={formik.touched.zipcode && formik.errors.zipcode}
        isValid={formik.touched.zipcode && !formik.errors.zipcode}/>
        <Form.Control.Feedback>{formik.errors.zipcode}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>E-Mail</Form.Label>
        <Form.Control
        type='email'
        {...formik.getFieldProps("email")} 
        isInvalid={formik.touched.email && formik.errors.email}
        isValid={formik.touched.email && !formik.errors.email}/>
        <Form.Control.Feedback>{formik.errors.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <PasswordInput
        {...formik.getFieldProps("password")} 
        isInvalid={formik.touched.password && formik.errors.password}
        isValid={formik.touched.password && !formik.errors.password}
        error={formik.errors.password}
        />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Confirm Password</Form.Label>
        <PasswordInput
        {...formik.getFieldProps("confirmPassword")} 
        isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
        isValid={formik.touched.confirmPassword && !formik.errors.confirmPassword}
        error={formik.errors.confirmPassword}
        />
      </Form.Group>


    
    <Button variant='primary' type='submit'>Register</Button>
</Form>
  )
}

export default RegisterForm