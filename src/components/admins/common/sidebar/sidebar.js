import React from "react";
import "./sidebar.scss";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/img/logo/logo.png"
import {RiHome3Line, RiUser3Line, RiCarLine, RiFileList3Line, RiLogoutCircleRLine, RiDashboardLine, RiMessage2Line} from "react-icons/ri"
import { question } from "../../../../utils/functions/swal";
import { useDispatch } from "react-redux";
import { logout } from "../../../../store/slices/auth-slice";

const Sidebar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => { 
       
    question("Are you sure to logout?").then((result) => {
    if(result.isConfirmed){
       dispatch(logout());
       //clean local storage
       navigate("/");
     }
   })
 };      

  return (

    <Navbar bg="light" expand="lg" className="admin-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/rentadmin"><img src={logo} className="img-fluid" alt="AdminPage"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/rentadmin"><RiDashboardLine/> Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/rentadmin/users"><RiUser3Line/> Users</Nav.Link>
            <Nav.Link as={Link} to="/rentadmin/vehicles"><RiCarLine/> Vehicles</Nav.Link>
            <Nav.Link as={Link} to="/rentadmin/reservations"><RiFileList3Line/> Reservations</Nav.Link>
            <Nav.Link as={Link} to="/rentadmin/contact-messages"><RiMessage2Line/> Contact Messages</Nav.Link>
            <Nav.Link as={Link} to="/"><RiHome3Line/> Web Site</Nav.Link>
            <Nav.Link onClick={handleLogout} ><RiLogoutCircleRLine/> Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


  )
};

export default Sidebar;
