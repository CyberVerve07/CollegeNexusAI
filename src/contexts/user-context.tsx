"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import type { User, UserRole } from '@/lib/types';
import { users } from '@/lib/data';
import { useRouter } from 'next/navigation';

interface UserContextType {
  user: User | null;
  setUserRole: (role: UserRole | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
        const storedRole = localStorage.getItem('userRole') as UserRole;
        if (storedRole && !user) {
            const userForRole = users.find(u => u.role === storedRole);
            if (userForRole) {
                setUser(userForRole);
            }
        }
    } catch(e) {
        // localstorage not available
    }
  }, [user]);

  const setUserRole = (role: UserRole | null) => {
    if (role) {
      const userForRole = users.find(u => u.role === role);
      setUser(userForRole || null);
      try {
        localStorage.setItem('userRole', role);
      } catch (e) {
        // localstorage not available
      }
    } else {
      setUser(null);
      try {
        localStorage.removeItem('userRole');
      } catch (e) {
        // localstorage not available
      }
    }
  };

  const logout = () => {
    setUserRole(null);
    router.push('/');
  };

  const value = useMemo(() => ({
    user,
    setUserRole,
    logout,
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
