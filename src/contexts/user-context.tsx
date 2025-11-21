
"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import type { User } from '@/lib/types';
import { users as mockUsers } from '@/lib/data';
import { useRouter } from 'next/navigation';

interface UserContextType {
  user: User | null;
  isUserLoading: boolean;
  logout: () => void;
  loginWithPassword: (password: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setUserLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading user from a session
    const storedUserRole = sessionStorage.getItem('userRole');
    if (storedUserRole) {
      const userToSet = mockUsers.find(u => u.role === storedUserRole);
      if (userToSet) {
        setUser(userToSet);
      }
    }
    setUserLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('userRole');
    router.push('/');
  };
  
  const loginWithPassword = (password: string): boolean => {
    let userToSet: User | undefined;
    switch (password) {
        case 'admin123':
            userToSet = mockUsers.find(u => u.role === 'admin');
            break;
        case 'teacher123':
            userToSet = mockUsers.find(u => u.role === 'teacher');
            break;
        case 'student123':
            userToSet = mockUsers.find(u => u.role === 'student');
            break;
        default:
            userToSet = undefined;
    }

    if(userToSet) {
        setUser(userToSet);
        sessionStorage.setItem('userRole', userToSet.role);
        return true;
    }

    return false;
  }

  const value = useMemo(() => ({
    user,
    isUserLoading,
    logout,
    loginWithPassword,
  }), [user, isUserLoading]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
