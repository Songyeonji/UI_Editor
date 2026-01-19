// components/preview/ApprovalPreview.tsx

import React from 'react';
import type { ThemeColors, FormField } from '../../types';

interface ApprovalPreviewProps {
  theme: ThemeColors;
  approvalTitle: string;
  approvalSubtitle: string;
  formFields: FormField[];
  previewScale: number;
}

export const ApprovalPreview: React.FC<ApprovalPreviewProps> = ({
  theme: t,
  approvalTitle,
  approvalSubtitle,
  formFields,
  previewScale,
}) => {
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

        {/* 양식 필드들 */}
        <div className="space-y-3">
          {formFields.map((field) => (
            <div
              key={field.id}
              style={{
                width: field.width === 'full' ? '100%' : '50%',
                display: 'inline-block',
                paddingRight: field.width === 'half' ? '8px' : '0',
              }}
            >
              <label className="mb-1 block text-[12px] font-extrabold" style={{ color: t.text }}>
                {field.label} {field.required && <span style={{ color: '#ef4444' }}>*</span>}
              </label>

              {field.type === 'dropdown' ? (
                <div
                  className="rounded-xl px-3 py-2 text-[12px] font-semibold"
                  style={{ backgroundColor: t.panel, border: `1px solid ${t.border}`, color: t.text }}
                >
                  {field.options && field.options.length > 0 ? field.options[0].label : '옵션 선택'}
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