import React from 'react'
import { Grid, Grow } from '@mui/material'
import NewsCard from './../NewsCard/NewsCard'

const infoCards = [
    { color: '#3B82F7', title: 'Latest News', text: 'Give me the latest news' },
    { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
    { color: '#4527a5', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
    { color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
];

const NewsCards = ({ articles ,activeArticle}) => {

    if (!articles.length) {
        return (
            <div className='mx-auto'>
                <div className='w-full px-5 text-gray-300'>
                    {infoCards.map((infoCard) => (
                        <div className='flex flex-row items-center my-3'>
                            <div className='flex flex-row justify-between items-center w-full p-5 rounded-xl max-md:flex-col' style={{ backgroundColor: infoCard.color }}>
                                <div className='justify-center items-center m-2'>{infoCard.title}</div>
                                {infoCard.info ? (<h6 className='m-2'><strong>{infoCard.title.split(' ')[2]}</strong>: <br />{infoCard.info}</h6>) : null}
                                <h6 className='m-2'>Try saying: <br /> <i>{infoCard.text}</i></h6>
                            </div>
                        </div> 
                    ))}
                </div>
            </div>
        )
    }
    return (
        <Grow in>
            <Grid className='w-full px-1/20' container alignItems={'stretch'} spacing={3}>
                {articles.map((article, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
                        <NewsCard article={article} i={i} activeArticle={activeArticle} />
                    </Grid>
                ))}
            </Grid>
        </Grow>
    )
}

export default NewsCards