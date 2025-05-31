import Home from './HTML/Home.jsx'
import { ThemeProvider } from './contexts/ThemeContex.jsx';

import Homepage from './HTML/Homepage.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Signpage} from "./HTML/Signpage.jsx";
import Discover from "./HTML/Discover.jsx";

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
