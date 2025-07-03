
/**
 * Employee Records Header Component
 * Handles the top navigation and title section
 */

import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddEmployeeModal from './AddEmployeeModal';
import { Employee } from '@/hooks/useEmployeeData';

interface EmployeeRecordsHeaderProps {
  onAddEmployee: (employee: Omit<Employee, 'id'>) => void;
}

const EmployeeRecordsHeader = ({ onAddEmployee }: EmployeeRecordsHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              ← Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Employee Records</h1>
            </div>
          </div>
          <AddEmployeeModal onAddEmployee={onAddEmployee} />
        </div>
      </div>
    </header>
  );
};

export default EmployeeRecordsHeader;
