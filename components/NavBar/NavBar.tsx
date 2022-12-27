import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BiDoorOpen } from 'react-icons/bi';
import { BsChevronDown } from 'react-icons/bs';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useUser } from '@/providers/UserProvider/UserContext';
import { Roles } from '@/utils/api';
import styles from './NavBar.module.scss';

type Props = {
    token: string;
};
const NavBar: React.FC<Props> = ({ token }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, clearUser } = useUser();
    const { t } = useTranslation('');

    return (
        <nav
            className={cn(
                styles.navbar,
                menuOpen ? styles.open : '',
                'capitalize',
            )}
        >
            {menuOpen ? (
                <AiOutlineClose
                    className={cn(styles.burger)}
                    onClick={() => {
                        setMenuOpen(false);
                    }}
                />
            ) : (
                <AiOutlineMenu
                    className={cn(styles.burger)}
                    onClick={() => {
                        setMenuOpen(true);
                    }}
                />
            )}
            <button
                className={cn(styles.burgerBtn, styles.button, 'capitalize')}
                type={'button'}
            >
                <Link href={'/'}>{t('nav.home')}</Link>
            </button>
            <div className={cn('flex justify-between w-full')}>
                <div className={styles.dropdowns}>
                    {token && (
                        <>
                            <div className={styles.dropdown}>
                                <button
                                    className={styles.button}
                                    type={'button'}
                                >
                                    {t('nav.menu')}{' '}
                                    <BsChevronDown className={styles.arrow} />
                                </button>
                                <div className={styles.dropdownMenu}>
                                    <button type={'button'}>
                                        <Link href={'/add-term'}>
                                            {t('nav.add-term')}
                                        </Link>
                                    </button>
                                </div>
                            </div>

                            {(user?.role === Roles.SUPERUSER ||
                                user?.role === Roles.ADMIN) && (
                                <div className={styles.dropdown}>
                                    <button
                                        className={styles.button}
                                        type={'button'}
                                    >
                                        {t('nav.admin-menu')}{' '}
                                        <BsChevronDown
                                            className={styles.arrow}
                                        />
                                    </button>
                                    <div className={styles.dropdownMenu}>
                                        <button type={'button'}>
                                            <Link href={'/pending'}>
                                                {t('nav.see-pending')}
                                            </Link>
                                        </button>
                                        {user.role === Roles.SUPERUSER && (
                                            <button type={'button'}>
                                                <Link href={'/admin/add-admin'}>
                                                    {t('nav.add-admin')}
                                                </Link>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {!token && (
                        <>
                            <div className={styles.dropdown}>
                                <button
                                    className={styles.button}
                                    type={'button'}
                                >
                                    <Link href={'/login'}>
                                        {t('nav.login')}
                                    </Link>
                                </button>
                            </div>

                            <div className={styles.dropdown}>
                                <button
                                    className={styles.button}
                                    type={'button'}
                                >
                                    <Link href={'/sign-up'}>
                                        {t('nav.signup')}
                                    </Link>
                                </button>
                            </div>
                        </>
                    )}
                </div>

                <LanguageSwitcher />

                {token && (
                    <div className={styles.dropdown}>
                        <button
                            className={styles.button}
                            onClick={clearUser}
                            type={'button'}
                        >
                            <BiDoorOpen className={cn('w-[30px] h-[30px]')} />
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};
export default NavBar;
