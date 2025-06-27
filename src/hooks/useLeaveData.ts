
import { useState, useMemo } from 'react';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employee: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  comments?: string;
}

export interface LeaveBalance {
  employeeId: string;
  employee: string;
  vacation: number;
  sick: number;
  personal: number;
  maternity: number;
  usedVacation: number;
  usedSick: number;
  usedPersonal: number;
  usedMaternity: number;
}

export interface LeaveType {
  id: string;
  name: string;
  description: string;
  maxDays: number;
  carryForward: boolean;
  requiresApproval: boolean;
  color: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'National' | 'Company' | 'Regional';
  description?: string;
}

const initialLeaveRequests: LeaveRequest[] = [
  {
    id: 'LR001',
    employeeId: 'EMP001',
    employee: 'John Smith',
    type: 'Vacation',
    startDate: '2024-07-15',
    endDate: '2024-07-19',
    days: 5,
    status: 'Pending',
    reason: 'Family vacation',
    appliedDate: '2024-06-15'
  },
  {
    id: 'LR002',
    employeeId: 'EMP002',
    employee: 'Sarah Johnson',
    type: 'Sick Leave',
    startDate: '2024-06-20',
    endDate: '2024-06-21',
    days: 2,
    status: 'Approved',
    reason: 'Medical appointment',
    appliedDate: '2024-06-18',
    approvedBy: 'HR Manager',
    approvedDate: '2024-06-19'
  },
  {
    id: 'LR003',
    employeeId: 'EMP003',
    employee: 'Mike Chen',
    type: 'Personal',
    startDate: '2024-07-01',
    endDate: '2024-07-01',
    days: 1,
    status: 'Rejected',
    reason: 'Personal matters',
    appliedDate: '2024-06-25',
    approvedBy: 'HR Manager',
    approvedDate: '2024-06-26',
    comments: 'Insufficient notice provided'
  }
];

const initialLeaveBalances: LeaveBalance[] = [
  {
    employeeId: 'EMP001',
    employee: 'John Smith',
    vacation: 25,
    sick: 15,
    personal: 5,
    maternity: 12,
    usedVacation: 10,
    usedSick: 7,
    usedPersonal: 2,
    usedMaternity: 0
  },
  {
    employeeId: 'EMP002',
    employee: 'Sarah Johnson',
    vacation: 25,
    sick: 15,
    personal: 5,
    maternity: 12,
    usedVacation: 13,
    usedSick: 10,
    usedPersonal: 3,
    usedMaternity: 0
  },
  {
    employeeId: 'EMP003',
    employee: 'Mike Chen',
    vacation: 20,
    sick: 12,
    personal: 4,
    maternity: 0,
    usedVacation: 5,
    usedSick: 2,
    usedPersonal: 1,
    usedMaternity: 0
  }
];

const initialLeaveTypes: LeaveType[] = [
  {
    id: 'vacation',
    name: 'Vacation Leave',
    description: 'Annual vacation days',
    maxDays: 25,
    carryForward: true,
    requiresApproval: true,
    color: 'blue'
  },
  {
    id: 'sick',
    name: 'Sick Leave',
    description: 'Medical leave',
    maxDays: 15,
    carryForward: false,
    requiresApproval: false,
    color: 'green'
  },
  {
    id: 'personal',
    name: 'Personal Leave',
    description: 'Personal matters',
    maxDays: 5,
    carryForward: false,
    requiresApproval: true,
    color: 'purple'
  },
  {
    id: 'maternity',
    name: 'Maternity/Paternity',
    description: 'Family leave',
    maxDays: 84,
    carryForward: false,
    requiresApproval: true,
    color: 'pink'
  }
];

const initialHolidays: Holiday[] = [
  { id: 'h1', name: 'Independence Day', date: '2024-07-04', type: 'National', description: 'National Holiday' },
  { id: 'h2', name: 'Labor Day', date: '2024-09-02', type: 'National', description: 'National Holiday' },
  { id: 'h3', name: 'Thanksgiving', date: '2024-11-28', type: 'National', description: 'National Holiday' },
  { id: 'h4', name: 'Christmas Day', date: '2024-12-25', type: 'National', description: 'National Holiday' },
  { id: 'h5', name: 'New Year\'s Day', date: '2025-01-01', type: 'National', description: 'National Holiday' },
  { id: 'h6', name: 'Company Retreat', date: '2024-08-15', type: 'Company', description: 'Company Event' }
];

