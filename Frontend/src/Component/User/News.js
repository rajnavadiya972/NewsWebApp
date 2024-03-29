import alanBtn from '@alan-ai/alan-sdk-web';
import { useState, useEffect } from 'react'
import NewsCards from './../../Component/NewsCards/NewsCards'
import wordsToNumbers from 'words-to-numbers';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const alanKey = '188cde14e1691278095e7d637632cb512e956eca572e1d8b807a3e2338fdd0dc/stage';


function News() {
    const navigate=useNavigate()
    const [activeArticle, setActiveArticle] = useState(0);
    const [newsArticle, setNewsArticle] = useState([]);
    const getHomePage = async () => {
        try{
            const res = await axios.get('/ApiNewsHome');
            console.log(res.data);
            if(res.data.success===false){
                navigate('/UserLogin')
            }
        }catch(err){
            console.log(err);
            navigate('/UserLogin')
        }
    }
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                    setNewsArticle(articles);
                    setActiveArticle(-1);
                    // } else if (command === 'instructions') {
                    //     setIsOpen(true);
                } else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if (parsedNumber > articles.length) {
                        alanBtn().playText('Please try that again...');
                    } else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');
                    } else {
                        alanBtn().playText('Please try that again...');
                    }
                }
            }
        });
        getHomePage()
    }, []);


    return (
        <div className='text-gray-300 flex'>
            <Navbar />
            <div className='mx-auto'>
                <h1 className='text-blue-700 flex justify-center font-bold text-xl mt-2'>World News</h1>
                <NewsCards articles={newsArticle} activeArticle={activeArticle} />
            </div>
        </div>
    );
}

export default News;
