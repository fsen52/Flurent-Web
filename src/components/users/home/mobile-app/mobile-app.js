import React from 'react'
import "./mobile-app.scss";
import { Col, Container, Row } from 'react-bootstrap';
import SectionHeader from '../../common/section-header/section-header';
import btnGoogle from "../../../../assets/img/buttons/google-play.svg";
import btnApple from "../../../../assets/img/buttons/app-store.svg";
import mobileApp from "../../../../assets/img/bg/mobile.png"

const MobileApp = () => {
  return (
        <Container fluid className='mobile-app'>
            <Container>
                <Row className='g-5'>
                    <Col md={6}>
                        <SectionHeader title="Download our app to easy rent" subTitle="Download Now" alignment="left"/>
                        <p>
                            To be aware of extra bla bla bla
                        </p>
                        <div className='app-store'>
                            <a href="https://playstore.google.com">
                                <img src={btnGoogle} alt="Download from Google Play Store"/>
                            </a>
                            <a href="https://appstore.apple.com">
                                <img src={btnApple} alt="Download from Apple AppStore"/>
                            </a>
                        </div>
                        </Col>
                    <Col md={6} className='text-end'>
                        <img src={mobileApp} alt="Flurent Mobile App" className='img-fluid'/>
                        </Col>   
                </Row>
            </Container>
        </Container>
      )
}


export default MobileApp