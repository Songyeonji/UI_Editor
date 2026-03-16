// components/preview/CompanyFormPreview.tsx
import React, { useState } from 'react';
import type { CompanyFormConfig } from '../../types';

interface CompanyFormPreviewProps {
  config: CompanyFormConfig;
}

// ─── 인라인 스타일 상수 (CSS 상속 차단) ──────────────────────────────────────
const OUTER: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '32px 16px',
  minHeight: 400,
  backgroundColor: 'transparent',
};

const CARD: React.CSSProperties = {
  width: '100%',
  maxWidth: 480,
  backgroundColor: '#ffffff',
  borderRadius: 16,
  boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
  overflow: 'hidden',
  color: '#1f2937',
};

const CARD_HEADER: React.CSSProperties = {
  padding: '28px 32px 20px',
  borderBottom: '1px solid #f0f0f0',
};

const CARD_BODY: React.CSSProperties = {
  padding: '24px 32px',
  display: 'grid',
  gap: 16,
};

const CARD_FOOTER: React.CSSProperties = {
  padding: '0 32px 28px',
  display: 'grid',
  gap: 10,
};

const TITLE_STYLE: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  color: '#111827',
  margin: 0,
  lineHeight: 1.3,
};

const SUBTITLE_STYLE: React.CSSProperties = {
  fontSize: 13,
  color: '#6b7280',
  marginTop: 4,
};

const FIELD_WRAP: React.CSSProperties = {
  display: 'grid',
  gap: 6,
};

const LABEL_STYLE: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: '#374151',
  display: 'block',
};

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid #e5e7eb',
  borderRadius: 10,
  fontSize: 14,
  color: '#111827',
  backgroundColor: '#f9fafb',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
};

const NOTICE_WRAP: React.CSSProperties = {
  margin: '0 32px 24px',
  padding: '14px 16px',
  backgroundColor: '#fffbeb',
  border: '1px solid #fde68a',
  borderRadius: 10,
};

const NOTICE_TITLE: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: '#92400e',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: 6,
};

const NOTICE_TEXT: React.CSSProperties = {
  fontSize: 12,
  color: '#78350f',
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap',
  margin: 0,
};

// ─── 버튼 색상 팔레트 (버튼 순서에 따라 다름) ─────────────────────────────────
const BTN_COLORS: Array<{ bg: string; color: string; border: string }> = [
  { bg: '#2563eb', color: '#ffffff', border: '#1d4ed8' },
  { bg: '#f9fafb', color: '#374151', border: '#d1d5db' },
  { bg: '#059669', color: '#ffffff', border: '#047857' },
  { bg: '#dc2626', color: '#ffffff', border: '#b91c1c' },
];

// ─── 미리보기 컴포넌트 ────────────────────────────────────────────────────────
export const CompanyFormPreview: React.FC<CompanyFormPreviewProps> = ({ config }) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const setVal = (id: string, v: string) => setValues((prev) => ({ ...prev, [id]: v }));

  return (
    <div style={OUTER}>
      <div style={CARD}>
        {/* ── 헤더 ──────────────────────────────────────────────────────────── */}
        <div style={CARD_HEADER}>
          <h2 style={TITLE_STYLE}>{config.formTitle || '회사등록'}</h2>
          {config.formSubtitle && (
            <p style={SUBTITLE_STYLE}>{config.formSubtitle}</p>
          )}
        </div>

        {/* ── 입력 필드 ──────────────────────────────────────────────────────── */}
        <div style={CARD_BODY}>
          {config.fields.map((field) => (
            <div key={field.id} style={FIELD_WRAP}>
              <label style={LABEL_STYLE}>{field.label}</label>
              <input
                type="text"
                value={values[field.id] ?? ''}
                onChange={(e) => setVal(field.id, e.target.value)}
                placeholder={field.placeholder ?? ''}
                onFocus={() => setFocusedId(field.id)}
                onBlur={() => setFocusedId(null)}
                style={{
                  ...INPUT_STYLE,
                  borderColor: focusedId === field.id ? '#3b82f6' : '#e5e7eb',
                  backgroundColor: focusedId === field.id ? '#eff6ff' : '#f9fafb',
                }}
              />
            </div>
          ))}
        </div>

        {/* ── 버튼 ──────────────────────────────────────────────────────────── */}
        <div style={CARD_FOOTER}>
          {config.buttons.map((btn, idx) => {
            const palette = BTN_COLORS[idx % BTN_COLORS.length];
            return (
              <button
                key={btn.id}
                type="button"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: palette.bg,
                  color: palette.color,
                  border: `1px solid ${palette.border}`,
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {btn.label}
              </button>
            );
          })}
        </div>

        {/* ── 공지사항 ───────────────────────────────────────────────────────── */}
        {config.showNotice && config.noticeText && (
          <div style={NOTICE_WRAP}>
            <div style={NOTICE_TITLE}>공지사항</div>
            <p style={NOTICE_TEXT}>{config.noticeText}</p>
          </div>
        )}
      </div>
    </div>
  );
};
