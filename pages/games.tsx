import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { MemoryGame } from '@/components/Games/MemoryGame';
import Layout from '@/components/Layout/Layout';
import Search from '@/components/Search/Search';
import { SSRProps } from '@/utils';
import { parseCookie } from '@/utils/api/parseCookie';

const GamesPage: React.FC<SSRProps> = ({ token }) => (
    <Layout token={token}>
        <MemoryGame />
    </Layout>
);

export default GamesPage;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getServerSideProps(context: any) {
    const cookies = context.req.headers.cookie || '';
    const { locale } = context;
    const parsed = parseCookie(cookies);
    return {
        props: {
            token: parsed,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}
