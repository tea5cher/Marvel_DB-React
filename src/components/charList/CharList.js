import { useState, useEffect } from 'react';


import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';



const CharList = (props) => {

    const [cardsData, setCardsData ] = useState([]);
    const [newItemLoading, setNewItemLoading ] = useState(false);
    const [offset, setOffset ] = useState(555);
    const [charEnded, setCharEnded ] = useState(false);
    const [idImg, setIdImg ] = useState(0);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(()=> {
        onRequest(offset, true);
     }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onListLoaded)
    }

    const onListLoaded = (newCardsData) => {
        let ended = false;
        if (newCardsData.length < 9) {
            ended = true;
        }
        setCardsData(cardsData => [...cardsData, ...newCardsData])
        setNewItemLoading(false)
        setOffset(offset=>offset + 9)
        setCharEnded(ended)
    }

    const onClickSelected = (item, items) => {
        items.map(i=> { 
            if (i.key===item.id) {
                setIdImg(idImg => item.id)
                renderItems(items)
            }
        })
    }
    const onClick = (item, items) => {
        props.onCharSelected(item.id);
        onClickSelected(item, items)
    }
    function renderItems(arr) {
        console.log(arr);
        const clazz = 'char__item'
        const clazzn = 'char__item char__item_selected '
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
        }
    
            return (
                <li 
                    className={item.id == idImg ? clazzn : clazz}
                    key={item.id}
                    onClick={() => onClick(item, items) }
                    tabIndex={0}
                    >
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
      
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(cardsData);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;


    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
            onClick={() => onRequest(offset)} 
            className="button button__main button__long"
            style={{'display': charEnded ? 'none' : 'block'}}
            disabled={newItemLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;