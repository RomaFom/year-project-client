import { toast } from 'react-toastify';

export const basicError = (message: string): void => {
    toast.error(message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'dark',
    });
};



export const basicSucsess = (message: string): void => {
    toast.success(message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'dark',
    });
};
