
/**
 * Employee Data Generator
 * Generates sample employee data for testing and development
 * Creates realistic employee records with comprehensive information including login credentials
 */

import { Employee } from '@/types/employee';

// Sample data arrays for generating realistic employee information
const firstNames = [
  'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'James', 'Jessica', 'Robert', 'Ashley',
  'William', 'Amanda', 'Richard', 'Jennifer', 'Joseph', 'Michelle', 'Thomas', 'Melissa', 'Christopher', 'Kimberly',
  'Charles', 'Amy', 'Daniel', 'Angela', 'Matthew', 'Helen', 'Anthony', 'Deborah', 'Mark', 'Rachel',
  'Donald', 'Carolyn', 'Steven', 'Janet', 'Paul', 'Virginia', 'Andrew', 'Maria', 'Joshua', 'Heather',
  'Kenneth', 'Diane', 'Kevin', 'Ruth', 'Brian', 'Julie', 'George', 'Joyce', 'Edward', 'Victoria',
  'Ronald', 'Kelly', 'Timothy', 'Christina', 'Jason', 'Joan', 'Jeffrey', 'Evelyn', 'Ryan', 'Lauren',
  'Jacob', 'Judith', 'Gary', 'Megan', 'Nicholas', 'Cheryl', 'Eric', 'Andrea', 'Jonathan', 'Hannah',
  'Stephen', 'Jacqueline', 'Larry', 'Martha', 'Justin', 'Gloria', 'Scott', 'Teresa', 'Brandon', 'Sara',
  'Benjamin', 'Janice', 'Samuel', 'Marie', 'Gregory', 'Julie', 'Alexander', 'Kathryn', 'Frank', 'Catherine',
  'Raymond', 'Frances', 'Jack', 'Samantha', 'Dennis', 'Debra', 'Jerry', 'Rachel', 'Tyler', 'Carolyn'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
  'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
  'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper',
  'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
  'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes',
  'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez'
];

const departments = [
  'Engineering', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations', 
  'Legal', 'Design', 'Product', 'Customer Support'
];

const roles = {
  'Engineering': ['Software Engineer', 'Senior Software Engineer', 'Tech Lead', 'Engineering Manager', 'DevOps Engineer', 'QA Engineer'],
  'HR': ['HR Specialist', 'HR Manager', 'Recruiter', 'HR Business Partner', 'Compensation Analyst'],
  'Finance': ['Financial Analyst', 'Accountant', 'Finance Manager', 'Controller', 'Treasury Analyst'],
  'Marketing': ['Marketing Specialist', 'Digital Marketing Manager', 'Content Creator', 'Brand Manager', 'Marketing Director'],
  'Sales': ['Sales Representative', 'Account Manager', 'Sales Manager', 'Business Development', 'Sales Director'],
  'Operations': ['Operations Analyst', 'Project Manager', 'Operations Manager', 'Process Improvement Specialist'],
  'Legal': ['Legal Counsel', 'Paralegal', 'Compliance Officer', 'Contract Manager'],
  'Design': ['UI/UX Designer', 'Graphic Designer', 'Product Designer', 'Design Manager'],
  'Product': ['Product Manager', 'Product Owner', 'Product Analyst', 'Product Director'],
  'Customer Support': ['Support Specialist', 'Customer Success Manager', 'Support Team Lead', 'Technical Support']
};

const statuses: Array<'Active' | 'Probation' | 'Terminated'> = ['Active', 'Probation', 'Terminated'];

const managers = [
  'Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Emma Brown',
  'Frank Miller', 'Grace Lee', 'Henry Garcia', 'Isabel Martinez', 'Jack Thompson'
];

/**
 * Generate a random employee record with realistic data including login credentials
 */
const generateSingleEmployee = (index: number): Employee => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const fullName = `${firstName} ${lastName}`;
  const department = departments[Math.floor(Math.random() * departments.length)];
  const rolesList = roles[department as keyof typeof roles];
  const role = rolesList[Math.floor(Math.random() * rolesList.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  // Generate realistic dates
  const joinYear = 2020 + Math.floor(Math.random() * 5);
  const joinMonth = Math.floor(Math.random() * 12) + 1;
  const joinDay = Math.floor(Math.random() * 28) + 1;
  const joinDate = `${joinYear}-${joinMonth.toString().padStart(2, '0')}-${joinDay.toString().padStart(2, '0')}`;
  
  const birthYear = 1970 + Math.floor(Math.random() * 35);
  const birthMonth = Math.floor(Math.random() * 12) + 1;
  const birthDay = Math.floor(Math.random() * 28) + 1;
  const dateOfBirth = `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`;
  
  // Generate login credentials
  const loginEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`;
  const password = `Pass${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}!`;
  
  return {
    id: `EMP${String(index + 1).padStart(3, '0')}`,
    name: fullName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
    phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    department,
    role,
    status,
    joinDate,
    address: `${Math.floor(Math.random() * 9999) + 1} ${['Main St', 'Oak Ave', 'Pine Rd', 'Elm Dr', 'Cedar Ln'][Math.floor(Math.random() * 5)]}, ${['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)]}, ${['NY', 'CA', 'IL', 'TX', 'AZ'][Math.floor(Math.random() * 5)]} ${Math.floor(Math.random() * 90000) + 10000}`,
    dateOfBirth,
    emergencyContact: {
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      relationship: ['Spouse', 'Parent', 'Sibling', 'Friend'][Math.floor(Math.random() * 4)]
    },
    manager: managers[Math.floor(Math.random() * managers.length)],
    baseSalary: Math.floor(Math.random() * 100000) + 50000,
    loginCredentials: {
      loginEmail,
      password,
      isActive: status === 'Active'
    },
    employmentHistory: [
      {
        title: role,
        department,
        startDate: joinDate,
        current: true
      }
    ],
    documents: []
  };
};

/**
 * Generate array of sample employee data
 * Creates 100 realistic employee records with comprehensive information
 */
export const generateEmployeeData = (): Employee[] => {
  const employees: Employee[] = [];
  
  // Generate 100 employees
  for (let i = 0; i < 100; i++) {
    employees.push(generateSingleEmployee(i));
  }
  
  return employees;
};
