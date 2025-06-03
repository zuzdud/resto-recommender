import Navbar from "../../../Components/layout/Navbar/Navbar.jsx";
import "./ProfileLayout.css"
import React from "react";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import Navigation from "../../../components/layout/Navigation/Navigation.jsx";
import Footer from "../../../Components/ui/B-Footer/Footer.jsx";
function ProfileLayout(){
   // const [activeTab, setActiveTab] = useState("profile");
    const navigate = useNavigate();

/*    const handleTabClick = (tab) => {
        setActiveTab(tab);
        console.log(tab);
        navigate(`/profile${tab === "profile" ? "" : `/${tab}`}`);
    };*/
    const logout = () => {
        localStorage.removeItem("token"); // usuń token
        navigate('/');  // przekieruj na stronę logowania
    };


    return(
        <div className="ProfileLayout">
            <Navbar/>

            <div className="ProfileArea mx-auto">
                <div className="main d-flex flex-column flex-md-row mx-auto justify-content-center">
                    <div className="sidebar rounded-4 p-4">
                        <h3 className="name pb-2 border-bottom border-black">Profil</h3>
                        <NavLink
                            to="/profile"
                            end
                            className={({isActive}) => isActive ? "active" : ""}
                        >
                            Opcje profilu
                        </NavLink>
                        <NavLink
                            to="/profile/preferences"
                            className={({isActive}) => isActive ? "active" : ""}
                        >
                            Moje preferencje
                        </NavLink>
                        <NavLink
                            to="/profile/options"
                            className={({isActive}) => isActive ? "active" : ""}
                        >
                            Ulubione
                        </NavLink>
                        <NavLink
                            to="/profile/rated"
                            className={({isActive}) => isActive ? "active" : ""}
                        >
                            Ocenione miejsca
                        </NavLink>
                        <NavLink
                            to="/profile/reviews"
                            className={({isActive}) => isActive ? "active" : ""}
                        >
                            Moje recenzje
                        </NavLink>

                        <NavLink
                            to="/profile/support"
                            className={({isActive}) => isActive ? "active" : ""}
                        >
                            Pomoc i wsparcie
                        </NavLink>

                    </div>
                    <div className="inner-html rounded-4 p-4">
                        <Outlet/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ProfileLayout