import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../components/admins/common/sidebar/sidebar";

const AdminTemplate = (props) => {
  const { children } = props;
  return (
    <Container fluid>
      <Row>
        <Col lg={3}>
          <Sidebar />
        </Col>
        <Col lg={9}>
          <Container>{children}</Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminTemplate;
