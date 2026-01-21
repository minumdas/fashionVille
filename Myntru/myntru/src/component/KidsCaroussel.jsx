import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const KidsCaroussel = () => {
    const images = [
        "https://img.freepik.com/free-photo/kids-fashion-concept-with-boy-girl_23-2148443505.jpg",
        "https://img.freepik.com/free-photo/group-happy-kids-standing-together_23-2148473268.jpg",
        "https://img.freepik.com/free-photo/little-girl-pointing-away_23-2148443510.jpg"
    ];

    return (
        <Carousel fade>
            {images.map((img, idx) => (
                <Carousel.Item key={idx}>
                    <img
                        className="d-block w-100 rounded-4"
                        src={img}
                        alt={`Kids Slide ${idx + 1}`}
                        style={{ height: '400px', objectFit: 'cover' }}
                    />
                    <Carousel.Caption className="bg-dark bg-opacity-25 rounded-3">
                        <h3>New Kids Collection</h3>
                        <p>Comfort and style for your little ones.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default KidsCaroussel;
