import cn from 'classnames';
import React, { useState } from 'react';
import Card, { CardType } from '@/components/Card/Card';
import AutoSuggest from '@/components/Search/AutoSuggest';
import { useSearchKeywords } from '@/hooks/react-query';
import { IKeywords } from '@/utils/keywords/keywords.types';

const Search: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [selected, setSelected] = useState<IKeywords>({} as IKeywords);

    const { isError, isFetching, isLoading, data, error } =
        useSearchKeywords(searchValue);

    return (
        <div className={'pt-5'}>
            <AutoSuggest
                isFetching={isFetching}
                results={data?.data}
                setSearchValue={setSearchValue}
                setSelected={setSelected}
            />

            {selected.keyword && (
                <div
                    className={cn('flex justify-center sm:justify-start pt-10')}
                >
                    <Card
                        item={selected}
                        variant={
                            selected.isAuthorized
                                ? CardType.GREEN
                                : CardType.RED
                        }
                    />
                </div>
            )}
        </div>
    );
};
export default Search;
