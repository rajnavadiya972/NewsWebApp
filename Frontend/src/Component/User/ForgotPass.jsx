import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
// import Client from '../../api/Client';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Formik } from 'formik'
import * as Yup from 'yup';

const ForgotPass = () => {
    const navigate = useNavigate();
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const [userdata, setUserdata] = useState({
        email: ""
    });

    // let name, value;
    // const handleInput = (e) => {
    //     name = e.target.name;
    //     value = e.target.value;
    //     console.log(e.target.value)
    //     setUserdata({ ...userdata, [name]: value });
    // }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email!').required('Email is required!'),
    })

    const [error, setError] = useState('')

    const updateError = (error, stateUpdater) => {
        stateUpdater(error);
        setTimeout(() => {
            stateUpdater('');
        }, 2500);
    }

    const signUp = async (values, FormikActions) => {
        // e.preventDefault()
        // console.log(values);
        // console.log("Hello"+userdata.email);
        const res = await axios.post('/forgotPassword', {
            ...values
        });
        console.log(res.data);
        if (res.data.success === "false") {
            updateError(res.data.message, setError)
            toast.error(res.data.message);
            return;
        }
        // console.log(res.data.token);
        toast.success("Link send in this email")
        await sleep(1500)
        navigate("/UserLogin");
        FormikActions.resetForm();
        FormikActions.setSubmitting(false);
    }

    return (
        <div className=''>
            <div>
                <div class="bg-gray-900">
                    <div class="flex justify-center h-screen">
                        <div className="bg-cover w-full h-[screen] min-h-screen bg-[url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)]">

                            <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40 max-md:px-0">
                                <div className='max-md:hidden'>
                                    <h2 class="text-4xl font-bold text-white">Influencer</h2>

                                    <p class="max-w-xl mt-3 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus molestiae</p>
                                </div>


                                <div class="flex items-center p-5 rounded-lg  mx-auto bg-opacity-25 bg-white">
                                    <div class="w-full">
                                        <Formik
                                            initialValues={userdata}
                                            validationSchema={validationSchema}
                                            onSubmit={signUp}
                                        >
                                            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {

                                                const { email } = values;
                                                return <>
                                                    <div class="mt-8">
                                                        <form method='POST'>
                                                            <div>
                                                                <label for="email" class="block mb-2 text-sm text-gray-200">Email</label>
                                                                <input type="text" name="username" id="username" placeholder="Email"
                                                                    class="block w-full px-4 py-2 mt-2  border  rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                                                    value={email}
                                                                    onChange={handleChange('email')}
                                                                    onBlur={handleBlur('email')}
                                                                />
                                                                {
                                                                    errors.email && touched.email ?
                                                                        (<p className='text-red-500'>{errors.email}</p>) : null
                                                                }
                                                            </div>

                                                            <div class="mt-6">

                                                                <button
                                                                    class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                                                    onClick={(errors) ? handleSubmit : null}
                                                                >
                                                                    Forgot Password
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </>
                                            }}
                                        </Formik>
                                    </div>
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

export default ForgotPass