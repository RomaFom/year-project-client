import cn from 'classnames';
import Image from 'next/image';
import React from 'react';

type Props = {
    selected: string;
    // setSelected: (val: string) => void;
    options: Array<string>;
    cb: (val: any) => void;
};
const CardDropDownFlags: React.FC<Props> = ({
    selected,
    // setSelected,
    options,
    cb,
}) => (
    <ul className={'font-bold'}>
        {options.map(locale => (
            <li
                className={cn(
                    'flex gap-x-2',
                    selected === locale ? 'text-blue-700' : '',
                )}
                key={locale}
                onClick={() => {
                    cb(locale);
                }}
            >
                <Image
                    alt={locale}
                    height={20}
                    src={`/images/${locale}-flag.png`}
                    width={20}
                />
                <span
                    className={cn(
                        'capitalize',
                        selected === locale && 'text-blue-700',
                    )}
                >
                    {locale}
                </span>
            </li>
        ))}
    </ul>
);
export default CardDropDownFlags;
