// components/preview/ContentPreview.tsx

import React from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';
import Button from '../ui/Button';
import { Pagination } from '../ui/Pagination';
import { EmptyState } from '../ui/EmptyState';
import type { ThemeColors, ExtraButton, TableColumn, TableRow, SearchFilterConfig } from '../../types';

interface ContentPreviewProps {
  theme: ThemeColors;
  listMenu?: string;
  listSubMenu?: string;
  listTitle: string;
  listSubtitle: string;
  menuItems: string[];
  extraButtons: ExtraButton[];
  tableMode: 'simple' | 'checkable';
  columns: TableColumn[];
  rows: TableRow[];
  showOverlay: boolean;
  searchFilter: SearchFilterConfig;
  showPagination: boolean;
  currentPage: number;
  totalPages: number;
  showEmptyState: boolean;
  emptyStateMessage: string;
  previewScale: number;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({
  theme: t,
  listMenu,
  listSubMenu,
  listTitle,
  listSubtitle,
  menuItems,
  extraButtons,
  tableMode,
  columns,
  rows,
  showOverlay,
  searchFilter,
  showPagination,
  currentPage,
  totalPages,
  showEmptyState,
  emptyStateMessage,
  previewScale,
}) => {
  const accent = t.accent;

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: 900,
        height: 650,
        transform: `translate(-50%, -50%) scale(${previewScale})`,
        transformOrigin: 'center',
        fontFamily: 'Pretendard',
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl p-6 flex flex-col" style={{ backgroundColor: t.bg, color: t.text }}>
        {/* PageContainer 스타일 헤더 */}
        <div className="mb-5 flex-shrink-0">
          {/* 타이틀 + 브레드크럼 + 오른쪽 옵션 */}
          <div className="mb-3 flex items-center justify-between">
            <h1 className="flex items-center text-[20px] font-black">
              {listMenu && (
                <span className="mr-2 flex items-center" style={{ color: t.muted, opacity: 0.85 }}>
                  {listMenu}
                  <RiArrowRightSLine className="ml-1 inline-block" />
                </span>
              )}

              {listSubMenu && (
                <span className="mr-2 flex items-center" style={{ color: t.muted }}>
                  {listSubMenu}
                  <RiArrowRightSLine className="ml-1 inline-block" />
                </span>
              )}

              <span style={{ color: t.text }}>{listTitle}</span>
            </h1>
          </div>

          {/* 서브타이틀 */}
          {listSubtitle && (
            <div className="mb-3 text-[13px] font-semibold" style={{ color: t.muted }}>
              {listSubtitle}
            </div>
          )}

          {/* 서치 필터 */}
          {searchFilter.enabled && (
            <div className="mb-3 flex items-center gap-2">
              <select
                className="rounded-xl px-3 py-2 text-[13px] font-extrabold outline-none"
                style={{ backgroundColor: t.panel, border: `1px solid ${t.border}`, color: t.text }}
                value={searchFilter.searchType}
              >
                {searchFilter.searchOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="flex-1 rounded-xl px-3 py-2 text-[13px] font-semibold outline-none"
                style={{ backgroundColor: t.panel, border: `1px solid ${t.border}`, color: t.text }}
                value={searchFilter.searchKeyword}
              />

              <button
                type="button"
                className="rounded-xl px-4 py-2 text-[13px] font-extrabold text-white transition"
                style={{ backgroundColor: '#6366f1' }}
              >
                검색
              </button>
            </div>
          )}

          {/* 오른쪽 옵션 (메뉴 + Extra 버튼) */}
          <div className="flex items-center justify-end gap-2">
            {menuItems.map((menu, i) => (
              <button
                key={i}
                type="button"
                className="rounded-xl px-3 py-2 text-[13px] font-extrabold transition"
                style={{ color: t.text, backgroundColor: t.hover, border: `1px solid ${t.border}` }}
              >
                {menu}
              </button>
            ))}

            {extraButtons.map((btn) => (
              <Button key={btn.id} variant={btn.variant}>
                {btn.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Table 영역 - flex-1로 공간 차지 */}
        <div className="flex-1 overflow-auto" style={{ minHeight: 0 }}>
          {showEmptyState ? (
            <EmptyState message={emptyStateMessage} iconSize="large" className="h-full" />
          ) : columns.length > 0 ? (
            <div className="overflow-auto rounded-2xl" style={{ border: `1px solid ${t.border}` }}>
              <table className="w-full">
                <thead style={{ backgroundColor: t.header, borderBottom: `1px solid ${t.border}` }}>
                  <tr>
                    {tableMode === 'checkable' && (
                      <th className="px-3 py-1.5 h-[33px] text-left text-[13px] font-extrabold" style={{ width: '50px' }}>
                        <input type="checkbox" className="h-3 w-3" />
                      </th>
                    )}
                    {columns.map((col) => (
                      <th
                        key={col.id}
                        className="px-3 py-1.5 h-[33px] text-left text-[13px] font-extrabold"
                        style={{ width: col.width ? `${col.width}%` : 'auto' }}
                      >
                        {col.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.length > 0 ? (
                    rows.map((row, idx) => (
                      <tr
                        key={row.id}
                        style={{
                          backgroundColor: idx % 2 === 0 ? t.panel : t.bg,
                          borderBottom: `1px solid ${t.border}`,
                        }}
                      >
                        {tableMode === 'checkable' && (
                          <td className="px-3 py-1.5 h-[33px]">
                            <input type="checkbox" className="h-3 w-3" />
                          </td>
                        )}
                        {columns.map((col) => (
                          <td key={col.id} className="px-3 py-1.5 h-[33px] text-[13px] font-semibold">
                            {col.cellType === 'switch' && typeof row.cells[col.id] === 'boolean' ? (
                              <label className="relative inline-flex cursor-pointer items-center">
                                <input type="checkbox" checked={row.cells[col.id] as boolean} readOnly className="peer sr-only" />
                                <div
                                  className="peer h-5 w-9 rounded-full after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-4"
                                  style={{ backgroundColor: row.cells[col.id] ? accent : t.border }}
                                />
                              </label>
                            ) : col.cellType === 'status' ? (
                              <span
                                className="text-[13px] font-extrabold"
                                style={{
                                  color: row.cells[col.id] === (col.statusOptions?.trueText || '허용')
                                    ? '#10b981'
                                    : '#ef4444'
                                }}
                              >
                                {String(row.cells[col.id] ?? '-')}
                              </span>
                            ) : (
                              String(row.cells[col.id] ?? '-')
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={tableMode === 'checkable' ? columns.length + 1 : columns.length}
                        className="px-4 py-8 text-center text-[13px] font-semibold"
                        style={{ color: t.muted }}
                      >
                        데이터가 없습니다. 오른쪽 패널에서 행을 추가해주세요.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              className="flex h-full items-center justify-center rounded-2xl"
              style={{ border: `1px solid ${t.border}`, backgroundColor: t.panel }}
            >
              <div className="text-center">
                <div className="text-[15px] font-black" style={{ color: t.muted }}>
                  컬럼이 없습니다
                </div>
                <div className="mt-2 text-[13px] font-semibold" style={{ color: t.muted }}>
                  오른쪽 패널에서 컬럼을 추가해주세요.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pagination - 푸터 영역 */}
        {showPagination && !showEmptyState && (
          <div className="flex-shrink-0 mt-4 pt-3" style={{ borderTop: `1px solid ${t.border}` }}>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={() => { }} size="small" />
          </div>
        )}

        {/* 오버레이 */}
        {showOverlay && (
          <div
            className="absolute inset-0 rounded-2xl backdrop-blur-sm transition-opacity"
            style={{
              backgroundColor: t.bg === '#ffffff' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.5)',
              pointerEvents: 'none',
            }}
          >
            <div className="flex h-full items-center justify-center">
              <div
                className="rounded-2xl border px-6 py-3 text-[15px] font-black shadow-lg"
                style={{
                  backgroundColor: t.panel,
                  borderColor: t.border,
                  color: t.text,
                }}
              >
                오버레이 활성화 상태
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};