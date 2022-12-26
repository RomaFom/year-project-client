import cn from 'classnames';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BiDoorOpen } from 'react-icons/bi';
import { BsChevronDown } from 'react-icons/bs';
import { useUser } from '@/providers/UserProvider/UserContext';

import { Roles } from '@/utils/api';
import styles from './NavBar.module.scss';
type Props = {
    token: string;
};
const NavBar: React.FC<Props> = ({ token }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, clearUser } = useUser();

    return (
        <nav className={cn(styles.navbar, menuOpen ? styles.open : '')}>
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
                className={cn(styles.burgerBtn, styles.button)}
                type={'button'}
            >
                <Link href={'/'}>Home</Link>
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
                                    Menu{' '}
                                    <BsChevronDown className={styles.arrow} />
                                </button>
                                <div className={styles.dropdownMenu}>
                                    <button type={'button'}>
                                        <Link href={'/add-term'}>Add Term</Link>
                                    </button>
                                    <button type={'button'}>
                                        <Link href={'/'}>Link 2</Link>
                                    </button>
                                    <button type={'button'}>
                                        <Link href={'/'}>Link 3</Link>
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
                                        Admin Menu{' '}
                                        <BsChevronDown
                                            className={styles.arrow}
                                        />
                                    </button>
                                    <div className={styles.dropdownMenu}>
                                        <button type={'button'}>
                                            <Link href={'/pending'}>See Pending</Link>
                                        </button>
                                        {user.role === Roles.SUPERUSER && (
                                            <button type={'button'}>
                                                <Link href={'/admin/add-admin'}>
                                                    Add Admin
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
                                    <Link href={'/login'}>Login</Link>
                                </button>
                            </div>

                            <div className={styles.dropdown}>
                                <button
                                    className={styles.button}
                                    type={'button'}
                                >
                                    <Link href={'/sign-up'}>Sign Up</Link>
                                </button>
                            </div>
                        </>
                    )}
                </div>

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
