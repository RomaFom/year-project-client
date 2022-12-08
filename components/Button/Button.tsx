import cn from 'classnames';
import React from 'react';

import styles from './Button.module.scss';
type Props = {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    type: 'button' | 'submit' | 'reset';
    className?: string;
    buttonStyle?: 'primary' | 'secondary' | 'tertiary' | 'buy';
};
const Button: React.FC<Props> = ({
    children,
    disabled,
    onClick,
    type = 'button',
    buttonStyle = 'primary',
    className,
}) => (
    <span className={styles[buttonStyle]}>
        <button
            className={cn(className, 'flex flex-wrap justify-center gap-2')}
            disabled={disabled}
            onClick={() => {
                if (onClick) {
                    onClick();
                }
            }}
            // eslint-disable-next-line react/button-has-type
            type={type || 'button'}
        >
            {children}
        </button>
    </span>
);
export default Button;
