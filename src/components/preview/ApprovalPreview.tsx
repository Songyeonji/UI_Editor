// components/preview/ApprovalPreview.tsx

import React from 'react';
import { Pagination } from '../ui/Pagination';
import { EmptyState } from '../ui/EmptyState';
import { DocumentUploader, type DocumentFile } from '../ui/DocumentUploader';
import { ProgramUploader, type ProgramFile } from '../ui/ProgramUploader';
import type { ThemeColors, FormField, UploaderType } from '../../types';

interface ApprovalPreviewProps {
  theme: ThemeColors;
  approvalTitle: string;
  approvalSubtitle: string;
  formFields: FormField[];
  uploaderType: UploaderType;
  documentFiles: DocumentFile[];
  programFiles: ProgramFile[];
  showPagination: boolean;
  showEmptyState: boolean;
  emptyStateMessage: string;
  currentPage: number;
  totalPages: number;
  previewScale: number;
}

export const ApprovalPreview: React.FC<ApprovalPreviewProps> = ({
  theme: t,
  approvalTitle,
  approvalSubtitle,
  formFields,
  uploaderType,
  documentFiles,
  programFiles,
  showPagination,
  showEmptyState,
  emptyStateMessage,
  currentPage,
  totalPages,
  previewScale,
}) => {
  const [openDropdownId, setOpenDropdownId] = React.useState<string | null>(null);

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: 500,
        height: 700,
        transform: `translate(-50%, -50%) scale(${previewScale})`,
        transformOrigin: 'center',
        fontFamily: 'Pretendard',
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl p-4" style={{ backgroundColor: t.bg, color: t.text }}>
        {/* 제목 */}
        <div className="mb-4">
          <h1 className="text-[18px] font-black" style={{ color: t.text }}>
            {approvalTitle}
          </h1>
          {approvalSubtitle && (
            <div className="mt-2 text-[12px] font-semibold" style={{ color: t.muted }}>
              {approvalSubtitle}
            </div>
          )}
        </div>

        {/* 본문 영역 */}
        <div className="h-[calc(100%-180px)] overflow-y-auto">
          {showEmptyState ? (
            <EmptyState message={emptyStateMessage} iconSize="medium" className="py-12" />
          ) : (
            <div className="space-y-3">
              {/* 파일 업로더 */}
              {uploaderType === 'document' && (
                <div>
                  <label className="block text-[12px] font-extrabold mb-1" style={{ color: t.text }}>
                    허용할 문서 선택 <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <DocumentUploader
                    documents={documentFiles}
                    onAdd={() => {}}
                    onRemove={() => {}}
                    disabled={true}
                  />
                </div>
              )}

              {uploaderType === 'program' && (
                <div>
                  <label className="block text-[12px] font-extrabold mb-1" style={{ color: t.text }}>
                    프로그램 파일 선택 (EXE, LNK) <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <ProgramUploader
                    programs={programFiles}
                    onAdd={() => {}}
                    onRemove={() => {}}
                    disabled={true}
                  />
                </div>
              )}

              {/* 양식 필드들 */}
              {formFields.map((field) => (
                <div key={field.id} style={{ width: field.width === 'full' ? '100%' : '50%', display: 'inline-block', paddingRight: field.width === 'half' ? '8px' : '0' }}>
                  <label className="mb-1 block text-[12px] font-extrabold" style={{ color: t.text }}>
                    {field.label} {field.required && <span style={{ color: '#ef4444' }}>*</span>}
                  </label>
                  {field.type === 'dropdown' ? (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenDropdownId(openDropdownId === field.id ? null : field.id)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-[12px] font-semibold outline-none transition"
                        style={{ backgroundColor: t.panel, border: `1px solid ${t.border}`, color: t.text }}
                      >
                        <span>{field.options && field.options.length > 0 ? field.options[0].label : '옵션 선택'}</span>
                        <svg
                          className="h-4 w-4 transition-transform"
                          style={{ transform: openDropdownId === field.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {openDropdownId === field.id && field.options && (
                        <div
                          className="absolute left-0 right-0 top-full z-10 mt-1 rounded-xl py-1 shadow-lg"
                          style={{ backgroundColor: t.panel, border: `1px solid ${t.border}` }}
                        >
                          {field.options.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setOpenDropdownId(null)}
                              className="w-full px-3 py-2 text-left text-[12px] font-semibold transition hover:bg-opacity-80"
                              style={{ color: t.text, backgroundColor: 'transparent' }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = t.hover)}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : field.label === '사유' ? (
                    <textarea
                      placeholder={field.placeholder || ''}
                      value={field.defaultValue || ''}
                      className="w-full resize-none rounded-xl px-3 py-2 text-[12px] font-semibold outline-none"
                      style={{ backgroundColor: t.panel, border: `1px solid ${t.border}`, color: t.text, minHeight: '80px' }}
                      readOnly
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder={field.placeholder || ''}
                      value={field.defaultValue || ''}
                      className="w-full rounded-xl px-3 py-2 text-[12px] font-semibold outline-none"
                      style={{ backgroundColor: t.panel, border: `1px solid ${t.border}`, color: t.text }}
                      readOnly
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 페이지네이션 */}
        {showPagination && !showEmptyState && (
          <div className="absolute bottom-14 left-0 right-0" style={{ borderTop: `1px solid ${t.border}`, backgroundColor: t.bg }}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={() => {}}
              size="small"
            />
          </div>
        )}

        {/* 승인 버튼 영역 */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            type="button"
            className="rounded-xl px-4 py-2 text-[12px] font-extrabold transition"
            style={{ backgroundColor: t.hover, border: `1px solid ${t.border}`, color: t.text }}
          >
            취소
          </button>
          <button
            type="button"
            className="rounded-xl px-4 py-2 text-[12px] font-extrabold text-white transition"
            style={{ backgroundColor: '#6366f1' }}
          >
            승인 요청
          </button>
        </div>
      </div>
    </div>
  );
};