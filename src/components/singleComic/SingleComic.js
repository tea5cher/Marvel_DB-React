import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';

import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService'

const SingleComic = () => {

    const {loading, error, getComics} = useMarvelService();

    const [comic, setComic] = useState([]);

    useEffect(()=>{
        onRequest();
    }, [])

    const onRequest = () => {
        const item = getComics(275)
            .then(onComicLoaded)
    }

    const onComicLoaded = (item) =>{
        setComic(comic => item);
    }

    const renderItem = (item) => {
        return (
            <>
                <img src={item.thumbnail} alt={item.title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{item.title}</h2>
                    <p className="single-comic__descr">{item.description}</p>
                    <p className="single-comic__descr">{item.pageCount}</p>
                    <p className="single-comic__descr">{item.language}</p>
                    <div className="single-comic__price">{item.price}</div>
                </div>
            </>
            
        )
    }

    const item = renderItem(comic)



    return (
        <div className="single-comic">
            {item}
            <a href="#" className="single-comic__back">Back to all</a>
        </div>
    )
}

export default SingleComic;