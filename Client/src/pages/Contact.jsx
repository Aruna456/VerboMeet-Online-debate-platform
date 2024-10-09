import Navbar from "../components/Navbar";
import Photo from "../assets/img/Debatebg.jpg"; 

const Contact = () => {
    return (
        <>
            <div className="w-screen h-screen overflow-hidden flex justify-center items-center"
                 style={{ backgroundImage: `url(${Photo})`, backgroundSize: 'cover' }}>
                <Navbar />
                <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8 relative">

                    
                    <h2 className="text-center font-bold text-3xl mb-6">We love hearing from you!!</h2>

                    <form className="flex flex-col">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <textarea
                            placeholder="Your Message"
                            className="mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows="4"
                            required
                        ></textarea>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>

                </div>
            </div>
        </>
    );
};

export default Contact;
