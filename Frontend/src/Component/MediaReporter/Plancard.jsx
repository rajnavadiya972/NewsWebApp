import React, { useEffect } from 'react'

const Plancard = ({ displayRazorpay,
    amt,
    name,
    description,
    price,
    features,
    color }) => {


    return (
        <div style={{ backgroundColor: color }} className="flex min-h-[428px] w-[320px] flex-col rounded-3xl p-8">
            <h2 className="mb-5 text-xl font-medium">{name}</h2>
            <div className="mb-5 flex items-end text-6xl font-black">{price ? (<><div>${price}</div></>) : ('Free')}</div>
            <p className="mb-5">{description}</p>
            <ul className="mb-10 flex flex-col gap-y-2">
                {features.map((feature) => (
                    <li className="flex items-center">
                        <svg
                            xmlns="https://www.w3.org/2000/svg"
                            className="mr-3 h-7 w-7"
                            viewBox="0 0 20 20"
                            fill="currentcolor"
                        >
                            <path
                                fillRule="evenodd"
                                d=""
                                clipRule="evenodd"
                            />
                        </svg>
                        {feature}
                    </li>
                ))}
            </ul>
            <button onClick={()=>{displayRazorpay(amt)}} className="mt-auto rounded-xl. bg-black py-3 px-6 text-lg font-medium text-white">Start Trial</button>
        </div>
    )
}

export default Plancard