import {useState} from "react";
import "./Preference.css"

function Preference(){
    const userStylePreferences = [
        { name: "vege", selected: true },
        { name: "glutFree", selected: false },
        { name: "lowCarb", selected: true },
        { name: "highProtein", selected: false },
        { name: "lowFat", selected: true },
        { name: "keto", selected: false }
    ];

    const userAvoidPreferences = [
        { name: "cukier", selected: true },
        { name: "soja", selected: false },
        { name: "orzechy", selected: true },
        { name: "laktoza", selected: false },
        { name: "jajka", selected: true },
        { name: "ryby i owoce morza", selected: false }
    ];

    const userFavPreferences = [
        { name: "vege", selected: true },
        { name: "glutFree", selected: false },
        { name: "lowCarb", selected: true },
        { name: "highProtein", selected: false },
        { name: "lowFat", selected: true },
        { name: "keto", selected: false }
    ];

    //const [selectedIds, setSelectedIds] = useState([]);
    const [stylePreferences, setStylePreferences] = useState(userStylePreferences);
    const [avoidPreferences, setAvoidPreferences] = useState(userAvoidPreferences);
    const [favPreferences, setFavPreferences] = useState(userFavPreferences);



    const handleCheckboxChangeStyle = (index) => {
        const updated = [...stylePreferences];
        updated[index].selected = !updated[index].selected;
        setStylePreferences(updated);
    };
    const handleCheckboxChangeAvoid = (index) => {
        const updated = [...avoidPreferences];
        updated[index].selected = !updated[index].selected;
        setAvoidPreferences(updated);
    };
    const handleCheckboxChangeFav = (index) => {
        const updated = [...favPreferences];
        updated[index].selected = !updated[index].selected;
        setFavPreferences(updated);
    };

    return(
        <div>
            <h2>Preferencje użytkownika</h2>
            <div className="main-cont super-shadow p-2 mb-4">
                <h4>1. Styl odżywiania</h4>
                <div className="cont">
                    {/*<div className="d-flex style">*/}
                    <div className="row cont">
                        {stylePreferences.map((pref, index) => (
                            <div key={pref.name} className="col-4">
                                <label>
                                    <input className="mx-1"
                                           type="checkbox"
                                           checked={pref.selected}
                                           onChange={() => handleCheckboxChangeStyle(index)}
                                    />
                                    {pref.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="main-cont super-shadow p-2 mb-4">
                <h4>2. Czego unikasz?</h4>
                {/*
                <div className="d-flex style">
*/}
                <div className="cont">
                    <div className="row">
                        {avoidPreferences.map((pref, index) => (
                            <div key={pref.name} className="col-4">
                                <label>
                                    <input className="mx-1"
                                           type="checkbox"
                                           checked={pref.selected}
                                           onChange={() => handleCheckboxChangeAvoid(index)}
                                    />
                                    {pref.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="main-cont super-shadow p-2 mb-4">
                <h4>3. Twoje ulubione kuchnie</h4>
                <div className="d-flex style">
                    {favPreferences.map((pref, index) => (
                        <div key={pref.name} className="me-3">
                            <label>
                                <input className="mx-1"
                                       type="checkbox"
                                       checked={pref.selected}
                                       onChange={() => handleCheckboxChangeFav(index)}
                                />
                                {pref.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="main-cont super-shadow p-2 mb-4">
                <h4>4. Ile masz czasu na posiłek?</h4>
                <div className="d-flex style">

                </div>
            </div>
            <div className="main-cont super-shadow p-2 mb-4">
                <h4>5. Lokalizacja/zasięg dostawy</h4>
                <div className="d-flex style">

                </div>
            </div>
        </div>
    )
}

export default Preference