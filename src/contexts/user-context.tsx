
"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import type { User } from '@/lib/types';
import { users as mockUsers } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/firebase/provider';
import type { User as FirebaseUser } from 'firebase/auth';

interface UserContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isUserLoading: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { user: firebaseUser, isUserLoading, auth } = useFirebase();
  const [appUser, setAppUser] = useState<User | null>(null);
  const [isAppUserLoading, setAppUserLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // This effect syncs the Firebase user with the application's user profile.
    if (!isUserLoading && firebaseUser) {
      // User is authenticated with Firebase, find their app profile
      const userProfile = mockUsers.find(u => u.email === firebaseUser.email);
      if (userProfile) {
        setAppUser(userProfile);
      } else {
        console.warn("Firebase user not found in mock data:", firebaseUser.email);
        setAppUser(null);
      }
    } else if (!isUserLoading && !firebaseUser) {
      // User is not authenticated
      setAppUser(null);
    }
    setAppUserLoading(false);
  }, [firebaseUser, isUserLoading]);


  const logout = async () => {
    if (auth) {
      await auth.signOut();
    }
    setAppUser(null);
    router.push('/');
  };

  const value = useMemo(() => ({
    user: appUser,
    firebaseUser,
    isUserLoading: isUserLoading || isAppUserLoading,
    logout,
  }), [appUser, firebaseUser, isUserLoading, isAppUserLoading, logout]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
