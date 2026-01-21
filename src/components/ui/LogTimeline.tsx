// components/ui/LogTimeline.tsx

import React from 'react';
import { RiAlertLine } from 'react-icons/ri';
import type { LogItem } from '../../types';

interface LogTimelineProps {
  title: string;
  logs: LogItem[];
  actionText?: string;
  className?: string;
  color?: string;
}

export const LogTimeline: React.FC<LogTimelineProps> = ({
  title,
  logs,
  actionText,
  className = '',
  color = '#ef4444',
}) => {
  if (logs.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-sm text-gray-500">로그가 없습니다.</p>
      </div>
    );
  }

  const totalCount = logs.reduce((sum, log) => sum + log.times.length, 0);

  return (
    <div className={className}>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <RiAlertLine className="w-4 h-4" style={{ color }} />
          <h4 className="text-sm font-medium">{title}</h4>
        </div>
        <span className="text-xs text-gray-500">
          총 {totalCount}건
        </span>
      </div>

      {/* 타임라인 */}
      <div className="min-h-32 max-h-80 overflow-y-auto">
        <div className="relative pl-6 space-y-6">
          {/* 세로 라인 */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300" />
          
          {logs.map((log, dateIndex) => (
            <div key={dateIndex} className="relative">
              {/* 날짜 포인트 */}
              <div
                className="absolute -left-[13px] top-0 w-[26px] h-[26px] rounded-full border-4 border-white flex items-center justify-center"
                style={{ backgroundColor: color }}
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              
              {/* 날짜 */}
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                  {log.date}
                </span>
              </div>
              
              {/* 시간 목록 */}
              <div className="ml-4 space-y-1">
                {log.times.map((time, timeIndex) => (
                  <div 
                    key={timeIndex}
                    className="flex items-center space-x-2 text-sm text-gray-600"
                  >
                    <span className="text-gray-400">-</span>
                    <span className="font-mono">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};