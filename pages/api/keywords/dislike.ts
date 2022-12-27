import * as process from 'process';
import axios, { AxiosResponse } from 'axios';
import { IKeywordResponse } from '@/utils/api/keywords.types';
import { parseCookie } from '@/utils/api/parseCookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IKeywordResponse>,
): Promise<void> {
    try {
        const token = parseCookie(req.headers.cookie as string);
        const { id, langId } = JSON.parse(req.body);

        const response: AxiosResponse = await axios.post(
            process.env.CORE_API + 'keywords/dislike',
            {
                id,
                langId,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        console.log('response', response);
        res.status(response.status).json({
            status: response.status,
            data: response.data,
        });

        //res.send(200)
    } catch (error: any) {
        console.log('error', error);
        res.status(error.response.status).json({
            status: error.response.status,
            error: {
                message: error.response.data.message,
            },
        });
    }
}
