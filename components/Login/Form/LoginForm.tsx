import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button/Button';

import InputWrapper from '@/components/InputWrapper';
import { Circle } from '@/components/Loaders';
import { useUser } from '@/providers/UserProvider/UserContext';

import { IUserResponse } from '@/utils/api';
import { ILoginForm, loginSchema } from '@/utils/login';
import { basicError } from '@/utils/notifications';

const LoginForm: React.FC = () => {
    const [cookie, setCookie] = useCookies(['tokenData']);
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const { user } = useUser();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginForm>({
        resolver: yupResolver(loginSchema),
    });

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user]);

    const onSubmit = useCallback(async (values: ILoginForm): Promise<void> => {
        try {
            setSubmitting(true);
            const res: IUserResponse = await (
                await fetch('/api/auth/login', {
                    method: 'POST',
                    body: JSON.stringify(values),
                })
            ).json();

            if (res.status >= 400 || !res.data?.token) {
                basicError(res.error?.message || 'Something went wrong');
                return;
            }

            setCookie('tokenData', res.data.token, {
                path: '/',
                maxAge: 3600,
                sameSite: true,
            });
        } catch (err) {
            // console.log('error', err);
        } finally {
            setSubmitting(false);
        }
    }, []);

    return (
        <form className="pt-20" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mx-auto xs:w-10/12 md:w-1/2 lg:w-1/3 gap-y-3.5">
                <InputWrapper labelId={'username'} labelText={'Username'}>
                    <input
                        autoComplete={'off'}
                        className={cn(errors.username && 'invalid')}
                        {...register('username')}
                    />
                </InputWrapper>
                <InputWrapper labelId={'password'} labelText={'Password'}>
                    <input
                        autoComplete={'off'}
                        className={cn(errors.password && 'invalid')}
                        type={'password'}
                        {...register('password')}
                    />
                </InputWrapper>
                <span className="flex justify-center pt-2nex">
                    <Button disabled={submitting} type="submit">
                        {submitting ? (
                            <Circle height={20} width={20} />
                        ) : (
                            'Login'
                        )}
                    </Button>
                </span>
            </div>
        </form>
    );
};
export default LoginForm;
