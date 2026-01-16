import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import sh1 from '../sh1.jpg';
import sh2 from '../sh2.jpg';
import sh3 from '../sh3.jpg';
import sh4 from '../sh4.jpg';

const images = [sh1, sh2, sh3, sh4];


const MenCaroussel = () => {
      const navigate = useNavigate();
    
  return (
   <div className="carousel-wrapper">
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

      {/* BUTTONS OVER CAROUSEL */}
      <div className="carousel-buttons">
        <button
          className="btn btn-dark mx-2"
          onClick={() => navigate('/men')}
        >
          HIM
        </button>

        <button
          className="btn btn-danger mx-2"
          onClick={() => navigate('/women')}
        >
          HER
        </button>
      </div>
    </div>
  )
}

export default MenCaroussel
