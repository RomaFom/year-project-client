import cn from 'classnames';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import { useUser } from '@/providers/UserProvider/UserContext';

import styles from './NavBar.module.scss';
type Props = {
    token: string;
};
const NavBar: React.FC<Props> = ({ token }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { clearUser } = useUser();

    return (
        <header className={menuOpen ? styles.open : ''}>
            <nav className={cn(styles.navbar)}>
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
                <div className={styles.dropdowns}>
                    {token && (
                        <div className={styles.dropdown}>
                            <button className={styles.button} type={'button'}>
                                Menu <BsChevronDown />
                            </button>
                            <div className={styles.dropdownMenu}>
                                <button type={'button'}>
                                    <Link href={'/'}>Menu Item</Link>
                                </button>
                            </div>
                        </div>
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

                    {token && (
                        <div className={styles.dropdown}>
                            <button
                                className={styles.button}
                                onClick={clearUser}
                                type={'button'}
                            >
                                LOGOUT
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};
export default NavBar;
