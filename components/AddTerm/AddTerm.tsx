import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    IKeywords,
    Language,
    newTermSchema,
} from '@/utils/keywords/keywords.types';
import { basicError, basicSucsess } from '@/utils/notifications';
import AddTermForm from './FormAddTerm/AddTermForm';

const AddTerm = (): JSX.Element => {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const {
        formState: { errors },
    } = useForm<IKeywords>({
        resolver: yupResolver(newTermSchema),
    });
    const [newTermValue, setNewTermValue] = useState<IKeywords>(
        {} as IKeywords,
    );

    const sendTerm = useCallback(async (): Promise<void> => {
        try {
            if (newTermValue.he || newTermValue.en || newTermValue.ar) {
                setSubmitting(true);
                const res: any = await (
                    await fetch('/api/keywords/new-term', {
                        method: 'POST',
                        body: JSON.stringify(newTermValue),
                    })
                ).json();
                if (res.status >= 400) {
                    basicError(res.error?.message || 'Something went wrong');
                    return;
                }
                basicSucsess('The term is added!');
                router.push('/');
            } else {
                basicError('You must fill in at least one of the languages!');
            }
        } catch (err: any) {
            console.log(err);
        } finally {
            setSubmitting(false);
        }
    }, [newTermValue]);

    return (
        <div>
            <h3 className="text-center font-semibold ">
                You need to fill in the term fields in at least one language,
                when finished click Save.
            </h3>
            <h3 className="text-center font-semibold ">
                When you are ready to add the term in one or more languages
                click Send.
            </h3>

            <AddTermForm
                language={Language.HEBREW}
                setNewTermValue={setNewTermValue}
                strKeyword="Hebrew Term | ????????"
                strLong="Hebrew Long Meaning | ?????????? ????????"
                strShort="Hebrew Short Meaning | ?????????? ??????"
            />
            <AddTermForm
                language={Language.ENGLISH}
                setNewTermValue={setNewTermValue}
                strKeyword="English Term"
                strLong="English Long Meaning"
                strShort="English Short Meaning"
            />
            <AddTermForm
                language={Language.ARABIC}
                setNewTermValue={setNewTermValue}
                strKeyword="Arabic Term | ?????????? ????????"
                strLong="Arabic Long Meaning | ???????? ???????? ????????"
                strShort="Arabic Short Meaning | ???????? ???????? ????????"
            />

            <div className="margin-top: 100px">
                <span className="flex justify-center pt-5">
                    <button
                        className="py-2 px-3 bg-dark-medium border-main-green border-2 rounded-2xl border-solid w-32 text-light-grey font-normal text-base"
                        onClick={sendTerm}
                        type="submit"
                    >
                        Send Term
                    </button>
                </span>
            </div>
        </div>
    );
};

export default AddTerm;
