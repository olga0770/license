import {createContext, useContext} from 'react';


// @ts-ignore
export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}
