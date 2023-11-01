import React, { useEffect, useState } from 'react';
import "./auth.scss";
import { Card, Col, Container, Image, Row, Tab, Tabs } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom'
import logo from "../../../../assets/img/logo/logo.png";
import { RiCloseCircleLine, RiHome7Line } from 'react-icons/ri'
import LoginForm from './login-form';
import RegisterForm from './register-form'

const Auth = () => {

    const [searchParams] =useSearchParams();

    const [defaultTab, setDefaultTab] = useState("login");

    const navigate = useNavigate();

    useEffect(() => {
      setDefaultTab(searchParams.get("type")||"login");
        
    }, [searchParams])
    

    return (
        <Container fluid className='auth'>
            <Row>
                <Col lg={6}>
                    <img src={logo} alt="logo"/>
                    <div className='toolbar'>
                        <RiCloseCircleLine onClick={() => navigate(-1)}/>
                        <RiHome7Line onClick={() => navigate("/")}/>
                    </div>
                </Col>
                <Col lg={6}>
                    <Card>
                        <Card.Body>
                            <Tabs activeKey={defaultTab} className='mb-3' onSelect={(x)=> setDefaultTab(x)}>
                                <Tab eventKey="login" title="Login"><LoginForm/></Tab>
                                <Tab eventKey="register" title="Register"><RegisterForm setDefaultTab={setDefaultTab}/></Tab>
                            </Tabs>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    
  )
}

export default Auth