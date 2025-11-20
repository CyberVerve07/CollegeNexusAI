"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import type { User, UserRole } from '@/lib/types';
import { users as mockUsers } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/firebase/provider';
import type { User as FirebaseUser } from 'firebase/auth';

interface UserContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isUserLoading: boolean;
  setUserRole: (role: UserRole | null) => void; // Kept for legacy login, can be removed later
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { user: firebaseUser, isUserLoading, auth } = useFirebase();
  const [appUser, setAppUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && firebaseUser) {
      // User is authenticated with Firebase, find their app profile
      const userProfile = mockUsers.find(u => u.email === firebaseUser.email);
      if (userProfile) {
        setAppUser(userProfile);
      } else {
        // Handle case where Firebase user has no app profile
        console.warn("Firebase user not found in mock data:", firebaseUser.email);
        setAppUser(null);
      }
    } else if (!isUserLoading && !firebaseUser) {
      // User is not authenticated
      setAppUser(null);
    }
  }, [firebaseUser, isUserLoading]);


  const setUserRole = (role: UserRole | null) => {
    // This is a legacy method for the old login system.
    // We now rely on Firebase auth state.
    // For now, it can find a mock user to enable navigation.
    if (role) {
      const userForRole = mockUsers.find(u => u.role === role);
      setAppUser(userForRole || null);
    } else {
      setAppUser(null);
    }
  };

  const logout = async () => {
    if (auth) {
      await auth.signOut();
    }
    setAppUser(null);
    try {
       localStorage.removeItem('userRole');
    } catch (e) {
      // ignore
    }
    router.push('/');
  };

  const value = useMemo(() => ({
    user: appUser,
    firebaseUser,
    isUserLoading,
    setUserRole,
    logout,
  }), [appUser, firebaseUser, isUserLoading]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
