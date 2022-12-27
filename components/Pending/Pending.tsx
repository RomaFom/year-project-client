import React, { useCallback, useState } from 'react';
import Card from '@/components/Card/Card';
import Grid from '@/components/Grid';
import { ILanguageDetect } from '@/components/Search/Search';
import { useGetPendingKeywords } from '@/hooks/react-query/usePendingKeywords';
// types
import { Language } from '@/utils/keywords/keywords.types';
import { basicError } from '@/utils/notifications';
// components

const Pending: React.FC = () => {
    const [lang, setLang] = useState<ILanguageDetect>({
        inputLang: Language.ENGLISH,
        cardLang: Language.ENGLISH,
    });

    const { data, refetch } = useGetPendingKeywords(lang.cardLang);

    const approveKeywordHandler = useCallback(
        async (id: string, langId: string): Promise<void> => {
            try {
                const res = await fetch('/api/keywords/approve-keyword', {
                    method: 'POST',
                    body: JSON.stringify({
                        id,
                        langId,
                    }),
                });
                if (res.status >= 400) {
                    return basicError('Something went wrong');
                }
                refetch();
            } catch (err) {
                return basicError('Something went wrong');
            }
        },
        [data, refetch],
    );

    return (
        <div>
            <select
                className="select-language"
                onChange={e => {
                    setLang({
                        inputLang: e.target.value as Language,
                        cardLang: e.target.value as Language,
                    });
                }}
            >
                {Object.values(Language).map(l => (
                    <option key={l} value={l}>
                        {l}
                    </option>
                ))}
            </select>

            <Grid>
                {data?.map(
                    keyword =>
                        !keyword[lang.cardLang].isAuthorized &&
                        keyword[lang.cardLang].keyword && (
                            <Card
                                approveKeywordHandler={approveKeywordHandler}
                                item={keyword}
                                key={keyword[lang.cardLang]._id}
                                lang={lang}
                            />
                        ),
                )}
            </Grid>
        </div>
    );
};
export default Pending;
