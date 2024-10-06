import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const nav=useNavigate()

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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("Profile updated:", { name, email, profileImage });
        nav('/Feed')
    };

    return (
        <div className="flex flex-col items-center mt-12">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="border p-2 rounded w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-2 rounded w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border p-2 rounded w-full"
                    />
                </div>
                {profileImage && (
                    <img src={profileImage} alt="Profile Preview" className="w-24 h-24 rounded-full mb-4" />
                )}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Save 
                </button>
            </form>
        </div>
    );
};

export default Profile;
