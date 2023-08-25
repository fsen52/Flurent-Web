import React from "react";
import Header from "../components/users/common/header/header";
import Footer from "../components/users/common/footer/footer";

const UserTemplate = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default UserTemplate;
