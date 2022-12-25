import { BaseResponse } from '@/utils/api/auth.types';
import { IKeywords } from '@/utils/keywords/keywords.types';

export interface IKeywordResponse extends BaseResponse {
    data?: Array<IKeywords>;
}

export interface IApproveKeywordRequest {
    id: string;
    langId: string;
}

export interface IApproveKeywordResponse extends BaseResponse {
    data?: IKeywords
}
