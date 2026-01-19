// components/preview/TrayPreview.tsx

import React from 'react';
import { TrayIcon } from '../ui/TrayIcon';
import type { TrayType, TrayMeta } from '../../types';

interface TrayPreviewProps {
  trayType: TrayType;
  trayMeta: TrayMeta;
  trayHeaderText: string;
  trayTitle: string;
  trayMessage: string;
  trayTime: string;
  trayButtonText: string;
  trayClosing: boolean;
  onClose: () => void;
}

export const TrayPreview: React.FC<TrayPreviewProps> = ({
  trayType,
  trayMeta,
  trayHeaderText,
  trayTitle,
  trayMessage,
  trayTime,
  trayButtonText,
  trayClosing,
  onClose,
}) => {
  return (
    <div className="grid gap-4">
      <div className="text-[13px] font-semibold leading-relaxed text-white/75">
        아래는 Windows 우측 하단 트레이 근처 알림을 가정한 샘플 UI야. (디자인 참고용)
      </div>

      <div className="relative h-[420px] overflow-hidden rounded-2xl border border-white/15 bg-white/1">
        <div
          className={
            "absolute bottom-[70px] right-4 flex h-[200px] w-[380px] origin-bottom-right flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.35),0_10px_10px_-5px_rgba(0,0,0,0.22)] " +
            (trayClosing
              ? "animate-[toastOut_.22s_ease-in_forwards]"
              : "animate-[toastIn_.22s_ease-out]")
          }
          style={{ fontFamily: 'Pretendard' }}
        >
          <style>{`
            @keyframes toastIn { 
              from { opacity: 0; transform: translateY(10px) scale(.98);} 
              to { opacity: 1; transform: translateY(0) scale(1);} 
            }
            @keyframes toastOut { 
              from { opacity: 1; transform: translateY(0) scale(1);} 
              to { opacity: 0; transform: translateY(10px) scale(.98);} 
            }
          `}</style>

          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-[10px]"
            style={{ backgroundColor: trayMeta.accent }}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-5 w-5 place-items-center">
                <TrayIcon type={trayType} />
              </div>
              <div className="text-[15px] font-extrabold text-white drop-shadow-sm">
                {trayHeaderText}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid h-7 w-7 place-items-center rounded-lg bg-white/15 transition hover:scale-[1.03] hover:bg-white/20"
              title="닫기"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col gap-[10px] overflow-hidden bg-white px-4 py-[14px]">
            <div className="text-[15px] font-black leading-[1.32] text-[#1f2937]">
              {trayTitle}
            </div>
            <div className="flex-1 whitespace-pre-wrap text-[13px] font-medium leading-[1.45] text-[#4b5563]">
              {trayMessage}
            </div>
            <div className="text-[12px] font-bold text-[#9ca3af]">
              시간: {trayTime}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end border-t border-[#e5e7eb] bg-[#f9fafb] px-4 py-2">
            <button
              type="button"
              onClick={onClose}
              className="min-w-[108px] rounded-lg px-4 py-[7px] text-[13px] font-black text-white shadow-[0_1px_3px_rgba(0,0,0,.15)] transition hover:-translate-y-[1px]"
              style={{ backgroundColor: trayMeta.accent }}
            >
              {trayButtonText}
            </button>
          </div>
        </div>

        {/* Taskbar Mock */}
        <div className="absolute bottom-0 left-0 right-0 flex h-[54px] items-center gap-2 border-t border-white/10 bg-black/40 px-4">
          <div className="h-[10px] w-[10px] rounded-full bg-white/60" />
          <div className="h-[10px] w-[10px] rounded-full bg-white/60" />
          <div className="h-[30px] w-[180px] rounded-full border border-white/10 bg-white/10" />
          <div className="ml-auto text-[12px] font-bold text-white/60">
            ESC로 닫기
          </div>
        </div>
      </div>
    </div>
  );
};