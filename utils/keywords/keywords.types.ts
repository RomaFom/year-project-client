import * as Yup from 'yup';

export enum Language {
    ENGLISH = 'en',
    HEBREW = 'he',
    ARABIC = 'ar'
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

export interface INewTerm{
    keyword: string;
    meaning: string;
    language: Language;
}


export const newTermSchema = Yup.object().shape({
    keyword: Yup.string()
        .required('Term is required'),
        meaning: Yup.string()
        .required('Meaning is required')
        .min(3, 'Meaning must be at least 3 characters'),
        language: Yup.string()
        .required('Password Must Match')
        .oneOf(Object.values(Language), 'Language must match'),
});

// {
//     "_id": "6387021fd80e47bf20dac1ad",
//     "keyword": "צה״ל",
//     "meaning": "צבא ההגנה לישראל",
//     "language": "he",
//     "isAuthorized": true,
//     "likes": [
//     "637e946ef090a9bc474f62cb",
//     "637e84180995cc3c214a0233",
//     "637e8c2ab1cc2803dd7c8f13"
// ],
//     "dislikes": [
//     "637e8d5843b31a457bbac2b2"
// ],
//     "__v": 0
// }
