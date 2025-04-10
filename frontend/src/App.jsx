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
import Homepage from "./Components/pages/Homepage/Homepage.jsx";

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
        <Homepage/>
    );

}

export default App
