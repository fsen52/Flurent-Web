import React from "react";
import Loading from "../../components/common/loading/loading";
import logo from "../../assets/img/logo/logo.png"
import "./loading-page.scss"

const LoadingPage = () => {
  return <div className="loading-page">
    <span ><Loading/></span>
    
  </div>;
};

export default LoadingPage;
