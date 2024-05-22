'use client'
import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {
  auth,
  onAuthStateChanged,
} from '@/config/firebase/client/firebase-client-config';
import { User } from 'firebase/auth';

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{user}}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
