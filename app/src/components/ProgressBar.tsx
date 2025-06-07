import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label: string;
  color: 'blue' | 'red' | 'green';
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max = 100, 
  label, 
  color,
  className = '' 
}) => {
  const percentage = Math.round((value / max) * 100);
  
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    red: 'from-red-500 to-red-600',
    green: 'from-green-500 to-green-600'
  };

  const bgColorClasses = {
    blue: 'bg-blue-100',
    red: 'bg-red-100',
    green: 'bg-green-100'
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{value}</span>
      </div>
      <div className={`w-full h-3 ${bgColorClasses[color]} rounded-full overflow-hidden`}>
        <div
          className={`h-full bg-gradient-to-r ${colorClasses[color]} transition-all duration-700 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;