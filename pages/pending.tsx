import jwt_decode from 'jwt-decode';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Layout from '@/components/Layout/Layout';
import Pending from '@/components/Pending/Pending';
import { IUserState } from '@/providers/UserProvider';
import { SSRProps } from '@/utils';
import { Roles } from '@/utils/api';
import { parseCookie } from '@/utils/api/parseCookie';

const PendingPage: React.FC<SSRProps> = ({ token }) => (
    <Layout token={token}>
        <Pending />
    </Layout>
);
export default PendingPage;

export const getServerSideProps: GetServerSideProps = async context => {
    const { locale } = context;
    const cookies = context.req.headers.cookie || null;
    if (!cookies) {
        return {
            redirect: {
                destination: '/',
            },
            props: {},
        };
    }

    const parsed = parseCookie(cookies);
    if (!parsed) {
        return {
            redirect: {
                destination: '/',
            },
            props: {},
        };
    }

    const decoded: IUserState = jwt_decode(parsed);
    if (
        decoded &&
        (decoded.role === Roles.SUPERUSER || decoded.role === Roles.ADMIN)
    ) {
        return {
            props: {
                token: parsed,
                ...(await serverSideTranslations(locale as string, ['common'])),
            }, // will be passed to the page component as props
        };
    }

    return {
        redirect: {
            destination: '/',
        },
        props: {},
    };
};
