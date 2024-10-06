import React, { useState } from "react";
import defaultProfileImg from "../assets/img/debate.png"; // Default profile image

function Feed() {
    const [debates, setDebates] = useState([
        { title: "Social Media's Influence on Mental Health", description: "Discuss the pros and cons of social media and its effects on mental well-being." },
        { title: "The Future of Electric Cars", description: "Explore the role of electric cars in combating climate change and their future impact on the auto industry." },
        { title: "Universal Basic Income (UBI)", description: "Should governments provide a guaranteed income to all citizens to reduce poverty?" },
        { title: "Cryptocurrency: The Future of Finance?", description: "Examine the rise of cryptocurrencies and their potential to replace traditional currencies." },
        { title: "Mandatory Vaccination for Public Health", description: "Debate the necessity and ethics of making vaccines mandatory to combat disease outbreaks." },
        { title: "Should College Education Be Free?", description: "Discuss whether higher education should be free for all or if students should pay for it." },
        { title: "Work From Home: The New Normal?", description: "Analyze the benefits and challenges of remote work in a post-pandemic world." },
        { title: "Legalizing Marijuana", description: "The pros and cons of legalizing marijuana for recreational and medicinal use." },
        { title: "Climate Change: Are We Doing Enough?", description: "Evaluate the global efforts to combat climate change and its urgency." },
        { title: "Should Voting Be Mandatory?", description: "Discuss whether compulsory voting should be introduced to increase democratic participation." },
        { title: "Banning Plastic: A Solution to Pollution?", description: "Explore the impact of banning plastic and its potential to reduce pollution and protect wildlife." },
        { title: "The Ethics of Animal Testing", description: "Debate whether animal testing for scientific and cosmetic purposes is justified." },
        { title: "Privacy vs. National Security", description: "Where should the line be drawn between personal privacy and ensuring national security?" },
        { title: "Online Learning vs. Traditional Classrooms", description: "Compare the effectiveness of online learning with traditional classroom education." },
        { title: "The Role of Governments in Controlling Social Media", description: "Should governments regulate social media platforms to prevent the spread of misinformation?" },
        { title: "Nuclear Energy: Solution or Threat?", description: "Debate whether nuclear energy is a viable solution to energy needs or a dangerous threat." },
        { title: "The Death Penalty: Should It Be Abolished?", description: "Examine the arguments for and against the use of the death penalty in criminal justice systems." },
        { title: "Universal Healthcare: A Right or a Privilege?", description: "Should healthcare be considered a basic right for all citizens, or a service to be paid for?" },
        { title: "Genetic Engineering: Playing God?", description: "Discuss the ethical implications of genetic engineering in humans, animals, and agriculture." },
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
    const [isDebateDetailsPopupOpen, setIsDebateDetailsPopupOpen] = useState(false);
    const [isAddDebatePopupOpen, setIsAddDebatePopupOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(defaultProfileImg);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedDebate, setSelectedDebate] = useState(null);
    const [newDebate, setNewDebate] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
    });

    const filteredDebates = debates.filter((debate) =>
        debate.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleProfilePopup = () => {
        setIsProfilePopupOpen(!isProfilePopupOpen);
    };

    const toggleDebateDetailsPopup = (debate) => {
        setSelectedDebate(debate);
        setIsDebateDetailsPopupOpen(!isDebateDetailsPopupOpen);
    };

    const toggleAddDebatePopup = () => {
        setIsAddDebatePopupOpen(!isAddDebatePopupOpen);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddDebate = () => {
        if (newDebate.title && newDebate.description && newDebate.date && newDebate.time && newDebate.location) {
            setDebates([...debates, newDebate]);
            setNewDebate({
                title: "",
                description: "",
                date: "",
                time: "",
                location: "",
            });
            toggleAddDebatePopup();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-blue-900 text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out w-64 p-4 z-20`}
            >
                <button className="absolute top-2 right-2 text-xl" onClick={toggleSidebar}>
                    ✖
                </button>
                <h2 className="text-xl font-bold mb-4">Menu</h2>
                <ul>
                    <li className="mb-2">
                        <a href="#" className="hover:underline">Contact Us</a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="hover:underline">Help</a>
                    </li>
                    {/* Add more options here as needed */}
                </ul>
            </div>

            {/* Main content */}
            <div className="flex-grow flex flex-col min-h-screen">
                <header className="w-full fixed top-0 left-0 right-0 bg-white shadow-md flex items-center justify-between px-8 py-4 z-10">
                    <button
                        className="text-2xl font-bold p-1 text-white bg-blue-400 rounded-md"
                        onClick={toggleSidebar}
                    >
                        ☰
                    </button>

                    <div className="flex items-center space-x-4">
                        <span className="hover:underline cursor-pointer" onClick={toggleProfilePopup}>
                            <img
                                className="w-10 h-10 rounded-full cursor-pointer"
                                src={profileImage}
                                alt="Profile"
                            />
                        </span>
                    </div>
                </header>

                <div className="flex-grow flex items-center justify-center mt-24 p-4">
                    <div className="w-full max-w-6xl mx-auto">
                        <main className="border-2 border-gray-300 rounded-lg p-6 bg-white shadow-lg">
                            <div className="mb-6">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search debate title..."
                                    className="border px-4 py-2 w-full rounded"
                                />
                            </div>

                            {/* Flex Row for Debates */}
                            <div className="flex flex-wrap -mx-4">
                                {filteredDebates.length > 0 ? (
                                    filteredDebates.map((debate, index) => (
                                        <div
                                            key={index}
                                            className="mb-6 p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4"
                                        >
                                            <div className="h-full flex flex-col border rounded bg-gray-50 shadow-md transition-transform transform hover:scale-105">
                                                <h2 className="font-bold text-lg p-4 flex-grow">{debate.title}</h2>
                                                <p className="text-gray-700 px-4 pb-4 flex-grow">{debate.description}</p>
                                                <button
                                                    className="mb-4 bg-sky-300 text-white px-3 py-1 rounded-full self-center"
                                                    onClick={() => toggleDebateDetailsPopup(debate)}
                                                >
                                                    Explore
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">No debates found</p>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
                <button
                    className="fixed bottom-8 right-8 w-12 h-12 bg-blue-500 text-white rounded-full text-2xl flex items-center justify-center"
                    onClick={toggleAddDebatePopup}
                >
                    +
                </button>

                {/* Profile Popup */}
                {isProfilePopupOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                        <div className="bg-white rounded-lg p-6 w-80">
                            <h2 className="text-xl font-bold mb-4">Profile</h2>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="mb-4"
                            />
                            <img
                                className="w-20 h-20 rounded-full mb-4"
                                src={profileImage}
                                alt="Profile"
                            />
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border px-4 py-2 w-full rounded mb-4"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border px-4 py-2 w-full rounded mb-4"
                            />
                            <button
                                className="bg-blue-500 text-white rounded-md py-2 px-4 w-full"
                                onClick={toggleProfilePopup}
                            >
                                Save
                            </button>
                            <button
                                className="mt-2 text-red-500 hover:underline"
                                onClick={toggleProfilePopup}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* Debate Details Popup */}
                {isDebateDetailsPopupOpen && selectedDebate && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                        <div className="bg-white rounded-lg p-6 w-80">
                            <h2 className="text-xl font-bold mb-4">{selectedDebate.title}</h2>
                            <p className="mb-4">Description: {selectedDebate.description}</p>
                            <p className="mb-4">Date: <span className="font-semibold">2024-10-15</span></p>
                            <p className="mb-4">Time: <span className="font-semibold">14:00</span></p>
                            <p className="mb-4">Location: <span className="font-semibold">Debate Hall 1</span></p>
                            <button className="bg-blue-500 text-white rounded-md py-2 px-4 w-full">
                                Register
                            </button>
                            <button
                                className="mt-2 text-red-500 hover:underline"
                                onClick={toggleDebateDetailsPopup}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* Add Debate Popup */}
                {isAddDebatePopupOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                        <div className="bg-white rounded-lg p-6 w-80">
                            <h2 className="text-xl font-bold mb-4">Add New Debate</h2>
                            <input
                                type="text"
                                placeholder="Title"
                                value={newDebate.title}
                                onChange={(e) => setNewDebate({ ...newDebate, title: e.target.value })}
                                className="border px-4 py-2 w-full rounded mb-4"
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={newDebate.description}
                                onChange={(e) => setNewDebate({ ...newDebate, description: e.target.value })}
                                className="border px-4 py-2 w-full rounded mb-4"
                            />
                            <input
                                type="date"
                                placeholder="Date"
                                value={newDebate.date}
                                onChange={(e) => setNewDebate({ ...newDebate, date: e.target.value })}
                                className="border px-4 py-2 w-full rounded mb-4"
                            />
                            <input
                                type="time"
                                placeholder="Time"
                                value={newDebate.time}
                                onChange={(e) => setNewDebate({ ...newDebate, time: e.target.value })}
                                className="border px-4 py-2 w-full rounded mb-4"
                            />
                            <input
                                type="text"
                                placeholder="Location"
                                value={newDebate.location}
                                onChange={(e) => setNewDebate({ ...newDebate, location: e.target.value })}
                                className="border px-4 py-2 w-full rounded mb-4"
                            />
                            <button
                                className="bg-blue-500 text-white rounded-md py-2 px-4 w-full"
                                onClick={handleAddDebate}
                            >
                                Add Debate
                            </button>
                            <button
                                className="mt-2 text-red-500 hover:underline"
                                onClick={toggleAddDebatePopup}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Feed;
