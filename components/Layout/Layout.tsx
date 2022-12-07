import React from 'react';
import NavBar from '@/components/NavBar';
type Props = {
    children: React.ReactNode;
    token: string;
};
const Layout: React.FC<Props> = ({ children, token }) => (
    <>
        <NavBar token={token} />
        <main className="pt-20 px-8 h-full">{children}</main>
    </>
);
export default Layout;
