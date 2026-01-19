// components/editors/TrayEditor.tsx

import React from 'react';
import { TRAY_META } from '../../constants/theme';
import { ChipButton } from '../ui/ChipButton';
import type { TrayType } from '../../types';

interface TrayEditorProps {
  trayType: TrayType;
  setTrayType: (type: TrayType) => void;
  trayHeaderText: string;
  setTrayHeaderText: (text: string) => void;
  trayTitle: string;
  setTrayTitle: (text: string) => void;
  trayMessage: string;
  setTrayMessage: (text: string) => void;
  trayButtonText: string;
  setTrayButtonText: (text: string) => void;
  onUpdateTime: () => void;
  onReset: () => void;
}

export const TrayEditor: React.FC<TrayEditorProps> = ({
  trayType,
  setTrayType,
  trayHeaderText,
  setTrayHeaderText,
  trayTitle,
  setTrayTitle,
  trayMessage,
  setTrayMessage,
  trayButtonText,
  setTrayButtonText,
  onUpdateTime,
  onReset,
}) => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-2">
        {([
          ['info', '#3b82f6', 'Info'],
          ['success', '#22c55e', 'Success'],
          ['warning', '#f59e0b', 'Warning'],
          ['error', '#ef4444', 'Error'],
        ] as const).map(([k, c, label]) => (
          <ChipButton
            key={k}
            active={trayType === k}
            color={c}
            title={label}
            subtitle={TRAY_META[k].status}
            onClick={() => setTrayType(k)}
          />
        ))}
      </div>

      <div className="grid gap-2">
        <div className="text-[12px] font-extrabold text-white/85">텍스트</div>

        <label className="grid gap-1">
          <span className="text-[11px] font-semibold text-white/70">헤더</span>
          <input
            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
            value={trayHeaderText}
            onChange={(e) => setTrayHeaderText(e.target.value)}
          />
        </label>

        <label className="grid gap-1">
          <span className="text-[11px] font-semibold text-white/70">제목</span>
          <input
            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
            value={trayTitle}
            onChange={(e) => setTrayTitle(e.target.value)}
          />
        </label>

        <label className="grid gap-1">
          <span className="text-[11px] font-semibold text-white/70">메시지</span>
          <textarea
            className="min-h-[92px] w-full resize-none rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
            value={trayMessage}
            onChange={(e) => setTrayMessage(e.target.value)}
          />
        </label>

        <label className="grid gap-1">
          <span className="text-[11px] font-semibold text-white/70">버튼 텍스트</span>
          <input
            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
            value={trayButtonText}
            onChange={(e) => setTrayButtonText(e.target.value)}
          />
        </label>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onUpdateTime}
            className="flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[13px] font-extrabold transition hover:bg-white/10"
          >
            시간 갱신
          </button>
          <button
            type="button"
            onClick={onReset}
            className="flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[13px] font-extrabold transition hover:bg-white/10"
          >
            초기화
          </button>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/5 p-3 text-[12px] font-semibold leading-relaxed text-white/70">
          - ESC로 닫기
          <br />- 우측에서 텍스트를 바로 수정
        </div>
      </div>
    </div>
  );
};
