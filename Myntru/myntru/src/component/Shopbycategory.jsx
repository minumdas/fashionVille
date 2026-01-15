import React from 'react';
import kidsfashion from '../images/Kidsfashion.jpg';
import coordset from '../images/coordset.jpg';
import dresses from '../images/dresses.jpg';
import Western from '../images/Western.jpg';
import Pairs from '../images/Pairs.jpg';
// import Kurtiset from '../images/Kurtiset.jpg';
import Kurtiset from '../images/Kurtiset.jpg';
import './Shopbycategory.css';


const categories = [
  {
    title: 'kidsfashion',
    img: kidsfashion,
    desc: 'Latest trends in men clothing'
  },
   {
    title: 'Western',
    img: Western,
    desc: 'Latest trends in men clothing'
  }
  ,
   {
    title: 'Kurtiset',
    img: Kurtiset,
    desc: 'Latest trends in men clothing'
  },
   {
    title: 'Pairs',
    img: Pairs,
    desc: 'Latest trends in men clothing'
  },
  {
    title: 'coordset',
    img: coordset,
    desc: 'Stylish and modern women wear'
  },
  {
    title: 'dresses',
    img: dresses,
    desc: 'Cute and comfortable kids fashion'
  }
];

const Shopbycategory = () => {
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Shop by Category</h2>

      <div className="card-group">
        {categories.map((cat, index) => (
          <div className="card mx-2 category-card" key={index}>
            <img
              src={cat.img}
              className="card-img-top"
              alt={cat.title}
              style={{ height: '250px', objectFit: 'cover' }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{cat.title}</h5>
              <p className="card-text">{cat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shopbycategory;
