import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import React, { memo, useCallback, useMemo, useState } from 'react';
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
import { IKeywords, Language } from '@/utils/keywords/keywords.types';
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
};
const Card: React.FC<Props> = ({
    item,
    lang,
    className,
    approveKeywordHandler,
}) => {
    const [cardLang, setCardLang] = useState(lang.cardLang);
    const { t } = useTranslation('');

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
                    <AiOutlineLike className={'my-auto'} />
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
                    <AiOutlineDislike className={'my-auto'} />
                </div>
            </div>
        </div>
    );
};
export default memo(Card);
