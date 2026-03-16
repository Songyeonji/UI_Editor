// components/editors/RegisterFormEditor.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Trash2, GripVertical } from 'lucide-react';
import type {
  RegisterFormConfig,
  RegisterSection,
  RegisterField,
  RegisterFieldType,
  RegisterSectionIcon,
} from '../../types';
import { uid } from '../../utils/helpers';

interface RegisterFormEditorProps {
  config: RegisterFormConfig;
  setConfig: React.Dispatch<React.SetStateAction<RegisterFormConfig>>;
}

// ─── 필드 타입 레이블 ─────────────────────────────────────────────────────────
const FIELD_TYPE_LABELS: Record<RegisterFieldType, string> = {
  text: '텍스트',
  email: '이메일',
  code: '인증코드',
  password: '비밀번호',
  department: '소속 부서',
  position: '직위',
  terms: '약관 동의',
};

const FIELD_TYPE_DESC: Record<RegisterFieldType, string> = {
  text: '일반 텍스트 인풋',
  email: '이메일 + 인증코드 발송 버튼',
  code: '인증코드 확인 필드',
  password: '비밀번호 (눈 아이콘)',
  department: '소속 부서 선택 버튼 + 트리 모달',
  position: '직위 체크박스 (일반/관리자/대표자)',
  terms: '이용약관 + 개인정보 동의 체크박스',
};

const SECTION_ICON_OPTIONS: { value: RegisterSectionIcon; label: string }[] = [
  { value: 'building', label: '🏢 건물' },
  { value: 'users', label: '👥 사람들' },
  { value: 'none', label: '없음' },
];

const FIELD_TYPES_WITH_PLACEHOLDERS: RegisterFieldType[] = ['text', 'password'];

