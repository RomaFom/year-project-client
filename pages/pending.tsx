import React from 'react';
import Layout from '@/components/Layout/Layout';
import AutoSuggest from '@/components/Search';
import Search from '@/components/Search/Search';
import { SSRProps } from '@/utils';
import { parseCookie } from '@/utils/api/parseCookie';
import Pending from '@/components/Pending/Pending';

const HomePage: React.FC<SSRProps> = ({ token }) => (
    <Layout token={token}>
        <Pending />
    </Layout>
);

export default HomePage;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getServerSideProps(context: any) {
    const cookies = context.req.headers.cookie || '';
    const parsed = parseCookie(cookies);
    return {
        props: { token: parsed }, // will be passed to the page component as props
    };
}
