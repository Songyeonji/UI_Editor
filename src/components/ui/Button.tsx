// components/ui/Button.tsx

import React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'icon'
  | 'sm'
  | 'xs'
  | 'refresh'
  | 'delete'
  | 'action'
  | 'add'
  | 'tableIcon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

const baseStyles: Record<ButtonVariant, string> = {
  primary: 'px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors',
  secondary: 'px-4 py-2 rounded-md font-medium transition-colors border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800',
  icon: 'p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full',
  sm: 'px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors',
  xs: 'px-2 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors',
  action: 'px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800',
  refresh: 'px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-1 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800',
  delete: 'px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white',
  add: 'px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-1 bg-indigo-600 text-white hover:bg-indigo-700',
  tableIcon: 'px-4 py-0.5 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded transition-colors',
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  return (
    <button
      type="button"
      className={`${baseStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;