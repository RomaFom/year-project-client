import React, { useCallback, useState } from "react";
import InputWrapper from "../InputWrapper";
import Button from '@/components/Button/Button';
import cn from 'classnames';
import styles from './AddTerm.module.scss';
import { useRouter } from 'next/navigation';
import {IKeywords, INewTerm , Language, newTermSchema} from '@/utils/keywords/keywords.types'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { basicError, basicSucsess } from "@/utils/notifications";

const AddTerm = () => {
    
    
    const [selectedLanguage, setSelectedLanguage] = useState('hebrew');
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors},
    } = useForm<INewTerm>({
        resolver: yupResolver(newTermSchema),
    });

    console.log(errors);
    


    const dropdownChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        console.log(event.currentTarget.value);
        setSelectedLanguage(event.currentTarget.value);
    }

    const onSubmit = useCallback(
        async (values: INewTerm): Promise<void> => {
            try {
                console.log(values);

                setSubmitting(true);
                const res: any = await (
                    await fetch('/api/keywords/new-term', {
                        method: 'POST',
                        body: JSON.stringify(values),
                    })
                ).json();
                if (res.status >= 400) {
                    basicError(res.error?.message || 'Something went wrong');
                    return;
                }
                basicSucsess("The term is added!");
                router.push('/?keyword='+values.keyword);
                
            } catch (err: any) {
                console.log(err);
            } finally {
                setSubmitting(false);
            }
        },
        [],
    );

    return (
        <div className="flex flex-col mx-auto xs:w-10/12 md:w-1/2 lg:w-1/3 gap-y-3.5">
            <form className="pt-20" onSubmit={handleSubmit(onSubmit)}>
                    <InputWrapper labelId={'keyword'} labelText={'Term'}>
                        <input autoComplete={'off'}
                            className={cn(errors.keyword && 'invalid')}
                            {...register('keyword')}/>
                    </InputWrapper>

                    <InputWrapper labelId={'meaning'} labelText={'Meaning'}>
                        <input autoComplete={'off'}
                            className={cn(errors.meaning && 'invalid')}
                            {...register('meaning')}/>
                    </InputWrapper>

                    <InputWrapper labelId={'language'} labelText={'Language'}>
                        <select {...register('language')} id="languages" onChange={dropdownChangeHandler} className="py-2 px-3 bg-dark-medium border-main-green border-2 rounded-lg border-solid w-full text-light-grey font-normal">
                            <option selected value={Language.HEBREW}>עברית</option>
                            <option value={Language.ARABIC}>عربيه</option>
                            <option value={Language.ENGLISH}>English</option>
                        </select>
                    </InputWrapper>
                    

                    <div className="margin-top: 100px">
                        <span className="flex justify-center pt-5">
                            <Button type="submit"
                            disabled={submitting}
                            showLoader={submitting}
                            >
                                Add Term
                            </Button>
                        </span>
                    </div>
            </form>
        </div>

    );
}

export default AddTerm;