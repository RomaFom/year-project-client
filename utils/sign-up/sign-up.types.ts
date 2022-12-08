import * as Yup from 'yup';

export interface IFormSignUp {
    username: string;
    password: string;
}

export interface IFormInputValues extends IFormSignUp {
    confirmPassword: string;
}

export const signUpSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required')
        .min(3, 'Username is too short'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .required('Password Must Match')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
