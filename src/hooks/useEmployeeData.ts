
import { useState, useMemo } from 'react';

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: 'Active' | 'Probation' | 'Terminated';
  joinDate: string;
  address: string;
  dateOfBirth: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  manager: string;
  baseSalary: number;
  employmentHistory: Array<{
    title: string;
    department: string;
    startDate: string;
    endDate?: string;
    current: boolean;
  }>;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
  }>;
}

const initialEmployees: Employee[] = [
  {
    id: 'EMP001',
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+1 234-567-8900',
    department: 'Engineering',
    role: 'Senior Developer',
    status: 'Active',
    joinDate: '2022-01-15',
    address: '123 Main St, City, State',
    dateOfBirth: '1990-05-15',
    emergencyContact: {
      name: 'Jane Smith',
      phone: '+1 234-567-8901',
      relationship: 'Spouse'
    },
    manager: 'Alice Johnson',
    baseSalary: 85000,
    employmentHistory: [
      {
        title: 'Senior Developer',
        department: 'Engineering',
        startDate: '2022-01-15',
        current: true
      },
      {
        title: 'Developer',
        department: 'Engineering',
        startDate: '2020-06-01',
        endDate: '2022-01-14',
        current: false
      }
    ],
    documents: [
      {
        id: 'doc1',
        name: 'Employment Contract',
        type: 'PDF',
        size: '2.4 MB',
        uploadDate: '2022-01-15'
      },
      {
        id: 'doc2',
        name: 'ID Verification',
        type: 'PDF',
        size: '1.8 MB',
        uploadDate: '2022-01-15'
      }
    ]
  },
  {
    id: 'EMP002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 234-567-8901',
    department: 'HR',
    role: 'HR Manager',
    status: 'Active',
    joinDate: '2021-03-10',
    address: '456 Oak Ave, City, State',
    dateOfBirth: '1988-08-22',
    emergencyContact: {
      name: 'Mike Johnson',
      phone: '+1 234-567-8902',
      relationship: 'Husband'
    },
    manager: 'CEO',
    baseSalary: 78000,
    employmentHistory: [
      {
        title: 'HR Manager',
        department: 'HR',
        startDate: '2021-03-10',
        current: true
      }
    ],
    documents: [
      {
        id: 'doc3',
        name: 'Employment Contract',
        type: 'PDF',
        size: '2.1 MB',
        uploadDate: '2021-03-10'
      }
    ]
  },
  {
    id: 'EMP003',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    phone: '+1 234-567-8902',
    department: 'Finance',
    role: 'Financial Analyst',
    status: 'Probation',
    joinDate: '2024-01-05',
    address: '789 Pine St, City, State',
    dateOfBirth: '1992-12-03',
    emergencyContact: {
      name: 'Lisa Chen',
      phone: '+1 234-567-8903',
      relationship: 'Sister'
    },
    manager: 'Robert Davis',
    baseSalary: 65000,
    employmentHistory: [
      {
        title: 'Financial Analyst',
        department: 'Finance',
        startDate: '2024-01-05',
        current: true
      }
    ],
    documents: [
      {
        id: 'doc4',
        name: 'Employment Contract',
        type: 'PDF',
        size: '1.9 MB',
        uploadDate: '2024-01-05'
      }
    ]
  }
];

export const useEmployeeData = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = !departmentFilter || employee.department === departmentFilter;
      const matchesStatus = !statusFilter || employee.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, searchTerm, departmentFilter, statusFilter]);

  const departments = useMemo(() => {
    return Array.from(new Set(employees.map(emp => emp.department)));
  }, [employees]);

  const statuses = useMemo(() => {
    return Array.from(new Set(employees.map(emp => emp.status)));
  }, [employees]);

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
    employees: filteredEmployees,
    allEmployees: employees,
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
