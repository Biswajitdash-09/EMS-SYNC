
/**
 * Employee Authentication Context
 * Provides employee authentication state throughout the app
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Employee } from '@/types/employee';
import { validateEmployeeSession, EmployeeAuthData, clearEmployeeAuth } from '@/services/employeeAuthService';

interface EmployeeAuthContextType {
  employee: Employee | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  refreshEmployeeData: () => void;
}

const EmployeeAuthContext = createContext<EmployeeAuthContextType | undefined>(undefined);

interface EmployeeAuthProviderProps {
  children: ReactNode;
}

export const EmployeeAuthProvider = ({ children }: EmployeeAuthProviderProps) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshEmployeeData = () => {
    const authData = validateEmployeeSession();
    if (authData) {
      setEmployee(authData.employee);
    } else {
      setEmployee(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    refreshEmployeeData();
  }, []);

  const logout = () => {
    clearEmployeeAuth();
    setEmployee(null);
  };

  const value = {
    employee,
    isAuthenticated: !!employee,
    isLoading,
    logout,
    refreshEmployeeData
  };

  return (
    <EmployeeAuthContext.Provider value={value}>
      {children}
    </EmployeeAuthContext.Provider>
  );
};

export const useEmployeeAuth = () => {
  const context = useContext(EmployeeAuthContext);
  if (context === undefined) {
    throw new Error('useEmployeeAuth must be used within an EmployeeAuthProvider');
  }
  return context;
};
