import jwt_decode from 'jwt-decode';
import { GetServerSideProps } from 'next';
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { IUserState } from '@/providers/UserProvider';
import { SSRProps } from '@/utils';
import { Roles } from '@/utils/api';
import { parseCookie } from '@/utils/api/parseCookie';

const AddAdmin: React.FC<SSRProps> = ({ token }) => (
    <>
        <Layout token={token}>
            <h1>Add Admin</h1>
        </Layout>
    </>
);
export default AddAdmin;

export const getServerSideProps: GetServerSideProps = async context => {
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
    if (decoded && decoded.role !== Roles.SUPERUSER) {
        return {
            redirect: {
                destination: '/',
            },
            props: {},
        };
    }

    return {
        props: { token: parsed }, // will be passed to the page component as props
    };
};