// ─── 섹션 에디터 ──────────────────────────────────────────────────────────────
const SectionEditor: React.FC<{
  section: RegisterSection;
  index: number;
  onUpdate: (section: RegisterSection) => void;
  onDelete: () => void;
}> = ({ section, index, onUpdate, onDelete }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showAddField, setShowAddField] = useState(false);

  const updateField = (fieldId: string, patch: Partial<RegisterField>) => {
    onUpdate({
      ...section,
      fields: section.fields.map((f) => (f.id === fieldId ? { ...f, ...patch } : f)),
    });
  };

  const removeField = (fieldId: string) => {
    onUpdate({ ...section, fields: section.fields.filter((f) => f.id !== fieldId) });
  };

  const addField = (type: RegisterFieldType) => {
    const defaultLabels: Record<RegisterFieldType, string> = {
      text: '텍스트',
      email: '이메일',
      code: '인증코드',
      password: '비밀번호',
      department: '소속 부서',
      position: '직위',
      terms: '약관',
    };
    const defaultPlaceholders: Record<RegisterFieldType, string> = {
      text: '입력해주세요',
      email: '이메일을 입력해주세요',
      code: '인증 코드를 입력해주세요',
      password: '비밀번호를 입력해주세요',
      department: '',
      position: '',
      terms: '',
    };
    const newField: RegisterField = {
      id: uid('field'),
      type,
      label: defaultLabels[type],
      placeholder: defaultPlaceholders[type] || undefined,
      options: type === 'position'
        ? [{ id: uid('pos'), label: '일반' }, { id: uid('pos'), label: '관리자' }, { id: uid('pos'), label: '대표자' }]
        : undefined,
    };
    onUpdate({ ...section, fields: [...section.fields, newField] });
    setShowAddField(false);
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 overflow-hidden">
      {/* Section header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
        <GripVertical className="w-4 h-4 text-white/30 flex-shrink-0" />
        <button
          type="button"
          onClick={() => setCollapsed((p) => !p)}
          className="flex items-center gap-1 flex-1 text-left"
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3 text-white/50" />
          ) : (
            <ChevronDown className="w-3 h-3 text-white/50" />
          )}
          <span className="text-[12px] font-extrabold text-white/85">
            섹션 {index + 1}
            {section.title ? ` · ${section.title}` : ' · (제목 없음)'}
          </span>
          <span className="ml-auto text-[10px] text-white/40">
            {section.fields.length}개 필드
          </span>
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="p-1 text-white/40 hover:text-red-400 rounded transition-colors"
          title="섹션 삭제"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {!collapsed && (
        <div className="p-3 grid gap-3">
          {/* Section title */}
          <label className="grid gap-1">
            <span className="text-[11px] font-semibold text-white/70">섹션 제목 (비워두면 구분선 없음)</span>
            <input
              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-1.5 text-[13px] font-semibold outline-none focus:border-white/35"
              value={section.title}
              onChange={(e) => onUpdate({ ...section, title: e.target.value })}
              placeholder="예: 회사 정보, 사용자 정보"
            />
          </label>

          {/* Section icon */}
          <div className="grid gap-1">
            <span className="text-[11px] font-semibold text-white/70">섹션 아이콘</span>
            <div className="flex gap-2">
              {SECTION_ICON_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onUpdate({ ...section, icon: opt.value })}
                  className={`rounded-xl border px-3 py-1.5 text-[11px] font-extrabold transition ${
                    section.icon === opt.value
                      ? 'border-white/35 bg-white/10'
                      : 'border-white/15 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fields list */}
          {section.fields.length > 0 && (
            <div className="grid gap-2">
              <span className="text-[11px] font-semibold text-white/70">
                필드 목록 ({section.fields.length})
              </span>
              {section.fields.map((field, fi) => (
                <FieldEditor
                  key={field.id}
                  field={field}
                  index={fi}
                  onUpdate={(patch) => updateField(field.id, patch)}
                  onDelete={() => removeField(field.id)}
                />
              ))}
            </div>
          )}

          {/* Add field */}
          <div className="grid gap-2">
            <button
              type="button"
              onClick={() => setShowAddField((p) => !p)}
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10 text-left"
            >
              {showAddField ? '▲ 필드 추가 닫기' : '+ 필드 추가'}
            </button>

            {showAddField && (
              <div className="grid gap-1 rounded-xl border border-white/15 bg-black/20 p-2">
                <span className="text-[10px] font-semibold text-white/50 mb-1">
                  추가할 필드 타입 선택
                </span>
                {(Object.keys(FIELD_TYPE_LABELS) as RegisterFieldType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => addField(type)}
                    className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left transition hover:bg-white/10"
                  >
                    <div>
                      <div className="text-[12px] font-extrabold text-white/85">
                        {FIELD_TYPE_LABELS[type]}
                      </div>
                      <div className="text-[10px] text-white/45">{FIELD_TYPE_DESC[type]}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── 필드 에디터 ──────────────────────────────────────────────────────────────
const FieldEditor: React.FC<{
  field: RegisterField;
  index: number;
  onUpdate: (patch: Partial<RegisterField>) => void;
  onDelete: () => void;
}> = ({ field, index, onUpdate, onDelete }) => {
  const hasPlaceholder = FIELD_TYPES_WITH_PLACEHOLDERS.includes(field.type);
  const isTerms = field.type === 'terms';
  const isPosition = field.type === 'position';
  const isDept = field.type === 'department';

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-2 grid gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-white/70">
          {index + 1}. {FIELD_TYPE_LABELS[field.type]}
        </span>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-extrabold transition hover:bg-white/10 text-red-300"
        >
          삭제
        </button>
      </div>

      {/* Label (not for terms which has fixed labels) */}
      {!isTerms && (
        <label className="grid gap-1">
          <span className="text-[10px] font-semibold text-white/50">라벨</span>
          <input
            className="w-full rounded-lg border border-white/15 bg-black/30 px-2 py-1 text-[12px] font-semibold outline-none focus:border-white/35"
            value={field.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
          />
        </label>
      )}

      {/* Placeholder */}
      {hasPlaceholder && (
        <label className="grid gap-1">
          <span className="text-[10px] font-semibold text-white/50">플레이스홀더</span>
          <input
            className="w-full rounded-lg border border-white/15 bg-black/30 px-2 py-1 text-[12px] font-semibold outline-none focus:border-white/35"
            value={field.placeholder || ''}
            onChange={(e) => onUpdate({ placeholder: e.target.value })}
          />
        </label>
      )}

      {/* 직위 옵션 편집기 */}
      {isPosition && (
        <div className="grid gap-2 rounded-xl border border-white/10 bg-black/20 p-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-white/50">직위 옵션</span>
            <button
              type="button"
              onClick={() => {
                const opts = field.options && field.options.length > 0
                  ? field.options
                  : [{ id: 'pos-0', label: '일반' }, { id: 'pos-1', label: '관리자' }, { id: 'pos-2', label: '대표자' }];
                onUpdate({ options: [...opts, { id: uid('pos'), label: '새 직위' }] });
              }}
              className="rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-[10px] font-extrabold transition hover:bg-white/10"
            >+ 추가</button>
          </div>
          {((field.options && field.options.length > 0)
            ? field.options
            : [{ id: 'pos-0', label: '일반' }, { id: 'pos-1', label: '관리자' }, { id: 'pos-2', label: '대표자' }]
          ).map((opt, oi) => (
            <div key={opt.id} className="flex items-center gap-1">
              <input
                className="flex-1 rounded-lg border border-white/15 bg-black/30 px-2 py-1 text-[11px] font-semibold outline-none focus:border-white/35"
                value={opt.label}
                onChange={(e) => {
                  const base = field.options && field.options.length > 0
                    ? field.options
                    : [{ id: 'pos-0', label: '일반' }, { id: 'pos-1', label: '관리자' }, { id: 'pos-2', label: '대표자' }];
                  onUpdate({ options: base.map((o) => o.id === opt.id ? { ...o, label: e.target.value } : o) });
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const base = field.options && field.options.length > 0
                    ? field.options
                    : [{ id: 'pos-0', label: '일반' }, { id: 'pos-1', label: '관리자' }, { id: 'pos-2', label: '대표자' }];
                  onUpdate({ options: base.filter((o) => o.id !== opt.id) });
                }}
                className="text-white/30 hover:text-red-400 text-[11px] px-1"
              >✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Info for special fields */}
      {isTerms && (
        <p className="text-[10px] text-white/40">
          약관 라벨은 하단 "약관 동의" 설정에서 수정합니다.
        </p>
      )}
      {isDept && (
        <p className="text-[10px] text-white/40">
          부서 선택 버튼 → 트리 모달 열림
        </p>
      )}
    </div>
  );
};

// ─── 메인 에디터 ──────────────────────────────────────────────────────────────
export const RegisterFormEditor: React.FC<RegisterFormEditorProps> = ({
  config,
  setConfig,
}) => {
  const updateSection = (idx: number, section: RegisterSection) => {
    setConfig((prev) => ({
      ...prev,
      sections: prev.sections.map((s, i) => (i === idx ? section : s)),
    }));
  };

  const deleteSection = (idx: number) => {
    setConfig((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== idx),
    }));
  };

  const addSection = () => {
    const newSection: RegisterSection = {
      id: uid('section'),
      title: '새 섹션',
      icon: 'none',
      fields: [],
    };
    setConfig((prev) => ({ ...prev, sections: [...prev.sections, newSection] }));
  };

  return (
    <div className="grid gap-4">
      {/* ── 기본 설정 ── */}
      <div className="grid gap-2">
        <div className="text-[12px] font-extrabold text-white/85">기본 설정</div>

        <label className="grid gap-1">
          <span className="text-[11px] font-semibold text-white/70">폼 제목</span>
          <input
            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
            value={config.formTitle}
            onChange={(e) => setConfig((p) => ({ ...p, formTitle: e.target.value }))}
            placeholder="예: 사용자 등록"
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={config.showNavLinks}
            onChange={(e) =>
              setConfig((p) => ({ ...p, showNavLinks: e.target.checked }))
            }
          />
          <span className="text-[11px] font-semibold text-white/70">
            상단 네비게이션 링크 표시 (로그인 | 아이디 찾기 | 비밀번호 재설정)
          </span>
        </label>
      </div>

      {/* ── 약관 설정 ── */}
      <div className="grid gap-2">
        <div className="text-[12px] font-extrabold text-white/85">약관 동의 라벨</div>

        <label className="grid gap-1">
          <span className="text-[11px] font-semibold text-white/70">이용약관 라벨</span>
          <input
            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
            value={config.termsLabel}
            onChange={(e) => setConfig((p) => ({ ...p, termsLabel: e.target.value }))}
          />
        </label>

        <label className="grid gap-1">
          <span className="text-[11px] font-semibold text-white/70">개인정보 라벨</span>
          <input
            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
            value={config.privacyLabel}
            onChange={(e) => setConfig((p) => ({ ...p, privacyLabel: e.target.value }))}
          />
        </label>
      </div>

      {/* ── 제출 버튼 ── */}
      <div className="grid gap-2">
        <div className="text-[12px] font-extrabold text-white/85">제출 버튼</div>

        <label className="grid gap-1">
          <span className="text-[11px] font-semibold text-white/70">버튼 텍스트</span>
          <input
            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
            value={config.submitText}
            onChange={(e) => setConfig((p) => ({ ...p, submitText: e.target.value }))}
            placeholder="예: 가입하기"
          />
        </label>
      </div>

      {/* ── 섹션 목록 ── */}
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <div className="text-[12px] font-extrabold text-white/85">
            섹션 ({config.sections.length})
          </div>
          <button
            type="button"
            onClick={addSection}
            className="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] font-extrabold transition hover:bg-white/10"
          >
            + 섹션 추가
          </button>
        </div>

        <div className="grid gap-2">
          {config.sections.map((section, idx) => (
            <SectionEditor
              key={section.id}
              section={section}
              index={idx}
              onUpdate={(s) => updateSection(idx, s)}
              onDelete={() => deleteSection(idx)}
            />
          ))}
        </div>

        {config.sections.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-[12px] text-white/40">
              섹션이 없습니다. '+ 섹션 추가' 버튼을 눌러 추가하세요.
            </p>
          </div>
        )}
      </div>

      {/* ── 필드 타입 가이드 ── */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 grid gap-1">
        <div className="text-[11px] font-extrabold text-white/60">필드 타입 가이드</div>
        {(Object.keys(FIELD_TYPE_LABELS) as RegisterFieldType[]).map((type) => (
          <div key={type} className="flex gap-2">
            <span className="text-[10px] font-bold text-white/50 w-16 flex-shrink-0">
              {FIELD_TYPE_LABELS[type]}
            </span>
            <span className="text-[10px] text-white/35">{FIELD_TYPE_DESC[type]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
