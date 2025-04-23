/*
export function LoginForm(){


    function handleSubmit() {

    }

    return (
        <div className="tab-pane fade show active" id="pills-login" role="tabpanel">
            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label htmlFor="username-login" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username-login"
                        name="name"
                        required
                    />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password-login" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password-login"
                        name="password"
                        required
                    />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>

                <button type="submit" className="btn btn-primary" id="but">Login</button>
            </form>
        </div>

    )
}*/

import {useState} from "react";
import { Input } from "../Components/Input/Input.jsx";
import "../../CSS/sign.css"

export function LoginForm(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Logowanie OK:", { username, password });
        }

    };


    return(
        <div className="tab-pane fade show active" id="pills-login" role="tabpanel">
            <form onSubmit={handleSubmit}>
                <Input
                    id="register-username"
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={errors.username}
                    required
                />
                <Input
                    id="register-password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    required
                />
                <button type="submit" className="btn" id="but">Login</button>
            </form>

        </div>
    );
}