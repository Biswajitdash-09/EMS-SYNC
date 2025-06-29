
import { useEmployeeCore } from './employee/useEmployeeCore';
import { useEmployeeFilters } from './employee/useEmployeeFilters';

export { Employee } from '@/types/employee';

export const useEmployeeData = () => {
  const {
    employees: allEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
  } = useEmployeeCore();

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
