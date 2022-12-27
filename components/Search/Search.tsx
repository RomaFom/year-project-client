import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import Card from '@/components/Card/Card';
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

    const { isFetching, data, refetch } = useSearchKeywords(searchValue);

    useEffect(() => {
        if (data?.data?.length && selected?._id) {
            data.data.forEach(item => {
                if (item._id === selected._id) {
                    setSelected(item);
                }
            });
        }
    }, [data]);

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
                <Grid>
                    <Card
                        className={cn('w-full min-h-[200px]')}
                        item={selected}
                        lang={lang}
                        refetch={refetch}
                    />
                </Grid>
            )}
        </div>
    );
};
export default Search;
