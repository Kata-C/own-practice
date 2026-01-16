import { useState, useRef } from 'react';

const ESearchStatus = {
  "IDLE": 'idle',
  "LOADING": 'loading',
  "SUCCESS": 'success',
  "ERROR": 'error',
} as const;

type ISearchResult = {
  id: number;
  name: string,
  type: string,
  image: string,
}

type ESearchStatus = (typeof ESearchStatus)[keyof typeof ESearchStatus];

const useSearchBox = () => {
  const [searchStatus, setSearchStatus] = useState<ESearchStatus>(ESearchStatus.IDLE);
  const [results, setResults] = useState<ISearchResult[]>([]);
  const idLastEvent = useRef<number>(0);

  const getAPI = async (query: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
    .catch(() => {
        return {
            results: [],
            error: true
        }
    })
    const data = await response.json();
    return data;
  }

  const search = async (query: string) => {
    if(searchStatus === ESearchStatus.LOADING || !query || query.trim() === '') return;
    setSearchStatus(ESearchStatus.LOADING);
    const current = idLastEvent.current++;

    setTimeout(async () => {
      if(current !== idLastEvent.current) return;
      const data = await getAPI(query);
      if(data.error) {
        setSearchStatus(ESearchStatus.ERROR);
        setResults([]);
        return;
      }
      if (!data.id) {
        setSearchStatus(ESearchStatus.ERROR);
        setResults([]);
        return;
      }
      setResults([{
        id: data.id,
        name: data.name,
        type: data.types[0].type.name,
        image: data.sprites.other['official-artwork'].front_default,
      }]);
      setSearchStatus(ESearchStatus.SUCCESS);
    }, 1500);

  }
  
  return {
    isLoading: searchStatus === ESearchStatus.LOADING,
    isSuccess: searchStatus === ESearchStatus.SUCCESS,
    isError: searchStatus === ESearchStatus.ERROR,
    results
  }
}

export default useSearchBox;