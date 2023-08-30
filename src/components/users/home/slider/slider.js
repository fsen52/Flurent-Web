import { Carousel, Container } from "react-bootstrap";
import "./slider.scss";
import sliderData from "./slider.json";


import React from 'react'

const Slider = () => {
  return (

    <div className="slider">
    <Carousel>
        {sliderData.map((item, index)=> (
      <Carousel.Item key={index}>
          <img className="img-fluid" src={require(`../../../../assets/img/slider/${item.image}`)} alt={item.title} />
          
          <Carousel.Caption>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </Carousel.Caption>
      </Carousel.Item>

        ))}

    
 
  </Carousel></div>
    
  )
}

export default Slider;