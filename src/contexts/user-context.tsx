
"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import type { User as AppUser, UserRole } from '@/lib/types';
import { users as mockUsers } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { useUser as useFirebaseUser } from '@/firebase';
import type { User as FirebaseUser } from 'firebase/auth';

interface UserContextType {
  user: AppUser | null;
  firebaseUser: FirebaseUser | null;
  isUserLoading: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const roleMap: { [key: string]: UserRole } = {
    'admin@collegenexus.edu': 'admin',
    'teacher@collegenexus.edu': 'teacher',
    'student@collegenexus.edu': 'student'
}

export function UserProvider({ children }: { children: ReactNode }) {
  const { user: firebaseUser, isUserLoading: isFirebaseUserLoading } = useFirebaseUser();
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    if (!isFirebaseUserLoading) {
      if (firebaseUser && firebaseUser.email) {
        const role = roleMap[firebaseUser.email];
        if (role) {
            const userFromFile = mockUsers.find(u => u.role === role);
            if (userFromFile) {
                setAppUser({
                    ...userFromFile,
                    id: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser.displayName || userFromFile.name,
                });
            }
        } else {
            setAppUser(null);
        }
      } else {
        setAppUser(null);
      }
    }
  }, [firebaseUser, isFirebaseUserLoading]);


  const logout = () => {
    // Firebase logout is handled by its own provider/context
    // We just need to clear our app state and redirect
    setAppUser(null);
    router.push('/');
  };

  const value = useMemo(() => ({
    user: appUser,
    firebaseUser: firebaseUser,
    isUserLoading: isFirebaseUserLoading,
    logout,
  }), [appUser, firebaseUser, isFirebaseUserLoading]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
