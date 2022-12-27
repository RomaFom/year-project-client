import { useQuery } from '@tanstack/react-query';
import { IKeywords } from '@/utils/keywords/keywords.types';

interface IHook {
    isLoading: boolean;
    isError: boolean;
    error: any;
    data: Array<IKeywords> | undefined;
    isFetching: boolean;
    refetch: () => void;
}

export const useGetPendingKeywords = (lang: string): IHook => {
    // create modifiable state
    const { isLoading, isError, error, data, isFetching, refetch } = useQuery<
        IHook['data']
    >({
        queryKey: ['pending-keywords', lang],
        queryFn: () =>
            fetch(`/api/keywords/pending-keywords?lang=${lang}`)
                .then(res => res.json())
                .then(res => res.data),
        enabled: !!lang,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });
    return { isLoading, isError, error, data, isFetching, refetch };
};
