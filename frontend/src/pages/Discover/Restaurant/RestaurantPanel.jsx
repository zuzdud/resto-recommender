import React, { useState, useEffect } from 'react';
import './RestaurantPanel.css';
import axios from "axios";
import default_pic from '../../../assets/default-pic.png';

const RestaurantPanel = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sections, setSections] = useState([]);

    const API_BASE_URL = (typeof process !== 'undefined' && process.env?.REACT_APP_BACKEND_URL)
        ? process.env.REACT_APP_BACKEND_URL
        : 'http://localhost:8000/api';

    // Funkcje do pobierania danych z Django API
    const fetchBestRatedRestaurants = async () => {
        const response = await axios.get(`${API_BASE_URL}/restaurants/api/top-rated/`); // Google Places API
        return response.data;
    };

    const fetchRestaurantByCuisine = async (cuisine) => {
        const response = await axios.get(`${API_BASE_URL}/restaurants/api/cuisine/${encodeURIComponent(cuisine)}/`); // Google Places API
        return response.data;
    };

    const fetchRecentRestaurants = async () => {
        const response = await axios.get(`${API_BASE_URL}/restaurants/db/recent/`); // Baza danych
        return response.data;
    };

    // Test connection function
    const testConnection = async () => {
        try {
            console.log(`Testing connection to: ${API_BASE_URL}`);
            const response = await axios.get(`${API_BASE_URL}/restaurants/`);
            console.log('Connection test response:', response.status);
            console.log('Sample data from API:', response.data);
            return true;
        } catch (error) {
            console.error('Connection test failed:', error);
            return false;
        }
    };

    // Pobieranie danych z API
    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            console.log('🚀 Starting fetchAllData...');

            try {
                console.log('🔍 Testing connection...');
                const connectionOk = await testConnection();
                if (!connectionOk) {
                    throw new Error('Nie można połączyć się z serwerem Django');
                }

                console.log('✅ Connection OK, starting to fetch all restaurant data...');

                console.log('📥 Fetching data from all endpoints...');
                const [bestRatedData, asianCuisineData, recentData] = await Promise.all([
                    fetchBestRatedRestaurants().catch(err => {
                        console.error('❌ Error fetching best rated:', err);
                        return [];
                    }),
                    fetchRestaurantByCuisine('azjatycka').catch(err => {
                        console.error('❌ Error fetching asian cuisine:', err);
                        return [];
                    }),
                    fetchRecentRestaurants().catch(err => {
                        console.error('❌ Error fetching recent restaurants:', err);
                        return [];
                    })
                ]);

                console.log('All data fetched successfully:', {
                    bestRated: bestRatedData,
                    asian: asianCuisineData,
                    recent: recentData
                });

                // Django DRF może zwracać dane bezpośrednio jako array lub w obiekcie z 'results'
                const bestRated = Array.isArray(bestRatedData) ? bestRatedData : (bestRatedData.results || []);
                const asianCuisine = Array.isArray(asianCuisineData) ? asianCuisineData : (asianCuisineData.results || []);
                const recentRestaurants = Array.isArray(recentData) ? recentData : (recentData.results || []);

                const sectionsData = [
                    { title: "Najlepiej oceniane", data: bestRated },
                    { title: "Kuchnia azjatycka", data: asianCuisine },
                    { title: "Nowe nieodkryte", data: recentRestaurants }
                ];

                console.log('Sections data prepared:', sectionsData);

                setSections(sectionsData);
                setRestaurants({ bestRated, asianCuisine, recentRestaurants });

            } catch (error) {
                console.error('Error fetching restaurant data:', error);
                console.error('Error details:', error.response?.data || error.message);

                // Ustaw puste sekcje z komunikatem o błędzie
                setSections([
                    { title: "Najlepiej oceniane", data: [] },
                    { title: "Kuchnia azjatycka", data: [] },
                    { title: "Nowe nieodkryte", data: [] }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [API_BASE_URL]);

    // Komponent RestaurantCard
    const RestaurantCard = ({ restaurant }) => {
        const averageRating = restaurant.average_rating || restaurant.rating || 0;
        const reviewCount = restaurant.review_count || 0;
        const imageUrl = restaurant.image_url || default_pic;

        const handleRestaurantClick = (id) => {
            console.log('Clicked restaurant:', id);
        };

        return (
            <div className="restaurant-card" onClick={() => handleRestaurantClick(restaurant.id)}>
                <div className="card-image">
                    <img
                        src={imageUrl}
                        alt={restaurant.name}
                        onError={(e) => {
                            e.target.src = default_pic;
                        }}
                    />
                    <div className="rating-badge">
                        ⭐ {averageRating.toFixed(1)}
                    </div>
                </div>
                <div className="card-content">
                    <h4>{restaurant.name}</h4>
                    <p className="reviews">{averageRating.toFixed(1)} ⭐ ({reviewCount})</p>
                    <p className="cuisine">{restaurant.cuisine || restaurant.type || 'Nie podano'}</p>
                    <p className="address">{restaurant.address || restaurant.vicinity || 'Brak adresu'}</p>
                </div>
            </div>
        );
    };

    // Komponent RestaurantSection
    const RestaurantSection = ({ title, restaurants }) => (
        <div className="restaurant-section">
            <div className="section-header">
                <h3>{title}</h3>
                <div className="section-nav">
                    <button className="nav-btn prev">‹</button>
                    <button className="nav-btn next">›</button>
                </div>
            </div>
            <div className="restaurant-grid">
                {restaurants && restaurants.length > 0 ? (
                    restaurants.map((restaurant, index) => (
                        <RestaurantCard key={restaurant.id || restaurant.place_id || index} restaurant={restaurant} />
                    ))
                ) : (
                    <p>Brak restauracji do wyświetlenia</p>
                )}
            </div>
        </div>
    );

    // Loading state
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Ładowanie restauracji...</p>
            </div>
        );
    }

    return (
        <div className="restaurant-panel">
            <div className="panel-header">
                <h2>Discover New Flavors. Find Your Next Favorite Spot.</h2>
            </div>

            <div className="panel-content">
                {sections.map((section, index) => (
                    <RestaurantSection
                        key={index}
                        title={section.title}
                        restaurants={section.data}
                    />
                ))}
            </div>
        </div>
    );
};

export default RestaurantPanel;