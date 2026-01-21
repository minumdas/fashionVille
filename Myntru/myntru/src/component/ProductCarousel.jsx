import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import { fetchProductsByCategory } from '../utils/api';
import './Caroussel.css';

const ProductCarousel = ({ category }) => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            if (category) {
                try {
                    setLoading(true);
                    setError(null);
                    const products = await fetchProductsByCategory(category);
                    console.log(`[ProductCarousel] Loaded ${products.length} products for category: ${category}`);
                    setImages(products);
                    setLoading(false);
                } catch (err) {
                    console.error(`[ProductCarousel] Error loading products:`, err);
                    setError('Failed to load carousel products');
                    setLoading(false);
                }
            }
        };
        loadProducts();
    }, [category]);

    // Loading state
    if (loading) {
        return <div className="text-center p-5">Loading carousel...</div>;
    }

    // Error state
    if (error) {
        return <div className="text-center p-5 text-danger">{error}</div>;
    }

    // Fallback if no images found
    if (images.length === 0) {
        return <div className="text-center p-5">No products available for this category.</div>;
    }

    return (
        <div className="carousel-wrapper">
            <Carousel>
                {images.map((item, index) => (
                    <Carousel.Item key={index}>
                        <img
                            src={item.imageUrl}
                            className="d-block w-100 carousel-image"
                            alt={item.name}
                        />
                        <Carousel.Caption>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>

            {/* BUTTONS OVER CAROUSEL - Keeping these static for now, can be parameterized if needed */}
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
    );
};

export default ProductCarousel;
