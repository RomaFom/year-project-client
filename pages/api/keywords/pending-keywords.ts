import * as process from 'process';
import axios, { AxiosResponse } from 'axios';
import { IUserDataResponse } from '@/utils/api';
import { IKeywordResponse } from '@/utils/api/keywords.types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IKeywordResponse>,
): Promise<void> {
    try {
        // const body = JSON.parse(req.body);
        // console.log(req.query);
        const { lang } = req.query;

        const response: AxiosResponse = await axios.get(
            `${process.env.CORE_API}keywords/pending?lang=${lang}`
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
