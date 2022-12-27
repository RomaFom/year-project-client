import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Layout from '@/components/Layout/Layout';
import SignUp from '@/components/Sign-Up';
import { SSRProps } from '@/utils';
import { parseCookie } from '@/utils/api/parseCookie';

const SignUpPage: React.FC<SSRProps> = ({ token }) => (
    <>
        <Layout token={token}>
            <SignUp />
        </Layout>
    </>
);
export default SignUpPage;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getServerSideProps: GetServerSideProps = async context => {
    const cookies = context.req.headers.cookie || '';
    const { locale } = context;
    const parsed = parseCookie(cookies);
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
