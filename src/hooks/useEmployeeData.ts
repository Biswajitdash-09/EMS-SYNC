
/**
 * Main employee data management hook
 * Combines core employee operations with filtering capabilities
 * Provides a unified interface for employee data management
 */

import { useEmployeeCore } from './employee/useEmployeeCore';
import { useEmployeeFilters } from './employee/useEmployeeFilters';

export type { Employee } from '@/types/employee';

export const useEmployeeData = () => {
  // Get core employee CRUD operations
  const {
    employees: allEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
  } = useEmployeeCore();

  // Get filtering and search functionality
  const {
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    filteredEmployees,
    departments,
    statuses
  } = useEmployeeFilters(allEmployees);

  // Return combined employee data management interface
  return {
    employees: filteredEmployees,
    allEmployees,
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    departments,
    statuses,
    addEmployee,
    updateEmployee,
    deleteEmployee
  };
};
