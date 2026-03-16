// components/preview/RegisterFormPreview.tsx
import React, { useState } from 'react';
import { Building2, Users, ChevronRight, Eye, EyeOff, X, Plus, Trash2, Edit2 } from 'lucide-react';
import type { RegisterFormConfig, RegisterSection, RegisterField } from '../../types';

// ─── 공통 스타일 (text-white 상속 차단용 inline style) ──────────────────────
const CARD_STYLE: React.CSSProperties = {
  color: '#1f2937',
  fontFamily: 'inherit',
};

// ─── 부서 트리 ────────────────────────────────────────────────────────────────
interface Dept { id: number; name: string; parentId: number; children: Dept[]; }
let _nextId = 100;

function buildTree(flat: { id: number; name: string; parentId: number }[]): Dept[] {
  const map = new Map<number, Dept>();
  flat.forEach((d) => map.set(d.id, { ...d, children: [] }));
  const roots: Dept[] = [];
  flat.forEach((d) => {
    const node = map.get(d.id)!;
    if (d.parentId === 0) roots.push(node);
    else map.get(d.parentId)?.children.push(node);
  });
  return roots;
}

const DeptNode: React.FC<{
  dept: Dept; level: number; selectedId: number | null;
  onSelect: (id: number, name: string) => void;
  onAdd: (parentId: number) => void;
  onDelete: (id: number) => void;
  onRename: (id: number, name: string) => void;
  isRoot: boolean;
}> = ({ dept, level, selectedId, onSelect, onAdd, onDelete, onRename, isRoot }) => {
  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editVal, setEditVal] = useState(dept.name);
  const selected = selectedId === dept.id;

  return (
    <div>
      <div
        className={`group flex items-center gap-1 rounded-lg transition-colors ${
          selected && !isRoot ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
        } ${isRoot ? 'cursor-default' : 'cursor-pointer'}`}
        style={{ paddingLeft: `${8 + level * 18}px`, paddingTop: 6, paddingBottom: 6, paddingRight: 8 }}
        onClick={() => { if (!isRoot && !editing) onSelect(dept.id, dept.name); }}
      >
        <span className="text-gray-400 w-4 text-xs select-none" onClick={(e) => { e.stopPropagation(); setOpen((p) => !p); }}>
          {dept.children.length > 0 ? (open ? '▼' : '▶') : ' '}
        </span>
        {isRoot
          ? <Building2 className="w-4 h-4 text-gray-500 shrink-0" />
          : <span className="text-amber-500 text-sm">📁</span>
        }
        {editing ? (
          <div className="flex items-center gap-1 flex-1" onClick={(e) => e.stopPropagation()}>
            <input autoFocus value={editVal} onChange={(e) => setEditVal(e.target.value)}
              style={{ color: '#1f2937' }}
              className="flex-1 text-xs border border-blue-300 rounded px-1 py-0.5 outline-none bg-white"
              onKeyDown={(e) => {
                if (e.key === 'Enter') { onRename(dept.id, editVal); setEditing(false); }
                if (e.key === 'Escape') { setEditing(false); setEditVal(dept.name); }
              }}
            />
            <button className="text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded" onClick={() => { onRename(dept.id, editVal); setEditing(false); }}>확인</button>
            <button className="text-xs text-gray-400 px-1" onClick={() => { setEditing(false); setEditVal(dept.name); }}>✕</button>
          </div>
        ) : (
          <span className="flex-1 text-sm truncate font-medium" style={{ color: '#1f2937' }}>{dept.name}</span>
        )}
        {selected && !isRoot && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
        {!editing && (
          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
            <button className="p-0.5 text-gray-400 hover:text-blue-500 rounded" onClick={(e) => { e.stopPropagation(); setEditing(true); setEditVal(dept.name); }}><Edit2 className="w-3 h-3" /></button>
            <button className="p-0.5 text-gray-400 hover:text-green-500 rounded" onClick={(e) => { e.stopPropagation(); onAdd(dept.id); }}><Plus className="w-3 h-3" /></button>
            {!isRoot && <button className="p-0.5 text-gray-400 hover:text-red-500 rounded" onClick={(e) => { e.stopPropagation(); onDelete(dept.id); }}><Trash2 className="w-3 h-3" /></button>}
          </div>
        )}
      </div>
      {open && dept.children.map((child) => (
        <DeptNode key={child.id} dept={child} level={level + 1} selectedId={selectedId} onSelect={onSelect} onAdd={onAdd} onDelete={onDelete} onRename={onRename} isRoot={false} />
      ))}
    </div>
  );
};

const DeptModal: React.FC<{ onClose: () => void; onConfirm: (name: string) => void }> = ({ onClose, onConfirm }) => {
  const [flat, setFlat] = useState([
    { id: 1, name: '본사', parentId: 0 },
    { id: 2, name: '개발팀', parentId: 1 },
    { id: 3, name: '영업팀', parentId: 1 },
  ]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedName, setSelectedName] = useState('');

  const handleAdd = (parentId: number) => { _nextId++; setFlat((p) => [...p, { id: _nextId, name: '새 부서', parentId }]); };
  const handleDelete = (id: number) => {
    const toRemove = new Set<number>();
    const collect = (pid: number) => flat.filter((d) => d.parentId === pid).forEach((d) => { toRemove.add(d.id); collect(d.id); });
    toRemove.add(id); collect(id);
    setFlat((p) => p.filter((d) => !toRemove.has(d.id)));
    if (selectedId && toRemove.has(selectedId)) { setSelectedId(null); setSelectedName(''); }
  };
  const handleRename = (id: number, name: string) => { setFlat((p) => p.map((d) => (d.id === id ? { ...d, name } : d))); if (selectedId === id) setSelectedName(name); };

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm flex flex-col" style={{ maxHeight: '85%', color: '#1f2937' }}>
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-semibold">부서 선택</span>
          </div>
          <button onClick={onClose} className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center"><X className="w-3.5 h-3.5 text-gray-500" /></button>
        </div>
        <div className="flex-1 p-3 overflow-hidden">
          <div className="bg-gray-50 rounded-lg p-2 overflow-y-auto" style={{ height: '240px' }}>
            {buildTree(flat).map((dept) => (
              <DeptNode key={dept.id} dept={dept} level={0} selectedId={selectedId}
                onSelect={(id, name) => { setSelectedId(id); setSelectedName(name); }}
                onAdd={handleAdd} onDelete={handleDelete} onRename={handleRename} isRoot={dept.parentId === 0} />
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 p-3 border-t border-gray-200">
          <button onClick={onClose} className="px-3 py-1.5 text-xs text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">취소</button>
          <button onClick={() => { if (selectedId) onConfirm(selectedName); }}
            className={`px-3 py-1.5 text-xs rounded-lg text-white ${selectedId ? 'bg-gray-800 hover:bg-gray-900' : 'bg-gray-300 cursor-not-allowed'}`}
          >선택 완료</button>
        </div>
      </div>
    </div>
  );
};

// ─── 필드 렌더러 ──────────────────────────────────────────────────────────────
const DEFAULT_POSITION_OPTIONS = [
  { id: 'pos-0', label: '일반' },
  { id: 'pos-1', label: '관리자' },
  { id: 'pos-2', label: '대표자' },
];

const FieldRenderer: React.FC<{
  field: RegisterField;
  value: string;
  onChange: (val: string) => void;
  showPw: boolean;
  onTogglePw: () => void;
  emailVerified: boolean;
  codeSent: boolean;
  onSendCode: () => void;
  onVerifyCode: () => void;
  selectedDept: string;
  onOpenDept: () => void;
  positionChecked: Record<string, boolean>;
  onPositionChange: (id: string) => void;
  termsChecked: boolean;
  privacyChecked: boolean;
  onTermsChange: () => void;
  onPrivacyChange: () => void;
  termsLabel: string;
  privacyLabel: string;
}> = ({
  field, value, onChange, showPw, onTogglePw,
  emailVerified, codeSent, onSendCode, onVerifyCode,
  selectedDept, onOpenDept,
  positionChecked, onPositionChange,
  termsChecked, privacyChecked, onTermsChange, onPrivacyChange,
  termsLabel, privacyLabel,
}) => {
  const labelStyle: React.CSSProperties = { color: '#374151', fontWeight: 500, fontSize: 14, width: 96, flexShrink: 0 };
  const inputStyle: React.CSSProperties = { color: '#1f2937', backgroundColor: '#fff', border: '1px solid #d1d5db', borderRadius: 6, padding: '6px 10px', fontSize: 13, width: '100%', outline: 'none' };

  if (field.type === 'text') {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
        <label style={{ ...labelStyle, paddingTop: 6 }}>{field.label}</label>
        <div style={{ flex: 1 }}>
          <input
            type="text" value={value} onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder || `${field.label}을(를) 입력해주세요`}
            style={inputStyle}
          />
        </div>
      </div>
    );
  }

  if (field.type === 'email') {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
        <label style={{ ...labelStyle, paddingTop: 6 }}>{field.label}</label>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex' }}>
            <input
              type="email" value={value} onChange={(e) => onChange(e.target.value)}
              placeholder="이메일을 입력해주세요" disabled={emailVerified}
              style={{ ...inputStyle, borderRadius: '6px 0 0 6px', opacity: emailVerified ? 0.6 : 1 }}
            />
            <button onClick={onSendCode}
              style={{ padding: '6px 10px', fontSize: 12, whiteSpace: 'nowrap', borderRadius: '0 6px 6px 0', border: 'none', cursor: 'pointer', backgroundColor: emailVerified ? '#22c55e' : '#3b82f6', color: '#fff' }}
            >{emailVerified ? '인증완료' : '인증코드 발송'}</button>
          </div>
          {codeSent && !emailVerified && <p style={{ color: '#2563eb', fontSize: 11, marginTop: 2 }}>인증 코드 유효시간: 3:00</p>}
        </div>
      </div>
    );
  }

  if (field.type === 'code') {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
        <label style={{ ...labelStyle, paddingTop: 6 }}>{field.label}</label>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex' }}>
            <input
              type="text" value={value} onChange={(e) => onChange(e.target.value)}
              placeholder="인증 코드를 입력해주세요" disabled={emailVerified} maxLength={6}
              style={{ ...inputStyle, borderRadius: '6px 0 0 6px', borderRight: 'none', opacity: emailVerified ? 0.6 : 1 }}
            />
            <button onClick={onVerifyCode}
              style={{ padding: '6px 12px', fontSize: 12, whiteSpace: 'nowrap', borderRadius: '0 6px 6px 0', border: 'none', cursor: 'pointer', backgroundColor: emailVerified ? '#22c55e' : '#3b82f6', color: '#fff' }}
            >{emailVerified ? '완료' : '확인'}</button>
          </div>
        </div>
      </div>
    );
  }

  if (field.type === 'password') {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
        <label style={{ ...labelStyle, paddingTop: 6 }}>{field.label}</label>
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type={showPw ? 'text' : 'password'} value={value} onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder || '비밀번호를 입력해주세요'}
            style={{ ...inputStyle, paddingRight: 32 }}
          />
          <button type="button" onClick={onTogglePw}
            style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}
          >{showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
        </div>
      </div>
    );
  }

  if (field.type === 'department') {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
        <label style={{ ...labelStyle, paddingTop: 6 }}>{field.label}</label>
        <div style={{ flex: 1 }}>
          <button onClick={onOpenDept}
            style={{ width: '100%', padding: '6px 12px', textAlign: 'left', border: `1px solid ${selectedDept ? '#93c5fd' : '#d1d5db'}`, borderRadius: 6, backgroundColor: selectedDept ? '#eff6ff' : '#fff', color: selectedDept ? '#1e40af' : '#9ca3af', fontSize: 13, cursor: 'pointer' }}
          >{selectedDept || '소속 지정을 위해 클릭해주세요.'}</button>
        </div>
      </div>
    );
  }

  if (field.type === 'position') {
    const opts = (field.options && field.options.length > 0) ? field.options : DEFAULT_POSITION_OPTIONS;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <label style={labelStyle}>{field.label}</label>
        <div style={{ flex: 1, display: 'flex', gap: 12 }}>
          {opts.map((opt) => (
            <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontSize: 13, color: '#374151' }}>
              <input
                type="checkbox"
                checked={!!positionChecked[opt.id]}
                onChange={() => onPositionChange(opt.id)}
                style={{ width: 14, height: 14 }}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === 'terms') {
    return (
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <input type="checkbox" checked={termsChecked} onChange={onTermsChange} style={{ width: 14, height: 14, borderRadius: 3 }} />
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, color: '#374151' }}>{termsLabel}</span>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}><ChevronRight className="w-3 h-3" /></button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={privacyChecked} onChange={onPrivacyChange} style={{ width: 14, height: 14, borderRadius: 3 }} />
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, color: '#374151' }}>{privacyLabel}</span>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}><ChevronRight className="w-3 h-3" /></button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// ─── 섹션 구분선 ─────────────────────────────────────────────────────────────
const SectionDivider: React.FC<{ title: string; icon: RegisterSection['icon'] }> = ({ title, icon }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '12px 0' }}>
    <div style={{ flex: 1, height: 1, backgroundColor: '#d1d5db' }} />
    {icon === 'building' && <Building2 className="w-4 h-4 text-gray-500" />}
    {icon === 'users' && <Users className="w-4 h-4 text-gray-500" />}
    <span style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>{title}</span>
    <div style={{ flex: 1, height: 1, backgroundColor: '#d1d5db' }} />
  </div>
);

