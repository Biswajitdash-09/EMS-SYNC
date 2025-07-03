
/**
 * Employee Authentication Service
 * Handles employee login validation and data retrieval
 * Syncs with the main employee records from admin portal
 */

import { Employee } from '@/types/employee';
import { generateEmployeeData } from '@/utils/employeeDataGenerator';

// Get the same employee data that's used in admin portal
const getAllEmployees = (): Employee[] => {
  return generateEmployeeData();
};

export interface EmployeeAuthData {
  employee: Employee;
  loginTime: string;
  role: 'employee';
}

/**
 * Authenticate employee using login credentials
 * Returns employee data if credentials are valid
 */
export const authenticateEmployee = (email: string, password: string): EmployeeAuthData | null => {
  const employees = getAllEmployees();
  
  // Find employee by login credentials
  const employee = employees.find(emp => 
    emp.loginCredentials.loginEmail === email && 
    emp.loginCredentials.password === password &&
    emp.loginCredentials.isActive
  );

  if (!employee) {
    return null;
  }

  return {
    employee,
    loginTime: new Date().toISOString(),
    role: 'employee'
  };
};

/**
 * Get employee data by ID (for refreshing data)
 */
export const getEmployeeById = (employeeId: string): Employee | null => {
  const employees = getAllEmployees();
  return employees.find(emp => emp.id === employeeId) || null;
};

/**
 * Check if employee session is valid
 */
export const validateEmployeeSession = (): EmployeeAuthData | null => {
  try {
    const authData = localStorage.getItem('employee-auth');
    if (!authData) return null;

    const parsed = JSON.parse(authData) as EmployeeAuthData;
    
    // Refresh employee data to ensure it's in sync with admin portal
    const currentEmployee = getEmployeeById(parsed.employee.id);
    if (!currentEmployee || !currentEmployee.loginCredentials.isActive) {
      // Employee no longer exists or is inactive, clear session
      localStorage.removeItem('employee-auth');
      return null;
    }

    // Return updated employee data
    return {
      ...parsed,
      employee: currentEmployee
    };
  } catch (error) {
    console.error('Error validating employee session:', error);
    localStorage.removeItem('employee-auth');
    return null;
  }
};

/**
 * Store employee authentication data
 */
export const storeEmployeeAuth = (authData: EmployeeAuthData): void => {
  localStorage.setItem('employee-auth', JSON.stringify(authData));
};

/**
 * Clear employee authentication data
 */
export const clearEmployeeAuth = (): void => {
  localStorage.removeItem('employee-auth');
};
