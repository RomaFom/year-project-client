import React from 'react';
import AddTerm from '@/components/AddTerm/AddTerm';
import Layout from '@/components/Layout/Layout';
import { SSRProps } from '@/utils';
import { parseCookie } from '@/utils/api/parseCookie';

const AddTermPage: React.FC<SSRProps> = ({ token }) => (
    <>
        <Layout token={token}>
            <AddTerm />
        </Layout>
    </>
);
export default AddTermPage;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getServerSideProps(context: any) {
    const cookies = context.req.headers.cookie || '';
    const parsed = parseCookie(cookies);
    if (!parsed) {
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
