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
