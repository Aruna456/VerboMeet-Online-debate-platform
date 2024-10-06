import { SquareUserRound, X } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const NavLinks = [
        {
            title: "Home",
            path: "/"
        },
        {
            title: "About",
            path: "/About"
        },
        {
            title: "Contact",
            path: "/Contact"
        }
    ];

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-10 h-[10vh]  flex bg-transparent backdrop-blur-md">
                <div className="flex justify-start flex-row w-1/2 p-8 items-center text-2xl font-bold">
                    VerboMeet
                </div>
                <div className="w-[40vw] flex flex-row justify-end text-lg items-center font-bold">
                    <ul className="list-none flex flex-row gap-6 ">
                        {
                            NavLinks.map((navdata, index) => (
                                <NavLink key={index} to={navdata.path}>
                                    <li className=' font-bold'>{navdata.title}</li>
                                </NavLink>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;
