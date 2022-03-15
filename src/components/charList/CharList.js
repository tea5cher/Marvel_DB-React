import { Component } from 'react';


import Spinner from '../spinner.js/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';



class CharList extends Component {

    constructor(props) {
        super(props);
      }

    state = {
        cardsData: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 555,
        charEnded: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest()   
    }


    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
        .then(this.onListLoaded)
        .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        })
    }

    onListLoaded = (newCardsData) => {

        let ended = false;
        if (newCardsData.length < 9) {
            ended = true;
        }


        this.setState(({offset, cardsData, charEnded}) => ({
            cardsData: [...cardsData, ...newCardsData],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended, 
        }))
    }

    onListAdd = (cardsData) => {
        let arr = [...this.state.cardsData];
        arr = [...arr, ...cardsData]
        console.log(arr);
        this.setState({
            cardsData: arr,
            loading: false,
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    onLoadMore = () => {
        this.marvelService.getAllCharacters()
        .then(this.onListAdd)
        .catch(this.onError)
    }

    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}
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

    render() {

        const {cardsData, loading, error, offset, newItemLoading, charEnded} = this.state

        const items = this.renderItems(cardsData);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        // this.onScroll();

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                onClick={() => this.onRequest(offset)} 
                className="button button__main button__long"
                style={{'display': charEnded ? 'none' : 'block'}}
                disabled={newItemLoading}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;