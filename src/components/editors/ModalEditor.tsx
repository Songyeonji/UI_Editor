// components/editors/ModalEditor.tsx

import React from 'react';
import type { ConfirmModalType, ModalHeaderType, ModalHeaderConfig, SmallTableData, LogModalConfig, LogItem } from '../../types';
import { ChipButton } from '../ui/ChipButton';
import { uid } from '../../utils/helpers';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ModalEditorProps {
  modalType: 'confirm' | 'general' | 'log';
  setModalType: (type: 'confirm' | 'general' | 'log') => void;
  confirmType: ConfirmModalType;
  setConfirmType: (type: ConfirmModalType) => void;
  modalTitle: string;
  setModalTitle: (title: string) => void;
  modalMessage: string;
  setModalMessage: (message: string) => void;
  confirmButtonText: string;
  setConfirmButtonText: (text: string) => void;
  cancelButtonText: string;
  setCancelButtonText: (text: string) => void;
  showCancelButton: boolean;
  setShowCancelButton: (show: boolean) => void;
  showEmptyState: boolean;
  setShowEmptyState: (show: boolean) => void;
  emptyStateMessage: string;
  setEmptyStateMessage: (message: string) => void;
  showTable: boolean;
  setShowTable: (show: boolean) => void;
  tableData: SmallTableData;
  setTableData: React.Dispatch<React.SetStateAction<SmallTableData>>;
  modalHeader: ModalHeaderConfig;
  setModalHeader: React.Dispatch<React.SetStateAction<ModalHeaderConfig>>;
  showModalHeader: boolean;
  setShowModalHeader: (show: boolean) => void;
  modalSize: ModalSize;
  setModalSize: (size: ModalSize) => void;
  modalHeight: number;
  setModalHeight: (height: number) => void;
  showPagination: boolean;
  setShowPagination: (show: boolean) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
  logModalConfig: LogModalConfig;
  setLogModalConfig: React.Dispatch<React.SetStateAction<LogModalConfig>>;
}

