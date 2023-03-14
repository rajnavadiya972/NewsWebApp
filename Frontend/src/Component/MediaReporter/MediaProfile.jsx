import React, { useEffect, useState } from "react";
// import InfluencerHeader from "./InfluencerHeader";
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { FiTwitter } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { RiFacebookBoxLine } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";

import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";

const MediaProfile = () => {
    const tempPhoto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7QY2ioIRa17CorwDpwkHIujVaLvc6R_FpMA&usqp=CAU"

    const location = useLocation();

    const [userdata, setuserdata] = useState({});

    const getInfluencerData = async () => {
        const res = await axios.get("/getMediaProfile");
        const data = res.data;
        console.log(data);
        setuserdata(data.data)
        // console.log("Logged in user is:- ");
        // console.log(userdata);
    }
    useEffect(() => {
        getInfluencerData()
    }, [])

    return (
        <div className="">
            <Navbar />
            <div>
                {/* <InfluencerHeader /> */}

                <div class="h-full bg-gray-200 py-8 w-5/6 m-auto max-md:w-full max-md:bg-gray-900">
                    <div class="bg-white w-5/6 m-auto rounded-lg shadow-xl pb-8">
                        <div class="w-full h-[300px]">
                            <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" class="w-full h-full rounded-tl-lg rounded-tr-lg" />
                        </div>
                        <div class="flex flex-col items-center -mt-20">
                            <img
                                src={userdata.url != null ? userdata.url : tempPhoto}
                                class="w-40 border-4 border-white bg-gray-50 rounded-full" />
                            <div class="flex items-center space-x-2 mt-2">
                                <p class="text-2xl">{userdata.firstname + " " + userdata.lastname}</p>
                                <span class="bg-blue-500 rounded-full p-1" title="Verified">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </span>
                            </div>
                            <p class="text-gray-700">User</p>
                            <p class="text-sm text-gray-500">{(userdata.city != null ? userdata.city : "City") + ", " + (userdata.state != null ? userdata.state : "State") + ", " + (userdata.country != null ? userdata.country : "Country")}</p>
                        </div>
                        <div class="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                            <div class="flex items-center space-x-4 mt-2">
                                <NavLink to='/MediaProfileEdit' state={{ data: userdata }}>
                                    <button class="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                        <FaUserEdit size={17} />
                                        <span>Edit Profile</span>
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>


                    <div class="my-4 space-y-4 2xl:space-y-0 2xl:space-x-4 max-md:text-sm">
                        <div class="mx-auto w-5/6">
                            {/*                 Personal Info                      */}
                            <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                                <h4 class="text-xl text-gray-900 font-bold">Personal Information</h4>
                                <ul class="mt-2 text-gray-700">
                                    <li class="flex border-y py-2">
                                        <span class="font-bold w-24">Username :</span>
                                        <span class="text-gray-700">{userdata.username}
                                        </span>
                                    </li>
                                    <li class="flex border-y py-2">
                                        <span class="font-bold w-24">Full name :</span>
                                        <span class="text-gray-700">{(userdata.firstname != null ? userdata.firstname : "Please Edit profile") + " " + (userdata.lastname != null ? userdata.lastname : "")}
                                        </span>
                                    </li>
                                    <li class="flex border-b py-2">
                                        <span class="font-bold w-24">Mobile :</span>
                                        <span class="text-gray-700">{userdata.phone}</span>
                                    </li>
                                    <li class="flex border-b py-2">
                                        <span class="font-bold w-24">Email :</span>
                                        <span class="text-gray-700">{userdata.email}</span>
                                    </li>
                                    <li class="flex border-b py-2">
                                        <span class="font-bold w-24">Location :</span>
                                        <span class="text-gray-700">{(userdata.city != null ? userdata.city : "City") + ", " + (userdata.state != null ? userdata.state : "State") + ", " + (userdata.country != null ? userdata.country : "Country")}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <ToastContainer autoClose={800} />

        </div>

    );
};

export default MediaProfile;
