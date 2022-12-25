import * as process from 'process';
import axios, { AxiosResponse } from 'axios';
import { IKeywordResponse } from '@/utils/api/keywords.types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IKeywordResponse>,
): Promise<void> {
    try {
        // const body = JSON.parse(req.body);
        // console.log(req.query);
        const keyword = JSON.parse(req.body);

        // validate request body
        if (!Object.keys(keyword).length) res.status(400).json({
            status: 400,
            error: {message: "Keyword body is invalid"}
        });

        // send acturl request to server w/ keyword
        const response: AxiosResponse = await axios.post(
            `${process.env.CORE_API}keywords/add`, keyword
        );

        // send success status
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
