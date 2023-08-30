import React from 'react'
import { Link } from 'react-router-dom'
import {FiPhoneCall} from "react-icons/fi";
import {HiOutlineLocationMarker, HiOutlineMailOpen} from "react-icons/hi";
import { settings } from '../../../utils/settings';
import "./contact-info.scss"

const ContactInfo = () => {
  return (
        <ul className='contact-info'>
                      <li><FiPhoneCall/> {settings.phone1}</li>
                      <li><HiOutlineLocationMarker/> {settings.address}</li>
                      <li><HiOutlineMailOpen/> {settings.email}</li>
                    </ul>
  )
}

export default ContactInfo