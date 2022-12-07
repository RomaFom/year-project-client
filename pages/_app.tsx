import '@/styles/globals.css';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import Provider from '@/providers';
import { IUserState, UserContext } from '@/providers/UserProvider';
import { IUserDataResponse } from '@/utils/api';
import type { AppProps } from 'next/app';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function App({ Component, pageProps }: AppProps) {
    const [cookie, setCookie, removeCookie] = useCookies(['tokenData']);
    const router = useRouter();
    const [ctxUser, setCtxUser] = useState<IUserState | null>(null);

    const handleLogout = useCallback(() => {
        removeCookie('tokenData');
        setCtxUser(null);
        router.push('/');
    }, []);

    const userValues = useMemo(
        () => ({
            user: ctxUser,
            setUser: setCtxUser,
            clearUser: handleLogout,
        }),
        [ctxUser, setCtxUser, handleLogout],
    );

    useEffect(() => {
        if (!cookie.tokenData) {
            router.push('/');
        } else {
            fetch('/api/auth/get-user', {
                method: 'GET',
            })
                .then(res => res.json())
                .then((data: IUserDataResponse) => {
                    if (data.status >= 400 || !data.data) {
                        handleLogout();
                        return;
                    }
                    const newUser = {
                        ...data.data,
                        token: cookie.tokenData,
                    };
                    setCtxUser(newUser);
                });
        }
    }, [cookie]);

    return (
        <>
            <Head>
                <title>Year Project</title>
            </Head>
            <UserContext.Provider value={userValues}>
                <Provider>
                    <Component {...pageProps} />
                </Provider>
            </UserContext.Provider>
        </>
    );
}
