import cn from 'classnames';
import React, { useState } from 'react';
import Card, { CardType } from '@/components/Card/Card';
import Grid from '@/components/Grid';
import AutoSuggest from '@/components/Search/AutoSuggest';
import { useSearchKeywords } from '@/hooks/react-query';
import { IKeywords, Language } from '@/utils/keywords/keywords.types';

export interface ILanguageDetect {
    inputLang: Language;
    cardLang: Language;
}

const Search: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [selected, setSelected] = useState<IKeywords>({} as IKeywords);
    const [lang, setLang] = useState<ILanguageDetect>({
        inputLang: Language.ENGLISH,
        cardLang: Language.ENGLISH,
    });

    const { isError, isFetching, isLoading, data, error } =
        useSearchKeywords(searchValue);

    return (
        <div className={'pt-5'}>
            <AutoSuggest
                isFetching={isFetching}
                lang={lang}
                results={data?.data}
                setLang={setLang}
                setSearchValue={setSearchValue}
                setSelected={setSelected}
            />

            {selected._id && (
                // <div
                //     className={cn('flex justify-center sm:justify-start pt-10')}
                // >
                <Grid>
                    <Card
                        className={cn('w-full min-h-[200px]')}
                        item={selected}
                        lang={lang}
                        variant={
                            selected[lang.cardLang].isAuthorized
                                ? CardType.GREEN
                                : CardType.RED
                        }
                    />
                </Grid>
                // </div>
            )}
        </div>
    );
};
export default Search;
