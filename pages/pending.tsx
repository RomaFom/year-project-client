import React, { useContext } from 'react';
import Layout from '@/components/Layout/Layout';
import AutoSuggest from '@/components/Search';
import Search from '@/components/Search/Search';
import { SSRProps } from '@/utils';
import { parseCookie } from '@/utils/api/parseCookie';
import Pending from '@/components/Pending/Pending';
import { UserContext } from '@/providers/UserProvider';
import { Roles } from '@/utils/api';

const PendingPage: React.FC<SSRProps> = ({ token }) => {
    // validation - protcted page
    const {user, isLoading} = useContext(UserContext)

    // -- display loading animation
    if (isLoading) return <h4>Loading data...</h4>
    // user not authorized
    else if (!user || (user.role !== Roles.ADMIN && user.role !== Roles.SUPERUSER)) 
        return <h3>Access denied</h3>
    // user is authorized - show protected page
    else return (
        <Layout token={token}>
            <Pending />
        </Layout>
    )
}

export default PendingPage;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getServerSideProps(context: any) {
    const cookies = context.req.headers.cookie || '';
    const parsed = parseCookie(cookies);
    return {
        props: { token: parsed }, // will be passed to the page component as props
    };
}
