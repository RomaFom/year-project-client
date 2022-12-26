import React, { useState } from 'react';
import { useGetPendingKeywords } from '@/hooks/react-query/usePendingKeywords';
// types
import { Language } from '@/utils/keywords/keywords.types';
import { IApproveKeywordRequest, IApproveKeywordResponse } from '@/utils/api';
// components
import PendingCard from '@/components/Card/PendingCard';
import Grid from '../Grid';

/**
 * Only admins can access this page component.
 */
const Pending: React.FC = () => {
    // states
    const [lang, setLang] = useState<Language>(Language.ENGLISH);
    const { data, refetch } = useGetPendingKeywords(lang);
    // handlers
    const approveKeywordHandler = async (kwid: string, lang: Language) => {
        // -- approve keywords
        const langId = data?.find(kw => kw._id === kwid)?.[lang]?._id
        // validate keyword id
        if (!langId) return;
        const body: IApproveKeywordRequest = {id: kwid, langId}
        // send request
        fetch('/api/keywords/approve-keyword', {method: 'POST', body: JSON.stringify(body)})
            .then(res => res.json())
            .then((data: IApproveKeywordResponse) => {
                // -- error handling
                if (data.status >= 400 || !data.data)
                    return alert(data.error?.message ?? 'Something went wrong...')
                refetch()
            });
    }

    return (
        <div>
            {/* language select */}
            <select className='select-language'>
                {Object.values(Language).map(l => 
                    <option defaultValue={l === lang ? 'true' : 'false'} key={l} onClick={() => setLang(l)}>{l}</option>)}
            </select>
            {/* cards grid */}
            <Grid>
                {
                    data?.map(kw => 
                        <PendingCard
                            key={kw._id}
                            item={kw}
                            approveKeywordHandler={approveKeywordHandler}
                            lang={lang}
                        />)
                }
            </Grid>
        </div>
    );
};
export default Pending;