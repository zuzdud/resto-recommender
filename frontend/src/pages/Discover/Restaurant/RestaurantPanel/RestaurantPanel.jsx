import React, { useState, useEffect } from 'react';
import './RestaurantPanel.css';
import axios from "axios";
import default_pic from '../../../../assets/default-pic.png';
import {useNavigate} from "react-router-dom";

const RestaurantPanel = () => {
    const navigate = useNavigate();

    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sections, setSections] = useState([]);
    const [carouselIndexes, setCarouselIndexes] = useState({});

    const API_BASE_URL = (typeof process !== 'undefined' && process.env?.REACT_APP_BACKEND_URL)
        ? process.env.REACT_APP_BACKEND_URL
        : 'http://localhost:8000/api';

    // Funkcje do pobierania danych z Django API
    const fetchBestRatedRestaurants = async () => {
        const response = await axios.get(`${API_BASE_URL}/restaurants/api/top-rated/`);
        return response.data;
    };

    const fetchRestaurantByCuisine = async (cuisine) => {
        const response = await axios.get(`${API_BASE_URL}/restaurants/api/cuisine/${encodeURIComponent(cuisine)}/`);
        return response.data;
    };

    const fetchRecentRestaurants = async () => {
        const response = await axios.get(`${API_BASE_URL}/restaurants/db/recent/`);
        return response.data;
    };

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

    // Funkcje carousel
    const slidePrevious = (sectionIndex) => {
        setCarouselIndexes(prev => ({
            ...prev,
            [sectionIndex]: Math.max(0, (prev[sectionIndex] || 0) - 3)
        }));
    };

    const slideNext = (sectionIndex) => {
        const section = sections[sectionIndex];
        if (section && section.data) {
            const maxIndex = Math.max(0, section.data.length - 3);
            setCarouselIndexes(prev => ({
                ...prev,
                [sectionIndex]: Math.min(maxIndex, (prev[sectionIndex] || 0) + 3)
            }));
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

                // Inicjalizuj indeksy carousel
                const initIndexes = {};
                sectionsData.forEach((section, index) => {
                    initIndexes[index] = 0;
                });
                setCarouselIndexes(initIndexes);

            } catch (error) {
                console.error('Error fetching restaurant data:', error);
                console.error('Error details:', error.response?.data || error.message);

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

        let reviewCount = 0;
        if (restaurant.review_count !== undefined) {
            reviewCount = restaurant.review_count;
        } else if (restaurant.reviews && Array.isArray(restaurant.reviews)) {
            reviewCount = restaurant.reviews.length;
        }

        const imageUrl = restaurant.image_url || default_pic;

        const handleRestaurantClick = (id) => {
            console.log('Clicked restaurant:', id);
            navigate(`/restaurant/${id}`);
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

    // Komponent RestaurantSection z carousel
    const RestaurantSection = ({ title, restaurants, sectionIndex }) => {
        const currentIndex = carouselIndexes[sectionIndex] || 0;
        const canGoLeft = currentIndex > 0;
        const canGoRight = currentIndex + 3 < restaurants.length;

        // Pokaż tylko 3 restauracje na raz
        const visibleRestaurants = restaurants.slice(currentIndex, currentIndex + 3);

        console.log(`Section ${sectionIndex} (${title}): currentIndex=${currentIndex}, total=${restaurants.length}, visible=${visibleRestaurants.length}`);

        return (
            <div className="restaurant-section">
                <div className="section-header">
                    <h3>{title}</h3>
                    <div className="section-nav">
                        <button
                            className="nav-btn prev"
                            onClick={() => slidePrevious(sectionIndex)}
                            disabled={!canGoLeft}
                            style={{
                                backgroundColor: !canGoLeft ? '#ccc' : '#662222',
                                cursor: !canGoLeft ? 'not-allowed' : 'pointer',
                                opacity: !canGoLeft ? 0.5 : 1
                            }}
                        >
                            ‹
                        </button>
                        <button
                            className="nav-btn next"
                            onClick={() => slideNext(sectionIndex)}
                            disabled={!canGoRight}
                            style={{
                                backgroundColor: !canGoRight ? '#ccc' : '#662222',
                                cursor: !canGoRight ? 'not-allowed' : 'pointer',
                                opacity: !canGoRight ? 0.5 : 1
                            }}
                        >
                            ›
                        </button>
                    </div>
                </div>

                {/* Simplified Grid - no transform, just show/hide */}
                <div className="restaurant-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '20px',
                    transition: 'opacity 0.3s ease-in-out'
                }}>
                    {visibleRestaurants && visibleRestaurants.length > 0 ? (
                        visibleRestaurants.map((restaurant, index) => (
                            <div key={restaurant.id || restaurant.place_id || index}>
                                <RestaurantCard restaurant={restaurant} />
                            </div>
                        ))
                    ) : (
                        <p>Brak restauracji do wyświetlenia</p>
                    )}
                </div>
            </div>
        );
    };

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

            <div className="chess-pannel"><p></p></div>

            <div className="panel-content">
                {sections.map((section, index) => (
                    <RestaurantSection
                        key={index}
                        title={section.title}
                        restaurants={section.data}
                        sectionIndex={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default RestaurantPanel;