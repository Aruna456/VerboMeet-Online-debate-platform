import React, { useState } from 'react';
import Photo from "../assets/img/Debatebg.jpg";
import defaultProfileImg from "../assets/img/debate.png"; 
import { NavLink } from 'react-router-dom';

const RegisteredEventsPage = () => {
  const [registeredEvents, setRegisteredEvents] = useState([
    { title: "Hii", location: "cbe", time: "12:00" },
    { title: "Hii", location: "cbe", time: "12:00" },
    { title: "Hii", location: "cbe", time: "12:00" },
    { title: "Hii", location: "cbe", time: "12:00" },
    { title: "Hii", location: "cbe", time: "12:00" },
    { title: "Hii", location: "cbe", time: "12:00" },
    { title: "Hii", location: "cbe", time: "12:00" },
    { title: "Hii", location: "cbe", time: "12:00" },
    { title: "Hii", location: "cbe", time: "12:00" },
  ]);
  
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultProfileImg);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const navlinks = [
    { path: '/About', title: 'About' },
    { path: '/Contact', title: 'Contact' },
    { path: '/Feed', title: 'Explore' },
    { path: '/registeredevents', title: 'Your Events' }
  ];

  const toggleProfilePopup = () => {
    setIsProfilePopupOpen(!isProfilePopupOpen);
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

  return (
    <>
      <div className="w-full fixed top-0 left-0 right-0 bg-white shadow-md flex items-center justify-between px-8 py-3 z-10">
        <div className="font-bold text-2xl">VerboMeet</div>
        <ul className="flex flex-row list-none gap-5 items-center ml-auto font-bold">
          {navlinks.map((value, index) => (
            <NavLink key={index} to={value.path}>
              <li>{value.title}</li>
            </NavLink>
          ))}
          <div className="flex items-center">
            <span className="hover:underline cursor-pointer" onClick={toggleProfilePopup}>
              <img className="w-10 h-10 rounded-full cursor-pointer" src={profileImage} alt="Profile" />
            </span>
          </div>
        </ul>
      </div>

      <div 
        className="w-screen h-screen flex justify-center items-center overflow-hidden"
        style={{ backgroundImage: `url(${Photo})`, backgroundSize: 'cover' }}
      >
        <div className="shadow-lg drop-shadow-lg homecard-blur flex flex-col justify-center h-[70vh] w-[70vw] p-6">
          <h2 className="text-4xl font-bold mb-4 text-center text-stroke ">Your Registered Events</h2>
          <div className="flex flex-col items-center justify-start overflow-y-auto max-h-[50vh] w-full">
            {registeredEvents.length > 0 ? (
              registeredEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center shadow-md p-4 w-[35vw] bg-white rounded-lg border border-gray-300 mb-2"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-500">Location: {event.location}</p>
                    <p className="text-sm text-gray-500">Time: {event.time}</p>
                  </div>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md">Unregister</button>
                </div>
              ))
            ) : (
              <p>No registered events found.</p>
            )}
          </div>
        </div>
      </div>

      {isProfilePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg p-6 w-80">
            <div className="flex justify-end">
              <button
                className="right-4 text-xl text-gray-700 hover:text-white hover:bg-red-600 h-7 w-7 rounded-full"
                onClick={toggleProfilePopup}
              >
                X
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4 text-center">Profile</h2>
            <div className="flex justify-center">
              <img className="w-20 h-20 rounded-full mb-4" src={profileImage} alt="Profile" />
            </div>
            <input type="file" onChange={handleImageChange} className="mb-4" />
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
    </>
  );
};

export default RegisteredEventsPage;
