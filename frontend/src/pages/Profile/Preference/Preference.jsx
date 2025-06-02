import {useState} from "react";
import "./Preference.css"
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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
        { name: "meksykańska", selected: true },
        { name: "włoska", selected: false },
        { name: "chińska", selected: true },
        { name: "indyjska", selected: false },
        { name: "hiszpańska", selected: true },
        { name: "amerykańska", selected: false }
    ];

    //const [selectedIds, setSelectedIds] = useState([]);
    const [stylePreferences, setStylePreferences] = useState(userStylePreferences);
    const [avoidPreferences, setAvoidPreferences] = useState(userAvoidPreferences);
    const [favPreferences, setFavPreferences] = useState(userFavPreferences);
    const [value, setValue] = useState(15);

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
                            <div key={pref.name} className="col-4 custom-checkbox">
                                <label className="custom-control-label">

                                </label>
                                <input className="mx-1 custom-control-input"
                                       type="checkbox"
                                       checked={pref.selected}
                                       onChange={() => handleCheckboxChangeStyle(index)}
                                />
                                {pref.name}
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
                                    <input className="mx-1 my-checkbox"
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
{/*
                <div className="d-flex style">
*/}                <div className="cont">
                <div className="row">
                    {favPreferences.map((pref, index) => (
                        <div key={pref.name} className="col-4">
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
            </div>
            <div className="main-cont super-shadow p-2 mb-4">
                <div className="d-flex align-items-baseline">
                    <h4 className="me-3">4. Ile masz czasu na posiłek? </h4>
                    <h5>{" "}{value === 60 ? "Nie spieszy mi się" : `${value} min`}</h5>
                </div>


                <div className="slider-wrapper pb-4">
                    <Slider
                        min={15}
                            max={60}
                            step={15}
                            defaultValue={15}
                            marks={{
                                15: "15 min",
                                30: "30 min",
                                45: "45 min",
                                60: "Nie spieszy mi się",
                            }}
                            onChange={(val) => setValue(val)}
                        />
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