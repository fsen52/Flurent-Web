import React, { useRef } from 'react'
import { Container } from 'react-bootstrap';
import {Swiper, SwiperSlide} from 'swiper/react';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import "./vehicle-bar.scss";

const VehicleBar = (props) => {

    const {vehicles, activeVehicle, setActiveVehicle} = props;
    const swiperRef = useRef(null);
    
    const handlePrev = () => {
        swiperRef.current.swiper.slidePrev();
    }

    const handleNext = () => {
        swiperRef.current.swiper.slideNext();
    }

  return (
    
    <Container className="vehicle-bar">
        <div className='arrow-left' onClick={handlePrev}><IoIosArrowDropleft/></div>
        <Swiper 
        ref={swiperRef}
        spaceBetween={20}
        slidesPerView={3}
        
        /*
        onSlideChange={()=> console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        */

        >
       
        {vehicles.map((vehicle) => (
        <SwiperSlide 
        key= {vehicle.carId} 
        className={vehicle.carId === activeVehicle.carId ? "active" : "" } 
        onClick={()=>setActiveVehicle(vehicle)}
        >
            {vehicle.model} </SwiperSlide>))}
        </Swiper>

        <div className='arrow-right' onClick={handleNext}><IoIosArrowDropright/></div>
    </Container>



  )
}

export default VehicleBar