import React, { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'

import {BsEye , BsEyeSlash} from "react-icons/bs";
import "./password-input.scss"

const PasswordInput = (props) => {

    const [type, setType] = useState("password");

    const handleType = (params) => { 
        setType(type === "password" ? "text" :"password")
     }

  return (
    <InputGroup className='mb-3 password-input'>
        <Form.Control type={type} {...props}/>
        <InputGroup.Text>
        {
            type==="password" ? (
                <BsEye onClick={handleType}/>
            ) : (
                <BsEyeSlash onClick={handleType}/>
            )
        }
        </InputGroup.Text>
        <Form.Control.Feedback type='invalid' >{props.error}</Form.Control.Feedback>
    </InputGroup>
       
  )
}

export default PasswordInput