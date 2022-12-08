import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import Toast from '@/components/ToastContainer';

import { IUserState, UserContext } from '@/providers/UserProvider';
import { IUserDataResponse } from '@/utils/api';
import type { AppProps } from 'next/app';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function App({ Component, pageProps }: AppProps) {
    const [cookie, setCookie, removeCookie] = useCookies(['tokenData']);
    const router = useRouter();
    const [ctxUser, setCtxUser] = useState<IUserState | null>(null);
    // Create a client
    const queryClient = new QueryClient();

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
            <QueryClientProvider client={queryClient}>
                <UserContext.Provider value={userValues}>
                    <Component {...pageProps} />
                </UserContext.Provider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
            <Toast />
        </>
    );
}
