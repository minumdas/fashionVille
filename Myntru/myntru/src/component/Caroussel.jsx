import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import sh1 from '../sh1.jpg';
import sh2 from '../sh2.jpg';
import sh3 from '../sh3.jpg';
import sh4 from '../sh4.jpg';


const images = [sh1, sh2, sh3, sh4];

const Caroussel = () => {
  return (
    <Carousel>
      {images.map((img, index) => (
        <Carousel.Item key={index}>
          <img
            src={img}
            className="d-block w-100"
            alt={`slide ${index + 1}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Caroussel;
