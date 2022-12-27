import { useQuery } from '@tanstack/react-query';
import { IKeywords } from '@/utils/keywords/keywords.types';

interface IHook {
    isLoading: boolean;
    isError: boolean;
    error: any;
    data: {
        data: Array<IKeywords>;
        status: number;
    };
    isFetching: boolean;
    refetch: () => void;
}

export const useSearchKeywords = (word: string): IHook => {
    const { isLoading, isError, error, data, isFetching, refetch } = useQuery({
        queryKey: ['keyword', word],
        queryFn: () =>
            fetch(`/api/keywords/search?keyword=${word}`).then(res =>
                res.json(),
            ),
        enabled: !!word,
        keepPreviousData: true,
    });

    return {
        isLoading,
        isError,
        error,
        data,
        isFetching,
        refetch,
    };
};
