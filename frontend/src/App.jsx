
import Home from './HTML/Home.jsx'

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signpage from "./HTML/Sign/Signpage.jsx";
import Layout from "./HTML/Layout.jsx";
import Homepage from "./HTML/Homepage.jsx";

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

        /*<BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/login" element={<Signpage/>} />
                {/!*<Route path="/register" element={<Register />} />*!/}
            </Routes>
        </BrowserRouter>*/
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>} />
                    {/*<Route index element={<Homepage/>} />*/}
                    <Route path="sign" element={<Signpage/>} />
                    <Route path="home" element={<Homepage/>} />
                   {/* <Route path="discover" element={<Discover/>}>
                    </Route>*/}

                </Route>
            </Routes>
        </BrowserRouter>
    );

}

export default App
