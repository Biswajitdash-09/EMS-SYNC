
import { useState, useMemo } from 'react';
import { Employee } from '@/types/employee';
import { generateEmployeeData } from '@/utils/employeeDataGenerator';

const initialEmployees: Employee[] = generateEmployeeData();

export const useEmployeeCore = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newId = `EMP${String(employees.length + 1).padStart(3, '0')}`;
    setEmployees(prev => [...prev, { ...employee, id: newId }]);
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, ...updates } : emp
    ));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  return {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee
  };
};
