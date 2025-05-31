import Home from './pages/Home/Home.jsx'
import Homepage from './pages/Homepage/Homepage.jsx'
import {Signpage} from "./pages/Auth/Signup/Signpage.jsx";
import Discover from "./pages/Discover/Discover.jsx";

import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

    return(
            <BrowserRouter>
                <Routes>
                        <Route path="/" element={<Homepage/>} />
                        <Route path="/home" element={<Home/>} />
                        <Route path="/login" element={<Signpage/>} />
                        <Route path="/discover" element={<Discover />} />
                </Routes>
            </BrowserRouter>
    );

}

export default App
