import { useState, useRef, useEffect } from 'react';

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
  const [results, setResults] = useState<ISearchResult | null>(null);
  const idLastEvent = useRef<number>(0);

  useEffect(() => {
    if(searchStatus === ESearchStatus.ERROR) {
      const timeout = setTimeout(() => {
        setSearchStatus(ESearchStatus.IDLE);
      }, 2500);
      return () => clearTimeout(timeout);
    }

  }, [searchStatus]);

  const getAPI = async (query: string) => {
    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return {
        error: true
      }
    }
  }

  const search = async (query: string) => {
    if(searchStatus === ESearchStatus.LOADING) return;
    if(!query || query.trim() === '') {
      setSearchStatus(ESearchStatus.ERROR);
      return;
    }
    setSearchStatus(ESearchStatus.LOADING);
    const current = ++idLastEvent.current;

    setTimeout(async () => {
      if(current !== idLastEvent.current) return;

      const data = await getAPI(query);
      console.log('Data: ', data);
      if(data.error) {
        console.log('Entra error: ', data.error);
        setSearchStatus(ESearchStatus.ERROR);
        setResults(null);
        return;
      }
      setResults({
        id: data.id,
        name: data.name,
        type: data.types[0].type.name,
        image: data.sprites.other['official-artwork'].front_default,
      });
      setSearchStatus(ESearchStatus.SUCCESS);
    }, 1500);

  }
  
  return {
    isLoading: searchStatus === ESearchStatus.LOADING,
    isSuccess: searchStatus === ESearchStatus.SUCCESS,
    isError: searchStatus === ESearchStatus.ERROR,
    results,
    search,
  }
}

export default useSearchBox;