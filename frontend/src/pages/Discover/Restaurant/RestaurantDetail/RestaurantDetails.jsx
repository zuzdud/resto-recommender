// RestaurantDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = (typeof process !== 'undefined' && process.env?.REACT_APP_BACKEND_URL)
        ? process.env.REACT_APP_BACKEND_URL
        : 'http://localhost:8000/api';

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                console.log('Fetching restaurant with ID:', id);
                const response = await axios.get(`${API_BASE_URL}/restaurants/${id}/`);
                setRestaurant(response.data);
            } catch (error) {
                console.error('Error fetching restaurant:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRestaurant();
        }
    }, [id, API_BASE_URL]);

    if (loading) {
        return <div>Ładowanie...</div>;
    }

    if (!restaurant) {
        return <div>Nie znaleziono restauracji</div>;
    }

    return (
        <div className="restaurant-details">
            <h1>{restaurant.name}</h1>
            <img src={restaurant.image_url} alt={restaurant.name} />
            <p><strong>Kuchnia:</strong> {restaurant.cuisine}</p>
            <p><strong>Adres:</strong> {restaurant.address}</p>
            <p><strong>Ocena:</strong> {restaurant.average_rating} ⭐</p>
            {/* Dodaj więcej szczegółów */}
        </div>
    );
};

export default RestaurantDetails