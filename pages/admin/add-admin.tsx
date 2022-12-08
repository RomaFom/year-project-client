import jwt_decode from 'jwt-decode';
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getServerSideProps(context: any) {
    const cookies = context.req.headers.cookie || null;
    if (!cookies) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }

    const parsed = parseCookie(cookies);
    if (!parsed) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }

    const decoded: IUserState = jwt_decode(parsed);
    if (decoded && decoded.role !== Roles.SUPERUSER) {
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
