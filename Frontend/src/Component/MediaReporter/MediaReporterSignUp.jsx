import React from 'react'
// import InfluencerHome from './InfluencerHome'
// import InfluencerLogin from './InfluencerLogin'
import { useState } from 'react';
// import { BsFillPersonFill } from 'react-icons/bs'
import axios from 'axios'
import { Navigate, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Formik } from 'formik'
import * as Yup from 'yup';


const SignUp = () => {
    const navigate = useNavigate();
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const [passwordType, setPasswordType] = useState("password");
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
        }
        else setPasswordType("password")
    }
    const [passwordConfirmType, setPasswordConfirmType] = useState("password");
    const toggleConfirmPassword = () => {
        if (passwordConfirmType === "password") {
            setPasswordConfirmType("text")
        }
        else setPasswordConfirmType("password")
    }

    const validationSchema = Yup.object({
        username: Yup.string().trim().min(3, 'Invalid name').required('name is requierd!'),
        email: Yup.string().email('Invalid email!').required('Email is required!'),
        password: Yup.string().min(8, 'password is too short!').required('password is required!'),
        confirmPassword: Yup.string().equals([Yup.ref('password'), null], 'password does not match!')
    })

    const [userdata, setUserdata] = useState({
        username: "", email: "", password: "", confirmPassword: ""
    });

    // let name, value;
    // const handleInput = (e) => {
    //     name = e.target.name;
    //     value = e.target.value;
    //     console.log(e.target.value)
    //     setuserdata({ ...userdata, [name]: value });
    // }

    const [error, setError] = useState('')
    const updateError = (error, stateUpdater) => {
        stateUpdater(error);
        setTimeout(() => {
            stateUpdater('');
        }, 2500);
    }

    const signUp = async (values, FormikActions) => {
        // e.preventDefault()

        console.log("Hello");
        const res = await axios.post('/createMediaReporter', {
            ...values
        });
        // console.log(res.data);
        if (res.data.success === false) {
            updateError(res.data.message, setError)
            toast.error(res.data.message);
            return;
        }
        toast.success("Register MediaReporter successful")
        await sleep(1500)
        navigate("/MediaReporterLogin");
        FormikActions.resetForm();
        FormikActions.setSubmitting(false);
    }

    // const postdata = async (e) => {
    // e.preventDefault();
    // const { fname, phone, lname, email, city, state, gender, country, password, age, instagram, instagramURL, instagramFollowers, instagramEngagementRate, facebook, facebookURL, facebookFollowers, facebookEngagementRate, twitter, twitterURL, twitterFollowers, twitterEngagementRate } = userdata;
    // if (cpass == password) {
    //   const res = await fetch("/influencer/signup", {
    //     method: 'POST',
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({

    //       fname, phone, lname, email, city, state, gender, country, password, age, instagram, instagramURL, instagramFollowers, instagramEngagementRate, facebook, facebookURL, facebookFollowers, facebookEngagementRate, twitter, twitterURL, twitterFollowers, twitterEngagementRate

    //     }),
    //   })

    //   const data = await res.json();
    //   console.log(data)
    //   if (res.status == 200) {
    //     toast.success(data.message);
    //     await sleep(2200)
    //     navigate("/InfluencerLogin");
    //   } else {
    //     toast.error(data.error);
    //   }
    // }
    // else {
    //   toast.error("Passwords do not match")

    // }

    // }

    const activebtn = 'flex justify-center w-full px-6 py-3 mt-4 text-blue-500 border border-white rounded-md md:mt-0 md:w-auto md:mx-2 text-blue-400 focus:outline-none'
    const deactivebtn = 'max-md:mt-4 hover:bg-blue-400 flex justify-center w-full px-6 py-3 text-white bg-blue-500 rounded-md md:w-auto md:mx-2 focus:outline-none'
    //  var bsFillPersonFill=<BsFillPersonFill size={20}/>
    return (
        <div>
            <div className=''>
                <section className="bg-gray-900 ">
                    <div className="flex justify-center ">
                        <div class=" bg-cover w-full h-[screen] min-h-screen bg-[url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)]">

                            <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40 max-md:px-0">
                                <div className='max-md:hidden'>
                                    <h2 class="text-4xl font-bold text-white">Influencer</h2>

                                    <p class="max-w-xl mt-3 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus molestiae</p>
                                </div>

                                <div className="flex items-center p-5 rounded-lg  mx-auto bg-opacity-25 bg-white">
                                    <div className="w-full">
                                        <div className="mt-6">
                                            <div className="mt-3 md:flex md:items-center md:-mx-2">
                                                <NavLink to='/UserSignUp' >

                                                    <button class={activebtn}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>

                                                        <span className="mx-2 text-white">
                                                            User
                                                        </span>
                                                    </button>
                                                </NavLink>

                                                <NavLink to='/MediaReporterSignUp'>
                                                    <button class={deactivebtn}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>

                                                        <span className="mx-2 text-white">
                                                            Midea Reporter
                                                        </span>
                                                    </button>
                                                </NavLink>
                                            </div>
                                        </div>

                                        <Formik
                                            initialValues={userdata}
                                            validationSchema={validationSchema}
                                            onSubmit={signUp}
                                        >
                                            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {

                                                const { username, email, password, confirmPassword } = values;
                                                return <>
                                                    <div class="mt-8">
                                                        <form method='POST'>
                                                            <div>
                                                                <label className="block mb-2 text-sm text-gray-200">Username</label>
                                                                <input type="text" placeholder="Username" name="username"
                                                                    value={username}
                                                                    onChange={handleChange('username')}
                                                                    onBlur={handleBlur('username')}
                                                                    className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                                                />
                                                                {
                                                                    errors.username && touched.username ?
                                                                        (<p className='text-red-500'>{errors.username}</p>) : null
                                                                }
                                                            </div>

                                                            <div>
                                                                <label className="block mb-2 mt-3 text-sm text-gray-200">Email</label>
                                                                <input type="email" placeholder="example@example.com" name="email"
                                                                    value={email}
                                                                    onChange={handleChange('email')}
                                                                    onBlur={handleBlur('email')}
                                                                    className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                                                />
                                                                {
                                                                    errors.email && touched.email ?
                                                                        (<p className='text-red-500'>{errors.email}</p>) : null
                                                                }
                                                            </div>
                                                            <div>
                                                                <label className="block mt-3 text-sm text-gray-200">Password</label>
                                                                <div className="flex flex-row">
                                                                    <input type={passwordType} placeholder="Enter your password" name='password'
                                                                        value={password}
                                                                        onChange={handleChange('password')}
                                                                        onBlur={handleBlur('password')}
                                                                        className="block w-full px-5 py-3 mt-2  border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                                                    <div className='cursor-pointer my-auto mx-2' onClick={togglePassword}>
                                                                        {passwordType === "password" ? <AiFillEye className=' text-gray-300' size={25} /> : <AiFillEyeInvisible size={25} className='text-gray-300' />}
                                                                    </div>
                                                                </div>
                                                                {
                                                                    errors.password && touched.password ?
                                                                        (<p className='text-red-500'>{errors.password}</p>) : null
                                                                }
                                                            </div>
                                                            <div>

                                                                <div>
                                                                    <label className="block mt-3 text-sm  text-gray-200">Confirm password</label>
                                                                    <div className="flex flex-row">
                                                                        <input type={passwordConfirmType} placeholder="Enter your password" name='confirmPassword'
                                                                            value={confirmPassword}
                                                                            onChange={handleChange('confirmPassword')}
                                                                            onBlur={handleBlur('confirmPassword')}
                                                                            className="block w-full px-5 py-3 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                                                        <div className='cursor-pointer my-auto mx-2' onClick={toggleConfirmPassword}>
                                                                            {passwordConfirmType === "password" ? <AiFillEye className='text-gray-300' size={25} /> : <AiFillEyeInvisible size={25} className='text-gray-300' />}
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        errors.confirmPassword && touched.confirmPassword ?
                                                                            (<p className='text-red-500'>{errors.confirmPassword}</p>) : null
                                                                    }
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={(errors) ? handleSubmit : null}
                                                                className="flex mt-5 items-center justify-between w-1/2 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                                                <span >Sign Up</span>

                                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd"
                                                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                        clip-rule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        </form>
                                                    </div>
                                                </>
                                            }}
                                        </Formik>
                                        <p class="mt-6 text-sm text-center text-white">Already have an account? <a href="/MediaReporterLogin" class="text-blue-500 focus:outline-none focus:underline hover:underline">Login here</a>... </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
            <ToastContainer autoClose={1500} />

        </div>
    )
}

export default SignUp
