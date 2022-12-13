import cn from 'classnames';
import React, { memo } from 'react';
import {
    AiOutlineDislike,
    AiOutlineInfoCircle,
    AiOutlineLike,
} from 'react-icons/ai';

import { BsPatchCheck } from 'react-icons/bs';
import { IKeywords } from '@/utils/keywords/keywords.types';
import styles from './Card.module.scss';
export enum CardType {
    GREEN = 'from-green-light via-cyan-light to-green-light',
    RED = 'from-red-300 via-red-200 to-red-300',
}

type Props = {
    item: IKeywords;
    variant: CardType;
};
const Card: React.FC<Props> = ({ item, variant }) => (
    <div
        className={cn(
            styles.card,
            'm-2 p-5 ',
            'w-full max-w-[300px] min-h-[200px]',
            'rounded-2xl',
            'flex flex-col',
            'text-light-oxford-blue text-xl',
            'bg-gradient-to-r',
            variant,
        )}
    >
        {item.isAuthorized ? (
            <BsPatchCheck size={25} />
        ) : (
            <AiOutlineInfoCircle size={25} />
        )}

        <div
            className={cn('mx-auto border-2 rounded-lg px-3 py-1 border-black')}
        >
            {item.keyword}
        </div>
        <div className={'text-end pt-2'}>{item.meaning}</div>
        <div className={'flex justify-between mt-auto'}>
            <div className={'flex gap-2'}>
                {item.likes.length}
                <AiOutlineLike className={'my-auto'} />
            </div>

            <div className={'flex gap-2'}>
                {item.dislikes.length}
                <AiOutlineDislike className={'my-auto'} />
            </div>
        </div>
    </div>
);
export default memo(Card);
