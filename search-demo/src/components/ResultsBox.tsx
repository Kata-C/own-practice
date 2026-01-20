import { useEffect } from "react";

import useSearchBox from "../hooks/useSearchBox";
import '../styles/SearchBox.css';

const ResultsBox = () => {
    const { isLoading, isSuccess, isError, results } = useSearchBox();
    useEffect(() => {
        console.log('Results: ', results);
    }, [results]);
    return (
        <div className='results-container'>
            {isLoading && <p>Loading...</p>}
            {isSuccess && results.map((result) => (
            <div key={result.id}>
                <p>{result.type}</p>
                <img width={100} height={100} src={result.image} alt={result.name} />
                <h2>{result.name}</h2>

            </div>
            ))}
            {isError && <p>Error</p>}
        </div>
    )
}

export default ResultsBox;