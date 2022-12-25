import React from 'react';
import Layout from '@/components/Layout/Layout';
import Login from '@/components/Login';
import { SSRProps } from '@/utils';
import { parseCookie } from '@/utils/api/parseCookie';

const LoginPage: React.FC<SSRProps> = ({ token }) => (
    <>
        <Layout token={token}>
            <Login />
        </Layout>
    </>
);
export default LoginPage;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getServerSideProps(context: any) {
    const cookies = context.req.headers.cookie || '';
    const parsed = parseCookie(cookies);
    if (cookies) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }

    return {
        props: { token: parsed }, // will be passed to the page component as props
    };
}
