import './App.css'
import  SearchBox from './components/SearchBox'
import  ResultsBox from './components/ResultsBox'
import { ResultsProvider } from './context/ResultsContext';

function App() {

  return (
    <div className='app-container'>
      <h1>Poke Search Demo</h1>
      <br />
      <ResultsProvider>
        <SearchBox />
        <ResultsBox />
      </ResultsProvider>
    </div>
  )
}

export default App
