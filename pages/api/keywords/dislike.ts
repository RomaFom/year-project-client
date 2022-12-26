import * as process from 'process';
import axios, { AxiosResponse } from 'axios';
import { IKeywordResponse } from '@/utils/api/keywords.types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseCookie } from '@/utils/api/parseCookie';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IKeywordResponse>,
): Promise<void> {
    try {
        const token = parseCookie(req.headers.cookie as string);
        console.log(req.headers.cookie)
        const{id}= req.body
        const response: AxiosResponse = await axios.post(
            process.env.CORE_API + 'keywords/dislike',
            {
               id,
               headers: {
                Authorization: `Bearer ${token}`,
            },
            },
        );
        res.status(response.status).json({
            status: response.status,
            data: response.data,
        });

        
       
        //res.send(200)

    } catch (error: any) {
        res.status(error.response.status).json({
            status: error.response.status,
            error: {
                message: error.response.data.message,
            },
        });
    }
}
