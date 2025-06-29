import { Employee } from '@/types/employee';

// Generate comprehensive dummy employee data
export const generateEmployeeData = (): Employee[] => {
  const departments = ['Engineering', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations', 'Legal', 'Design', 'Product', 'Customer Support'];
  const roles = {
    Engineering: ['Senior Developer', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'QA Engineer', 'Tech Lead', 'Software Architect'],
    HR: ['HR Manager', 'HR Specialist', 'Recruiter', 'HR Coordinator', 'People Operations Manager'],
    Finance: ['Financial Analyst', 'Accountant', 'Finance Manager', 'Controller', 'Budget Analyst'],
    Marketing: ['Marketing Manager', 'Content Writer', 'Digital Marketing Specialist', 'Brand Manager', 'SEO Specialist'],
    Sales: ['Sales Manager', 'Account Executive', 'Sales Representative', 'Business Development Manager', 'Sales Coordinator'],
    Operations: ['Operations Manager', 'Project Manager', 'Business Analyst', 'Operations Coordinator', 'Process Improvement Specialist'],
    Legal: ['Legal Counsel', 'Paralegal', 'Compliance Officer', 'Contract Manager'],
    Design: ['UX Designer', 'UI Designer', 'Graphic Designer', 'Product Designer', 'Design Manager'],
    Product: ['Product Manager', 'Product Owner', 'Product Analyst', 'Product Marketing Manager'],
    'Customer Support': ['Support Manager', 'Customer Success Manager', 'Technical Support Specialist', 'Customer Service Representative']
  };

  const firstNames = [
    'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William',
    'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia', 'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander',
    'Abigail', 'Michael', 'Emily', 'Daniel', 'Elizabeth', 'Matthew', 'Sofia', 'Owen', 'Avery', 'Jackson',
    'Ella', 'Sebastian', 'Madison', 'Jack', 'Scarlett', 'Aiden', 'Victoria', 'Samuel', 'Aria', 'David',
    'Grace', 'Carter', 'Chloe', 'Wyatt', 'Camila', 'Jayden', 'Penelope', 'John', 'Riley', 'Luke',
    'Layla', 'Anthony', 'Lillian', 'Isaac', 'Nora', 'Dylan', 'Zoey', 'Christopher', 'Mila', 'Joshua',
    'Aubrey', 'Andrew', 'Hannah', 'Lily', 'Gabriel', 'Addison', 'Logan', 'Eleanor', 'Jake',
    'Natalie', 'Nathan', 'Ryan', 'Savannah', 'Aaron', 'Brooklyn', 'Thomas', 'Leah', 'Caleb',
    'Zoe', 'Connor', 'Stella', 'Isaiah', 'Hazel', 'Charles', 'Ellie', 'Eli', 'Paisley', 'Landon',
    'Audrey', 'Christian', 'Skylar', 'Jonathan', 'Violet', 'Hunter', 'Claire', 'Jordan', 'Bella', 'Robert'
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

  const streets = [
    'Main St', 'Oak Ave', 'Pine St', 'Maple Ave', 'Cedar Rd', 'Elm St', 'Park Ave', 'First St', 'Second St', 'Third St',
    'Washington St', 'Lincoln Ave', 'Jefferson Rd', 'Madison St', 'Franklin Ave', 'Jackson St', 'Adams Ave', 'Wilson Rd',
    'Sunset Blvd', 'Broadway', 'Market St', 'Church St', 'School St', 'High St', 'Spring St', 'Summer St', 'Winter St',
    'Hill Rd', 'Valley Dr', 'River Rd', 'Lake St', 'Forest Ave', 'Garden St', 'Rose Ave', 'Lily St', 'Daisy Dr'
  ];

  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
    'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington',
    'Boston', 'El Paso', 'Detroit', 'Nashville', 'Portland', 'Memphis', 'Oklahoma City', 'Las Vegas', 'Louisville', 'Baltimore'
  ];

  const states = [
    'NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH', 'NC', 'WA', 'CO', 'DC', 'MA', 'MI', 'TN', 'OR', 'KY', 'MD', 'NV', 'OK'
  ];

  const managers = [
    'Alice Johnson', 'Robert Davis', 'Jennifer Wilson', 'Michael Brown', 'Sarah Miller', 'David Garcia', 'Emily Rodriguez',
    'James Martinez', 'Lisa Anderson', 'William Thompson', 'Maria Hernandez', 'Christopher Lopez', 'Jessica Gonzalez',
    'Matthew White', 'Ashley Harris', 'Daniel Clark', 'Amanda Lewis', 'Joshua Robinson', 'Michelle Walker', 'Andrew Young'
  ];

  const profilePictures = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b332c589?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1541647376583-8934aaf3448a?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
  ];

  const getRandomItem = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];
  const getRandomDate = (start: Date, end: Date): string => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
  };

  const employees: Employee[] = [];

  // Keep existing 3 employees
  employees.push(
    {
      id: 'EMP001',
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+1 234-567-8900',
      department: 'Engineering',
      role: 'Senior Developer',
      status: 'Active',
      joinDate: '2022-01-15',
      address: '123 Main St, New York, NY',
      dateOfBirth: '1990-05-15',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
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
      address: '456 Oak Ave, Los Angeles, CA',
      dateOfBirth: '1988-08-22',
      profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b332c589?w=150&h=150&fit=crop&crop=face',
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
      address: '789 Pine St, Chicago, IL',
      dateOfBirth: '1992-12-03',
      profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
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
  );

  // Generate 97 additional employees (to make 100 total)
  for (let i = 4; i <= 100; i++) {
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const fullName = `${firstName} ${lastName}`;
    const department = getRandomItem(departments);
    const role = getRandomItem(roles[department as keyof typeof roles]);
    const joinDate = getRandomDate(new Date('2020-01-01'), new Date('2024-12-01'));
    const birthDate = getRandomDate(new Date('1980-01-01'), new Date('2000-12-31'));
    const status = Math.random() > 0.8 ? (Math.random() > 0.5 ? 'Probation' : 'Terminated') : 'Active';
    const streetNumber = Math.floor(Math.random() * 9999) + 1;
    const street = getRandomItem(streets);
    const city = getRandomItem(cities);
    const state = getRandomItem(states);
    const zipCode = Math.floor(Math.random() * 90000) + 10000;
    const baseSalary = Math.floor(Math.random() * 70000) + 40000; // $40k - $110k
    const profilePicture = getRandomItem(profilePictures);

    const employee: Employee = {
      id: `EMP${String(i).padStart(3, '0')}`,
      name: fullName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      phone: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      department,
      role,
      status,
      joinDate,
      address: `${streetNumber} ${street}, ${city}, ${state} ${zipCode}`,
      dateOfBirth: birthDate,
      profilePicture,
      emergencyContact: {
        name: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
        phone: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        relationship: getRandomItem(['Spouse', 'Parent', 'Sibling', 'Friend', 'Partner'])
      },
      manager: getRandomItem(managers),
      baseSalary,
      employmentHistory: [
        {
          title: role,
          department,
          startDate: joinDate,
          current: status !== 'Terminated'
        }
      ],
      documents: [
        {
          id: `doc${i}`,
          name: 'Employment Contract',
          type: 'PDF',
          size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
          uploadDate: joinDate
        }
      ]
    };

    employees.push(employee);
  }

  return employees;
};
