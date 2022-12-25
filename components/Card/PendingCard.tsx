import React, { memo } from 'react';
// types
import { IKeywords, Language } from '@/utils/keywords/keywords.types';
// styles
import cn from 'classnames';
import styles from './Card.module.scss';
// components
import Tooltip from '@/components/Tooltip/Tooltip';
import { BsPatchCheck } from 'react-icons/bs';
import {
    AiOutlineDislike,
    AiOutlineInfoCircle,
    AiOutlineLike,
} from 'react-icons/ai';

type Props = {
    item: IKeywords;
    lang: Language;
    approveKeywordHandler: (kwid: string, langId: Language) => unknown
};
const PendingCard: React.FC<Props> = ({ item, lang, approveKeywordHandler }) => {

    // handlers
    const onApproveHandler = () => {
        approveKeywordHandler(item._id, lang)
    }

    // -- if authorized language, nothing to show
    if (item[lang].isAuthorized) return <></>
    // -- language is unauthorized at the moment, display card
    else return (
        <div className={cn(
                styles.card,
                'm-2 p-5 ',
                'break-words',
                'rounded-2xl',
                'flex flex-col',
                'text-light-oxford-blue text-xl',
                'bg-gradient-to-r',
                'from-red-300 via-red-200 to-red-300'
            )}
            style={{direction: lang === Language.ENGLISH ? 'ltr' : 'rtl'}}>

        <button onClick={onApproveHandler}>Approve</button>

            <Tooltip
                className={cn('pb-3')}
                text={
                    item[lang].isAuthorized
                        ? 'Authorized'
                        : 'Not Authorized'
                }
            >
                {item[lang].isAuthorized ? (
                    <BsPatchCheck size={25} />
                ) : (
                    <AiOutlineInfoCircle size={25} />
                )}
            </Tooltip>

            <div
                className={cn('mx-auto border-2 rounded-lg px-3 py-1 border-black')}
            >
                {item[lang].keyword}
            </div>
            <div>
                <div className={'text-start pt-2'}>{item[lang].short}</div>
                <div className={'text-start pt-2'}>{item[lang].long}</div>
            </div>
            <div className={'flex justify-between mt-auto'}>
                <div className={'flex gap-2'}>
                    {item[lang].likes.length}
                    <AiOutlineLike className={'my-auto'} />
                </div>

                <div className={'flex gap-2'}>
                    {item[lang].dislikes.length}
                    <AiOutlineDislike className={'my-auto'} />
                </div>
            </div>
        </div>
    )
};
export default memo(PendingCard);
