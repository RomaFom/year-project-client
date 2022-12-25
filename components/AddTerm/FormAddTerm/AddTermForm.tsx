import React, { useCallback, useState } from "react";
import InputWrapper from "../../InputWrapper";
import Button from '@/components/Button/Button';
import cn from 'classnames';
import {IKeyword, IKeywords, INewTerm , Language, newTermSchema} from '@/utils/keywords/keywords.types'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { basicError, basicSucsess } from "@/utils/notifications";


type Props = {
    strKeyword:string,
    strShort:string,
    strLong:string,
    language:Language,
    setNewTermValue:React.Dispatch<React.SetStateAction<IKeywords>>,
}

const AddTermForm:React.FC<Props> = ({strKeyword,strShort,strLong,setNewTermValue,language}) => {
    const [term, setTerm] = useState<INewTerm>({
        keyword: '',
        short: '',
        long: '',
      });

    const [submitting, setSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors},
    } = useForm<INewTerm>({
        resolver: yupResolver(newTermSchema),
    });
    const alignTextForm = (language==Language.HEBREW || language==Language.ARABIC)  ? 'text-right' : 'text-left'; 

    console.log(errors);
    

    const onSubmit = useCallback(
        async (values: INewTerm): Promise<void> => {
            var languageForm = "";
            try {

                setTerm(values);
                setNewTermValue((prev) => {
                    return {
                        ...prev,
                        [language]:values,
                    }
                });
                console.log(term);
                if(language == Language.HEBREW) {languageForm = "Hebrew";}
                if(language == Language.ENGLISH) {languageForm = "English";}
                if(language == Language.ARABIC) {languageForm = "Arabic";}
                basicSucsess("The details of the term in the "+languageForm+" language have been updated")

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
                    <InputWrapper labelId={'keyword'} labelText={strKeyword}>
                        <input autoComplete={'off'}
                            className={cn(errors.keyword && 'invalid')} 
                            class={alignTextForm}
                            {...register('keyword')}/>
                    </InputWrapper>

                    <InputWrapper labelId={'short'} labelText={strShort}>
                        <input type="text" autoComplete={'off'}
                            className={cn(errors.short && 'invalid')}
                            class={alignTextForm}
                            {...register('short')}/>
                    </InputWrapper>

                    <InputWrapper labelId={'long'} labelText={strLong}>
                        <input autoComplete={'off'}
                            className={cn(errors.long && 'invalid')}
                            class={alignTextForm}
                            {...register('long')}/>
                    </InputWrapper>

                    <div className="margin-top: 100px">
                        <span className="flex justify-center pt-5">
                            <Button type="submit"
                            disabled={submitting}
                            showLoader={submitting}
                            >
                                Save
                            </Button>
                        </span>
                    </div>
            </form>
        </div>
    );}

export default AddTermForm;