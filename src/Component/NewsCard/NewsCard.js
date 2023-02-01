import React, { useEffect, useState, createRef } from 'react'
import newsImg from './news.jpg'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material'
import useStyles from './Styles';

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, activeArticle, i }) => {

    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

    useEffect(() => {
        window.scroll(0, 0);
        setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
    }, []);

    useEffect(() => {
        if (i === activeArticle && elRefs[activeArticle]) {
            scrollToRef(elRefs[activeArticle]);
        }
    }, [i, activeArticle, elRefs]);


    return (
        <Card ref={elRefs[i]} className={activeArticle === i ? classes.activeCard : classes.card}>
            <CardActionArea href={url} target='_blank'>
                <CardMedia className='h-62' image={urlToImage || newsImg} />
                <div>
                    <Typography variant='body2' component={'h2'}>{(new Date(publishedAt)).toDateString}</Typography>
                    <Typography variant='body2' component={'h2'}>{source.name}</Typography>
                </div>
                <Typography gutterBottom variant='h5'>{title}</Typography>
                <CardContent>
                    <Typography variant='body2' component={'p'}>{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size='small' color='primary'>Learn More</Button>
                <Typography variant='h5'>{i + 1}</Typography>
            </CardActions>
        </Card>
    )
}

export default NewsCard