export const ModalEditor: React.FC<ModalEditorProps> = ({
  modalType,
  setModalType,
  confirmType,
  setConfirmType,
  modalTitle,
  setModalTitle,
  modalMessage,
  setModalMessage,
  confirmButtonText,
  setConfirmButtonText,
  cancelButtonText,
  setCancelButtonText,
  showCancelButton,
  setShowCancelButton,
  showEmptyState,
  setShowEmptyState,
  emptyStateMessage,
  setEmptyStateMessage,
  showTable,
  setShowTable,
  tableData,
  setTableData,
  modalHeader,
  setModalHeader,
  showModalHeader,
  setShowModalHeader,
  modalSize,
  setModalSize,
  modalHeight,
  setModalHeight,
  showPagination,
  setShowPagination,
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
  logModalConfig,
  setLogModalConfig,
}) => {
  const addTableHeader = () => {
    setTableData((prev) => ({
      ...prev,
      headers: [...prev.headers, `컬럼${prev.headers.length + 1}`],
    }));
  };

  const removeTableHeader = (index: number) => {
    setTableData((prev) => ({
      headers: prev.headers.filter((_, i) => i !== index),
      rows: prev.rows.map((row) => row.filter((_, i) => i !== index)),
    }));
  };

  const updateTableHeader = (index: number, value: string) => {
    setTableData((prev) => ({
      ...prev,
      headers: prev.headers.map((h, i) => (i === index ? value : h)),
    }));
  };

  const addTableRow = () => {
    setTableData((prev) => ({
      ...prev,
      rows: [...prev.rows, new Array(prev.headers.length).fill('데이터')],
    }));
  };

  const removeTableRow = (index: number) => {
    setTableData((prev) => ({
      ...prev,
      rows: prev.rows.filter((_, i) => i !== index),
    }));
  };

  const updateTableCell = (rowIndex: number, cellIndex: number, value: string) => {
    setTableData((prev) => ({
      ...prev,
      rows: prev.rows.map((row, i) =>
        i === rowIndex ? row.map((cell, j) => (j === cellIndex ? value : cell)) : row
      ),
    }));
  };

  // 로그 모달 관련 함수
  const addLogDate = () => {
    const newDate: LogItem = {
      date: new Date().toISOString().split('T')[0],
      times: ['10:00:00'],
    };
    setLogModalConfig((prev) => ({
      ...prev,
      logs: [...prev.logs, newDate],
    }));
  };

  const removeLogDate = (index: number) => {
    setLogModalConfig((prev) => ({
      ...prev,
      logs: prev.logs.filter((_, i) => i !== index),
    }));
  };

  const updateLogDate = (index: number, date: string) => {
    setLogModalConfig((prev) => ({
      ...prev,
      logs: prev.logs.map((log, i) => (i === index ? { ...log, date } : log)),
    }));
  };

  const addLogTime = (dateIndex: number) => {
    setLogModalConfig((prev) => ({
      ...prev,
      logs: prev.logs.map((log, i) =>
        i === dateIndex ? { ...log, times: [...log.times, '10:00:00'] } : log
      ),
    }));
  };

  const removeLogTime = (dateIndex: number, timeIndex: number) => {
    setLogModalConfig((prev) => ({
      ...prev,
      logs: prev.logs.map((log, i) =>
        i === dateIndex ? { ...log, times: log.times.filter((_, j) => j !== timeIndex) } : log
      ),
    }));
  };

  const updateLogTime = (dateIndex: number, timeIndex: number, time: string) => {
    setLogModalConfig((prev) => ({
      ...prev,
      logs: prev.logs.map((log, i) =>
        i === dateIndex
          ? { ...log, times: log.times.map((t, j) => (j === timeIndex ? time : t)) }
          : log
      ),
    }));
  };

  return (
    <div className="grid gap-4">
      {/* 모달 타입 선택 */}
      <div className="grid gap-2">
        <div className="text-[12px] font-extrabold text-white/85">모달 타입</div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setModalType('confirm')}
            className={
              'rounded-xl border px-3 py-2 text-[13px] font-extrabold transition ' +
              (modalType === 'confirm' ? 'border-white/35 bg-white/10' : 'border-white/15 bg-white/5 hover:bg-white/10')
            }
          >
            확인 모달
          </button>
          <button
            type="button"
            onClick={() => setModalType('general')}
            className={
              'rounded-xl border px-3 py-2 text-[13px] font-extrabold transition ' +
              (modalType === 'general' ? 'border-white/35 bg-white/10' : 'border-white/15 bg-white/5 hover:bg-white/10')
            }
          >
            일반 모달
          </button>
          <button
            type="button"
            onClick={() => setModalType('log')}
            className={
              'rounded-xl border px-3 py-2 text-[13px] font-extrabold transition ' +
              (modalType === 'log' ? 'border-white/35 bg-white/10' : 'border-white/15 bg-white/5 hover:bg-white/10')
            }
          >
            로그 모달
          </button>
        </div>
      </div>

      {/* 확인 모달 전용 설정 */}
      {modalType === 'confirm' && (
        <div className="grid gap-2">
          <div className="text-[12px] font-extrabold text-white/85">확인 모달 색상</div>
          <div className="grid grid-cols-2 gap-2">
            {([
              ['info', '#3b82f6', 'Info'],
              ['warning', '#f59e0b', 'Warning'],
              ['error', '#ef4444', 'Error'],
              ['success', '#22c55e', 'Success'],
            ] as const).map(([k, c, label]) => (
              <ChipButton
                key={k}
                active={confirmType === k}
                color={c}
                title={label}
                onClick={() => setConfirmType(k)}
              />
            ))}
          </div>
          <div className="grid gap-2">
            <ChipButton
              active={confirmType === 'yesNo'}
              color="#3b82f6"
              title="Yes/No"
              subtitle="예/아니오 선택"
              onClick={() => setConfirmType('yesNo')}
            />
          </div>
        </div>
      )}

      {/* 일반 모달 전용 설정 */}
      {modalType === 'general' && (
        <>
          {/* 모달 크기 & 높이 */}
          <div className="grid gap-2">
            <div className="text-[12px] font-extrabold text-white/85">모달 크기</div>
            <div className="grid grid-cols-5 gap-2">
              {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setModalSize(size)}
                  className={
                    'rounded-xl border px-2 py-2 text-[12px] font-extrabold transition ' +
                    (modalSize === size ? 'border-white/35 bg-white/10' : 'border-white/15 bg-white/5 hover:bg-white/10')
                  }
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="grid gap-1">
              <span className="text-[11px] font-semibold text-white/70">모달 높이 (px)</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setModalHeight(Math.max(200, modalHeight - 50))}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-[14px] font-extrabold transition hover:bg-white/10"
                >
                  -
                </button>
                <div className="flex-1 text-center text-[13px] font-semibold text-white/85">
                  {modalHeight}px
                </div>
                <button
                  type="button"
                  onClick={() => setModalHeight(Math.min(700, modalHeight + 50))}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-[14px] font-extrabold transition hover:bg-white/10"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 옵션 */}
          <div className="grid gap-2">
            <div className="text-[12px] font-extrabold text-white/85">옵션</div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showModalHeader}
                onChange={(e) => setShowModalHeader(e.target.checked)}
              />
              <span className="text-[11px] font-semibold text-white/70">모달 헤더 표시</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showEmptyState}
                onChange={(e) => {
                  setShowEmptyState(e.target.checked);
                  if (e.target.checked) setShowTable(false);
                }}
              />
              <span className="text-[11px] font-semibold text-white/70">EmptyState 표시</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showPagination}
                onChange={(e) => setShowPagination(e.target.checked)}
              />
              <span className="text-[11px] font-semibold text-white/70">Pagination 표시</span>
            </label>
          </div>

          {/* 페이지네이션 설정 */}
          {showPagination && (
            <div className="grid grid-cols-2 gap-2">
              <label className="grid gap-1">
                <span className="text-[11px] font-semibold text-white/70">현재 페이지</span>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Math.max(1, Math.min(totalPages, Number(e.target.value))))}
                />
              </label>
              <label className="grid gap-1">
                <span className="text-[11px] font-semibold text-white/70">전체 페이지</span>
                <input
                  type="number"
                  min="1"
                  className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                  value={totalPages}
                  onChange={(e) => setTotalPages(Math.max(1, Number(e.target.value)))}
                />
              </label>
            </div>
          )}

          {/* 모달 헤더 설정 */}
          {showModalHeader && (
            <div className="grid gap-2 rounded-2xl border border-white/15 bg-white/5 p-3">
              <div className="text-[12px] font-extrabold text-white/85">모달 헤더</div>

              <label className="grid gap-1">
                <span className="text-[11px] font-semibold text-white/70">헤더 타입</span>
                <select
                  className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                  value={modalHeader.type}
                  onChange={(e) => setModalHeader((prev) => ({ ...prev, type: e.target.value as ModalHeaderType }))}
                >
                  <option value="member">구성원</option>
                  <option value="asset">자산</option>
                  <option value="department">부서</option>
                </select>
              </label>

              <label className="grid gap-1">
                <span className="text-[11px] font-semibold text-white/70">헤더 타이틀</span>
                <input
                  className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                  value={modalHeader.title}
                  onChange={(e) => setModalHeader((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="홍길동"
                />
              </label>

              <label className="grid gap-1">
                <span className="text-[11px] font-semibold text-white/70">헤더 서브타이틀</span>
                <input
                  className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                  value={modalHeader.subtitle || ''}
                  onChange={(e) => setModalHeader((prev) => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="개발팀"
                />
              </label>
            </div>
          )}

          {/* EmptyState 메시지 */}
          {showEmptyState && (
            <label className="grid gap-1">
              <span className="text-[11px] font-semibold text-white/70">EmptyState 메시지</span>
              <input
                className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                value={emptyStateMessage}
                onChange={(e) => setEmptyStateMessage(e.target.value)}
                placeholder="데이터가 없습니다."
              />
            </label>
          )}
        </>
      )}

      {/* 로그 모달 전용 설정 */}
      {modalType === 'log' && (
        <div className="grid gap-2">
          <div className="text-[12px] font-extrabold text-white/85">로그 정보</div>

          <label className="grid gap-1">
            <span className="text-[11px] font-semibold text-white/70">아이템 이름</span>
            <input
              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
              value={logModalConfig.itemName}
              onChange={(e) => setLogModalConfig((prev) => ({ ...prev, itemName: e.target.value }))}
              placeholder="차단된 프로그램.exe"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-[11px] font-semibold text-white/70">아이템 경로</span>
            <input
              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
              value={logModalConfig.itemPath}
              onChange={(e) => setLogModalConfig((prev) => ({ ...prev, itemPath: e.target.value }))}
              placeholder="C:\Program Files\..."
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <label className="grid gap-1">
              <span className="text-[11px] font-semibold text-white/70">총 차단 횟수</span>
              <input
                type="number"
                min="0"
                className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                value={logModalConfig.detectionCount}
                onChange={(e) => setLogModalConfig((prev) => ({ ...prev, detectionCount: Number(e.target.value) }))}
              />
            </label>

            <label className="grid gap-1">
              <span className="text-[11px] font-semibold text-white/70">최근 차단 일시</span>
              <input
                type="text"
                className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                value={logModalConfig.blockedDate}
                onChange={(e) => setLogModalConfig((prev) => ({ ...prev, blockedDate: e.target.value }))}
                placeholder="2025-01-21 15:30"
              />
            </label>
          </div>

          {/* 로그 타임라인 */}
          <div className="grid gap-2 rounded-2xl border border-white/15 bg-white/5 p-3">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-semibold text-white/70">차단 로그</div>
              <button
                type="button"
                onClick={addLogDate}
                className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
              >
                + 날짜 추가
              </button>
            </div>

            <div className="grid max-h-[400px] gap-2 overflow-y-auto">
              {logModalConfig.logs.map((log, dateIdx) => (
                <div key={dateIdx} className="grid gap-2 rounded-2xl border border-white/15 bg-black/20 p-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      className="flex-1 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[12px] font-semibold outline-none focus:border-white/35"
                      value={log.date}
                      onChange={(e) => updateLogDate(dateIdx, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeLogDate(dateIdx)}
                      className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
                    >
                      삭제
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-semibold text-white/60">시간 목록</div>
                    <button
                      type="button"
                      onClick={() => addLogTime(dateIdx)}
                      className="rounded-xl border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-extrabold transition hover:bg-white/10"
                    >
                      + 시간
                    </button>
                  </div>

                  <div className="grid gap-2">
                    {log.times.map((time, timeIdx) => (
                      <div key={timeIdx} className="flex items-center gap-2">
                        <input
                          type="time"
                          step="1"
                          className="flex-1 rounded-xl border border-white/15 bg-black/30 px-2 py-1 text-[12px] font-semibold outline-none focus:border-white/35"
                          value={time}
                          onChange={(e) => updateLogTime(dateIdx, timeIdx, e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => removeLogTime(dateIdx, timeIdx)}
                          className="rounded-xl border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-extrabold transition hover:bg-white/10"
                        >
                          -
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 공통 설정 */}
      <label className="grid gap-1">
        <span className="text-[12px] font-extrabold text-white/85">모달 제목</span>
        <input
          className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
          value={modalTitle}
          onChange={(e) => setModalTitle(e.target.value)}
          placeholder="모달 제목 입력"
        />
      </label>

      {(modalType === 'confirm' || (!showEmptyState && !showTable && modalType !== 'log')) && (
        <label className="grid gap-1">
          <span className="text-[12px] font-extrabold text-white/85">메시지</span>
          <textarea
            className="min-h-[92px] w-full resize-none rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
            value={modalMessage}
            onChange={(e) => setModalMessage(e.target.value)}
            placeholder="모달 메시지 입력"
          />
        </label>
      )}

      {/* 버튼 설정 (확인 모달) */}
      {modalType === 'confirm' && (
        <div className="grid gap-2">
          <div className="text-[12px] font-extrabold text-white/85">버튼</div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showCancelButton}
              onChange={(e) => setShowCancelButton(e.target.checked)}
            />
            <span className="text-[11px] font-semibold text-white/70">취소 버튼 표시</span>
          </label>

          {showCancelButton && (
            <label className="grid gap-1">
              <span className="text-[11px] font-semibold text-white/70">취소 버튼 텍스트</span>
              <input
                className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                value={cancelButtonText}
                onChange={(e) => setCancelButtonText(e.target.value)}
              />
            </label>
          )}

          <label className="grid gap-1">
            <span className="text-[11px] font-semibold text-white/70">확인 버튼 텍스트</span>
            <input
              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
              value={confirmButtonText}
              onChange={(e) => setConfirmButtonText(e.target.value)}
            />
          </label>
        </div>
      )}

      {/* 일반 모달 테이블 */}
      {modalType === 'general' && (
        <div className="grid gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showTable}
              onChange={(e) => {
                setShowTable(e.target.checked);
                if (e.target.checked) setShowEmptyState(false);
              }}
            />
            <span className="text-[12px] font-extrabold text-white/85">작은 테이블 표시</span>
          </label>

          {showTable && (
            <div className="grid gap-2 rounded-2xl border border-white/15 bg-white/5 p-3">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-semibold text-white/70">테이블 헤더</div>
                <button
                  type="button"
                  onClick={addTableHeader}
                  className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
                >
                  + 컬럼
                </button>
              </div>

              <div className="grid gap-2">
                {tableData.headers.map((header, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      className="flex-1 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[12px] font-semibold outline-none focus:border-white/35"
                      value={header}
                      onChange={(e) => updateTableHeader(idx, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeTableHeader(idx)}
                      className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
                    >
                      -
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-[11px] font-semibold text-white/70">테이블 데이터</div>
                <button
                  type="button"
                  onClick={addTableRow}
                  className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
                >
                  + 행
                </button>
              </div>

              <div className="grid max-h-[300px] gap-2 overflow-y-auto">
                {tableData.rows.map((row, rowIdx) => (
                  <div key={rowIdx} className="grid gap-2 rounded-2xl border border-white/15 bg-black/20 p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-semibold text-white/70">행 {rowIdx + 1}</div>
                      <button
                        type="button"
                        onClick={() => removeTableRow(rowIdx)}
                        className="rounded-xl border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-extrabold transition hover:bg-white/10"
                      >
                        삭제
                      </button>
                    </div>

                    <div className="grid gap-2">
                      {row.map((cell, cellIdx) => (
                        <label key={cellIdx} className="grid gap-1">
                          <span className="text-[11px] font-semibold text-white/60">
                            {tableData.headers[cellIdx] || `컬럼${cellIdx + 1}`}
                          </span>
                          <input
                            className="w-full rounded-xl border border-white/15 bg-black/30 px-2 py-1 text-[12px] font-semibold outline-none focus:border-white/35"
                            value={cell}
                            onChange={(e) => updateTableCell(rowIdx, cellIdx, e.target.value)}
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};