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
import { Input } from "../../../HTML/Components/Input/Input.jsx";
import "../Signup/sign.css"

export function LoginForm(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Logowanie OK:", { username, password });
            try {
                /*                const response = await fetch('http://localhost:8080/api/auth/signin', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        username: username,
                                        password: password,
                                    }),
                                });

                                if (!response.ok) {
                                    throw new Error('Logowanie nieudane');
                                }

                                const token = await response.text(); // Twój backend zwraca sam token jako String
                                console.log("Otrzymany token:", token);

                                // Zapisz token do localStorage
                                localStorage.setItem('token', token);*/

                // Przekieruj użytkownika np. do dashboardu
                window.location.href = "/";

            } catch (error) {
                console.error('Błąd logowania:', error.message);
            }
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