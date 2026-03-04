// components/preview/TrayPreviewV2.tsx
import React from 'react';
import { TrayIcon } from '../ui/TrayIcon';
import type { TrayButton, TrayMeta, TrayButtonColorKey } from '../../types';
import type { TrayV2Type } from '../../types';
import logo from '../../assets/logo.png';
interface TrayPreviewV2Props {
  trayType: TrayV2Type;
  trayMeta: TrayMeta;

  headerEnabled: boolean;
  headerText: string;

  statusText: string;
  title: string;
  message: string;
  time: string;

  buttons: TrayButton[];
  verticalButtons: boolean;

  trayClosing: boolean;
  onClose: () => void;
}

const BUTTON_COLOR_MAP: Record<TrayButtonColorKey, string> = {
  red: '#ef4444',
  orange: '#f97316',
  yellow: '#f59e0b',
  green: '#22c55e',
  blue: '#3b82f6',
  navy: '#1d4ed8',
  purple: '#8b5cf6',

  gray: '#6b7280',

  redSoft: '#f87171',
  orangeSoft: '#fb923c',
  yellowSoft: '#fbbf24',
  greenSoft: '#4ade80',
  blueSoft: '#60a5fa',
  navySoft: '#818cf8',
  purpleSoft: '#a78bfa',
};
export const TrayPreviewV2: React.FC<TrayPreviewV2Props> = ({
  trayType,
  trayMeta,

  headerEnabled,
  headerText,

  statusText,
  title,
  message,
  time,

  buttons,
  verticalButtons,

  trayClosing,
  onClose,
}) => {
  const isColumn = buttons.length >= 2 ? verticalButtons : true;

  const resolveBtnColor = (b: TrayButton) => {
    if (!b.colorKey) return trayMeta.accent;
    return BUTTON_COLOR_MAP[b.colorKey] ?? trayMeta.accent;
  };

  return (
    <div className="grid gap-4">
      <div className="text-[13px] font-semibold leading-relaxed text-white/75">
        V2: 350×250 고정 카드 (V1 헤더/톤 동일) + 버튼 색상 선택
      </div>

      <div className="relative h-[520px] overflow-hidden rounded-2xl border border-white/15 bg-white/1">
        <div
          className={
            "absolute bottom-[70px] right-4 flex h-[260px] w-[380px] origin-bottom-right flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.35),0_10px_10px_-5px_rgba(0,0,0,0.22)] " +
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

          {/* Header (V1 스타일 동일) */}
          {headerEnabled && (
            <div
              className="flex items-center justify-between px-4 py-[10px]"
              style={{ backgroundColor: trayMeta.accent }}
            >
              <div className="flex items-center gap-3">
                <div className="grid h-5 w-5 place-items-center">

                  <TrayIcon type="info" logoSrc={logo} />
                </div>
                <div className="text-[15px] font-extrabold text-white drop-shadow-sm">
                  {headerText}
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
          )}

          {/* Body */}
          <div className="flex flex-1 flex-col  gap-[10px] overflow-hidden bg-white px-4 py-[8px]">
            {!headerEnabled && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-5 w-5 place-items-center">
                    <TrayIcon type={trayType as any} />
                  </div>
                  <div className="text-[15px] font-black leading-[1.2] text-[#111827]">
                    {statusText}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-7 w-7 place-items-center rounded-lg bg-black/5 transition hover:scale-[1.03] hover:bg-black/10"
                  title="닫기"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#111827"
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
            )}

            <div className="text-[18px] font-black leading-[1.32] text-[#1f2937]">
              {title}
            </div>

            <div className="flex-1 whitespace-pre-wrap text-[15px] font-medium leading-[1.45] text-[#0c0c0c]">
              {message}
            </div>

            <div className="text-[12px] font-bold text-[#9ca3af]">
              시간: {time}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="border-t border-[#e5e7eb] bg-[#f9fafb] p-3">
            {/** ✅ 2개 이상일 때만 verticalButtons 옵션을 적용 */}
            {(() => {
              const useColumn = buttons.length >= 2 && verticalButtons;

              // ✅ 가로 배치일 때: 1개=full / 2개=grid-cols-2 / 3개=grid-cols-3
              const rowClass =
                buttons.length === 1
                  ? 'grid grid-cols-1'
                  : buttons.length === 2
                    ? 'grid grid-cols-2'
                    : 'grid grid-cols-3';

              return (
                <div className={(useColumn ? 'flex flex-col' : rowClass) + ' gap-2'}>
                  {buttons.map((b) => (
                    <div key={b.id} className="w-full p-[2px]">
                      <button
                        type="button"
                        onClick={onClose}
                        className="w-full rounded-lg py-2 text-[13px] font-black text-white shadow-[0_1px_3px_rgba(0,0,0,.15)] transition hover:-translate-y-[1px]"
                        style={{ backgroundColor: resolveBtnColor(b) }}
                      >
                        {b.label}
                      </button>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Taskbar Mock */}
        <div className="absolute bottom-0 left-0 right-0 flex h-[54px] items-center gap-2 border-t border-white/10 bg-black/40 px-4">
          <div className="h-[10px] w-[10px] rounded-full bg-white/60" />
          <div className="h-[10px] w-[10px] rounded-full bg-white/60" />
          <div className="h-[30px] w-[180px] rounded-full border border-white/10 bg-white/10" />
          <div className="ml-auto text-[12px] font-bold text-white/60">ESC로 닫기</div>
        </div>
      </div>
    </div>
  );
};