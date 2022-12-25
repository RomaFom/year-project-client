import axios, { AxiosResponse } from 'axios';
import { IUserDataResponse } from '@/utils/api';
import { parseCookie } from '@/utils/api/parseCookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IUserDataResponse>,
): Promise<void> {
    try {
        const token = parseCookie(req.headers.cookie as string);

        const response: AxiosResponse = await axios.get(
            process.env.CORE_API + 'auth/get-user',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        res.status(response.status).json({
            status: response.status,
            data: response.data,
        });
        // res.status(200).send(response);
    } catch (error: any) {
        res.status(error.response.status).json({
            status: error.response.status,
            error: {
                message: error.response.data.message,
            },
        });
    }
}
