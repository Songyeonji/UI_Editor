// components/preview/LogModalPreview.tsx

import React from 'react';
import { StatusBadge } from '../ui/StatusBadge';
import { LogTimeline } from '../ui/LogTimeline';
import { IoClose } from 'react-icons/io5';
import type { ThemeColors, LogModalConfig } from '../../types';

interface LogModalPreviewProps {
  theme: ThemeColors;
  modalTitle: string;
  logConfig: LogModalConfig;
  previewScale: number;
}

export const LogModalPreview: React.FC<LogModalPreviewProps> = ({
  theme: t,
  modalTitle,
  logConfig,
  previewScale,
}) => {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: 500,
        height: 600,
        transform: `translate(-50%, -50%) scale(${previewScale})`,
        transformOrigin: 'center',
        fontFamily: 'Pretendard',
      }}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-xl"
        style={{ backgroundColor: t.bg, color: t.text }}
      >
        {/* 헤더 */}
        <div
          className="border-b px-6 py-4 flex items-center justify-between"
          style={{ borderColor: t.border }}
        >
          <h2 className="text-[16px] font-black">{modalTitle}</h2>
          <button
            type="button"
            className="rounded-lg p-1 transition hover:opacity-70"
            style={{ color: t.muted }}
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* 본문 */}
        <div className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 64px)' }}>
          {/* 기본 정보 */}
          <div
            className="mb-1 rounded-lg p-2"
            style={{ backgroundColor: t.panel }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[15px] font-black">{logConfig.itemName}</h3>
              <StatusBadge variant={logConfig.detectionCount > 2 ? 'red' : 'yellow'}>
                총 {logConfig.detectionCount}회 차단
              </StatusBadge>
            </div>
            <p className="mb-2 text-[12px] font-semibold" style={{ color: t.muted }}>
              {logConfig.itemPath}
            </p>
            <span className="text-[12px] font-semibold" style={{ color: t.muted }}>
              마지막 기록:  {logConfig.blockedDate}
            </span>
          </div>
          {/* 본문 */}
          <div className="p-4 overflow-y-auto" >

            {/* 로그 타임라인 */}
            <LogTimeline
              title="차단 로그"
              logs={logConfig.logs}
            />
          </div>
        </div>
      </div>
    </div>
  );
};