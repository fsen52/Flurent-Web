import React from "react";
import Slider from "../../components/users/home/slider/slider";
import Spacer from "../../components/common/spacer/spacer";
import MobileApp from "../../components/users/home/mobile-app/mobile-app";
import PopularVehicles from "../../components/users/home/popular-vehicles/popular-vehicles";

const HomePage = () => {
  return (
    <>
      <Slider/>
      <Spacer/>
      <PopularVehicles/>
      <Spacer/>
      <MobileApp/>
    </>
    
    );
};

export default HomePage;
