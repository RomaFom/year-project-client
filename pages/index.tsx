import Layout from '@/components/Layout/Layout';
import { SSRProps } from '@/utils';
import { parseCookie } from '@/utils/api/parseCookie';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Home({ token }: SSRProps) {
    return (
        <Layout token={token}>
            <div>Main Page</div>
        </Layout>
    );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getServerSideProps(context: any) {
    const cookies = context.req.headers.cookie || '';
    const parsed = parseCookie(cookies);
    return {
        props: { token: parsed }, // will be passed to the page component as props
    };
}