// ─── 메인 미리보기 ────────────────────────────────────────────────────────────
interface RegisterFormPreviewProps {
  config: RegisterFormConfig;
}

export const RegisterFormPreview: React.FC<RegisterFormPreviewProps> = ({ config }) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [showPws, setShowPws] = useState<Record<string, boolean>>({});
  const [emailVerified, setEmailVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [selectedDept, setSelectedDept] = useState('');
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [positionChecked, setPositionChecked] = useState<Record<string, boolean>>({});
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const setValue = (id: string, val: string) => setValues((p) => ({ ...p, [id]: val }));
  const togglePw = (id: string) => setShowPws((p) => ({ ...p, [id]: !p[id] }));
  const handlePositionChange = (optId: string) => setPositionChecked((p) => ({ ...p, [optId]: !p[optId] }));

  const hasEmailField = config.sections.some((s) => s.fields.some((f) => f.type === 'email'));
  const hasTermsField = config.sections.some((s) => s.fields.some((f) => f.type === 'terms'));
  const isSubmittable = (!hasEmailField || emailVerified) && (!hasTermsField || (termsChecked && privacyChecked));

  return (
    <div style={{ position: 'relative', maxWidth: 500 }}>
      {/* 카드 — 모든 색상을 inline style로 명시하여 text-white 상속 차단 */}
      <div style={{ ...CARD_STYLE, backgroundColor: '#fff', borderRadius: 16, boxShadow: '0 10px 40px rgba(0,0,0,0.15)', padding: 24, border: '1px solid #f3f4f6' }}>
        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: '#111827', marginBottom: 8, margin: '0 0 8px 0' }}>
            {config.formTitle || '사용자 등록'}
          </h2>
          {config.showNavLinks && (
            <div style={{ display: 'flex', gap: 12, fontSize: 13 }}>
              <button style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>로그인</button>
              <span style={{ color: '#d1d5db' }}>|</span>
              <button style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>아이디 찾기</button>
              <span style={{ color: '#d1d5db' }}>|</span>
              <button style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>비밀번호 재설정</button>
            </div>
          )}
        </div>

        {/* Sections */}
        {config.sections.map((section) => (
          <div key={section.id}>
            {section.title && <SectionDivider title={section.title} icon={section.icon} />}
            <div style={{ paddingLeft: 4, paddingRight: 4 }}>
              {section.fields.map((field) => (
                <FieldRenderer
                  key={field.id}
                  field={field}
                  value={values[field.id] ?? ''}
                  onChange={(val) => setValue(field.id, val)}
                  showPw={showPws[field.id] ?? false}
                  onTogglePw={() => togglePw(field.id)}
                  emailVerified={emailVerified}
                  codeSent={codeSent}
                  onSendCode={() => setCodeSent(true)}
                  onVerifyCode={() => setEmailVerified(true)}
                  selectedDept={selectedDept}
                  onOpenDept={() => setShowDeptModal(true)}
                  positionChecked={positionChecked}
                  onPositionChange={handlePositionChange}
                  termsChecked={termsChecked}
                  privacyChecked={privacyChecked}
                  onTermsChange={() => setTermsChecked((p) => !p)}
                  onPrivacyChange={() => setPrivacyChecked((p) => !p)}
                  termsLabel={config.termsLabel}
                  privacyLabel={config.privacyLabel}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Submit */}
        <button
          style={{
            width: '100%', padding: '8px 0', marginTop: 16, borderRadius: 6, border: 'none',
            fontSize: 14, fontWeight: 500, cursor: isSubmittable ? 'pointer' : 'not-allowed',
            backgroundColor: isSubmittable ? '#2563eb' : '#d1d5db',
            color: isSubmittable ? '#fff' : '#9ca3af',
          }}
        >{config.submitText || '가입하기'}</button>
      </div>

      {/* Dept modal */}
      {showDeptModal && (
        <DeptModal
          onClose={() => setShowDeptModal(false)}
          onConfirm={(name) => { setSelectedDept(name); setShowDeptModal(false); }}
        />
      )}
    </div>
  );
};
