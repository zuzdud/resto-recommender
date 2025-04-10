import Header from './Components/Header/Header.jsx'
import Sidebar from './Components/Sidebar/Sidebar.jsx'
import MainContent from './Components/MainContent/MainContent.jsx'

import Footer from './Components/Footer.jsx'
import Food from './Components/Food.jsx'
import Button from './Components/Buttons/Button.jsx'

//Making card, css styling
import Card from './Components/Card/Card.jsx'

//props
import Student from './Components/Student.jsx'
import UserGreeting from "./Components/UserGreeting.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Signpage} from "./pages/Login/Signpage.jsx";

function App() {

    /*return(
        <>
        <Header/>
            <UserGreeting isLoggedIn={true} username={"Karolina"}/>
            <Sidebar/>
            <Button/>
            <Card/>
       <Footer/>
        </>
    );
*/
    return(

        //<Homepage/>

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>} />
                <Route path="/login" element={<Signpage/>} />
                {/*<Route path="/register" element={<Register />} />*/}
            </Routes>
        </BrowserRouter>
    );

}

export default App
