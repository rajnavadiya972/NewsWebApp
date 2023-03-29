import React, { useState } from "react";
import { HiMenuAlt1 } from 'react-icons/hi';
import { FaUserCircle,FaBookmark } from 'react-icons/fa';
import { BsFilePost } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';
import { IoIosRocket } from 'react-icons/io';
import { GiWorld } from 'react-icons/gi';
import { GiWallet } from 'react-icons/gi';
import { RiArticleLine } from 'react-icons/ri';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Navbar = () => {

    const navigate = useNavigate();

    const menus = [{ name: "Profile", link: "/UserProfile", icon: FaUserCircle },
    { name: "World News", link: "/ApiNewsUser", icon: GiWorld },
    { name: "Latest News", link: "/LocalNewsUser", icon: RiArticleLine },
    // { name: "My Post", link: "/MyPost", icon: BsFilePost },
    // { name: "Boost Your Post", link: "/PostNews", icon: IoIosRocket },
    // { name: "Bookmark", link: "/", icon: FaBookmark },
    // { name: "Subscription", link: "/Subscription", icon: GiWallet },
    { name: "Terms & Conditions", link: "/TermsAndConditionUser", icon: BsQuestionCircleFill },
    // { name: "About", link: "/", icon: BsInfoCircle },
    ];

    const logout = async () => {
        try {
            const res = await axios.get('/logout')
            console.log(res.data);
            if (res.data.success === true) {
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    }

    const [open, setOpen] = useState(true);

    return (
        <div className="z-20">
            <div className="flex fixed w-screen h-14">
                <div className=" py-3 bg-[#b7b8bb8f] w-14 justify-center rounded-xl hidden max-md:block text-gray-100 hover:text-blue-500">
                    <HiMenuAlt1
                        size={26}
                        className="cursor-pointer mx-auto"
                        onClick={() => setOpen(!open)}
                    />
                </div>
            </div>
            <section className={`max-md:mt-16 flex gap-6 fixed`}>
                <div
                    className={`flex flex-col bg-[#b7b8bb8f] justify-between h-screen max-md:h-full w-14 max-md:${open && "hidden"} duration-500 rounded-xl text-gray-100 px-4`}
                >
                    <div className="mt-4 flex flex-col gap-4 relative">
                        {menus?.map((menu, i) => (
                            <Link
                                to={menu?.link}
                                key={i}
                                className={`${
                                    menu?.margin && "mt-5"
                                  } group flex items-center text-sm gap-3.5 font-medium p-0 my-2 rounded-md hover:text-blue-500`}
                            >
                                <div>{React.createElement(menu?.icon, { size: "25" })}</div>
                                <h2
                                    style={{
                                        transitionDelay: `${i + 3}00ms`,
                                    }}
                                    className={`whitespace-pre duration-500 `}
                                >
                                </h2>
                                <h2
                                    className={`absolute left-48 bg-white font-semibold whitespace-pre text-blue-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                                >
                                    {menu?.name}
                                </h2>
                            </Link>
                        ))}
                    </div>
                    <BiLogOut size={25} className="my-6 mx-auto cursor-pointer hover:text-blue-500" onClick={logout}/>
                </div>
            </section>
        </div>
    );
};

export default Navbar;