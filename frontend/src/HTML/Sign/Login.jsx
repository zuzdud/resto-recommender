import {useState} from "react";
import { Input } from "../Components/Input/Input.jsx";
import "../../CSS/sign.css"
import { useNavigate } from 'react-router-dom';

export function LoginForm(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!username) newErrors.username = "Username is required";
        if (!password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Logowanie OK:", { username, password });
            try {
                const response = await fetch('http://localhost:8080/api/auth/signin', {
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
                localStorage.setItem('token', token);

                // Przekieruj użytkownika np. do dashboardu
                navigate('/');

            } catch (error) {
                setLoginError("Nieprawidłowy login lub hasło");
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