import Navbar from "../../../Components/layout/Navbar/Navbar.jsx";
import "./ProfileLayout.css"
import React, {useState} from "react";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
function ProfileLayout(){
    const [activeTab, setActiveTab] = useState("profile");
    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        console.log(tab);
        navigate(`/profile${tab === "profile" ? "" : `/${tab}`}`);
    };


    return(
        <div>
            <Navbar />
            <div  className="justify-content-center">
                <div className="main d-flex mx-auto justify-content-center">
                    <div className="sidebar rounded-4 p-4 m-2">
                        <h3>Profil</h3>
{/*                        <div
                            className={`${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => handleTabClick('profile')}
                        >
                            Opcje profilu
                        </div>
                        <div
                            className={`${activeTab === 'preferences' ? 'active' : ''}`}
                            onClick={() => handleTabClick('preferences')}
                        >
                            Moje preferencje
                        </div>
                        <div
                            className={`${activeTab === 'settings' ? 'active' : ''}`}
                            onClick={() => handleTabClick('settings')}
                        >
                            Ulubione
                        </div>*/}
                        <NavLink
                            to="/profile"
                            end  // <== TO DODAJ
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            Opcje profilu
                        </NavLink>
                        <NavLink
                            to="/profile/preferences"
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            Moje preferencje
                        </NavLink>
                        <NavLink
                            to="/profile/settings"
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            Ulubione
                        </NavLink>


                    </div>
                    <div className="inner-html rounded-4 p-4 m-2">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileLayout