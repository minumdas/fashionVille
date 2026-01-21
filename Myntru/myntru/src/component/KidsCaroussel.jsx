import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { fetchCategoriesByType } from '../utils/api';

const KidsCaroussel = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBanners = async () => {
            try {
                const data = await fetchCategoriesByType('KIDS_BANNER');
                setBanners(data);
            } catch (error) {
                console.error('Failed to load kids banners:', error);
            } finally {
                setLoading(false);
            }
        };
        loadBanners();
    }, []);

    if (loading) {
        return (
            <div className="text-center p-5 bg-light rounded-4" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );
    }

    if (banners.length === 0) return null;

    return (
        <Carousel fade interval={4000} pause="hover">
            {banners.map((banner, idx) => (
                <Carousel.Item key={banner.id || idx}>
                    <img
                        className="d-block w-100 rounded-4 shadow-soft"
                        src={banner.imageUrl}
                        alt={banner.title}
                        style={{ height: '450px', objectFit: 'cover' }}
                    />
                    <Carousel.Caption className="rounded-4 p-4" style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', bottom: '10%' }}>
                        <h2 className="fw-bold mb-2">{banner.title}</h2>
                        <p className="lead mb-0">{banner.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default KidsCaroussel;