export const useLeaveData = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>(initialLeaveBalances);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>(initialLeaveTypes);
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays);

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [employeeFilter, setEmployeeFilter] = useState<string>('all');

  const filteredRequests = useMemo(() => {
    return leaveRequests.filter(request => {
      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
      const matchesType = typeFilter === 'all' || request.type === typeFilter;
      const matchesEmployee = employeeFilter === 'all' || request.employee === employeeFilter;
      return matchesStatus && matchesType && matchesEmployee;
    });
  }, [leaveRequests, statusFilter, typeFilter, employeeFilter]);

  const addLeaveRequest = (request: Omit<LeaveRequest, 'id' | 'appliedDate'>) => {
    const newId = `LR${String(leaveRequests.length + 1).padStart(3, '0')}`;
    const newRequest: LeaveRequest = {
      ...request,
      id: newId,
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setLeaveRequests(prev => [...prev, newRequest]);
  };

  const updateLeaveRequest = (id: string, updates: Partial<LeaveRequest>) => {
    setLeaveRequests(prev => prev.map(request =>
      request.id === id ? { ...request, ...updates } : request
    ));
  };

  const approveLeaveRequest = (id: string, approvedBy: string, comments?: string) => {
    updateLeaveRequest(id, {
      status: 'Approved',
      approvedBy,
      approvedDate: new Date().toISOString().split('T')[0],
      comments
    });
  };

  const rejectLeaveRequest = (id: string, approvedBy: string, comments: string) => {
    updateLeaveRequest(id, {
      status: 'Rejected',
      approvedBy,
      approvedDate: new Date().toISOString().split('T')[0],
      comments
    });
  };

  const deleteLeaveRequest = (id: string) => {
    setLeaveRequests(prev => prev.filter(request => request.id !== id));
  };

  const addLeaveType = (leaveType: Omit<LeaveType, 'id'>) => {
    const newId = leaveType.name.toLowerCase().replace(/\s+/g, '-');
    setLeaveTypes(prev => [...prev, { ...leaveType, id: newId }]);
  };

  const updateLeaveType = (id: string, updates: Partial<LeaveType>) => {
    setLeaveTypes(prev => prev.map(type =>
      type.id === id ? { ...type, ...updates } : type
    ));
  };

  const deleteLeaveType = (id: string) => {
    setLeaveTypes(prev => prev.filter(type => type.id !== id));
  };

  const addHoliday = (holiday: Omit<Holiday, 'id'>) => {
    const newId = `h${holidays.length + 1}`;
    setHolidays(prev => [...prev, { ...holiday, id: newId }]);
  };

  const updateHoliday = (id: string, updates: Partial<Holiday>) => {
    setHolidays(prev => prev.map(holiday =>
      holiday.id === id ? { ...holiday, ...updates } : holiday
    ));
  };

  const deleteHoliday = (id: string) => {
    setHolidays(prev => prev.filter(holiday => holiday.id !== id));
  };

  const updateLeaveBalance = (employeeId: string, updates: Partial<LeaveBalance>) => {
    setLeaveBalances(prev => prev.map(balance =>
      balance.employeeId === employeeId ? { ...balance, ...updates } : balance
    ));
  };

  const getEmployeeBalance = (employeeId: string) => {
    return leaveBalances.find(balance => balance.employeeId === employeeId);
  };

  const getAvailableBalance = (employeeId: string, leaveTypeId: string) => {
    const balance = getEmployeeBalance(employeeId);
    if (!balance) return 0;

    switch (leaveTypeId) {
      case 'vacation': return balance.vacation - balance.usedVacation;
      case 'sick': return balance.sick - balance.usedSick;
      case 'personal': return balance.personal - balance.usedPersonal;
      case 'maternity': return balance.maternity - balance.usedMaternity;
      default: return 0;
    }
  };

  const pendingRequests = leaveRequests.filter(req => req.status === 'Pending').length;
  const approvedThisMonth = leaveRequests.filter(req => 
    req.status === 'Approved' && 
    new Date(req.approvedDate || '').getMonth() === new Date().getMonth()
  ).length;

  return {
    leaveRequests: filteredRequests,
    allLeaveRequests: leaveRequests,
    leaveBalances,
    leaveTypes,
    holidays,
    statusFilter,
    typeFilter,
    employeeFilter,
    setStatusFilter,
    setTypeFilter,
    setEmployeeFilter,
    addLeaveRequest,
    updateLeaveRequest,
    approveLeaveRequest,
    rejectLeaveRequest,
    deleteLeaveRequest,
    addLeaveType,
    updateLeaveType,
    deleteLeaveType,
    addHoliday,
    updateHoliday,
    deleteHoliday,
    updateLeaveBalance,
    getEmployeeBalance,
    getAvailableBalance,
    pendingRequests,
    approvedThisMonth
  };
};
