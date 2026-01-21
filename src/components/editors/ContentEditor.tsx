// components/editors/ContentEditor.tsx

import React from 'react';
import type { ExtraButton, TableColumn, TableRow, TableMode, ButtonVariant, SearchFilterConfig, BadgeOptions, CellType } from '../../types';
import { uid } from '../../utils/helpers';

interface ContentEditorProps {
  listMenu: string;
  setListMenu: (menu: string) => void;
  listSubMenu: string;
  setListSubMenu: (subMenu: string) => void;
  listTitle: string;
  setListTitle: (title: string) => void;
  listSubtitle: string;
  setListSubtitle: (subtitle: string) => void;
  menuItems: string[];
  setMenuItems: React.Dispatch<React.SetStateAction<string[]>>;
  extraButtons: ExtraButton[];
  setExtraButtons: React.Dispatch<React.SetStateAction<ExtraButton[]>>;
  tableMode: TableMode;
  setTableMode: (mode: TableMode) => void;
  columns: TableColumn[];
  setColumns: React.Dispatch<React.SetStateAction<TableColumn[]>>;
  rows: TableRow[];
  setRows: React.Dispatch<React.SetStateAction<TableRow[]>>;
  showOverlay: boolean;
  setShowOverlay: (show: boolean) => void;
  searchFilter: SearchFilterConfig;
  setSearchFilter: React.Dispatch<React.SetStateAction<SearchFilterConfig>>;
  showContentPagination: boolean;
  setShowContentPagination: (show: boolean) => void;
  showContentEmptyState: boolean;
  setShowContentEmptyState: (show: boolean) => void;
  contentEmptyStateMessage: string;
  setContentEmptyStateMessage: (message: string) => void;
  contentCurrentPage: number;
  setContentCurrentPage: (page: number) => void;
  contentTotalPages: number;
  setContentTotalPages: (pages: number) => void;
}

const buttonVariants: { value: ButtonVariant; label: string }[] = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'sm', label: 'Small' },
  { value: 'xs', label: 'XSmall' },
  { value: 'add', label: 'Add' },
  { value: 'delete', label: 'Delete' },
  { value: 'refresh', label: 'Refresh' },
  { value: 'action', label: 'Action' },
];

