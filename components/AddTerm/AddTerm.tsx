import React, { useCallback, useState } from "react";
import { useRouter } from 'next/navigation';
import {IKeyword, IKeywords, INewTerm , Language, newTermSchema} from '@/utils/keywords/keywords.types'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from '@/components/Button/Button';
import { basicError, basicSucsess } from "@/utils/notifications";
import AddTermForm from "./FormAddTerm/AddTermForm";
import { createSemanticDiagnosticsBuilderProgram } from "typescript";
import styles from './AddTerm.module.scss';

const AddTerm = () => {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors},
    } = useForm<IKeywords>({
        resolver: yupResolver(newTermSchema),
    });
    const [newTermValue,setNewTermValue] = useState<IKeywords>({} as IKeywords);
    console.log(errors);

    console.log(newTermValue);
    

    const sendTerm = async (event: React.MouseEvent<HTMLButtonElement>) => {
            try {
                console.log(newTermValue);
                console.log(newTermValue.he);

                if(newTermValue.he !=  undefined || newTermValue.en !=  undefined || newTermValue.ar !=  undefined)
                {
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
                basicSucsess("The term is added!");
                router.push('/');
                }
                else
                {
                    basicError("You must fill in at least one of the languages!")
                }
                

            } catch (err: any) {
                console.log(err);
            } finally {
                setSubmitting(false);
            }
        }
    

    return (
        <div>
           
            <h3 className="text-center font-semibold ">You need to fill in the term fields in at least one language, when finished click "Save".</h3>
            <h3 className="text-center font-semibold ">When you are ready to add the term in one or more languages click "Send".</h3>

            <AddTermForm strKeyword="Hebrew Term | מונח" strShort="Hebrew Short Meaning | פירוש קצר" strLong="Hebrew Long Meaning | פירוש ארוך" setNewTermValue={setNewTermValue} language={Language.HEBREW} />
            <AddTermForm strKeyword="English Term" strShort="English Short Meaning" strLong="English Long Meaning" language={Language.ENGLISH} setNewTermValue={setNewTermValue}/>
            <AddTermForm strKeyword="Arabic Term | مصطلح عربي" strShort="Arabic Short Meaning | معنى قصير عربي" strLong="Arabic Long Meaning | معنى طويل عربي" language={Language.ARABIC} setNewTermValue={setNewTermValue}/>
                
              
            <div className="margin-top: 100px">
                <span className="flex justify-center pt-5">
                    <button className="py-2 px-3 bg-dark-medium border-main-green border-2 rounded-2xl border-solid w-32 text-light-grey font-normal text-base"
                        onClick={sendTerm}
                    >
                    Send Term
                    </button>
                </span>
            </div>
            
        </div>

    );
}

export default AddTerm;