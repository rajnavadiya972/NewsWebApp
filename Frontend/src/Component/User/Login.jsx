import React, { useState } from 'react'
// import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


const Login = () => {
    const navigate = useNavigate();
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const activebtn = 'my-5 md:my-0 lg:my-0 flex justify-center w-full px-6 py-3 mt-4 text-blue-500 border border-blue-500 rounded-md md:mt-0 md:w-auto md:mx-2 border-blue-400 text-blue-400 focus:outline-none'
    const deactivebtn = 'my-5 md:my-0 lg:my-0 hover:bg-blue-400 flex justify-center w-full px-6 py-3 text-white bg-blue-500 rounded-md md:w-auto md:mx-2 focus:outline-none'
    const [passwordType, setPasswordType] = useState("password");
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
        }
        else setPasswordType("password")
    }
    const [userdata, setUserdata] = useState({
        email: "",
        password: ""
    });

    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        console.log(e.target.value)
        setUserdata({ ...userdata, [name]: value });
    }

    const postdata = async (e) => {
        e.preventDefault();
        toast.success("Login!!");
        await sleep(1500)
        navigate("/ApiNews");

        // const { email, password } = userdata;
        // if (
        //   !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        //     email
        //   )
        // ) {
        //   toast.error("Invalid Email");
        //   return;
        // }
        // const res = await fetch("/influencer/influencerlogin", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     password,
        //     email,
        //   }),
        // })

        // const data = await res.json();
        // console.log(data)
        // if (res.status === 200) {
        //   toast.success(data.message);
        //   await sleep(1000)
        // //   navigate("/InfluencerHome");
        // } else {
        //   toast.error(data.error);
        // }


        //     // localStorage.setItem("jwt", data.token);
        //     // localStorage.setItem("user", JSON.stringify(data.user));
        //     // localStorage.setItem("type", JSON.stringify(data.type));


    }
    
    return (
        <div className=''>
            <div>
                <div class="bg-gray-900">
                    <div class="flex justify-center h-screen">
                        <div class=" bg-cover block bg-[url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)] max-md:hidden">

                            <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                                <div>
                                    <h2 class="text-4xl font-bold text-white">Influencer</h2>

                                    <p class="max-w-xl mt-3 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus molestiae</p>
                                </div>
                            </div>

                        </div>

                        <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                            <div class="flex-1">
                                <div class="text-center item-center ">

                                    {/* <p class="pb-5 text-gray-500 text-gray-300">Sign in to access your account  as</p> */}
                                    <div className="mt-3 md:flex md:items-center md:-mx-2">

                                        {/* <NavLink to='/InfluencerLogin'> */}
                                        <button class={activebtn}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>

                                            <span className="mx-2">
                                                User
                                            </span>
                                        </button>
                                        {/* </NavLink> */}


                                        {/* <NavLink to='/BrandLogin' > */}
                                        <button class={deactivebtn}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>

                                            <span className="mx-2">
                                                Media Reporter
                                            </span>
                                        </button>
                                        {/* </NavLink> */}
                                        {/* <NavLink to='/ManagerLogin'>
                                        <button class={deactivebtn}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>

                                            <span className="mx-2">
                                                Admin
                                            </span>
                                        </button>
                                        </NavLink> */}
                                    </div>
                                </div>

                                <div class="mt-8">
                                    <form method='POST'>
                                        <div>
                                            <label for="email" class="block mb-2 text-sm text-gray-200">Email Address</label>
                                            <input type="email" name="email" id="email" placeholder="example@example.com"
                                                class="block w-full px-4 py-2 mt-2  border  rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                                value={userdata.email}
                                                onChange={handleInput}
                                            />
                                        </div>

                                        <div class="mt-6">
                                            <div class="flex justify-between">
                                                <label for="password" class="text-sm text-gray-200">Password</label>
                                                <a href="#" class="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
                                            </div>

                                            <div className='flex flex-row'>
                                                <input type={passwordType} name="password" id="password" placeholder="Your Password"
                                                    class="block w-full px-4 py-2 mt-2 border  rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                                    value={userdata.password}
                                                    onChange={handleInput}
                                                />
                                                <div className='cursor-pointer my-auto mx-1' onClick={togglePassword}>
                                                    {passwordType === "password" ? <AiFillEye className='text-white ' size={25} /> : <AiFillEyeInvisible size={25} className='text-white ' />}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mt-6">


                                            <button
                                                class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                                onClick={postdata}>
                                                Sign in
                                            </button>

                                        </div>

                                    </form>

                                    <p class="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? 
                                    <a href="./UserSignUp" class="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</a>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer autoClose={500} />
        </div>
    )
}

export default Login