
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import CharSearchForm from "../charSearchForm/CharSearchForm";

import decoration from '../../resources/img/vision.png';


import { useState } from 'react'

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id)
    }

    return (
        <>
        <ErrorBoundary>
            <RandomChar/>
        </ErrorBoundary>
            <div className="char__content">
                <CharList
                onCharSelected = {onCharSelected}
                />
                <div>
                    <CharInfo
                        charId = {selectedChar}    
                    />
                    <CharSearchForm/>
                </div>
               
            </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}


export default MainPage