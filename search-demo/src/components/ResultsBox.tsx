import { useEffect, useContext} from "react";
import { ResultsContext }  from "../context/ResultsContext";
import '../styles/SearchBox.css';

const ResultsBox = () => {
    const { isLoading, isSuccess, isError, results } = useContext(ResultsContext);
    useEffect(() => {
        console.log('Results: ', results);
    }, [results]);
    return (
        <div className='results-container'>
            {isLoading && <p>Loading...</p>}
            {isSuccess && results && (
            <div key={results.id} className="results-info">
                
                <img className="results-item-image" src={results?.image} alt={results?.name} />
                <h2 className="results-item-name">{results.name}</h2>
                <p className="results-item-type">{results.type}</p>
                <p className="results-item-type">{results.type}</p>

            </div>
            )}
            {isError && <p>Error</p>}
        </div>
    )
}

export default ResultsBox;