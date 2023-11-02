import React from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../../store/slices/auth-slice';
import { question } from '../../../../utils/functions/swal';
import "./user-menu.scss";

const UserMenu = () => {

    const {isUserLogin, user}= useSelector(state=> state.auth);

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
    <div className="user-menu">
    
    {isUserLogin ?(
    
    <Dropdown align="end">
    <Dropdown.Toggle variant="primary" id="dropdown-basic">
      {user.firstName} {user.lastName}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      {user.roles.includes("Administrator") &&
        <>
        <Dropdown.Item as={Link} to="/rentadmin">Admin Panel</Dropdown.Item>
        <Dropdown.Divider/>
        </>
            }
      <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
      <Dropdown.Item as={Link} to="/reservations">Reservations</Dropdown.Item>
      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
    ):(
    <div>
        <Button variant="white" as={Link} to="/auth?type=login">Sign In</Button>
        <Button variant="primary" as={Link} to="/auth?type=register">Register</Button>

    </div>
    ) }
    
    </div>
  )
}

export default UserMenu 