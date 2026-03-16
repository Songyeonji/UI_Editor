// components/editors/CompanyFormEditor.tsx
import React, { useState } from 'react';
import type { CompanyFormConfig, CompanyInputField, CompanyButton } from '../../types';
import { uid } from '../../utils/helpers';

interface CompanyFormEditorProps {
  config: CompanyFormConfig;
  setConfig: React.Dispatch<React.SetStateAction<CompanyFormConfig>>;
}

// ─── 인라인 스타일 헬퍼 ────────────────────────────────────────────────────────
const ROW = 'flex items-center gap-2';
const LABEL = 'text-[11px] font-semibold text-white/50 mb-1';
const INPUT_CLS =
  'w-full rounded-xl border border-white/10 bg-black/20 px-3 py-1.5 text-[13px] text-white placeholder:text-white/25 outline-none focus:border-white/30';
const SECTION_WRAP = 'grid gap-3 rounded-2xl border border-white/10 bg-white/3 p-3';
const BTN_GHOST =
  'rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/60 hover:bg-white/10 transition';
const BTN_RED =
  'rounded-xl border border-red-400/20 bg-red-400/10 px-2 py-1 text-[11px] font-semibold text-red-300 hover:bg-red-400/20 transition';
const BTN_PRIMARY =
  'w-full rounded-xl border border-white/15 bg-white/8 px-3 py-1.5 text-[12px] font-bold text-white/70 hover:bg-white/12 transition';

