import * as process from 'process';
import { json } from 'stream/consumers';
import axios, { AxiosResponse } from 'axios';
import { IKeywordResponse } from '@/utils/api/keywords.types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IKeywordResponse>,
): Promise<void> {
    try {
        const data = JSON.parse(req.body);

        const response: AxiosResponse = await axios.post(
            process.env.CORE_API + 'keywords/add',
            {
                ...data,
            },
        );

        console.log(response);

        res.status(response.status).json({
            status: response.status,
        });

        //res.status(200).json({status: 200 , data: {} as IKeywordResponse})
    } catch (error: any) {
        res.status(error.response.status).json({
            status: error.response.status,
            error: {
                message: error.response.data.message,
            },
        });
    }
}
