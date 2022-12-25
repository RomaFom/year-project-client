import { createContext, useContext } from 'react';
import { Roles } from '@/utils/api';

export interface IUserState {
    id: string;
    username: string;
    role: Roles;
    token: string;
}

type UserContextType = {
    user: IUserState | null;
    setUser: (user: IUserState | null) => void;
    clearUser: () => void;
};
const UserContextDefaultValues: UserContextType = {
    user: null,
    setUser: () => null,
    clearUser: () => null,
};

export const UserContext = createContext<UserContextType>(
    UserContextDefaultValues,
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useUser = () => useContext(UserContext);
