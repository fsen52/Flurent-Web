import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../components/admins/common/sidebar/sidebar";

const AdminTemplate = (props) => {
  const { children } = props;
  return (
    <Container fluid className="p-0 overflow-hidden">
      <Row>
        <Col lg={3}>
          <Sidebar />
        </Col>
        <Col lg={9}>
          <Container className="pt-5">{children}</Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminTemplate;
