import Navbar from "../components/Navbar";
import Photo from "../assets/img/Debatebg.jpg"; // Background image

const AboutUs = () => {
    return (
        <>
            <div className="w-screen h-screen overflow-hidden flex justify-center items-center"
                 style={{ backgroundImage: `url(${Photo})`, backgroundSize: 'cover' }}>
                <Navbar />
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">

                    <h2 className="text-center font-bold text-3xl mb-6">Who We Are?</h2>

                    <p className="text-center text-gray-700 leading-7">
                        Welcome to <span className="font-bold text-blue-600">VerboMeet</span>, a platform
                        that helps you discover exciting debate events in your area and register to join. 
                        Our goal is to connect individuals passionate about engaging in meaningful discussions.
                        Whether you're an experienced debater or just starting out, VerboMeet is here to
                        support you on your journey to enhance your debating skills and broaden your horizons.
                    </p>

                </div>
            </div>
        </>
    );
};

export default AboutUs;
