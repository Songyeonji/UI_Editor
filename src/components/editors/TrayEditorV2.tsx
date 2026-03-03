// components/editors/TrayEditorV2.tsx
import React from 'react';
import { ChipButton } from '../ui/ChipButton';
import { TRAY_V2_META } from '../../constants/theme';
import type { TrayButton, TrayV2Type, TrayButtonColorKey } from '../../types';
import { uid } from '../../utils/helpers';

interface TrayEditorV2Props {
  trayType: TrayV2Type;
  setTrayType: (type: TrayV2Type) => void;

  headerEnabled: boolean;
  setHeaderEnabled: (v: boolean) => void;

  headerText: string;
  setHeaderText: (text: string) => void;

  statusTextMap: Record<TrayV2Type, string>;
  setStatusTextMap: (map: Record<TrayV2Type, string>) => void;

  title: string;
  setTitle: (text: string) => void;
  message: string;
  setMessage: (text: string) => void;

  buttons: TrayButton[];
  setButtons: (btns: TrayButton[]) => void;

  verticalButtons: boolean;
  setVerticalButtons: (v: boolean) => void;

  onUpdateTime: () => void;
  onReset: () => void;
}

const BUTTON_COLOR_PALETTE: Array<{ key: TrayButtonColorKey; label: string; hex: string }> = [
  // 진한(기본)
  { key: 'red', label: '빨강', hex: '#ef4444' },
  { key: 'orange', label: '주황', hex: '#f97316' },
  { key: 'yellow', label: '노랑', hex: '#f59e0b' },
  { key: 'green', label: '초록', hex: '#22c55e' },
  { key: 'blue', label: '파랑', hex: '#3b82f6' },
  { key: 'navy', label: '남색', hex: '#1d4ed8' },
  { key: 'purple', label: '보라', hex: '#8b5cf6' },

  // 회색
  { key: 'gray', label: '회색', hex: '#6b7280' }, // Tailwind gray-500

  // 연한(파스텔)
  { key: 'redSoft', label: '연빨강', hex: '#f87171' },     // red-400
{ key: 'orangeSoft', label: '연주황', hex: '#fb923c' },  // orange-400
{ key: 'yellowSoft', label: '연노랑', hex: '#fbbf24' },  // amber-400
{ key: 'greenSoft', label: '연초록', hex: '#4ade80' },   // green-400
{ key: 'blueSoft', label: '연파랑', hex: '#60a5fa' },    // blue-400
{ key: 'navySoft', label: '연남색', hex: '#818cf8' },    // indigo-400 (남색 느낌)
{ key: 'purpleSoft', label: '연보라', hex: '#a78bfa' },  // violet-400
];

