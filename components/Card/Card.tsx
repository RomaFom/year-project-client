import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
    AiOutlineDislike,
    AiOutlineInfoCircle,
    AiOutlineLike,
} from 'react-icons/ai';

import { BsPatchCheck } from 'react-icons/bs';
import Button from '@/components/Button/Button';
import { LangDropDown } from '@/components/LanguageSwitcher';
import CardDropDownFlags from '@/components/LanguageSwitcher/CardDropDownFlags';
import { ILanguageDetect } from '@/components/Search/Search';
import Tooltip from '@/components/Tooltip/Tooltip';
import { useUser } from '@/providers/UserProvider';
import { IKeywordResponse } from '@/utils/api';
import { IKeywords, Language } from '@/utils/keywords/keywords.types';
import { basicError, basicSucsess } from '@/utils/notifications';
import styles from './Card.module.scss';

export enum CardType {
    GREEN = 'from-green-light via-cyan-light to-green-light',
    RED = 'from-red-300 via-red-200 to-red-300',
}

type Props = {
    item: IKeywords;
    // variant: CardType;
    lang: ILanguageDetect;
    className?: string;
    approveKeywordHandler?: (id: string, langId: string) => void;
    refetch?: () => void;
};
const Card: React.FC<Props> = ({
    item,
    lang,
    className,
    approveKeywordHandler,
    refetch,
}) => {
    const [cardLang, setCardLang] = useState(lang.inputLang);
    const { t } = useTranslation('');
    const { user } = useUser();

    useEffect(() => {
        setCardLang(lang.cardLang);
    }, [lang.cardLang, item]);

    const handleChangeCardLang = useCallback((newLang: string) => {
        setCardLang(newLang as Language);
    }, []);

    const availableLangs = useMemo(
        () =>
            Object.keys(item).filter(key => {
                if (item[key as Language].keyword) {
                    return key;
                }
            }),
        [item],
    );

    const canApprove = useMemo(
        () => approveKeywordHandler && !item[cardLang].isAuthorized,
        [item, approveKeywordHandler, cardLang],
    );

    const handleSubmitRate = useCallback(
        async (action: 'like' | 'dislike') => {
            try {
                if (!user?.token) {
                    basicError('You need to be logged in to rate keywords');
                    return;
                }
                const res: IKeywordResponse = await fetch(
                    `/api/keywords/${action}`,
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            id: item._id,
                            langId: item[lang.cardLang]._id,
                        }),
                    },
                );
                if (res.status >= 400) {
                    basicError('Something went wrong');
                    return;
                }
                basicSucsess('Submitted');
                refetch && refetch();
            } catch (e) {
                basicError('Error');
                console.error(e);
            }
        },
        [item, refetch, user],
    );

    return (
        <div
            className={cn(
                styles.card,
                className,
                'm-2 p-5 ',
                'break-words',
                'rounded-2xl',
                'flex flex-col',
                'text-light-oxford-blue text-xl',
                'bg-gradient-to-r',
                'min-w-[280px] max-w-[300px]',
                item[cardLang].isAuthorized ? CardType.GREEN : CardType.RED,
            )}
            style={{
                direction: cardLang === Language.ENGLISH ? 'ltr' : 'rtl',
            }}
        >
            <div className={'flex place-content-between'}>
                <Tooltip
                    className={cn('pb-3')}
                    text={
                        item[cardLang].isAuthorized
                            ? t('tooltip.authorized')
                            : t('tooltip.unauthorized')
                    }
                >
                    {item[cardLang].isAuthorized ? (
                        <BsPatchCheck size={25} />
                    ) : (
                        <AiOutlineInfoCircle size={25} />
                    )}
                </Tooltip>
                <div>
                    <LangDropDown selected={cardLang}>
                        <CardDropDownFlags
                            cb={handleChangeCardLang}
                            options={availableLangs}
                            selected={cardLang}
                        />
                    </LangDropDown>
                </div>
            </div>

            <div
                className={cn(
                    'mx-auto border-2 rounded-lg px-3 py-1 border-black',
                )}
            >
                {item[cardLang].keyword}
            </div>
            <div>
                <div className={'text-start pt-2'}>{item[cardLang].short}</div>
                <div className={'text-start pt-2'}>{item[cardLang].long}</div>
            </div>

            <div className={'flex justify-between mt-auto'}>
                <div className={'flex gap-2'}>
                    {item[cardLang].likes.length}
                    <AiOutlineLike
                        className={
                            'my-auto cursor-pointer hover:scale-125 transform transition-all'
                        }
                        onClick={() => handleSubmitRate('like')}
                    />
                </div>

                {canApprove && (
                    <Button
                        buttonStyle={'secondary'}
                        onClick={() => {
                            approveKeywordHandler?.(
                                item._id,
                                item[cardLang]._id,
                            );
                        }}
                        showLoader={false}
                        type={'button'}
                    >
                        Approve
                    </Button>
                )}

                <div className={'flex gap-2'}>
                    {item[cardLang].dislikes.length}
                    <AiOutlineDislike
                        className={
                            'my-auto cursor-pointer hover:scale-125 transform transition-all'
                        }
                        onClick={() => handleSubmitRate('dislike')}
                    />
                </div>
            </div>
        </div>
    );
};
export default memo(Card);
