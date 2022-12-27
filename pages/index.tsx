import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Layout from '@/components/Layout/Layout';
import Search from '@/components/Search/Search';
import { SSRProps } from '@/utils';
import { parseCookie } from '@/utils/api/parseCookie';

const HomePage: React.FC<SSRProps> = ({ token }) => (
    <Layout token={token}>
        <Search />
    </Layout>
);

export default HomePage;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getServerSideProps(context: any) {
    const cookies = context.req.headers.cookie || '';
    const { locale } = context;
    const parsed = parseCookie(cookies);
    return {
        props: {
            token: parsed,
            ...(await serverSideTranslations(locale, ['common'])),
        }, // will be passed to the page component as props
    };
}
