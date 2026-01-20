import { createContext, useEffect } from "react";
import useSearchBox from "../hooks/useSearchBox";
import type { ISearchResult } from "../types";

export const ResultsContext = createContext<{
    results: ISearchResult | null;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    search: (query: string) => void;
}>({
    results: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    search: () => {},
});

export const ResultsProvider = ({children}: {children: React.ReactNode}) => {
    const { results, isLoading, isSuccess, isError, search } = useSearchBox();

    useEffect(() => {
        console.log('results en el context: ', results);
    }, [results]);

    return (
        <ResultsContext value={{
            results,
            isLoading,
            isSuccess,
            isError,
            search,
        }}>
            {children}
        </ResultsContext>
    )

}
