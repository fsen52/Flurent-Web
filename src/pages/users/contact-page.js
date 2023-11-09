import React from "react";
import Spacer from "../../components/common/spacer/spacer";
import ContactForm from "../../components/users/contact/contact-form/contact-form";
import Map from "../../components/users/contact/map/map";

const ContactPage = () => {
  return (
  <>
    <Spacer/>
    <ContactForm/>
    <Spacer/>
    <Map/>
  </>
  )
};

export default ContactPage;
