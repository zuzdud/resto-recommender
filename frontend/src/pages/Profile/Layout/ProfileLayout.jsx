import Navbar from "../../../Components/layout/Navbar/Navbar.jsx";
import "./ProfileLayout.css"
import React from "react";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import Navigation from "../../../components/layout/Navigation/Navigation.jsx";
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
        <div className={"container"}>
            <div className="Navigation">
                <Navigation />
            </div>
            <div className="left"></div> {/* Dodaj left szachownicę */}
            <div className="ProfileArea">
                <div className="main d-flex mx-auto justify-content-center">
                    <div className="sidebar rounded-4 p-4 m-2">
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
                            to="/profile/settings"
                            className={({isActive}) => isActive ? "active" : ""}
                        >
                            Ustawienia
                        </NavLink>
                        <NavLink
                            to="/profile/support"
                            className={({isActive}) => isActive ? "active" : ""}
                        >
                            Pomoc i wsparcie
                        </NavLink>
                        <button onClick={logout} className="btn btn-danger rounded-1 py-1" type="button">
                            Wyloguj się
                        </button>
                    </div>
                    <div className="inner-html rounded-4 p-4 m-2">
                        <Outlet/>
                    </div>
                </div>
            </div>
            <div className="right"></div> {/* Dodaj right szachownicę */}
            <div className="Footer"></div> {/* Dodaj footer */}
        </div>
    )
}

export default ProfileLayout