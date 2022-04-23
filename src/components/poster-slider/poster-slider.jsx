import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './poster-slider.scss';

export default function PosterSlider() {
  return (
    <div className="slider-container">
      <Carousel fade controls={false} indicators={false} pause={false}>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/drghkywbx/image/upload/v1649103140/arrival.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/drghkywbx/image/upload/c_scale,h_1562,w_1000/v1649103140/dark-knight.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/drghkywbx/image/upload/c_scale,h_1562,w_1000/v1649103140/anchorman.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
