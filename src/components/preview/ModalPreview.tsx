// components/preview/ModalPreview.tsx

import React from 'react';
import { RiCloseLine, RiInformationLine, RiAlertLine, RiErrorWarningLine, RiCheckboxCircleLine, RiUser2Line, RiComputerLine, RiBuildingLine } from 'react-icons/ri';
import { Pagination } from '../ui/Pagination';
import { EmptyState } from '../ui/EmptyState';
import type { ThemeColors, ConfirmModalType, ModalHeaderConfig, SmallTableData } from '../../types';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ModalPreviewProps {
  theme: ThemeColors;
  modalType: 'confirm' | 'general';
  confirmType: ConfirmModalType;
  modalTitle: string;
  modalMessage: string;
  confirmButtonText: string;
  cancelButtonText: string;
  showCancelButton: boolean;
  showEmptyState: boolean;
  emptyStateMessage: string;
  showTable: boolean;
  tableData: SmallTableData;
  modalHeader: ModalHeaderConfig;
  showModalHeader: boolean;
  modalSize: ModalSize;
  modalHeight: number;
  showPagination: boolean;
  currentPage: number;
  totalPages: number;
  previewScale: number;
}

export const ModalPreview: React.FC<ModalPreviewProps> = ({
  theme: t,
  modalType,
  confirmType,
  modalTitle,
  modalMessage,
  confirmButtonText,
  cancelButtonText,
  showCancelButton,
  showEmptyState,
  emptyStateMessage,
  showTable,
  tableData,
  modalHeader,
  showModalHeader,
  modalSize,
  modalHeight,
  showPagination,
  currentPage,
  totalPages,
  previewScale,
}) => {
  const confirmTypeConfig = {
    info: {
      icon: <RiInformationLine className="w-6 h-6" />,
      iconClass: 'bg-blue-500 text-white',
      buttonClass: 'bg-blue-500 hover:bg-blue-600',
    },
    warning: {
      icon: <RiAlertLine className="w-6 h-6" />,
      iconClass: 'bg-red-500/80 text-white',
      buttonClass: 'bg-red-500/80 hover:bg-red-600',
    },
    error: {
      icon: <RiErrorWarningLine className="w-6 h-6" />,
      iconClass: 'bg-red-500 text-white',
      buttonClass: 'bg-red-500 hover:bg-red-600',
    },
    success: {
      icon: <RiCheckboxCircleLine className="w-6 h-6" />,
      iconClass: 'bg-emerald-500 text-white',
      buttonClass: 'bg-emerald-500 hover:bg-emerald-600',
    },
    yesNo: {
      icon: <RiInformationLine className="w-6 h-6" />,
      iconClass: 'bg-blue-500 text-white',
      buttonClass: 'bg-blue-500 hover:bg-blue-600',
    },
  };

  const config = confirmTypeConfig[confirmType];

  const headerTypeIcons = {
    member: <RiUser2Line className="w-6 h-6" />,
    asset: <RiComputerLine className="w-6 h-6" />,
    department: <RiBuildingLine className="w-6 h-6" />,
  };

  const modalWidthMap = {
    sm: 384,
    md: 448,
    lg: 512,
    xl: 576,
    '2xl': 672,
  };

  // Confirm 모달 렌더링
  const renderConfirmModal = () => (
    <div
      className="relative overflow-hidden rounded-lg"
      style={{ 
        backgroundColor: t.panel, 
        color: t.text, 
        boxShadow: '0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04)',
        width: '384px',
        maxWidth: '100%'
      }}
    >
      <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: `1px solid ${t.border}` }}>
        <h3 className="text-lg font-semibold" style={{ color: t.text }}>
          {modalTitle}
        </h3>
        <button type="button" className="rounded-lg p-1 transition hover:bg-opacity-80" style={{ color: t.muted, backgroundColor: 'transparent' }}>
          <RiCloseLine className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-start py-4">
        <div className={`p-3 m-1 rounded-full shadow-lg mr-4 ml-4 flex items-center justify-center self-start ${config.iconClass}`}>
          {config.icon}
        </div>
        <div className="flex-1 pr-4">
          <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: t.text }}>
            {modalMessage}
          </p>
        </div>
      </div>

      <div className={`flex w-full p-4 ${showCancelButton ? 'space-x-3' : 'justify-center'}`}>
        {confirmType === 'yesNo' ? (
          <>
            {showCancelButton && (
              <button type="button" className="flex-1 rounded-md px-4 py-2 text-sm font-medium transition shadow-sm" style={{ backgroundColor: t.hover, border: `1px solid ${t.border}`, color: t.text }}>
                {cancelButtonText}
              </button>
            )}
            <button type="button" className={`${showCancelButton ? 'flex-1' : 'px-8'} rounded-md px-4 py-2 text-sm font-medium text-white transition shadow-sm ${config.buttonClass}`}>
              {confirmButtonText}
            </button>
          </>
        ) : (
          <>
            {showCancelButton && (
              <button type="button" className="flex-1 rounded-md px-4 py-2 text-sm font-medium transition shadow-sm" style={{ backgroundColor: t.hover, border: `1px solid ${t.border}`, color: t.text }}>
                {cancelButtonText}
              </button>
            )}
            <button type="button" className={`${showCancelButton ? 'flex-1' : 'px-8'} rounded-md px-4 py-2 text-sm font-medium text-white transition shadow-sm ${config.buttonClass}`}>
              {confirmButtonText}
            </button>
          </>
        )}
      </div>
    </div>
  );

  // General 모달 렌더링
  const renderGeneralModal = () => (
    <div
      className="relative overflow-hidden rounded-lg flex flex-col"
      style={{ 
        backgroundColor: t.panel, 
        color: t.text, 
        boxShadow: '0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04)',
        width: `${modalWidthMap[modalSize]}px`,
        height: `${modalHeight}px`,
        maxWidth: '100%'
      }}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-2 flex-shrink-0" style={{ borderBottom: `1px solid ${t.border}` }}>
        <h3 className="text-lg font-medium" style={{ color: t.text }}>
          {modalTitle}
        </h3>
        <button type="button" className="rounded-lg p-1 transition hover:bg-opacity-80" style={{ color: t.muted, backgroundColor: 'transparent' }}>
          <RiCloseLine className="w-6 h-6" />
        </button>
      </div>

      {/* 본문 */}
      <div className="flex-1 overflow-y-auto p-2 m-1" style={{ minHeight: 0 }}>
        <div className="space-y-4 p-2">
          {/* ModalHeader */}
          {showModalHeader && (
            <div className="rounded-lg p-4" style={{ backgroundColor: t.bg }}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: t.hover }}>
                  <span style={{ color: t.muted }}>{headerTypeIcons[modalHeader.type]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate" style={{ color: t.text }}>
                    {modalHeader.title}
                  </h3>
                  {modalHeader.subtitle && (
                    <p className="text-sm truncate mt-0.5" style={{ color: t.muted }}>
                      {modalHeader.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* EmptyState 또는 Table */}
          {showEmptyState ? (
            <EmptyState message={emptyStateMessage} iconSize="medium" />
          ) : showTable ? (
            <div className="rounded-lg overflow-hidden border" style={{ borderColor: t.border }}>
              <table className="w-full">
                <thead style={{ backgroundColor: t.header, borderBottom: `1px solid ${t.border}` }}>
                  <tr>
                    {tableData.headers.map((header, idx) => (
                      <th key={idx} className="px-3 py-2 text-left text-xs font-medium" style={{ color: t.text }}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.rows.length > 0 ? (
                    tableData.rows.map((row, rowIdx) => (
                      <tr key={rowIdx} style={{ backgroundColor: rowIdx % 2 === 0 ? t.bg : t.panel, borderBottom: `1px solid ${t.border}` }}>
                        {row.map((cell, cellIdx) => (
                          <td key={cellIdx} className="px-3 py-2 text-xs font-medium" style={{ color: t.text }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={tableData.headers.length} className="px-4 py-8 text-center text-sm" style={{ color: t.muted }}>
                        데이터가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-lg p-4" style={{ backgroundColor: t.bg, border: `1px solid ${t.border}` }}>
              <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: t.text }}>
                {modalMessage}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 푸터 - Pagination */}
      {showPagination && !showEmptyState && (
        <div className="flex-shrink-0" style={{ borderTop: `1px solid ${t.border}`, backgroundColor: t.panel }}>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={() => {}} size="small" />
        </div>
      )}
    </div>
  );

  return (
    <div
      className="absolute left-1/2 top-1/2 flex items-center justify-center"
      style={{
        width: 900,
        height: 600,
        transform: `translate(-50%, -50%) scale(${previewScale})`,
        transformOrigin: 'center',
        fontFamily: 'Pretendard',
      }}
    >
      {modalType === 'confirm' ? renderConfirmModal() : renderGeneralModal()}
    </div>
  );
};