export type ISearchResult = {
    id: number;
    name: string,
    type: string,
    image: string,
}

export const ESearchStatus = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
} as const;
