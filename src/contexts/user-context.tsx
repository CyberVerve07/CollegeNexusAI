
"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { User } from '@/lib/types';
import { users as mockUsers, students } from '@/lib/data';

interface UserContextType {
  user: User | null;
  isUserLoading: boolean;
  logout: () => void;
  setUserRole: (role: 'student' | 'teacher' | 'admin') => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Default to the first student user, or null if not available
  const initialUser = mockUsers.find(u => u.role === 'student') || null;
  const [user, setUser] = useState<User | null>(initialUser);

  const logout = () => {
    // In a real app, this would also clear tokens, etc.
    setUser(null);
  };
  
  const setUserRole = (role: 'student' | 'teacher' | 'admin') => {
    const userToSet = mockUsers.find(u => u.role === role);
    if(role === 'student') {
        const studentUser = students[0];
        setUser(studentUser as User);
    } else {
        setUser(userToSet || null);
    }
  }

  const value = useMemo(() => ({
    user: user,
    isUserLoading: false, // No longer loading from an async source
    logout,
    setUserRole,
  }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
