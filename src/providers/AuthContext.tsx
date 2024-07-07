import { createContext, useState } from 'react';
import { IUser } from '../lib/interfaces/user-types/IUser';
import { ACCESS_TOKEN_KEY } from '../lib/token';

interface AuthContextProps {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    user: IUser | null;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export type Props = Record<string, any>;

export const AuthContextProvider = (props: Props) => {
    const user = null;
    const [accessToken, setAccessToken] = useState<string | null>(
        typeof window !== 'undefined' ? sessionStorage.getItem(ACCESS_TOKEN_KEY) : null
    );
    const value = {
        accessToken,
        setAccessToken,
        user
    };

    return <AuthContext.Provider value={value} {...props} />;
};
