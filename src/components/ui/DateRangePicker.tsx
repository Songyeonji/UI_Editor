// components/ui/DateRangePicker.tsx (새 파일 생성)
import React, { useState, useRef, useEffect } from 'react';

// 사전 정의된 날짜 범위 타입
export type PresetRangeType = 'today' | 'yesterday' | 'last7days' | 'last30days' | 'thisMonth' | 'lastMonth' | 'custom';

// 드롭다운 위치 타입
export type DropdownPosition = 'left' | 'center' | 'right';

// 날짜 범위 인터페이스
export interface DateRange {
  startDate: Date;
  endDate: Date;
  type: PresetRangeType;
  label: string;
}

// 컴포넌트 Props
interface DateRangePickerProps {
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
  className?: string;
  disabled?: boolean;
  dropdownPosition?: DropdownPosition;
  theme?: {
    bg: string;
    panel: string;
    border: string;
    text: string;
    muted: string;
    accent: string;
  };
}

// 날짜 헬퍼 함수들
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDisplayDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}`;
};

const startOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

const subDays = (date: Date, days: number): Date => {
  const d = new Date(date);
  d.setDate(d.getDate() - days);
  return d;
};

// 사전 정의된 날짜 범위들
const getPresetRanges = (): DateRange[] => {
  const today = new Date();
  
  return [
    {
      startDate: startOfDay(today),
      endDate: endOfDay(today),
      type: 'today',
      label: '오늘'
    },
    {
      startDate: startOfDay(subDays(today, 1)),
      endDate: endOfDay(subDays(today, 1)),
      type: 'yesterday',
      label: '어제'
    },
    {
      startDate: startOfDay(subDays(today, 6)),
      endDate: endOfDay(today),
      type: 'last7days',
      label: '최근 7일'
    },
    {
      startDate: startOfDay(subDays(today, 29)),
      endDate: endOfDay(today),
      type: 'last30days',
      label: '최근 30일'
    },
    {
      startDate: startOfDay(new Date(today.getFullYear(), today.getMonth(), 1)),
      endDate: endOfDay(new Date(today.getFullYear(), today.getMonth() + 1, 0)),
      type: 'thisMonth',
      label: '이번 달'
    },
    {
      startDate: startOfDay(new Date(today.getFullYear(), today.getMonth() - 1, 1)),
      endDate: endOfDay(new Date(today.getFullYear(), today.getMonth(), 0)),
      type: 'lastMonth',
      label: '지난 달'
    }
  ];
};

// 날짜 범위를 표시용 문자열로 변환
const formatDateRangeLabel = (range: DateRange): string => {
  if (range.type !== 'custom') {
    return range.label;
  }
  
  const start = formatDisplayDate(range.startDate);
  const end = formatDisplayDate(range.endDate);
  
  if (start === end) {
    return start;
  }
  
  return `${start} ~ ${end}`;
};

// 포지션 스타일 반환 함수
const getDropdownPositionStyle = (position: DropdownPosition): React.CSSProperties => {
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    marginTop: '4px',
    width: '320px',
    zIndex: 50
  };
  
  switch (position) {
    case 'left':
      return {
        ...baseStyle,
        left: 0,
        right: 'auto',
        transformOrigin: 'top left'
      };
    case 'center':
      return {
        ...baseStyle,
        left: '50%',
        right: 'auto',
        transform: 'translateX(-50%)',
        transformOrigin: 'top center'
      };
    case 'right':
    default:
      return {
        ...baseStyle,
        right: 0,
        left: 'auto',
        transformOrigin: 'top right'
      };
  }
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  selectedRange,
  onRangeChange,
  className = '',
  disabled = false,
  dropdownPosition = 'right',
  theme
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState(formatDate(selectedRange.startDate));
  const [customEndDate, setCustomEndDate] = useState(formatDate(selectedRange.endDate));
  const dropdownRef = useRef<HTMLDivElement>(null);

  const presetRanges = getPresetRanges();

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 사전 정의 범위 선택 핸들러
  const handlePresetRangeSelect = (range: DateRange) => {
    onRangeChange(range);
    setCustomStartDate(formatDate(range.startDate));
    setCustomEndDate(formatDate(range.endDate));
    setIsOpen(false);
  };

  // 커스텀 날짜 적용 핸들러
  const handleCustomDateApply = () => {
    const startDate = new Date(customStartDate);
    const endDate = new Date(customEndDate);

    // 날짜 유효성 검사
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      alert('올바른 날짜를 입력해주세요.');
      return;
    }

    if (startDate > endDate) {
      alert('시작일은 종료일보다 이전이어야 합니다.');
      return;
    }

    const customRange: DateRange = {
      startDate: startOfDay(startDate),
      endDate: endOfDay(endDate),
      type: 'custom',
      label: '사용자 지정'
    };

    onRangeChange(customRange);
    setIsOpen(false);
  };

  // 토글 핸들러
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* 날짜 범위 선택 버튼 */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className="flex items-center px-3 py-2 rounded-xl text-[13px] font-semibold transition-colors min-w-[140px] justify-between outline-none"
        style={{
          backgroundColor: theme?.panel,
          border: theme ? `1px solid ${theme.border}` : '1px solid #e5e7eb',
          color: theme?.text,
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
      >
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{formatDateRangeLabel(selectedRange)}</span>
        </div>
        <svg 
          className="w-4 h-4 transition-transform"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div 
          style={{
            ...getDropdownPositionStyle(dropdownPosition),
            backgroundColor: theme?.panel || '#ffffff',
            border: theme ? `1px solid ${theme.border}` : '1px solid #e5e7eb'
          }}
          className="rounded-xl shadow-lg"
        >
          <div className="p-4 space-y-4">
            {/* 사전 정의된 범위들 */}
            <div>
              <h4 
                className="text-[13px] font-extrabold mb-2"
                style={{ color: theme?.text }}
              >
                빠른 선택
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {presetRanges.map((range) => (
                  <button
                    key={range.type}
                    type="button"
                    onClick={() => handlePresetRangeSelect(range)}
                    className="px-3 py-2 text-[12px] font-semibold rounded-xl border transition-colors text-left"
                    style={{
                      backgroundColor: selectedRange.type === range.type 
                        ? theme?.accent ? `${theme.accent}22` : '#e0e7ff'
                        : 'transparent',
                      borderColor: selectedRange.type === range.type 
                        ? theme?.accent || '#6366f1'
                        : theme?.border || '#e5e7eb',
                      color: selectedRange.type === range.type 
                        ? theme?.accent || '#6366f1'
                        : theme?.text || '#374151'
                    }}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 구분선 */}
            <div 
              className="border-t"
              style={{ borderColor: theme?.border || '#e5e7eb' }}
            ></div>

            {/* 커스텀 날짜 선택 */}
            <div>
              <h4 
                className="text-[13px] font-extrabold mb-2"
                style={{ color: theme?.text }}
              >
                사용자 지정
              </h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label 
                      className="block text-[11px] font-semibold mb-1"
                      style={{ color: theme?.muted }}
                    >
                      시작일
                    </label>
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-[12px] font-semibold outline-none"
                      style={{
                        backgroundColor: theme?.bg,
                        border: theme ? `1px solid ${theme.border}` : '1px solid #e5e7eb',
                        color: theme?.text
                      }}
                    />
                  </div>
                  <div>
                    <label 
                      className="block text-[11px] font-semibold mb-1"
                      style={{ color: theme?.muted }}
                    >
                      종료일
                    </label>
                    <input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-[12px] font-semibold outline-none"
                      style={{
                        backgroundColor: theme?.bg,
                        border: theme ? `1px solid ${theme.border}` : '1px solid #e5e7eb',
                        color: theme?.text
                      }}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCustomDateApply}
                  className="w-full px-3 py-2 text-[12px] font-extrabold rounded-xl transition-colors text-white"
                  style={{ backgroundColor: '#6366f1' }}
                >
                  적용
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;