// components/ui/PageContainer.tsx

import React from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

interface PageContainerProps {
  /** 최상위 메뉴(예: 상위 섹션 링크). 없으면 렌더 안 함 */
  menu?: React.ReactNode;
  /** 서브 메뉴(예: 현재 페이지 그룹 내 링크). 없으면 렌더 안 함 */
  subMenu?: React.ReactNode;
  /** 페이지 제목 */
  title: React.ReactNode;
  /** 오른쪽 옵션 영역 */
  options?: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 본문 */
  children: React.ReactNode;
  /** 푸터 */
  footer?: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  menu,
  subMenu,
  title,
  options,
  className = '',
  children,
  footer,
}) => {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col pt-2">
      {/* 제목 + menu / subMenu를 한 줄에 + 오른쪽 옵션 */}
      <div className="mb-2 flex items-center justify-between">
        <h1 className="flex items-center text-xl font-bold text-text-base-light dark:text-text-base-dark">
          {menu && (
            <span className="mr-2 flex items-center text-gray-600 dark:text-gray-200">
              {menu}
              <RiArrowRightSLine className="ml-1 inline-block text-gray-600 dark:text-gray-200" />
            </span>
          )}

          {subMenu && (
            <span className="mr-2 flex items-center text-gray-700 dark:text-gray-100">
              {subMenu}
              <RiArrowRightSLine className="ml-1 inline-block text-gray-700 dark:text-gray-100" />
            </span>
          )}

          <span className="flex items-center text-gray-800 dark:text-gray-50">{title}</span>
        </h1>

        {/* 오른쪽 옵션 영역 */}
        {options && <div className="flex items-center gap-2">{options}</div>}
      </div>

      {/* 본문 */}
      <div className={`min-h-[500px] flex-grow gap-4 ${className}`}>{children}</div>

      {/* 푸터 */}
      {footer && <div className="mt-auto bg-white dark:bg-gray-800">{footer}</div>}
    </div>
  );
};