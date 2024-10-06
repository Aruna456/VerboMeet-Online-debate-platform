import Photo from "../assets/img/Debatebg.jpg";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/Auth');
    };

    return (
        <> 
            <div className="w-screen h-screen overflow-hidden"> 
                <Navbar />
                <div
                    className="w-full h-full flex justify-center items-center"
                    style={{ backgroundImage: `url(${Photo})`, backgroundSize: 'cover' }} 
                >
                    <div className="w-11/12 sm:w-9/12 lg:w-1/2 h-3/4 homecard-blur drop-shadow-lg shadow-lg border-2 border-gray-100 bg-opacity-50 flex flex-col justify-center items-center rounded-md">
                        <p className="cursor-pointer font-bold text-2xl sm:text-3xl flex flex-col gap-1 justify-center items-center text-center">
                            <span className="flex justify-center text-stroke mb-4 text-4xl sm:text-5xl">Welcome to VerboMeet!</span>
                            <span className="flex justify-center text-stroke2 text-lg sm:text-xl">Your Voice, Your Debate</span>
                            <span className="flex justify-center pb-2 text-stroke2 text-lg sm:text-xl">Lock It In!</span>

                            <button
                                type="button" 
                                onClick={handleGetStarted}
                                className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-blue-400 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                                aria-label="Get Started"
                            >
                                Get Started
                                <svg
                                    className="w-6 h-6 sm:w-8 sm:h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-1 sm:p-2 rotate-45"
                                    viewBox="0 0 16 19"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                        className="fill-gray-800 group-hover:fill-gray-800"
                                    ></path>
                                </svg>
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
