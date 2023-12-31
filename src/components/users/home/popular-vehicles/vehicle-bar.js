import React, {useRef, useState } from 'react'
import { Container } from 'react-bootstrap';
import {Swiper, SwiperSlide} from 'swiper/react';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import "./vehicle-bar.scss";

const VehicleBar = (props) => {

    const {vehicles, activeVehicle, setActiveVehicle} = props;
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const handlePrev = () => {
        swiperRef.current.swiper.slidePrev();
    }

    const handleNext = () => {
        swiperRef.current.swiper.slideNext();
    }

    const handleChange = (e) => {
        setIsBeginning(e.isBeginning);
        setIsEnd(e.isEnd);
    }

    

  return (
    
    <Container className="vehicle-bar">
        <div className={`arrow ${isBeginning ? "passive" : ""}`} onClick={handlePrev}>
            <IoIosArrowDropleft/></div>
        
        <Swiper 
        ref={swiperRef}
        breakpoints={{
            0:{
                spaceBetween:10,
                slidesPerView:1
            },
            576:{
                spaceBetween:20,
                slidesPerView:2
            },
            768:{
                spaceBetween:20,
                slidesPerView:3
            },

             992:{
                spaceBetween:20,
                slidesPerView:3
            } 
        }}

        onSlideChange={handleChange}
        /*
        onSwiper={(swiper) => console.log(swiper)}
        */

        >
       
        {vehicles.map((vehicle) => (
        <SwiperSlide 

        //TODO all "id" in here must change with "carId"
        key= {vehicle.carId} 

        className={vehicle.carId === activeVehicle.carId ? "active" : "" } 
        onClick={()=>setActiveVehicle(vehicle)}
        >
            {vehicle.model} </SwiperSlide>))}
        </Swiper>

        <div className={`arrow ${isEnd ? "passive" : ""}`} onClick={handleNext}><IoIosArrowDropright/></div>
    </Container>



  )
}

export default VehicleBar