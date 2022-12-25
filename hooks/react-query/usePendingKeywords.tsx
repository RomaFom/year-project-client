import { useQuery } from '@tanstack/react-query';
import { IKeyword, IKeywords, Language } from '@/utils/keywords/keywords.types';
import { useEffect, useState } from 'react';
import { IAddKeywordRequest, IAddKeywordResponse } from '@/utils/api';

interface IHook {
    isLoading: boolean;
    isError: boolean;
    error: any;
    data: Array<IKeywords>;
    approveKeyword: (kwid: string, langId: Language) => unknown;
    isFetching: boolean;
}

export const usePendingKeywords = (lang: string): IHook => {
    // create modifiable state
    const [data, setData] = useState<IHook['data']>([])
    const { isLoading, isError, error, data: responseData, isFetching } = useQuery({
        queryKey: ['pending-keywords', lang],
        queryFn: () =>
            fetch(`api/keywords/pending-keywords?lang=${lang}`).then(res =>
                res.json()
            ),
        enabled: !!lang,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        onSuccess: (res) => {
            console.log({res})
            setData(res.data)
        },
    })
    // create keyword methods
    const approveKeyword = async (kwid: string, lang: Language) => {
        const langId = data.find(kw => kw._id === kwid)?.[lang]?._id
        console.log({kwid, lang, langId})
        // validate keyword id
        if (!langId) return;
        console.log('after validation ', {kwid, lang, langId})
        const body: IAddKeywordRequest = {id: kwid, langId}
        // send request
        fetch('/api/keywords/approve-keyword', {method: 'POST', body: JSON.stringify(body)})
            .then(res => res.json())
            .then((data: IAddKeywordResponse) => {
                // handle errors
                if (data.status >= 400 || !data.data) {
                    alert(data.error?.message ?? 'Something went wrong...')
                    return;
                }
                // filter approved keyword from state
                // TODO: fix bug which makes all cards disappear for a moment, until you press anything
                setData(d => d.map(kw => ({...kw, [lang]: {...kw[lang], isAuthorized: true}})))
            });
    }
    // on fetch success - update data state
    // useEffect(() => {
    //     setData(responseData)
    // }, [responseData])

    return {
        isLoading,
        isError,
        error,
        data,
        isFetching,
        approveKeyword
    };
};
