import alanBtn from '@alan-ai/alan-sdk-web';
import { useState, useEffect } from 'react'
import NewsCards from './../Component/NewsCards/NewsCards'
import wordsToNumbers from 'words-to-numbers';

const alanKey = '188cde14e1691278095e7d637632cb512e956eca572e1d8b807a3e2338fdd0dc/stage';


function News() {
    const [activeArticle, setActiveArticle] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [newsArticle, setNewsArticle] = useState([]);

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles,number }) => {
                if (command === 'newHeadlines') {
                    setNewsArticle(articles);
                    setActiveArticle(-1);
                } else if (command === 'instructions') {
                    setIsOpen(true);
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
    }, []);


    return (
        <div>
            <h1>Alan AI News Application</h1>
            <NewsCards articles={newsArticle} />
        </div>
    );
}

export default News;
