import axios, { AxiosResponse } from 'axios';
import { IUserResponse } from '@/utils/api';

import { ILoginForm } from '@/utils/login';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IUserResponse>,
): Promise<void> {
    try {
        const body: ILoginForm = JSON.parse(req.body);

        const response: AxiosResponse = await axios.post(
            process.env.CORE_API + 'auth/login',
            body,
        );

        res.status(response.status).json({
            status: response.status,
            data: response.data,
        });
    } catch (error: any) {
        res.status(error.response.status).json({
            status: error.response.status,
            error: {
                message: error.response.data.message,
            },
        });
    }
}
