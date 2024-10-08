import React, { useState ,useEffect} from "react";
import defaultProfileImg from "../assets/img/debate.png"; 
import { useNavigate,NavLink } from "react-router-dom";


function Feed() {
    const [debates, setDebates] = useState([]);

    const navlinks=[
        {
            path:'/About',
            title:'About'
        },
        {
            path:'/Contact',
            title:'Contact'
        },
        {
            path:'/Feed',
            title:'Explore'
        },
        {
            path:'/registeredevents',
            title:'Your Events'
        }
    ]


    useEffect(() => {
        const fetchDebates = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/debates/all');
                const data = await response.json();
                setDebates(data);
            } catch (error) {
                console.error('Error fetching debates:', error);
            }
        };
    
        fetchDebates();
    }, []);
    

    const [searchQuery, setSearchQuery] = useState("");

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
    
    const [isEditDebatePopupOpen, setIsEditDebatePopupOpen] = useState(false);
    const [editDebate, setEditDebate] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
    });

    const filteredDebates = debates.filter((debate) =>
        debate.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  

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

    const toggleEditDebatePopup = (debate) => {
        setEditDebate({
            title: debate.title,
            description: debate.description,
            date: debate.date,
            time: debate.time,
            location: debate.location,
        });
        setSelectedDebate(debate); 
        setIsEditDebatePopupOpen(!isEditDebatePopupOpen);
    };
    

    const handleEditDebate = async (e) => {
        e.preventDefault();
    
        if (!selectedDebate) {
            console.error('No debate selected for editing');
            alert('No debate selected for editing!');
            return;  
        }
    
        try {
            const response = await fetch(`http://localhost:5000/api/debates/edit/${selectedDebate._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editDebate),
            });
    
            if (response.ok) {
                const updatedDebate = await response.json();
                setDebates(debates.map(debate => debate._id === updatedDebate._id ? updatedDebate : debate));
                setEditDebate({
                    title: "",
                    description: "",
                    date: "",
                    time: "",
                    location: "",
                });
                setIsEditDebatePopupOpen(false); 
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to edit debate');
            }
        } catch (error) {
            console.error('Error editing debate:', error);
            alert('Something went wrong!');
        }
    };
    
    const handleAddDebate = async (e) => {
        e.preventDefault();
    
        if (newDebate.title && newDebate.description && newDebate.date && newDebate.time && newDebate.location) {
            try {
                const response = await fetch('http://localhost:5000/api/debates/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newDebate),
                });
    
                const data = await response.json();
                if (response.ok) {
                    setDebates([...debates, data.newDebate]);
                    setNewDebate({
                        title: "",
                        description: "",
                        date: "",
                        time: "",
                        location: "",
                    });
                    toggleAddDebatePopup();
                } else {
                    alert(data.message || 'Failed to add debate');
                }
            } catch (error) {
                console.error('Error adding debate:', error);
                alert('Something went wrong!');
            }
        }
    };

    const handleDeleteDebate = async (debateId) => {
        if (window.confirm("Are you sure you want to delete this debate?")) {
            try {
                const response = await fetch(`http://localhost:5000/api/debates/delete/${debateId}`, {
                    method: 'DELETE',
                });
    
                if (response.ok) {
                    setDebates(debates.filter((debate) => debate._id !== debateId));
                    alert('Debate deleted successfully');
                } else {
                    const data = await response.json();
                    alert(data.message || 'Failed to delete debate');
                }
            } catch (error) {
                console.error('Error deleting debate:', error);
                alert('Something went wrong!');
            }
        }
    };
        
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

    const navigate=useNavigate()

  

    const handleRegister = () => {
        navigate('/register', { state: selectedDebate});
    };
    return (
        <div className="min-h-screen  bg-gray-100 flex">
            <div className="flex-grow flex flex-col min-h-screen">
                <header className="w-full fixed top-0 left-0 right-0 bg-white shadow-md flex items-center justify-between px-8 py-3 z-10">
                   <div className="font-bold text-2xl">
                    VerboMeet
                   </div>
                   <ul className="flex flex-row list-none gap-5 items-center  ml-auto font-bold">
                    {
                    navlinks.map((value,index) => (
                        <NavLink key={index} to={value.path} >

                            <li>{value.title}</li>
                        </NavLink>
                    ))
                    }

                    <div className="flex items-center ">

                        <span className="hover:underline cursor-pointer" onClick={toggleProfilePopup}>
                            <img
                                className="w-10 h-10 rounded-full cursor-pointer"
                                src={profileImage}
                                alt="Profile"
                            />
                        </span>
                    </div>
                 
                    </ul>
                </header>
                
                <div className="flex-grow flex items-center    justify-center mt-24 p-4">
                    <div className="w-full max-w-6xl ml-24   mx-auto">
                        <main className="border-2  border-gray-300 rounded-lg p-6 bg-white w-[83vw]  shadow-lg">
                            <div className="mb-6">  
                                <h3 className="justify-center p-4 font-bold text-blue-600 text-2xl w-full flex">Explore!!</h3>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search debate title..."
                                    className="border px-4 py-2 w-full rounded"
                                />
                            </div>
                   
                            <div className="flex flex-wrap -mx-4">
                                {filteredDebates.length > 0 ? (
                                    filteredDebates.map((debate, index) => (
                                        <div key={index} className="mb-6 p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4">
                                            <div className="h-full flex flex-col border rounded bg-gray-50 shadow-md transition-transform transform hover:scale-105">
                                                <h2 className="font-bold text-lg p-4 flex-grow">{debate.title}</h2>
                                                <p className="text-gray-700 px-4 pb-4 flex-grow">{debate.description}</p>
                                                <div className="flex justify-between items-center px-4 py-2">
                                                <button
                                                    className="mb-4 bg-blue-400  hover:shadow-lg hover:drop-shadow-sm hover:shadow-blue-500 text-white px-3 py-1 rounded-full "
                                                    onClick={() => toggleDebateDetailsPopup(debate)}
                                                >
                                                    Visit
                                                </button>
                                                <div className="flex space-x-2 h-8 mb-4">
                                                    
                                                    <button className="hover:bg-yellow-500 hover:text-white text-yellow-400  rounded-full"
                                                        onClick={() => toggleEditDebatePopup(debate)}  
                                                        aria-label={`Edit debate: ${debate.title}`}  
                                                    >
                                                    <i className="fas fa-pencil-alt w-10"></i>
                                                </button>
                                                <button
                                                    className="hover:bg-red-500 hover:text-white text-red-600 rounded-full"
                                                    onClick={() => handleDeleteDebate(debate._id)} 
                                                >
                                                    <i className="fas fa-trash w-10 " ></i>
                                                </button>
                                            </div>
                                            </div>
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
                    className="fixed bottom-8 right-8 p-4 w-12 h-12 bg-blue-500 text-white rounded-full text-2xl flex items-center justify-center"
                    onClick={toggleAddDebatePopup}
                >
                    +
                </button>

                {isProfilePopupOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                        <div className="bg-white rounded-lg p-6 w-80">
                            <div className="flex justify-end">
                        <button
                                             className=" right-4 text-xl  text-red-500 hover:text-white hover:bg-red-600 h-7 w-8 rounded-full"

                                onClick={toggleProfilePopup}
                            >
                                X
                            </button></div>
                            <h2 className="text-xl font-bold mb-4 text-center">Profile</h2>
                            <div className="flex justify-center">
                            <img
                                className="w-20 h-20 rounded-full mb-4"
                                src={profileImage}
                                alt="Profile"
                            /></div>
                            
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="mb-4"
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
                         
                        </div>
                    </div>
                )}

                {isDebateDetailsPopupOpen && selectedDebate && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                        <div className="bg-white rounded-lg p-6 w-80">
                        <div className="flex justify-end">
                        <button
                                             className=" right-4 text-xl font-bold text-red-500 hover:text-white hover:bg-red-600 h-7 w-7 rounded-full"

                                             onClick={toggleDebateDetailsPopup}
                            >
                                X
                            </button></div>
                            <h2 className="text-xl font-bold mb-4">{selectedDebate.title}</h2>
                            <p className="mb-4">Description: {selectedDebate.description}</p>
                            <p className="mb-4">Date: <span className="font-semibold">{selectedDebate.date}</span></p>
                            <p className="mb-4">Time: <span className="font-semibold">{selectedDebate.time}</span></p>
                            <p className="mb-4">Location: <span className="font-semibold">{selectedDebate.location}</span></p>
                            <button  onClick={handleRegister} className="bg-blue-500 text-white rounded-md py-2 px-4 w-full">
                                Register
                            </button>
                           
                        </div>
                    </div>
                )}

                {isEditDebatePopupOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                        <div className="bg-white rounded-lg p-6 w-80">
                        <div className="flex justify-end">
                        <button
                                             className=" right-4 text-xl font-bold text-red-500 hover:text-white hover:bg-red-600 h-7 w-7 rounded-full"

                                             onClick={toggleEditDebatePopup}
                            >
                                X
                            </button></div>
                            <h2 className="text-xl font-bold mb-4 text-center">Edit Debate</h2>
                            <form onSubmit={handleEditDebate}>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={editDebate.title}
                                    onChange={(e) => setEditDebate({ ...editDebate, title: e.target.value })}
                                    className="border px-4 py-2 w-full rounded mb-4"
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={editDebate.description}
                                    onChange={(e) => setEditDebate({ ...editDebate, description: e.target.value })}
                                    className="border px-4 py-2 w-full rounded mb-4"
                                />
                                <input
                                    type="date"
                                    placeholder="Date"
                                    value={editDebate.date}
                                    onChange={(e) => setEditDebate({ ...editDebate, date: e.target.value })}
                                    className="border px-4 py-2 w-full rounded mb-4"
                                />
                                <input
                                    type="time"
                                    placeholder="Time"
                                    value={editDebate.time}
                                    onChange={(e) => setEditDebate({ ...editDebate, time: e.target.value })}
                                    className="border px-4 py-2 w-full rounded mb-4"
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={editDebate.location}
                                    onChange={(e) => setEditDebate({ ...editDebate, location: e.target.value })}
                                    className="border px-4 py-2 w-full rounded mb-4"
                                />
                                <button
                                    className="bg-blue-500 text-white rounded-md py-2 px-4 w-full"
                                    type="submit"
                                >
                                    Save Changes
                                </button>
                                
                            </form>
                        </div>
                    </div>
                )}

                {isAddDebatePopupOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                        <div className="bg-white rounded-lg p-6 w-80">
                        <div className="flex justify-end">
                        <button
                                             className=" right-4 text-xl font-bold text-gray-700 hover:text-white hover:bg-red-600 h-7 w-7 rounded-full"
                                             onClick={toggleAddDebatePopup}
                            >
                                X
                            </button></div>
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
                          
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Feed;