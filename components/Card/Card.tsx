import cn from 'classnames';
import React, { memo } from 'react';
import {
    AiOutlineDislike,
    AiOutlineInfoCircle,
    AiOutlineLike,
} from 'react-icons/ai';

import { BsPatchCheck } from 'react-icons/bs';
import Button from '@/components/Button/Button';
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
    variant: CardType;
    lang: ILanguageDetect;
    className?: string;
    approveKeywordHandler: (id: string, langId: string) => void;
};
const Card: React.FC<Props> = ({
    item,
    variant,
    lang,
    className,
    approveKeywordHandler,
}) => (
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
            variant,
        )}
        style={{
            direction: lang.cardLang === Language.ENGLISH ? 'ltr' : 'rtl',
        }}
    >
        <Tooltip
            className={cn('pb-3')}
            text={
                item[lang.cardLang].isAuthorized
                    ? 'Authorized'
                    : 'Not Authorized'
            }
        >
            {item[lang.cardLang].isAuthorized ? (
                <BsPatchCheck size={25} />
            ) : (
                <AiOutlineInfoCircle size={25} />
            )}
        </Tooltip>

        <div
            className={cn('mx-auto border-2 rounded-lg px-3 py-1 border-black')}
        >
            {item[lang.cardLang].keyword}
        </div>
        <div>
            <div className={'text-start pt-2'}>{item[lang.cardLang].short}</div>
            <div className={'text-start pt-2'}>{item[lang.cardLang].long}</div>
        </div>
        <div className={'flex justify-between mt-auto'}>
            <div className={'flex gap-2'}>
                {item[lang.cardLang].likes.length}
                <AiOutlineLike className={'my-auto'} />
            </div>

            <Button
                buttonStyle={'secondary'}
                onClick={() => {
                    approveKeywordHandler(item._id, item[lang.cardLang]._id);
                }}
                showLoader={false}
                type={'button'}
            >
                Approve
            </Button>

            <div className={'flex gap-2'}>
                {item[lang.cardLang].dislikes.length}
                <AiOutlineDislike className={'my-auto'} />
            </div>
        </div>
    </div>
);
export default memo(Card);
