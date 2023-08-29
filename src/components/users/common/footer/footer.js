import React from "react";
import logo from "../../../../assets/img/logo/logo.png";
import { Col, Container, Row } from "react-bootstrap";
import { settings } from "../../../../utils/settings";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
      <Container fluid className="footer">
          <Container>
              <Row>
                  <Col md={3}>
                    <Link to="/">
                    <img src={logo} alt={settings.siteName} />
                    </Link>
                    <p> Some expressions bla bla bla...</p>
                  </Col>
                  <Col md={3}><h2>Quick Links</h2>
                    <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/vehicles">Vehicles</Link></li>
                      <li><Link to="/about">About Us</Link></li>
                      <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                  </Col>
                  <Col md={3}><h2>Working Hours</h2>
                  <ul><li>7 / 24</li></ul></Col>
                  <Col md={3}><h2>Contact Us</h2></Col>
              </Row>
          </Container>
      </Container>
  )
};

export default Footer;
