import React, { useState } from 'react'
import "./contact-form.scss"
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import SectionHeader from '../../common/section-header/section-header';
import ContactInfo from '../contact-info';
import { sendMessage } from '../../../../api/contact-service';
import { toast } from '../../../../utils/functions/swal';



const ContactForm = () => {
    const [loading, setLoading] = useState(false)

    const initialValues = {
        name:"",
        subject:"",
        body:"",
        email:""
    }

    const validationSchema = Yup.object({
        name:Yup.string().required("Please enter your name"),
        subject:Yup.string().max(50, "Your messages subject should be max 50 char")
                    .min(5,"Your messages subject should be min 5 char").required("Please enter your messages subject"),
        body:Yup.string().max(200, "Your message should be max 200 char")
        .min(5,"Your message should be min 20 char").required("Please enter your message"),
        email:Yup.string().email().required("Please enter your e-mail")
    })

    const onSubmit = async(values) => {
        setLoading(true);

        try {
            await sendMessage(values);
            formik.resetForm();
            toast("success", "Your message sent")
        } catch (err) {
            console.log(err);
            
        }finally{
            setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })


    return (
        <Container className='contact-form'>
            <Row>
                <Col md={6}>
                    <SectionHeader title="Contact Us" subTitle="Need you extra info?"/>
                    <p>Lookinn for a small or medium bla bla bla</p>
                    <ContactInfo/>
                </Col>
                <Col md={6}>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' {...formik.getFieldProps("name")}
                            isInvalid={formik.touched.name && formik.errors.name}
                            isValid={formik.touched.name && !formik.errors.name}/>
                            <Form.Control.Feedback type='invalid'>{formik.errors.name}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Subject</Form.Label>
                            <Form.Control type='text' {...formik.getFieldProps("subject")}
                            isInvalid={formik.touched.subject && formik.errors.subject}
                            isValid={formik.touched.subject && !formik.errors.subject}/>
                            <Form.Control.Feedback type='invalid'>{formik.errors.subject}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Body</Form.Label>
                            <Form.Control as="textarea" rows={3} maxLength={200} type='text' 
                            {...formik.getFieldProps("body")}
                            isInvalid={formik.touched.body && formik.errors.body}
                            isValid={formik.touched.body && !formik.errors.body}/>
                            <Form.Control.Feedback type='invalid'>{formik.errors.body}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' {...formik.getFieldProps("email")}
                            isInvalid={formik.touched.email && formik.errors.email}
                            isValid={formik.touched.email && !formik.errors.email}/>
                            <Form.Control.Feedback type='invalid'>{formik.errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Button variant='primary' type='submit' 
                        disabled={!(formik.dirty && formik.isValid) || loading}>
                            {loading && <Spinner animation='border' size='sm'/>}Send
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
  )
}

export default ContactForm