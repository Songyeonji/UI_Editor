// components/editors/ApprovalEditor.tsx

import React from 'react';
import type { FormField, DropdownOption, FormFieldType, DropdownWidth, UploaderType, DocumentFile, ProgramFile, CheckboxOption, NoticeField } from '../../types';
import { uid } from '../../utils/helpers';

interface ApprovalEditorProps {
  approvalTitle: string;
  setApprovalTitle: (title: string) => void;
  approvalSubtitle: string;
  setApprovalSubtitle: (subtitle: string) => void;
  formFields: FormField[];
  setFormFields: React.Dispatch<React.SetStateAction<FormField[]>>;
  uploaderType: UploaderType;
  setUploaderType: (type: UploaderType) => void;
  documentFiles: DocumentFile[];
  setDocumentFiles: React.Dispatch<React.SetStateAction<DocumentFile[]>>;
  programFiles: ProgramFile[];
  setProgramFiles: React.Dispatch<React.SetStateAction<ProgramFile[]>>;
  showPagination: boolean;
  setShowPagination: (show: boolean) => void;
  showEmptyState: boolean;
  setShowEmptyState: (show: boolean) => void;
  emptyStateMessage: string;
  setEmptyStateMessage: (message: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
  checkboxOption: CheckboxOption;
  setCheckboxOption: React.Dispatch<React.SetStateAction<CheckboxOption>>;
  noticeField: NoticeField;
  setNoticeField: React.Dispatch<React.SetStateAction<NoticeField>>;
}

export const ApprovalEditor: React.FC<ApprovalEditorProps> = ({
  approvalTitle,
  setApprovalTitle,
  approvalSubtitle,
  setApprovalSubtitle,
  formFields,
  setFormFields,
  uploaderType,
  setUploaderType,
  documentFiles,
  setDocumentFiles,
  programFiles,
  setProgramFiles,
  showPagination,
  setShowPagination,
  showEmptyState,
  setShowEmptyState,
  emptyStateMessage,
  setEmptyStateMessage,
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
  checkboxOption,
  setCheckboxOption,
  noticeField,
  setNoticeField,
}) => {
  const addFormField = (type: FormFieldType, width: DropdownWidth) => {
    const newField: FormField = {
      id: uid('field'),
      type,
      label: type === 'dropdown' ? '드롭다운 항목' : '입력 항목',
      placeholder: type === 'input' ? '입력해주세요' : undefined,
      required: true,
      width,
      options: type === 'dropdown' ? [{ id: uid('opt'), label: '옵션 1' }] : undefined,
    };
    setFormFields((prev) => [...prev, newField]);
  };

  const removeFormField = (id: string) => {
    setFormFields((prev) => prev.filter((f) => f.id !== id));
  };

  const updateFieldLabel = (id: string, label: string) => {
    setFormFields((prev) => prev.map((f) => (f.id === id ? { ...f, label } : f)));
  };

  const updateFieldPlaceholder = (id: string, placeholder: string) => {
    setFormFields((prev) => prev.map((f) => (f.id === id ? { ...f, placeholder } : f)));
  };

  const updateFieldDefaultValue = (id: string, defaultValue: string) => {
    setFormFields((prev) => prev.map((f) => (f.id === id ? { ...f, defaultValue } : f)));
  };

  const toggleFieldRequired = (id: string) => {
    setFormFields((prev) => prev.map((f) => (f.id === id ? { ...f, required: !f.required } : f)));
  };

  const addOption = (fieldId: string) => {
    setFormFields((prev) =>
      prev.map((f) => {
        if (f.id !== fieldId || !f.options) return f;
        return {
          ...f,
          options: [...f.options, { id: uid('opt'), label: `옵션 ${f.options.length + 1}` }],
        };
      })
    );
  };

  const removeOption = (fieldId: string, optionId: string) => {
    setFormFields((prev) =>
      prev.map((f) => {
        if (f.id !== fieldId || !f.options) return f;
        return { ...f, options: f.options.filter((o) => o.id !== optionId) };
      })
    );
  };

  const updateOptionLabel = (fieldId: string, optionId: string, label: string) => {
    setFormFields((prev) =>
      prev.map((f) => {
        if (f.id !== fieldId || !f.options) return f;
        return {
          ...f,
          options: f.options.map((o) => (o.id === optionId ? { ...o, label } : o)),
        };
      })
    );
  };

  const addDocumentFile = () => {
    const newDoc: DocumentFile = {
      id: `doc_${Date.now()}`,
      fileName: `문서${documentFiles.length + 1}.pdf`,
      filePath: '/path/to/document.pdf',
    };
    setDocumentFiles((prev) => [...prev, newDoc]);
  };

  const removeDocumentFile = (id: string) => {
    setDocumentFiles((prev) => prev.filter((d) => d.id !== id));
  };

  const addProgramFile = () => {
    const newProg: ProgramFile = {
      id: `prog_${Date.now()}`,
      fileName: `프로그램${programFiles.length + 1}.exe`,
      filePath: '/path/to/program.exe',
    };
    setProgramFiles((prev) => [...prev, newProg]);
  };

  const removeProgramFile = (id: string) => {
    setProgramFiles((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="grid gap-4">
      {/* 제목 및 서브타이틀 */}
      <div className="grid gap-2">
        <div className="text-[12px] font-extrabold text-white/85">승인 양식 기본 정보</div>

        <label className="grid gap-1">
          <span className="text-[11px] font-semibold text-white/70">제목</span>
          <input
            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
            value={approvalTitle}
            onChange={(e) => setApprovalTitle(e.target.value)}
            placeholder="승인 양식 제목"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-[11px] font-semibold text-white/70">서브타이틀</span>
          <input
            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
            value={approvalSubtitle}
            onChange={(e) => setApprovalSubtitle(e.target.value)}
            placeholder="승인 양식 설명"
          />
        </label>
      </div>
      {/* 체크박스 옵션 */}
      {!showEmptyState && (
        <div className="grid gap-2">
          <div className="text-[12px] font-extrabold text-white/85">체크박스 옵션</div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checkboxOption.checked}
              onChange={(e) => setCheckboxOption(prev => ({ ...prev, checked: e.target.checked }))}
            />
            <span className="text-[11px] font-semibold text-white/70">체크박스 표시</span>
          </label>

          {checkboxOption.checked && (
            <label className="grid gap-1">
              <span className="text-[11px] font-semibold text-white/70">체크박스 텍스트</span>
              <input
                className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                value={checkboxOption.label}
                onChange={(e) => setCheckboxOption(prev => ({ ...prev, label: e.target.value }))}
                placeholder="체크박스 옆에 표시할 텍스트"
              />
            </label>
          )}
        </div>
      )}

      {/* 파일 업로더 선택 */}
      {!showEmptyState && (
        <div className="grid gap-2">
          <div className="text-[12px] font-extrabold text-white/85">파일 업로더 (100%)</div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setUploaderType('none')}
              className={
                'rounded-xl border px-3 py-2 text-[12px] font-extrabold transition ' +
                (uploaderType === 'none' ? 'border-white/35 bg-white/10' : 'border-white/15 bg-white/5 hover:bg-white/10')
              }
            >
              없음
            </button>
            <button
              type="button"
              onClick={() => setUploaderType('document')}
              className={
                'rounded-xl border px-3 py-2 text-[12px] font-extrabold transition ' +
                (uploaderType === 'document' ? 'border-white/35 bg-white/10' : 'border-white/15 bg-white/5 hover:bg-white/10')
              }
            >
              문서
            </button>
            <button
              type="button"
              onClick={() => setUploaderType('program')}
              className={
                'rounded-xl border px-3 py-2 text-[12px] font-extrabold transition ' +
                (uploaderType === 'program' ? 'border-white/35 bg-white/10' : 'border-white/15 bg-white/5 hover:bg-white/10')
              }
            >
              프로그램
            </button>
          </div>

          {/* 문서 업로더 파일 관리 */}
          {uploaderType === 'document' && (
            <div className="grid gap-2 rounded-2xl border border-white/15 bg-white/5 p-3">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-semibold text-white/70">문서 파일 ({documentFiles.length})</div>
                <button
                  type="button"
                  onClick={addDocumentFile}
                  className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
                >
                  + 문서
                </button>
              </div>

              <div className="grid gap-2">
                {documentFiles.map((doc, idx) => (
                  <div key={doc.id} className="flex items-center gap-2">
                    <div className="flex-1 text-[11px] font-semibold text-white/70 truncate">
                      {idx + 1}. {doc.fileName}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDocumentFile(doc.id)}
                      className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
                    >
                      -
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 프로그램 업로더 파일 관리 */}
          {uploaderType === 'program' && (
            <div className="grid gap-2 rounded-2xl border border-white/15 bg-white/5 p-3">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-semibold text-white/70">프로그램 파일 ({programFiles.length})</div>
                <button
                  type="button"
                  onClick={addProgramFile}
                  className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
                >
                  + 프로그램
                </button>
              </div>

              <div className="grid gap-2">
                {programFiles.map((prog, idx) => (
                  <div key={prog.id} className="flex items-center gap-2">
                    <div className="flex-1 text-[11px] font-semibold text-white/70 truncate">
                      {idx + 1}. {prog.fileName}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeProgramFile(prog.id)}
                      className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
                    >
                      -
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 공지사항 필드 - 폼 필드 추가 버튼 앞에 배치 */}
      {!showEmptyState && (
        <div className="grid gap-2">
          <div className="text-[12px] font-extrabold text-white/85">공지사항 필드 (100%)</div>

          <label className="grid gap-1">
            <span className="text-[11px] font-semibold text-white/70">공지사항 텍스트</span>
            <textarea
              className="w-full resize-none rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
              value={noticeField.text}
              onChange={(e) => setNoticeField(prev => ({ ...prev, text: e.target.value }))}
              rows={2}
              placeholder="공지사항 내용을 입력하세요"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-[11px] font-semibold text-white/70">텍스트 색상</span>
            <div className="flex gap-2">
              <input
                type="color"
                value={noticeField.color}
                onChange={(e) => setNoticeField(prev => ({ ...prev, color: e.target.value }))}
                className="h-10 w-20 rounded-xl border border-white/15 bg-black/30 cursor-pointer"
              />
              <input
                type="text"
                value={noticeField.color}
                onChange={(e) => setNoticeField(prev => ({ ...prev, color: e.target.value }))}
                className="flex-1 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                placeholder="#ef4444"
              />
            </div>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!noticeField.text}
              onChange={(e) => {
                if (!e.target.checked) {
                  setNoticeField(prev => ({ ...prev, text: '' }));
                } else {
                  setNoticeField(prev => ({ ...prev, text: '※ 중요: 승인 후에는 취소할 수 없습니다.' }));
                }
              }}
            />
            <span className="text-[11px] font-semibold text-white/70">공지사항 표시</span>
          </label>
        </div>
      )}

      {/* 폼 필드 추가 버튼 */}
      {!showEmptyState && (
        <div className="grid gap-2">
          <div className="text-[12px] font-extrabold text-white/85">폼 필드 추가</div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => addFormField('dropdown', 'full')}
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
            >
              드롭다운 (100%)
            </button>
            <button
              type="button"
              onClick={() => addFormField('dropdown', 'half')}
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
            >
              드롭다운 (50%)
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => addFormField('input', 'full')}
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
            >
              인풋 (100%)
            </button>
            <button
              type="button"
              onClick={() => addFormField('input', 'half')}
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
            >
              인풋 (50%)
            </button>
          </div>
        </div>
      )}

      {/* 폼 필드 목록 */}
      {!showEmptyState && formFields.length > 0 && (
        <div className="grid gap-2">
          <div className="text-[12px] font-extrabold text-white/85">폼 필드 ({formFields.length})</div>

          <div className="grid max-h-[500px] gap-2 overflow-y-auto">
            {formFields.map((field, idx) => (
              <div key={field.id} className="grid gap-2 rounded-2xl border border-white/15 bg-white/5 p-3">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-semibold text-white/70">
                    {idx + 1}. {field.type === 'dropdown' ? '드롭다운' : '인풋'} ({field.width === 'full' ? '100%' : '50%'})
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFormField(field.id)}
                    className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
                  >
                    삭제
                  </button>
                </div>

                <label className="grid gap-1">
                  <span className="text-[11px] font-semibold text-white/70">라벨</span>
                  <input
                    className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                    value={field.label}
                    onChange={(e) => updateFieldLabel(field.id, e.target.value)}
                  />
                </label>

                {field.type === 'input' && (
                  <>
                    <label className="grid gap-1">
                      <span className="text-[11px] font-semibold text-white/70">플레이스홀더</span>
                      <input
                        className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                        value={field.placeholder || ''}
                        onChange={(e) => updateFieldPlaceholder(field.id, e.target.value)}
                      />
                    </label>

                    <label className="grid gap-1">
                      <span className="text-[11px] font-semibold text-white/70">기본값 (입력된 값처럼 표시)</span>
                      {field.label === '사유' ? (
                        <textarea
                          className="w-full resize-none rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                          value={field.defaultValue || ''}
                          onChange={(e) => updateFieldDefaultValue(field.id, e.target.value)}
                          rows={3}
                        />
                      ) : (
                        <input
                          className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                          value={field.defaultValue || ''}
                          onChange={(e) => updateFieldDefaultValue(field.id, e.target.value)}
                        />
                      )}
                    </label>
                  </>
                )}

                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={field.required} onChange={() => toggleFieldRequired(field.id)} />
                  <span className="text-[11px] font-semibold text-white/70">필수 항목</span>
                </label>

                {/* 드롭다운 옵션 관리 */}
                {field.type === 'dropdown' && (
                  <div className="grid gap-2 rounded-xl border border-white/15 bg-black/20 p-2">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-semibold text-white/70">드롭다운 옵션</div>
                      <button
                        type="button"
                        onClick={() => addOption(field.id)}
                        className="rounded-xl border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-extrabold transition hover:bg-white/10"
                      >
                        + 옵션
                      </button>
                    </div>

                    <div className="grid gap-1">
                      {field.options && field.options.length > 0 ? (
                        field.options.map((opt) => (
                          <div key={opt.id} className="flex items-center gap-2">
                            <input
                              className="flex-1 rounded-xl border border-white/15 bg-black/30 px-2 py-1 text-[12px] font-semibold outline-none focus:border-white/35"
                              value={opt.label}
                              onChange={(e) => updateOptionLabel(field.id, opt.id, e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() => removeOption(field.id, opt.id)}
                              className="rounded-xl border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-extrabold transition hover:bg-white/10"
                            >
                              -
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="text-[11px] text-white/50">옵션이 없습니다. '+ 옵션' 버튼을 눌러 추가하세요.</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};