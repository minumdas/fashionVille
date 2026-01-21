import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { fetchCategoriesByType } from '../utils/api';

const ShopForKids = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategoriesByType('KIDS');
        setCategories(data);
        setLoading(false);
      } catch (err) {
        console.error('[ShopForKids] Error:', err);
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (categories.length === 0) return null;

  const chunkSize = 4;
  const slides = [];
  for (let i = 0; i < categories.length; i += chunkSize) {
    slides.push(categories.slice(i, i + chunkSize));
  }

  return (
    <div className="container my-4">
      <Carousel indicators={false} controls={true} interval={3000} pause="hover">
        {slides.map((group, idx) => (
          <Carousel.Item key={idx}>
            <div className="category-grid">
              {group.map((cat, index) => (
                <div className="category-cell" key={cat.id || index}>
                  <div className="card category-card">
                    <img
                      src={cat.imageUrl || "https://via.placeholder.com/300x400?text=Category"}
                      className="card-img-top"
                      alt={cat.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body text-center">
                      <h6 className="card-title fw-bold">{cat.title}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ShopForKids;
