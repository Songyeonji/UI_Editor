// components/ui/EmptyState.tsx

import React from 'react';
import { RiInboxLine } from 'react-icons/ri';

interface EmptyStateProps {
  icon?: React.ReactNode;
  message: string;
  iconSize?: 'small' | 'medium' | 'large';
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  message,
  iconSize = 'medium',
  className = '',
}) => {
  const getIconContainerClass = () => {
    switch (iconSize) {
      case 'small':
        return 'w-10 h-10';
      case 'large':
        return 'w-20 h-20';
      case 'medium':
      default:
        return 'w-16 h-16';
    }
  };

  const getIconClass = () => {
    switch (iconSize) {
      case 'small':
        return 'text-xl';
      case 'large':
        return 'text-3xl';
      case 'medium':
      default:
        return 'text-2xl';
    }
  };

  const defaultIcon = <RiInboxLine className={getIconClass()} />;
  const displayIcon = icon || defaultIcon;

  return (
    <div className={`flex flex-col items-center justify-center py-4 ${className}`}>
      <div className={`${getIconContainerClass()} flex items-center justify-center bg-gray-100 rounded-full mb-4`}>
        {React.isValidElement(displayIcon)
          ? React.cloneElement(displayIcon as React.ReactElement<any>, {
            className: `${getIconClass()} text-gray-400`,
          })
          : displayIcon}
      </div>
      <p className="text-gray-500 text-center text-sm">{message}</p>
    </div>
  );
};