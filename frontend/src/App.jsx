import Home from './pages/Home/Home.jsx'

import Signpage from "./pages/Auth/Signup/Signpage.jsx";
import Discover from "./pages/Discover/Discover.jsx";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoute from "./PrivateRoute.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import ProfileLayout from "./pages/Profile/Layout/ProfileLayout.jsx";
import React from "react";
import Settings from "./pages/Profile/Settings.jsx";
import ProfileOptions from "./pages/Profile/ProfileOptions.jsx";
import Preference from "./pages/Profile/Preference/Preference.jsx";
import RestaurantDetails from "./pages/Discover/Restaurant/RestaurantDetail/RestaurantDetails.jsx";

function App() {

    return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Signpage/>} />
                    <Route path="/discover" element={<Discover />}/>
                    <Route path="/restaurant/:id" element={<RestaurantDetails />}></Route>
                    <Route path="/profile" element={<PrivateRoute />}>
                        <Route element={<ProfileLayout />}>
                            <Route index element={<ProfileOptions />} />
                            <Route path="preferences" element={<Preference />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="reviews" element={<Preference />} />
                            <Route path="rated" element={<Settings />} />
                            <Route path="support" element={<Preference />} />
                            <Route path="options" element={<Settings />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
    );

}
// <Route path="/" element={<Homepage/>} />
export default App
