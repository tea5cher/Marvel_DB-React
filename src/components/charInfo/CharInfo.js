import { Component } from 'react'

import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner.js/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import thor from '../../resources/img/thor.jpeg'

class CharInfo extends Component {
    constructor(props){
        super(props);      
    }
    state = {
        char: null,
        loading: false,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.charId !== this.props.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props;

        if (!charId) {
            return
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
        
        this.foo.bar = 0;
    }

    onCharLoaded = (char) => {
        this.setState({
            char: char,
            loading: false,
            error: false,
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
        })
    }



    render() {
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
               {skeleton}
               {errorMessage}
               {spinner}
               {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    console.log(comics);
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }
    return (
        <>
         <div className="char__basics">
            <img style={imgStyle} src={thumbnail} alt={name}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
           {description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {
                (comics.length > 0 ? null : 'There is no comics for this character')
            }
            {

                comics.map((item,i)=>{
                    if (item[i] == null) {
                        <li key={i} className="char__comics-item">
                            No comicks
                        </li>
                    }
                    if (i>9) {
                        return
                    }

                    
                    
                    return (
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    )
                })
            }
        </ul>
        </>
    )
}

export default CharInfo;