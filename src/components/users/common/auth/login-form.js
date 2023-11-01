import React from 'react'
import { Formik, useFormik } from 'formik'
import { Button, Form, FormFloating } from 'react-bootstrap'
import * as Yup from "yup";
import PasswordInput from './password-input';

const LoginForm = () => {
    const initialValues={
        email: "",
        password: ""
    }

    const validationSchema= Yup.object({
        email: Yup.string().required("Please enter your e-mail address"),
        password: Yup.string().required("Please enter your password")
    })

    const onSubmit = async (values) => { 

    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group className='mb-3'>
            <Form.Label>E-mail Address</Form.Label>
            <Form.Control type="email"
            {...formik.getFieldProps("email")}
            isInvalid={formik.touched.email && formik.errors.email}
            isValid={formik.touched.email && !formik.errors.email}
            />
            <Form.Control.Feedback>{formik.errors.email}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <PasswordInput
            {...formik.getFieldProps("password")}
            isInvalid={formik.touched.password && formik.errors.password}
            isValid={formik.touched.password && !formik.errors.password}
            error={formik.errors.password}
            />
            
        </Form.Group>
        <Button variant='primary' type='submit'>Login</Button>
    </Form>
  )
}

export default LoginForm