export const TrayEditorV2: React.FC<TrayEditorV2Props> = ({
  trayType,
  setTrayType,

  headerEnabled,
  setHeaderEnabled,
  headerText,
  setHeaderText,

  statusTextMap,
  setStatusTextMap,

  title,
  setTitle,
  message,
  setMessage,

  buttons,
  setButtons,

  verticalButtons,
  setVerticalButtons,

  onUpdateTime,
  onReset,
}) => {
  const themeList = [
    ['info', TRAY_V2_META.info.accent, 'Info'],
    ['success', TRAY_V2_META.success.accent, 'Success'],
    ['danger', TRAY_V2_META.danger.accent, 'Danger'],
  ] as const;

  const updateStatus = (type: TrayV2Type, next: string) => {
    setStatusTextMap({ ...statusTextMap, [type]: next });
  };

  const addButton = () => {
    if (buttons.length >= 3) return;
    setButtons([...buttons, { id: uid('traybtn'), label: `버튼 ${buttons.length + 1}` }]);
  };

  const removeButton = (id: string) => {
    if (buttons.length <= 1) return;
    setButtons(buttons.filter((b) => b.id !== id));
  };

  const updateButtonLabel = (id: string, label: string) => {
    setButtons(buttons.map((b) => (b.id === id ? { ...b, label } : b)));
  };

  const updateButtonColor = (id: string, colorKey?: TrayButtonColorKey) => {
    setButtons(buttons.map((b) => (b.id === id ? { ...b, colorKey } : b)));
  };

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-2">
        {themeList.map(([k, c, label]) => (
          <ChipButton
            key={k}
            active={trayType === k}
            color={c}
            title={label}
            subtitle={statusTextMap[k]}
            onClick={() => setTrayType(k)}
          />
        ))}
      </div>

      <div className="grid gap-2">
        <div className="text-[12px] font-extrabold text-white/85">V2 텍스트</div>

        <label className="flex items-center justify-between rounded-xl border border-white/15 bg-black/20 px-3 py-2">
          <span className="text-[12px] font-bold text-white/75">헤더 사용</span>
          <input
            type="checkbox"
            checked={headerEnabled}
            onChange={(e) => setHeaderEnabled(e.target.checked)}
            className="h-4 w-4 accent-white"
          />
        </label>

        {headerEnabled && (
          <label className="grid gap-1">
            <span className="text-[11px] font-semibold text-white/70">헤더(상단바) 텍스트</span>
            <input
              className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
              value={headerText}
              onChange={(e) => setHeaderText(e.target.value)}
            />
          </label>
        )}

        <label className="grid gap-1">
          <span className="text-[11px] font-semibold text-white/70">
            상태 고정문구 (현재 테마: {trayType})
          </span>
          <input
            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
            value={statusTextMap[trayType]}
            onChange={(e) => updateStatus(trayType, e.target.value)}
          />
        </label>

        <label className="grid gap-1">
          <span className="text-[11px] font-semibold text-white/70">제목</span>
          <input
            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="grid gap-1">
          <span className="text-[11px] font-semibold text-white/70">메시지</span>
          <textarea
            className="min-h-[110px] w-full resize-none rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <div className="mt-2 grid gap-2 rounded-2xl border border-white/15 bg-white/5 p-3">
          <div className="flex items-center justify-between">
            <div className="text-[12px] font-extrabold text-white/85">버튼 (1~3개)</div>
            <button
              type="button"
              onClick={addButton}
              disabled={buttons.length >= 3}
              className="rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-[12px] font-extrabold disabled:opacity-50"
            >
              + 추가
            </button>
          </div>

          {buttons.map((b, idx) => (
            <div key={b.id} className="grid gap-2 rounded-xl border border-white/10 bg-black/10 p-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-white/70">버튼 {idx + 1}</span>
                <button
                  type="button"
                  onClick={() => removeButton(b.id)}
                  disabled={buttons.length <= 1}
                  className="rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-bold disabled:opacity-50"
                >
                  삭제
                </button>
              </div>

              <label className="grid gap-1">
                <span className="text-[11px] font-semibold text-white/70">라벨</span>
                <input
                  className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                  value={b.label}
                  onChange={(e) => updateButtonLabel(b.id, e.target.value)}
                />
              </label>

              <label className="grid gap-1">
                <span className="text-[11px] font-semibold text-white/70">색상</span>
                <div className="flex items-center gap-2">
                  <select
                    className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                    value={b.colorKey ?? ''}
                    onChange={(e) => {
                      const v = e.target.value;
                      updateButtonColor(b.id, v ? (v as TrayButtonColorKey) : undefined);
                    }}
                  >
                    <option value="">기본(테마색)</option>
                    {BUTTON_COLOR_PALETTE.map((p) => (
                      <option key={p.key} value={p.key}>
                        {p.label}
                      </option>
                    ))}
                  </select>

                  <div
                    className="h-9 w-9 rounded-xl border border-white/15"
                    title="미리보기"
                    style={{
                      background:
                        b.colorKey
                          ? BUTTON_COLOR_PALETTE.find((p) => p.key === b.colorKey)?.hex
                          : TRAY_V2_META[trayType].accent,
                    }}
                  />
                </div>
              </label>
            </div>
          ))}

          <label className="mt-2 flex items-center justify-between rounded-xl border border-white/15 bg-black/20 px-3 py-2">
            <span className="text-[12px] font-bold text-white/75">
              버튼 수직 정렬 (2개 이상일 때)
            </span>
            <input
              type="checkbox"
              checked={verticalButtons}
              onChange={(e) => setVerticalButtons(e.target.checked)}
              className="h-4 w-4 accent-white"
              disabled={buttons.length < 2}
            />
          </label>
        </div>

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
          - 버튼 색상: 빨/주/노/초/파/남/보 (버튼별 선택)
          <br />- “기본(테마색)” 선택 시 info/success/danger accent 사용
        </div>
      </div>
    </div>
  );
};