import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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
export const getServerSideProps: GetServerSideProps = async context => {
    const cookies = context.req.headers.cookie || '';
    const parsed = parseCookie(cookies);
    const { locale } = context;
    if (cookies) {
        return {
            props: {},
            redirect: {
                destination: '/',
            },
        };
    }

    return {
        props: {
            token: parsed,
            ...(await serverSideTranslations(locale as string, ['common'])),
        }, // will be passed to the page component as props
    };
};
