/*
export function RegisterForm() {


    function handleRegisterSubmit() {

        console.log("Clicked login");
    }

    return(
        <div className="tab-pane fade show active" id="pills-login" role="tabpanel">
            <form onSubmit={handleRegisterSubmit} noValidate>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="mail-register"
                        name="email"
                        required
                    />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username-register"
                        name="name"
                        required
                    />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password-register"
                        name="password"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Repeat password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password-rep"
                        name="password-rep"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" id="but2">Register</button>
            </form>
        </div>
    )
}*/


import { useState } from "react";
import { Input } from "../Components/Input/Input.jsx";
import "../../CSS/sign.css"

export function RegisterForm() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid.";
        }

        if (!username.trim()) {
            newErrors.username = "Username is required.";
        }

        if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        if (password !== repeatPassword) {
            newErrors.repeatPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
/*            console.log("Rejestracja OK:", { email, username, password });
            if (onSubmit){
                onSubmit({ email, username, password });
                e.clearForm();
            }*/
            const user = { email, username, password };
            console.log(user);
            try {
                const response = await fetch("http://localhost:8080/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                });

                if (response.ok) {
                    //setSuccessMessage("Rejestracja zakończona sukcesem!");
                    // Czyszczenie formularza
                    setEmail("");
                    setUsername("");
                    setPassword("");
                    setRepeatPassword("");
                    setErrors({});
                } else {
                    const errorData = await response.json();
                    console.error("Błąd rejestracji:", errorData);
                    //setSuccessMessage(""); // żeby nie pokazywało sukcesu w przypadku błędu
                    // Możesz też dodać komunikat błędu na UI
                }

            } catch (error) {
                console.error("Błąd sieci:", error);
                //setSuccessMessage("");
            }
        }
    };

    return (
        <div className="tab-pane fade show active" id="pills-login" role="tabpanel">
            <form onSubmit={handleSubmit}>
                <Input
                    id="register-email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    required
                />

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

                <Input
                    id="register-repeat-password"
                    label="Repeat Password"
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    error={errors.repeatPassword}
                    required
                />
                <button type="submit" className="btn" id="but">Register</button>


            </form>
        </div>
    );
}
