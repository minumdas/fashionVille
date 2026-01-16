import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import men_sunglass from '../images/men_sunglass.webp';
import men_wallet from '../images/men_wallet.jpg';
import men_shoe from '../images/men_shoe.jpg';
import men_leatherbelt from '../images/men_leatherbelt.jpg';
import men_watch from '../images/men_watch.jpg';
import shirt from '../images/shirt1.jpg';
import tshirt from '../images/tshirt.jpg';
import kurta from '../images/kurta.jpg';
import printedshirt from '../images/printed_shirt.jpg';

const categories = [
   { title: 'Shirt', img: shirt, desc: 'Stylish coord sets' },  
   { title: 'T-shirt', img: tshirt, desc: 'Stylish coord sets' },  
   { title: 'Kurta', img: kurta, desc: 'Stylish coord sets' },  
  { title: 'Printed Shirt', img: printedshirt, desc: 'Stylish coord sets' },  
  { title: 'Sunglasses', img: men_sunglass, desc: 'Trendy kids wear' },
  { title: 'Wallet', img: men_wallet, desc: 'Modern western styles' },
  { title: 'Shoe', img: men_shoe, desc: 'Ethnic kurtis' },
  { title: 'Leather belt', img: men_leatherbelt, desc: 'Perfect combos' },
  { title: 'Watch', img: men_watch, desc: 'Stylish coord sets' },
];

// chunk cards per slide
const chunkSize = 4;
const slides = [];
for (let i = 0; i < categories.length; i += chunkSize) {
  slides.push(categories.slice(i, i + chunkSize));
}
const Shopformen = () => {
  return (
     <div className="container my-4">
     
      <Carousel
        indicators={false}
        controls={true}
        interval={3000}
        pause="hover"
      >
        {slides.map((group, idx) => (
          <Carousel.Item key={idx}>
            <div className="category-grid">
              {group.map((cat, index) => (
                <div className="category-cell" key={index}>
                  <div className="card category-card">
                    <img
                      src={cat.img}
                      className="card-img-top"
                      alt={cat.title}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{cat.title}</h5>
                      <p className="card-text">{cat.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default Shopformen