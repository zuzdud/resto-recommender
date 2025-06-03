import React, { useState, useEffect } from 'react';
import './RestaurantPanel.css';
import axios from "axios";

const RestaurantPanel = () => {
    const [restaurants, setRestaurants] = useState([]); // restaurants = [] (pusta lista na początku)
                                                                        // setRestaurants = funkcja do zmiany listy restauracji
    const [loading, setLoading] = useState(false);
    const [sections, setSections] = useState([]);


    const API_BASE_URL = (typeof process !== 'undefined' && process.env?.REACT_APP_BACKEND_URL)
        ? process.env.REACT_APP_BACKEND_URL
        : 'http://localhost:8000/api';

    // Funkcje do pobierania danych z Django API
    const fetchBestRatedRestaurants = async () => {
        const response = await axios.get(`${API_BASE_URL}/restaurants/top-rated/`); // await - czeka aż serwer odpowie (nie blokuje strony)

        if (!response.ok) throw new Error('Failed to fetch top rated restaurants');
        return await response.data;   // response.json() - przekształca tekst z serwera na JavaScript object
                                        // await - czeka aż konwersja się skończy
                                        // return zwraca dane do kodu który wywołał funkcję
    };

    const fetchRestaurantByCuisine = async (cuisine) => {
        const response = await fetch(`${API_BASE_URL}/restaurants/cuisine/${encodeURIComponent(cuisine)}/`);

        if (!response.ok) throw new Error(`Failed to fetch ${cuisine} restaurants`);
        return await response.data;
    }

    const fetchRecentRestaurants = async () => {
        const response = await axios.get(`${API_BASE_URL}/restaurants/recent/`);
        if (!response.ok) throw new Error('Failed to fetch recent restaurants');
        return await response.data;
    };

    // Test connection function
    const testConnection = async () => {
        try {
            console.log(`Testing connection to: ${API_BASE_URL}`);
            const response = await fetch(`${API_BASE_URL}/restaurants/`);
            console.log('Connection test response:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('Sample data from API:', data);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Connection test failed:', error);
            return false;
        }
    };

    // Pobieranie danych z API
    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);

            try {
                // Najpierw przetestuj połączenie
                const connectionOk = await testConnection();
                if (!connectionOk) {
                    throw new Error('Nie można połączyć się z serwerem Django');
                }

                console.log('Starting to fetch all restaurant data...');

                // Pobierz wszystkie sekcje równolegle
                const [bestRatedData, asianCuisineData, recentData] = await Promise.all([
                    fetchBestRatedRestaurants(),
                    fetchRestaurantByCuisine('azjatycka'), // Zgodnie z twoimi endpointami
                    fetchRecentRestaurants()
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
        // Dane z Twojej bazy danych
        const averageRating = restaurant.average_rating || 0;
        const reviewCount = restaurant.review_count || 0;
        const imageUrl = restaurant.image_url || '/api/placeholder/300/200';

        const handleRestaurantClick = (id) => {
            // Przekieruj na stronę szczegółów restauracji
            // navigate(`/restaurant/${id}`);
            console.log('Clicked restaurant:', id);
        };

        return (
            <div className="restaurant-card" onClick={() => handleRestaurantClick(restaurant.id)}>
                <div className="card-image">
                    <img src={imageUrl} alt={restaurant.name} />
                    <div className="rating-badge">
                        ⭐ {averageRating.toFixed(1)}
                    </div>
                </div>
                <div className="card-content">
                    <h4>{restaurant.name}</h4>
                    <p className="reviews">{averageRating.toFixed(1)} ⭐ ({reviewCount})</p>
                    <p className="cuisine">{restaurant.cuisine}</p>
                    <p className="address">{restaurant.address}</p>
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
                {restaurants.map(restaurant => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
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