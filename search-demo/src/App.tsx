import './App.css'
import  SearchBox from './components/SearchBox'
import  ResultsBox from './components/ResultsBox'

function App() {

  return (
    <div className='app-container'>
      <h1>Poke Search Demo</h1>
      <br />
        <SearchBox />
        <ResultsBox />
    </div>
  )
}

export default App