// ─── 필드 아이템 에디터 ───────────────────────────────────────────────────────
const FieldItem: React.FC<{
  field: CompanyInputField;
  onUpdate: (patch: Partial<CompanyInputField>) => void;
  onDelete: () => void;
  canDelete: boolean;
}> = ({ field, onUpdate, onDelete, canDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-2 grid gap-2">
      {/* 헤더 행 */}
      <div className={ROW + ' justify-between'}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1 text-[12px] font-bold text-white/80 hover:text-white transition"
        >
          <span>{open ? '▾' : '▸'}</span>
          <span>{field.label || '(이름 없음)'}</span>
        </button>
        {canDelete && (
          <button type="button" onClick={onDelete} className={BTN_RED}>
            삭제
          </button>
        )}
      </div>

      {open && (
        <div className="grid gap-2 pt-1">
          {/* 레이블 */}
          <div>
            <div className={LABEL}>레이블</div>
            <input
              className={INPUT_CLS}
              value={field.label}
              onChange={(e) => onUpdate({ label: e.target.value })}
              placeholder="필드 레이블"
            />
          </div>
          {/* 플레이스홀더 */}
          <div>
            <div className={LABEL}>플레이스홀더</div>
            <input
              className={INPUT_CLS}
              value={field.placeholder ?? ''}
              onChange={(e) => onUpdate({ placeholder: e.target.value })}
              placeholder="입력 안내 문구"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// ─── 버튼 아이템 에디터 ──────────────────────────────────────────────────────
const ButtonItem: React.FC<{
  btn: CompanyButton;
  onUpdate: (patch: Partial<CompanyButton>) => void;
  onDelete: () => void;
  canDelete: boolean;
}> = ({ btn, onUpdate, onDelete, canDelete }) => (
  <div className={ROW}>
    <input
      className={INPUT_CLS}
      value={btn.label}
      onChange={(e) => onUpdate({ label: e.target.value })}
      placeholder="버튼 텍스트"
    />
    {canDelete && (
      <button type="button" onClick={onDelete} className={BTN_RED + ' shrink-0'}>
        삭제
      </button>
    )}
  </div>
);

// ─── 메인 에디터 ─────────────────────────────────────────────────────────────
export const CompanyFormEditor: React.FC<CompanyFormEditorProps> = ({ config, setConfig }) => {
  const patch = (p: Partial<CompanyFormConfig>) => setConfig((prev) => ({ ...prev, ...p }));

  // ── 필드 업데이트 헬퍼
  const updateField = (id: string, p: Partial<CompanyInputField>) =>
    patch({ fields: config.fields.map((f) => (f.id === id ? { ...f, ...p } : f)) });

  const deleteField = (id: string) =>
    patch({ fields: config.fields.filter((f) => f.id !== id) });

  const addField = () =>
    patch({
      fields: [
        ...config.fields,
        { id: uid('cfield'), label: '새 필드', placeholder: '입력해주세요' },
      ],
    });

  // ── 버튼 업데이트 헬퍼
  const updateButton = (id: string, p: Partial<CompanyButton>) =>
    patch({ buttons: config.buttons.map((b) => (b.id === id ? { ...b, ...p } : b)) });

  const deleteButton = (id: string) =>
    patch({ buttons: config.buttons.filter((b) => b.id !== id) });

  const addButton = () =>
    patch({ buttons: [...config.buttons, { id: uid('cbtn'), label: '버튼' }] });

  return (
    <div className="grid gap-4">
      {/* ── 제목 / 부제목 ──────────────────────────────────────────────────── */}
      <div className={SECTION_WRAP}>
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-white/40">
          폼 제목
        </div>
        <div>
          <div className={LABEL}>제목</div>
          <input
            className={INPUT_CLS}
            value={config.formTitle}
            onChange={(e) => patch({ formTitle: e.target.value })}
            placeholder="회사등록"
          />
        </div>
        <div>
          <div className={LABEL}>부제목</div>
          <input
            className={INPUT_CLS}
            value={config.formSubtitle}
            onChange={(e) => patch({ formSubtitle: e.target.value })}
            placeholder="부제목을 입력해주세요"
          />
        </div>
      </div>

      {/* ── 입력 필드 ──────────────────────────────────────────────────────── */}
      <div className={SECTION_WRAP}>
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-white/40">
            입력 필드
          </div>
          <button type="button" onClick={addField} className={BTN_GHOST}>
            + 필드 추가
          </button>
        </div>

        {config.fields.map((field) => (
          <FieldItem
            key={field.id}
            field={field}
            onUpdate={(p) => updateField(field.id, p)}
            onDelete={() => deleteField(field.id)}
            canDelete={config.fields.length > 1}
          />
        ))}
      </div>

      {/* ── 버튼 ──────────────────────────────────────────────────────────── */}
      <div className={SECTION_WRAP}>
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-white/40">
            버튼
          </div>
          <button type="button" onClick={addButton} className={BTN_GHOST}>
            + 버튼 추가
          </button>
        </div>

        {config.buttons.map((btn) => (
          <ButtonItem
            key={btn.id}
            btn={btn}
            onUpdate={(p) => updateButton(btn.id, p)}
            onDelete={() => deleteButton(btn.id)}
            canDelete={config.buttons.length > 1}
          />
        ))}
      </div>

      {/* ── 공지사항 ───────────────────────────────────────────────────────── */}
      <div className={SECTION_WRAP}>
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-white/40">
            공지사항
          </div>
          <button
            type="button"
            onClick={() => patch({ showNotice: !config.showNotice })}
            className={
              'rounded-xl border px-3 py-1 text-[11px] font-semibold transition ' +
              (config.showNotice
                ? 'border-emerald-400/30 bg-emerald-400/15 text-emerald-300 hover:bg-emerald-400/25'
                : 'border-white/10 bg-white/5 text-white/40 hover:bg-white/10')
            }
          >
            {config.showNotice ? '표시 중' : '숨김'}
          </button>
        </div>

        {config.showNotice && (
          <div>
            <div className={LABEL}>공지 내용</div>
            <textarea
              className={INPUT_CLS + ' resize-none h-20'}
              value={config.noticeText}
              onChange={(e) => patch({ noticeText: e.target.value })}
              placeholder="공지사항 내용을 입력해주세요"
            />
          </div>
        )}
      </div>

      {/* ── 초기화 ────────────────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() =>
          setConfig({
            formTitle: '회사등록',
            formSubtitle: '회사 정보를 입력해주세요.',
            fields: [
              { id: uid('cfield'), label: '사업자등록번호', placeholder: '000-00-00000' },
              { id: uid('cfield'), label: '라이선스등록번호', placeholder: '라이선스 번호를 입력해주세요' },
            ],
            buttons: [{ id: uid('cbtn'), label: '등록하기' }],
            showNotice: true,
            noticeText:
              '사업자등록번호 및 라이선스 등록번호를 정확히 입력해주세요.\n입력하신 정보는 서비스 등록에 활용됩니다.',
          })
        }
        className={BTN_PRIMARY}
      >
        초기화
      </button>
    </div>
  );
};
