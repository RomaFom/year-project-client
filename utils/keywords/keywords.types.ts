export enum Language {
    ENGLISH = 'en',
    HEBREW = 'he',
    ARABIC = 'ar',
}

export interface IKeyword {
    keyword: string;
    short: string;
    long: Language;
    isAuthorized: boolean;
    likes: Array<string>;
    dislikes: Array<string>;
    _id: string;
}

export interface IKeywords {
    _id: string;
    he: IKeyword;
    en: IKeyword;
    ar: IKeyword;
}

// IKeywords languages keys*
export type IKeywordsLanguages = keyof Omit<IKeywords, '_id'>

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
