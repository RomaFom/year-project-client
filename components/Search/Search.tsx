import React, { useState } from 'react';
import AutoSuggest from '@/components/Search/AutoSuggest';
import { useSearchKeywords } from '@/hooks/react-query';
import { IKeywords } from '@/utils/keywords/keywords.types';
const Search: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [selected, setSelected] = useState<IKeywords>({} as IKeywords);

    const { isError, isFetching, isLoading, data, error } =
        useSearchKeywords(searchValue);

    return (
        <>
            <AutoSuggest
                isFetching={isFetching}
                results={data?.data}
                setSearchValue={setSearchValue}
                setSelected={setSelected}
            />
            {selected.keyword && (
                <>
                    <h1>Keyword {selected.keyword}</h1>
                    <h1>Meaning {selected.meaning}</h1>
                    <h1>Likes {selected.likes.length}</h1>
                    <h1>Dislikes {selected.dislikes.length}</h1>
                    <h1>IsAuth {selected.isAuthorized.toString()}</h1>
                </>
            )}
        </>
    );
};
export default Search;
