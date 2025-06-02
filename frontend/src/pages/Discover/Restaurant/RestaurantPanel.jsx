import React, { useState, useEffect } from 'react';
import './RestaurantPanel.css';

const RestaurantPanel = () => {
    const [restaurants, setRestaurants] = useState([]); // restaurants = [] (pusta lista na początku)
                                                                        // setRestaurants = funkcja do zmiany listy restauracji
    const [loading, setLoading] = useState(false);
    const [sections, setSections] = useState([]);

    // Zmień URL na swój backend
    const API_BASE_URL = 'http://localhost:8000/api'; // lub jaki masz port

    // Funkcje do pobierania danych z Django API
    const fetchBestRatedRestaurants = async () => {
        const response = await fetch(`${API_BASE_URL}/restaurants/top-rated/`); // await - czeka aż serwer odpowie (nie blokuje strony)

        if (!response.ok) throw new Error('Failed to fetch top rated restaurants');
        return await response.json();   // response.json() - przekształca tekst z serwera na JavaScript object
                                        // await - czeka aż konwersja się skończy
                                        // return zwraca dane do kodu który wywołał funkcję
    };

    const fetchRestaurantByCuisine = async (cuisine) => {
        const response = await fetch(`${API_BASE_URL}/restaurants/cuisine/${cuisine}/`);

        if (!response.ok) throw new Error(`Failed to fetch ${cuisine} restaurants`);
        return await response.json();
    }

    const fetchRecentRestaurants = async () => {
        const response = await fetch(`${API_BASE_URL}/restaurants/recent/`);
        if (!response.ok) throw new Error('Failed to fetch recent restaurants');
        return await response.json();
    };

    // Pobieranie danych z API
    useEffect(() => {                                // gdy komponent się załaduje, wykonuj to
        const fetchAllData = async () => {          // funkcja wewnętrzna
            setLoading(false);
            try {
                // Pobierz wszystkie sekcje równolegle
                const [bestRatedResponse, asianCuisineResponse, recentResponse] = await Promise.all([   // Promise all = wykonuje wszystkie żądania równolegle
                    fetchBestRatedRestaurants(),
                    fetchRestaurantByCuisine('Asian'),
                    fetchRecentRestaurants()
                ]);

                // Jeśli API zwraca {restaurants: [..]}
                const bestRated = bestRatedResponse.restaurants || bestRatedResponse;       // zależy od formatu danych jaki przyjmiemy
                const asianCuisine = asianCuisineResponse.restaurants || asianCuisineResponse;
                const recentRestaurants = recentResponse.restaurants || recentResponse;

                const sectionsData = [      // Organizujemy dane w sekcje
                    { title: "Najlepiej oceniane", data: bestRated },
                    { title: "Kuchnia azjatycka", data: asianCuisine },
                    { title: "Nowe nieodkryte", data: recentRestaurants }
                ];

                setSections(sectionsData);      // Zapisujemy dane w state, do wyświetlania sekcji
                setRestaurants({ bestRated, asianCuisine, recentRestaurants }); // do przechowania

            } catch (error) {
                console.error('Error fetching restaurant data:', error);
                // Pokaż komunikat błędu użytkownikowi
                setSections([]);    // pokaże pustą listę
            } finally{
                setLoading(false);  // ukryj spinner
            }
        };

        fetchAllData();
    }, []);

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
    // Main render
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