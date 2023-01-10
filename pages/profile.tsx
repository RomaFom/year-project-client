import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Layout from '@/components/Layout/Layout';
import Profile from '@/components/Profile/Profile';
import { SSRProps } from '@/utils';
import { parseCookie } from '@/utils/api/parseCookie';

const ProfilePage: React.FC<SSRProps> = ({ token }) => (
    <>
        <Layout token={token}>
            <Profile />
        </Layout>
    </>
);
export default ProfilePage;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getServerSideProps(context: any) {
    const cookies = context.req.headers.cookie || '';
    const { locale } = context;
    const parsed = parseCookie(cookies);
    if (!parsed) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }

    return {
        props: {
            token: parsed,
            ...(await serverSideTranslations(locale, ['common'])),
        }, // will be passed to the page component as props
    };
}
