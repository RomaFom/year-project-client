import cn from 'classnames';
import React, { memo } from 'react';

type Props = {
    children: React.ReactNode;
    text: string;
    className?: string;
};
const Tooltip: React.FC<Props> = ({ children, text, className }) => (
    <span className={cn('group relative w-min', className)}>
        <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black before:content-[''] group-hover:opacity-100">
            {text}
        </span>
        {children}
    </span>
);
export default memo(Tooltip);
