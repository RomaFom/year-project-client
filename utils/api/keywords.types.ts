import { BaseResponse } from '@/utils/api/auth.types';
import { IKeywords } from '@/utils/keywords/keywords.types';

export interface IKeywordResponse extends BaseResponse {
    data?: Array<IKeywords>;
}