import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Photo from "../assets/img/Debatebg.jpg"; // Background image

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(true); // Toggle between Sign In and Sign Up
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for form submit logic (authentication)
        // After successful login/signup
        navigate('/feed'); // Redirect to feed page after login/signup
    };

    const toggleAuthMode = () => {
        setIsSignUp((prevMode) => !prevMode);
    };

    return (
        <div className="w-screen h-screen overflow-hidden flex justify-center items-center"
             style={{ backgroundImage: `url(${Photo})`, backgroundSize: 'cover' }}>
            <Navbar />
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
                <h2 className="text-center font-bold text-3xl mb-6">
                    {isSignUp ? "Sign Up" : "Sign In"}
                </h2>

                <form className="flex flex-col" onSubmit={handleSubmit}>
                    {isSignUp && (
                        <input
                            type="text"
                            placeholder="Name"
                            className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    {isSignUp && (
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    )}

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        {isSignUp ? "Create Account" : "Log In"}
                    </button>
                </form>

                <div className="text-center mt-4">
                    {isSignUp ? (
                        <p>
                            Already have an account?{" "}
                            <span
                                className="text-blue-500 cursor-pointer"
                                onClick={toggleAuthMode}
                            >
                                Sign In
                            </span>
                        </p>
                    ) : (
                        <p>
                            Don't have an account?{" "}
                            <span
                                className="text-blue-500 cursor-pointer"
                                onClick={toggleAuthMode}
                            >
                                Sign Up
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;