export const ContentEditor: React.FC<ContentEditorProps> = ({
  listMenu,
  setListMenu,
  listSubMenu,
  setListSubMenu,
  listTitle,
  setListTitle,
  listSubtitle,
  setListSubtitle,
  menuItems,
  setMenuItems,
  extraButtons,
  setExtraButtons,
  tableMode,
  setTableMode,
  columns,
  setColumns,
  rows,
  setRows,
  showOverlay,
  setShowOverlay,
  searchFilter,
  setSearchFilter,
  showContentPagination,
  setShowContentPagination,
  showContentEmptyState,
  setShowContentEmptyState,
  contentEmptyStateMessage,
  setContentEmptyStateMessage,
  contentCurrentPage,
  setContentCurrentPage,
  contentTotalPages,
  setContentTotalPages,
}) => {
  const addMenu = () => setMenuItems((p) => [...p, `메뉴${p.length + 1}`]);
  const removeMenu = (idx: number) => setMenuItems((p) => p.filter((_, i) => i !== idx));
  const renameMenu = (idx: number, label: string) => setMenuItems((p) => p.map((x, i) => (i === idx ? label : x)));

  const addExtraButton = () => setExtraButtons((p) => [...p, { id: uid('btn'), label: `버튼${p.length + 1}`, variant: 'add' }]);
  const removeExtraButton = (id: string) => setExtraButtons((p) => p.filter((x) => x.id !== id));
  const renameExtraButton = (id: string, label: string) =>
    setExtraButtons((p) => p.map((x) => (x.id === id ? { ...x, label } : x)));
  const changeButtonVariant = (id: string, variant: ButtonVariant) =>
    setExtraButtons((p) => p.map((x) => (x.id === id ? { ...x, variant } : x)));

  const addColumn = () => {
    const newCol: TableColumn = { id: uid('col'), header: `컬럼${columns.length + 1}`, hasSwitch: false, cellType: 'text', width: undefined };
    setColumns((p) => [...p, newCol]);
    setRows((p) => p.map((r) => ({ ...r, cells: { ...r.cells, [newCol.id]: '데이터' } })));
  };

  const removeColumn = (id: string) => {
    setColumns((p) => p.filter((x) => x.id !== id));
    setRows((p) => p.map((r) => ({ ...r, cells: Object.fromEntries(Object.entries(r.cells).filter(([k]) => k !== id)) })));
  };

  const renameColumn = (id: string, header: string) => setColumns((p) => p.map((x) => (x.id === id ? { ...x, header } : x)));
  const changeCellType = (id: string, cellType: CellType) => {
    setColumns((p) => {
      const col = p.find((x) => x.id === id);
      if (!col) return p;

      setRows((r) =>
        r.map((row) => ({
          ...row,
          cells: {
            ...row.cells,
            [id]: cellType === 'switch'
              ? false
              : cellType === 'status'
                ? (col.statusOptions?.trueText || '허용')
                : cellType === 'badge'
                  ? { text: '뱃지', variant: 'blue' }  // 🔧 variant로 변경
                  : '데이터'
          },
        }))
      );

      return p.map((x) => (x.id === id ? { ...x, cellType, hasSwitch: cellType === 'switch' } : x));
    });
  };

  // addRow 함수 수정
  const addRow = () => {
    const newRow: TableRow = {
      id: uid('row'),
      cells: Object.fromEntries(columns.map((c) => [
        c.id,
        c.cellType === 'switch'
          ? false
          : c.cellType === 'badge'
            ? { text: '뱃지', variant: 'blue' }  // 🔧 variant로 변경
            : '데이터'
      ])),
    };
    setRows((p) => [...p, newRow]);
  };
  const changeColumnWidth = (id: string, width: number | undefined) =>
    setColumns((p) => p.map((x) => (x.id === id ? { ...x, width } : x)));


  const removeRow = (id: string) => setRows((p) => p.filter((x) => x.id !== id));

  const updateCellValue = (rowId: string, colId: string, value: string | boolean | BadgeOptions) => {
    setRows((p) =>
      p.map((row) => {
        if (row.id !== rowId) return row;
        return { ...row, cells: { ...row.cells, [colId]: value } };
      })
    );
  };

  const addSearchOption = () => {
    setSearchFilter((prev) => ({
      ...prev,
      searchOptions: [...prev.searchOptions, { value: `opt${prev.searchOptions.length + 1}`, label: `옵션${prev.searchOptions.length + 1}` }],
    }));
  };

  const removeSearchOption = (idx: number) => {
    setSearchFilter((prev) => ({
      ...prev,
      searchOptions: prev.searchOptions.filter((_, i) => i !== idx),
    }));
  };

  const updateSearchOptionLabel = (idx: number, label: string) => {
    setSearchFilter((prev) => ({
      ...prev,
      searchOptions: prev.searchOptions.map((opt, i) => (i === idx ? { ...opt, label } : opt)),
    }));
  };

  return (
    <div className="grid gap-4">
      {/* 옵션 */}
      <div className="grid gap-2">
        <div className="text-[12px] font-extrabold text-white/85">옵션</div>

        <label className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 p-3">
          <input type="checkbox" checked={showOverlay} onChange={(e) => setShowOverlay(e.target.checked)} />
          <span className="text-[13px] font-semibold text-white/85">오버레이 표시 (반투명 레이어)</span>
        </label>

        <label className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 p-3">
          <input
            type="checkbox"
            checked={searchFilter.enabled}
            onChange={(e) => setSearchFilter((prev) => ({ ...prev, enabled: e.target.checked }))}
          />
          <span className="text-[13px] font-semibold text-white/85">서치 필터 표시</span>
        </label>

        <label className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 p-3">
          <input
            type="checkbox"
            checked={showContentEmptyState}
            onChange={(e) => setShowContentEmptyState(e.target.checked)}
          />
          <span className="text-[13px] font-semibold text-white/85">EmptyState 표시</span>
        </label>

        {showContentEmptyState && (
          <label className="grid gap-1">
            <span className="text-[11px] font-semibold text-white/70">EmptyState 메시지</span>
            <input
              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
              value={contentEmptyStateMessage}
              onChange={(e) => setContentEmptyStateMessage(e.target.value)}
              placeholder="데이터가 없습니다."
            />
          </label>
        )}

        <label className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 p-3">
          <input
            type="checkbox"
            checked={showContentPagination}
            onChange={(e) => setShowContentPagination(e.target.checked)}
          />
          <span className="text-[13px] font-semibold text-white/85">Pagination 표시</span>
        </label>

        {showContentPagination && (
          <div className="grid grid-cols-2 gap-2">
            <label className="grid gap-1">
              <span className="text-[11px] font-semibold text-white/70">현재 페이지</span>
              <input
                type="number"
                min="1"
                max={contentTotalPages}
                className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                value={contentCurrentPage}
                onChange={(e) => setContentCurrentPage(Math.max(1, Math.min(contentTotalPages, Number(e.target.value))))}
              />
            </label>
            <label className="grid gap-1">
              <span className="text-[11px] font-semibold text-white/70">전체 페이지</span>
              <input
                type="number"
                min="1"
                className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                value={contentTotalPages}
                onChange={(e) => setContentTotalPages(Math.max(1, Number(e.target.value)))}
              />
            </label>
          </div>
        )}
      </div>

      {/* 서치 필터 설정 */}
      {searchFilter.enabled && (
        <div className="grid gap-2 rounded-2xl border border-white/15 bg-white/5 p-3">
          <div className="flex items-center justify-between">
            <div className="text-[12px] font-extrabold text-white/85">서치 필터 옵션</div>
            <button
              type="button"
              onClick={addSearchOption}
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
            >
              + 추가
            </button>
          </div>

          <div className="grid gap-2">
            {searchFilter.searchOptions.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  className="flex-1 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                  value={opt.label}
                  onChange={(e) => updateSearchOptionLabel(idx, e.target.value)}
                  placeholder="옵션명"
                />
                <button
                  type="button"
                  onClick={() => removeSearchOption(idx)}
                  className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
                >
                  -
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List Header */}
      {!showContentEmptyState && (
        <div className="grid gap-2">
          <div className="text-[12px] font-extrabold text-white/85">리스트 헤더 (PageContainer 스타일)</div>

          <label className="grid gap-1">
            <span className="text-[11px] font-semibold text-white/70">최상위 메뉴 (선택)</span>
            <input
              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
              placeholder="예: 대시보드"
              value={listMenu}
              onChange={(e) => setListMenu(e.target.value)}
            />
          </label>

          <label className="grid gap-1">
            <span className="text-[11px] font-semibold text-white/70">서브 메뉴 (선택)</span>
            <input
              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
              placeholder="예: 사용자 관리"
              value={listSubMenu}
              onChange={(e) => setListSubMenu(e.target.value)}
            />
          </label>

          <label className="grid gap-1">
            <span className="text-[11px] font-semibold text-white/70">타이틀</span>
            <input
              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
            />
          </label>

          <label className="grid gap-1">
            <span className="text-[11px] font-semibold text-white/70">서브타이틀</span>
            <input
              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
              value={listSubtitle}
              onChange={(e) => setListSubtitle(e.target.value)}
            />
          </label>

          <div className="flex items-center justify-between">
            <div className="text-[11px] font-semibold text-white/70">오른쪽 메뉴</div>
            <button
              type="button"
              onClick={addMenu}
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
            >
              + 추가
            </button>
          </div>

          <div className="grid gap-2">
            {menuItems.map((menu, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  className="flex-1 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                  value={menu}
                  onChange={(e) => renameMenu(idx, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeMenu(idx)}
                  className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
                >
                  -
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[11px] font-semibold text-white/70">Extra 버튼</div>
            <button
              type="button"
              onClick={addExtraButton}
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
            >
              + 추가
            </button>
          </div>

          <div className="grid gap-2">
            {extraButtons.map((btn) => (
              <div key={btn.id} className="grid gap-2 rounded-2xl border border-white/15 bg-white/5 p-3">
                <div className="flex items-center gap-2">
                  <input
                    className="flex-1 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                    value={btn.label}
                    onChange={(e) => renameExtraButton(btn.id, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeExtraButton(btn.id)}
                    className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
                  >
                    삭제
                  </button>
                </div>

                <label className="grid gap-1">
                  <span className="text-[11px] font-semibold text-white/70">버튼 스타일</span>
                  <select
                    className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                    value={btn.variant}
                    onChange={(e) => changeButtonVariant(btn.id, e.target.value as ButtonVariant)}
                  >
                    {buttonVariants.map((v) => (
                      <option key={v.value} value={v.value}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      {!showContentEmptyState && (
        <div className="grid gap-2">
          <div className="text-[12px] font-extrabold text-white/85">테이블</div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setTableMode('simple')}
              className={
                'rounded-xl border px-3 py-2 text-[13px] font-extrabold transition ' +
                (tableMode === 'simple' ? 'border-white/35 bg-white/10' : 'border-white/15 bg-white/5 hover:bg-white/10')
              }
            >
              심플
            </button>
            <button
              type="button"
              onClick={() => setTableMode('checkable')}
              className={
                'rounded-xl border px-3 py-2 text-[13px] font-extrabold transition ' +
                (tableMode === 'checkable' ? 'border-white/35 bg-white/10' : 'border-white/15 bg-white/5 hover:bg-white/10')
              }
            >
              체크
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[11px] font-semibold text-white/70">컬럼 (열)</div>
            <button
              type="button"
              onClick={addColumn}
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
            >
              + 추가
            </button>
          </div>

          <div className="grid gap-2">
            {columns.map((col) => (
              <div key={col.id} className="grid gap-2 rounded-2xl border border-white/15 bg-white/5 p-3">
                <div className="flex items-center gap-2">
                  <input
                    className="flex-1 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                    value={col.header}
                    onChange={(e) => renameColumn(col.id, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeColumn(col.id)}
                    className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
                  >
                    삭제
                  </button>
                </div>

                <label className="grid gap-1">
                  <span className="text-[11px] font-semibold text-white/70">셀 타입</span>
                  <select
                    className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                    value={col.cellType || 'text'}
                    onChange={(e) => changeCellType(col.id, e.target.value as CellType)}
                  >
                    <option value="text">텍스트</option>
                    <option value="switch">스위치</option>
                    <option value="status">상태 (허용/차단)</option>
                    <option value="badge">뱃지</option>
                  </select>
                </label>

                {/* 상태 텍스트 설정 - status 타입일 때만 표시 */}
                {col.cellType === 'status' && (
                  <div className="grid grid-cols-2 gap-2">
                    <label className="grid gap-1">
                      <span className="text-[11px] font-semibold text-white/70">True 텍스트</span>
                      <input
                        className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                        value={col.statusOptions?.trueText || '허용'}
                        onChange={(e) => {
                          setColumns((p) =>
                            p.map((x) =>
                              x.id === col.id
                                ? { ...x, statusOptions: { ...x.statusOptions, trueText: e.target.value, falseText: x.statusOptions?.falseText || '차단' } }
                                : x
                            )
                          );
                        }}
                        placeholder="허용"
                      />
                    </label>
                    <label className="grid gap-1">
                      <span className="text-[11px] font-semibold text-white/70">False 텍스트</span>
                      <input
                        className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                        value={col.statusOptions?.falseText || '차단'}
                        onChange={(e) => {
                          setColumns((p) =>
                            p.map((x) =>
                              x.id === col.id
                                ? { ...x, statusOptions: { ...x.statusOptions, trueText: x.statusOptions?.trueText || '허용', falseText: e.target.value } }
                                : x
                            )
                          );
                        }}
                        placeholder="차단"
                      />
                    </label>
                  </div>
                )}

                <label className="grid gap-1">
                  <span className="text-[11px] font-semibold text-white/70">열 너비 (%, 빈 값 = 자동)</span>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    placeholder="자동"
                    className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                    value={col.width ?? ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      changeColumnWidth(col.id, val === '' ? undefined : Number(val));
                    }}
                  />
                </label>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[11px] font-semibold text-white/70">행 ({rows.length})</div>
            <button
              type="button"
              onClick={addRow}
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
            >
              + 추가
            </button>
          </div>

          <div className="grid max-h-[400px] gap-2 overflow-y-auto">
            {rows.map((row, rowIdx) => (
              <div key={row.id} className="grid gap-2 rounded-2xl border border-white/15 bg-white/5 p-3">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-semibold text-white/70">행 {rowIdx + 1}</div>
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
                  >
                    삭제
                  </button>
                </div>

                <div className="grid gap-2">
                  {columns.map((col) => (
                    <div key={col.id}>
                      <label className="grid gap-1">
                        <span className="text-[11px] font-semibold text-white/70">{col.header}</span>
                        {col.cellType === 'switch' ? (
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={row.cells[col.id] as boolean}
                              onChange={(e) => updateCellValue(row.id, col.id, e.target.checked)}
                            />
                            <span className="text-[11px] font-semibold text-white/60">{row.cells[col.id] ? 'ON' : 'OFF'}</span>
                          </label>
                        ) : col.cellType === 'status' ? (
                          <select
                            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                            value={String(row.cells[col.id])}
                            onChange={(e) => updateCellValue(row.id, col.id, e.target.value)}
                          >
                            <option value={col.statusOptions?.trueText || '허용'}>{col.statusOptions?.trueText || '허용'}</option>
                            <option value={col.statusOptions?.falseText || '차단'}>{col.statusOptions?.falseText || '차단'}</option>
                          </select>
                        ) : col.cellType === 'badge' ? (
                          <div className="grid gap-2">
                            <input
                              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                              value={(row.cells[col.id] as BadgeOptions).text || ''}
                              onChange={(e) => {
                                const currentBadge = row.cells[col.id] as BadgeOptions;
                                updateCellValue(row.id, col.id, {
                                  ...currentBadge,
                                  text: e.target.value,
                                });
                              }}
                              placeholder="뱃지 텍스트"
                            />
                            {/* 🔧 색상 피커 대신 variant 드롭다운 */}
                            <label className="grid gap-1">
                              <span className="text-[11px] font-semibold text-white/60">색상</span>
                              <select
                                className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                                value={(row.cells[col.id] as BadgeOptions).variant || 'blue'}
                                onChange={(e) => {
                                  const currentBadge = row.cells[col.id] as BadgeOptions;
                                  updateCellValue(row.id, col.id, {
                                    ...currentBadge,
                                    variant: e.target.value as 'blue' | 'yellow' | 'green' | 'red',
                                  });
                                }}
                              >
                                <option value="blue">파란색</option>
                                <option value="yellow">노란색</option>
                                <option value="green">초록색</option>
                                <option value="red">빨간색</option>
                              </select>
                            </label>
                          </div>
                        ) : (
                          <input
                            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                            value={String(row.cells[col.id])}
                            onChange={(e) => updateCellValue(row.id, col.id, e.target.value)}
                          />
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};