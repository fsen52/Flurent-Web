import React from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const UserMenu = () => {

    const {isUserLogin, user}= useSelector(state=> state.auth);

  return (
    <div className="user-menu">
    
    {isUserLogin ?(
    
    <Dropdown>
    <Dropdown.Toggle variant="primary" id="dropdown-basic">
      {user.firstName} {user.lastName}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Reservations</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
    ):(
    <div>
        <Button variant="white" as={Link} to="/auth">Sign In</Button>
        <Button variant="primary" as={Link} to="/auth">Register</Button>

    </div>
    ) }
    
    </div>
  )
}

export default UserMenu 