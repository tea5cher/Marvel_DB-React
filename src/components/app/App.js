import Header from '../header/AppHeader'
import RandomChar from '../RandomChar/RandomChar'
import CharList from '../CharList/CharList'
import CharInfo from '../CharInfo/CharInfo'


import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header/>
        <main>
          <RandomChar/>
          <div className="char__content">
                    <CharList/>
                    <CharInfo/>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
