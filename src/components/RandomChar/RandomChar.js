import './randomChar.scss'
import '../styles/buttons.scss'
import thor from '../resources/thor.jpeg'
import hammer from '../resources/mjolnir.png'


const RandomChar = () => {
    return (
        <div className='randomchar'>
            <div className="randomchar__block">
                <img className='randomchar__block-img' src={thor} alt="Thor" />
                <div className='randomchar__info'>
                    <p className='randomchar__info-title'>Thor</p>
                    <p className='randomchar__info-descr'>As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...</p>
                    
                    <div className="randomchar__btns">
                        <a href="#" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href="#" className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                    
                </div>
                
            </div>
            
            <div className="randomchar__static">
                <p className="randomchar__static-descr">
                    Random character for today! <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__static-choose">
                    Or choose another one
                </p>
                <a href="#" className="button button__main">
                            <div className="inner">homepage</div>
                </a>

                <img src={hammer} alt="hammer" className='randomchar__static-img' />
                
            </div>
        </div>     
    )
}


export default RandomChar