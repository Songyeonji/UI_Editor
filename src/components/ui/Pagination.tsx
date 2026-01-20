// components/ui/Pagination.tsx

import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

type PaginationSize = 'default' | 'small';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  size?: PaginationSize;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  size = 'default'
}) => {
  const generatePageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const pageNumbers = generatePageNumbers();

  const buttonClasses = size === 'small' ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm';
  const arrowButtonClasses = size === 'small' ? 'p-0.5' : 'p-1';
  const arrowIconClasses = size === 'small' ? 'w-4 h-4' : 'w-6 h-6';

  return (
    <div className={`flex items-center justify-center w-full px-4 py-2 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          ${arrowButtonClasses} rounded-full transition-colors
          ${currentPage === 1
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-indigo-600 hover:bg-indigo-100'
          }
        `}
      >
        <RiArrowLeftSLine className={arrowIconClasses} />
      </button>

      <div className="flex items-center mx-2 space-x-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="text-gray-500 px-1">
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              className={`
                ${buttonClasses} rounded-full transition-colors 
                flex items-center justify-center font-medium
                ${currentPage === page
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-indigo-100'
                }
              `}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          ${arrowButtonClasses} rounded-full transition-colors
          ${currentPage === totalPages
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-indigo-600 hover:bg-indigo-100'
          }
        `}
      >
        <RiArrowRightSLine className={arrowIconClasses} />
      </button>
    </div>
  );
};