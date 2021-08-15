import { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState{
    authorization: string;
    userid: string;
    name: string;
}

interface SignInCredentials{
    email: string;
    password: string;
}

interface AuthContextData {
    userid: string;
    name: string;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

 const AuthContext = createContext<AuthContextData>( {} as AuthContextData );

 const AuthProvider: React.FC = ({ children }) => {
     const [data, setData] = useState<AuthState>(() => {
        const authorization = localStorage.getItem('@EventMngt:authorization');
        const userid = localStorage.getItem('@EventMngt:userid');
        const name = localStorage.getItem('@EventMngt:name');

        if(authorization && userid && name){
            api.defaults.headers.authorization = `Bearer ${authorization}`;

            return { authorization, userid, name }
        }

        return {} as AuthState;
     });

   const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('/event-manager/users/login', {
            email,
            password,
        });
        const { authorization, userid, name } = response.headers;

        localStorage.setItem('@EventMngt:authorization', authorization);
        localStorage.setItem('@EventMngt:userid', userid);
        localStorage.setItem('@EventMngt:name', name);

        api.defaults.headers.authorization = `Bearer ${authorization}`;

        setData({ authorization, userid, name });
   }, []);

   const signOut = useCallback(() => {
    localStorage.removeItem('@EventMngt:authorization');
    localStorage.removeItem('@EventMngt:userid');
    localStorage.removeItem('@EventMngt:name');

    setData({} as AuthState); 
   }, []);
   
    return(
        <AuthContext.Provider value={{userid: data.userid, signIn, signOut, name: data.name}}>
            {children}
            </AuthContext.Provider>
    );
}

function useAuth(): AuthContextData{
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('useAuth must be used within an auth provider');
    }

    return context;
}

export {AuthProvider, useAuth};