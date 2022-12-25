import React, { useState } from 'react';
import { usePendingKeywords } from '@/hooks/react-query/usePendingKeywords';
// types
import { Language } from '@/utils/keywords/keywords.types';
// components
import PendingCard from '@/components/Card/PendingCard';
import Grid from '../Grid';

/**
 * Only admins can access this page component.
 */
const Pending: React.FC = () => {
    // states
    const [lang, setLang] = useState<Language>(Language.ENGLISH);
    const { data, approveKeyword } = usePendingKeywords(lang);

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
                            approveKeywordHandler={approveKeyword}
                            lang={lang}
                        />)
                }
            </Grid>
        </div>
    );
};
export default Pending;