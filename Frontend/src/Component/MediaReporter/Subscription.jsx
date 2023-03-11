import React, { useState,useEffect } from "react";
import Navbar from "./Navbar";
import axios from 'axios';
import Plancard from "./Plancard"
import { Navigate, useNavigate } from "react-router-dom";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}




export default function Subscription() {
    const navigate = useNavigate()
    const getHomePage = async () => {
        try{
            const res = await axios.get('/Subscription');
            console.log(res.data);
            if(res.data.success===false){
                navigate('/')
            }
        }catch(err){
            console.log(err);
            navigate('/')
        }
    }

    useEffect(() => {
        getHomePage();
    }, []);

    const [isLoading, setisLoading] = useState(false);
    const [amount, setAmount] = useState("0");
    const displayRazorpay = async (amount) => {
        console.log(amount)
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
            alert("Unable to load Payment gateway. Are you online?");
            return;
        }

        const options = {
            key: "rzp_test_0MyA2Mzi9nWJvu", // Enter the Key ID generated from the Dashboard
            amount: amount,
            currency: "INR",
            name: "World News",
            description: "Proceed To Payment",
            image:
                "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX35633090.jpg",
            handler: async function (response) {
                const data = {
                    // orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                setisLoading(false);
            },

            theme: {
                color: "teal",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <>
        <Navbar />
        <div className="flex flex-col items-center bg-gray-900 p-4">
            <div className="mb-2 text-center">
                <h1 className="mb-4 text-7xl font-black text-white">Subscribe Now!!</h1>
                <p className="text-lg text-white">
                    Take your desired plan to get access to our content easily,we like to offer special license offer to our users.
                </p>
            </div>
            <div className="flex flex-col gap-8 p-10 xl:flex-row ">
                <Plancard
                amt={"2000000"}
                    displayRazorpay={displayRazorpay}
                    color="green"
                    name="basic"
                    description="enjoy with basic"
                    features={['1 Report', '2 Post', '3 Add']}
                    btnText="Base"
                />
                <Plancard
                amt={"30000000"}
                    displayRazorpay={displayRazorpay}
                    color="yellow"
                    name="med"
                    description="enjoy with med"
                    features={['1 Report', '2 Post', '3 Add']}
                    btnText="Med"
                />
                <Plancard
                amt={"40000000"}
                    displayRazorpay={displayRazorpay}
                    color="white"
                    name="pro"
                    description="enjoy with pro"
                    features={['1 Report', '2 Post', '3 Add']}
                    btnText="Pro"
                />
            </div>
        </div>
        </>
    );
}