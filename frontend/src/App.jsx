import Header from './HTML/Components/Header/Header.jsx'
import Sidebar from './HTML/Components/Sidebar/Sidebar.jsx'
import MainContent from './HTML/Components/MainContent/MainContent.jsx'
import Home from './HTML/Home.jsx'

import Footer from './HTML/Components/Footer/Footer.jsx'
import Food from './HTML/Components/Food.jsx'
import Button from './HTML/Components/Buttons/Button.jsx'

//Making card, css styling
import Card from './HTML/Components/Card/Card.jsx'

//props
import Student from './HTML/Components/Student.jsx'
import UserGreeting from "./HTML/Components/UserGreeting.jsx";
import Homepage from './HTML/Homepage.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Signpage} from "./HTML/Signpage.jsx";

function App() {

    /*return(
        <>
        <Header/>
            <UserGreet
            ing isLoggedIn={true} username={"Karolina"}/>
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
                <Route path="/home" element={<Home/>} />
                <Route path="/login" element={<Signpage/>} />
                {/*<Route path="/register" element={<Register />} />*/}
            </Routes>
        </BrowserRouter>
    );

}

export default App
