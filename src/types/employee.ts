
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
  profilePicture?: string;
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
