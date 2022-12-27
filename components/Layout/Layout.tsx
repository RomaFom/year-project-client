import { useRouter } from 'next/router';
import React, { useLayoutEffect } from 'react';
import NavBar from '@/components/NavBar';
type Props = {
    children: React.ReactNode;
    token: string;
};
const Layout: React.FC<Props> = ({ children, token }) => {
    const router = useRouter();
    useLayoutEffect(() => {
        const dir =
            router.locale === 'ar' || router.locale === 'he' ? 'rtl' : 'ltr';
        document.querySelector('html')?.setAttribute('dir', dir);
    }, [router.locale]);
    return (
        <>
            <NavBar token={token} />
            <main className="pt-20 px-8 h-full">{children}</main>
        </>
    );
};
export default Layout;
