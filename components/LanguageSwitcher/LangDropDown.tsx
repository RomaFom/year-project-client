import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { memo, useState } from 'react';
import styles from './LanguageSwitcher.module.scss';

interface Props {
    children: React.ReactNode;
    selected: string;
}
const LangDropDown: React.FC<Props> = ({ selected, children }) => (
    <>
        <div className={cn(styles['nav-wrapper'], 'mx-2', 'w-full')}>
            <div className={cn(styles['sl-nav'])}>
                <ul>
                    <li>
                        <Image
                            alt={'flag'}
                            height={20}
                            src={`/images/${selected}-flag.png`}
                            width={20}
                        />
                        <div className={styles.triangle} />
                        {children}
                    </li>
                </ul>
            </div>
        </div>
    </>
);
export default memo(LangDropDown);
