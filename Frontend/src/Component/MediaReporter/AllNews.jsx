import react, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import newsImg from '../NewsImage/background-login.jpg'
import { Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material'
import useStyles from '../NewsCard/Styles';
import Navbar from './Navbar'

const AllNews = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const getMediaReporter = async () => {
        try {
            const res = await axios.get('/AllNews');
            console.log(res.data);
            setData(res.data.data);
        } catch (err) {
            navigate('/')
            console.log(err);
            setData(err)
        }
    }

    useEffect(() => {
        getMediaReporter();
    }, []);


    const classes = useStyles();

    return (

        <div>
            <Navbar />
            <div className='text-white grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 ml-14 max-md:ml-0'>
                {
                    data.length === 0 ? <h1 className='text-center text-white'>No news available</h1> :

                        data.map((article, i) => (
                            <div className='max-h-screen max-sm:h-fit border border-gray-400 rounded-b-lg justify-center m-2 overflow-y-scroll scrollbar-thin'>
                                <img src={(article.image != null ? article.image : newsImg)} alt="NEWS" className='h-2/5 w-full' />
                                <div className='text-xl mx-2 my-1 text-gray-100'>
                                    {article.title}
                                </div>
                                <div className='flex justify-between my-2'>
                                    <div className='text-sm italic mx-2 text-blue-300'>
                                        {article.catagory}
                                    </div>
                                    <div className='text-gray-400 text-sm mx-2'>
                                        {article.date}
                                    </div>
                                </div>
                                <div className='mx-2 my-1 text-gray-200'>
                                    {article.description}
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default AllNews;