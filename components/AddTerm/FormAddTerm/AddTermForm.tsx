import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button/Button';
import InputWrapper from '@/components/InputWrapper/InputWrapper';
import {
    IKeywords,
    INewTerm,
    Language,
    newTermSchema,
} from '@/utils/keywords/keywords.types';
import { basicSucsess } from '@/utils/notifications';

type Props = {
    strKeyword: string;
    strShort: string;
    strLong: string;
    language: Language;
    setNewTermValue: React.Dispatch<React.SetStateAction<IKeywords>>;
};

const AddTermForm: React.FC<Props> = ({
    strKeyword,
    strShort,
    strLong,
    setNewTermValue,
    language,
}) => {
    const [term, setTerm] = useState<INewTerm>({
        keyword: '',
        short: '',
        long: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<INewTerm>({
        resolver: yupResolver(newTermSchema),
    });

    const onSubmit = useCallback(async (values: INewTerm): Promise<void> => {
        let languageForm = '';
        try {
            setTerm(values);
            setNewTermValue(prev => ({
                ...prev,
                [language]: values,
            }));

            switch (language) {
                case Language.HEBREW:
                    languageForm = 'Hebrew';
                    break;
                case Language.ENGLISH:
                    languageForm = 'English';
                    break;
                case Language.ARABIC:
                    languageForm = 'Arabic';
                    break;
            }

            basicSucsess(
                'The details of the term in the ' +
                    languageForm +
                    ' language have been updated',
            );
        } catch (err: any) {
            console.log(err);
        } finally {
            setSubmitting(false);
        }
    }, []);

    return (
        <div className="flex flex-col mx-auto xs:w-10/12 md:w-1/2 lg:w-1/3 gap-y-3.5">
            <form className="pt-20" onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper labelId={'keyword'} labelText={strKeyword}>
                    <input
                        autoComplete={'off'}
                        className={cn(
                            errors.keyword && 'invalid',
                            language === Language.ENGLISH
                                ? 'text-left'
                                : 'text-right',
                        )}
                        {...register('keyword')}
                    />
                </InputWrapper>

                <InputWrapper labelId={'short'} labelText={strShort}>
                    <input
                        autoComplete={'off'}
                        className={cn(
                            errors.short && 'invalid',
                            language === Language.ENGLISH
                                ? 'text-left'
                                : 'text-right',
                        )}
                        type="text"
                        {...register('short')}
                    />
                </InputWrapper>

                <InputWrapper labelId={'long'} labelText={strLong}>
                    <input
                        autoComplete={'off'}
                        className={cn(
                            errors.long && 'invalid',
                            language === Language.ENGLISH
                                ? 'text-left'
                                : 'text-right',
                        )}
                        {...register('long')}
                    />
                </InputWrapper>

                <div className="margin-top: 100px">
                    <span className="flex justify-center pt-5">
                        <Button
                            disabled={submitting}
                            showLoader={submitting}
                            type="submit"
                        >
                            Save
                        </Button>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default AddTermForm;
