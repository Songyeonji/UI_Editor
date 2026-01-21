// components/ui/StatusBadge.tsx

import React from 'react';

type BadgeVariant = 'blue' | 'yellow' | 'green' | 'red';

interface StatusBadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'small';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  variant,
  children,
  className = '',
  size = 'default',
}) => {
  let bgColor = '';
  let sizeClasses = '';

  // 크기
  switch (size) {
    case 'small':
      sizeClasses = 'px-1.5 py-0.5 text-xs';
      break;
    case 'default':
    default:
      sizeClasses = 'px-2 py-1 text-xs';
      break;
  }

  // Tailwind 색상 (모든 글씨는 흰색)
  switch (variant) {
    case 'blue':
      bgColor = 'bg-blue-600';
      break;
    case 'yellow':
      bgColor = 'bg-yellow-500';
      break;
    case 'green':
      bgColor = 'bg-green-500';
      break;
    case 'red':
      bgColor = 'bg-red-500';
      break;
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium text-white ${bgColor} ${sizeClasses} ${className}`}
    >
      {children}
    </span>
  );
};