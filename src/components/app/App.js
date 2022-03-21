import { useState } from 'react'

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import Spinner from "../spinner/Spinner";
import ComicsList from '../comicsList/ComicsList';
import SingleComic from '../singleComic/SingleComic';
import AppBanner from '../appBanner/AppBanner'

import decoration from '../../resources/img/vision.png';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const App = () => {
    // state = {
    //     selectedChar: null,
    // }

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id)
    }

    
    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                   
                        <CharList
                        onCharSelected = {onCharSelected}
                        />
                        <CharInfo
                        charId = {selectedChar}
                        />
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/> */}
                <AppBanner/>
                {/* <ComicsList/> */}
                <SingleComic/>
            </main>
        </div>
    )
}

export default App;