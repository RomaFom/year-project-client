import * as Yup from 'yup';

export enum Language {
    ENGLISH = 'en',
    HEBREW = 'he',
    ARABIC = 'ar',
}

export interface IKeywords {
    _id: string;
    keyword: string;
    meaning: string;
    language: Language;
    isAuthorized: boolean;
    likes: Array<string>;
    dislikes: Array<string>;
}

export interface INewTerm {
    keyword: string;
    meaning: string;
    language: Language;
}

export const newTermSchema = Yup.object().shape({
    keyword: Yup.string().required('Term is required'),
    meaning: Yup.string()
        .required('Meaning is required')
        .min(3, 'Meaning must be at least 3 characters'),
    language: Yup.string()
        .required('Password Must Match')
        .oneOf(Object.values(Language), 'Language must match'),
});
