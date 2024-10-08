import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Photo from "../assets/img/Debatebg.jpg"; 
import "../assets/css/auth.css"

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(true); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = isSignUp
            ? {
                name: e.target[0].value,
                email: e.target[1].value,
                password: e.target[2].value,
                confirmPassword: e.target[3].value,
            }
            : {
                email: e.target[0].value,
                password: e.target[1].value,
            };

        console.log("Sending the following data:", formData);  

        try {
            const response = await fetch(isSignUp ? 'http://localhost:5000/api/auth/signup' : 'http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log('Response status:', response.status);
            console.log('Response data:', data);
            if (response.ok) {
                console.log("Success:", data);
                navigate('/feed'); 
            } else {
                alert(data.message || 'Authentication failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong!');
        }
    };

    const toggleAuthMode = () => {
        setIsSignUp((prevMode) => !prevMode);
    };

    return (
        <div className="w-screen h-screen  overflow-hidden flex justify-center items-center"
             style={{ backgroundImage: `url(${Photo})`, backgroundSize: 'cover' }}>
            <Navbar />
            <div className="wrapper p-8 rounded-lg shadow-lg w-30  relative">
                <div className="card-switch pb-20">
                    <label className="switch">
                        <input
                            type="checkbox"
                            className="toggle"
                            onChange={toggleAuthMode}
                            checked={!isSignUp} 
                        />
                        <span className="slider"></span>
                        <span className="card-side"></span>
                        <div className="flip-card__inner">
                            <div className={`flip-card__front ${!isSignUp ? 'hidden' : ''}`}>
                                <div className="title">Sign Up</div>
                                <form className="flip-card__form" onSubmit={handleSubmit}>
                                    <input
                                        className="flip-card__input"
                                        name="name"
                                        placeholder="Name"
                                        type="text"
                                        required
                                    />
                                    <input
                                        className="flip-card__input"
                                        name="email"
                                        placeholder="Email"
                                        type="email"
                                        required
                                    />
                                    <input
                                        className="flip-card__input"
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        required
                                    />
                                    <input
                                        className="flip-card__input"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        type="password"
                                        required
                                    />
                                    <button className="flip-card__btn">Confirm!</button>
                                </form>
                            </div>

                            <div className={`flip-card__back ${isSignUp ? 'hidden' : ''}`}>
                                <div className="title">Log In</div>
                                <form className="flip-card__form" onSubmit={handleSubmit}>
                                    <input
                                        className="flip-card__input"
                                        name="email"
                                        placeholder="Email"
                                        type="email"
                                        required
                                    />
                                    <input
                                        className="flip-card__input"
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        required
                                    />
                                    <button className="flip-card__btn">Let`s go!</button>
                                </form>
                            </div>
                        </div>
                    </label>
                </div>   
            </div>
        </div>
    );
};

export default Auth;
