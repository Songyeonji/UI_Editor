// components/ui/ChipButton.tsx

import React from 'react';

interface ChipButtonProps {
  active: boolean;
  color: string;
  title: string;
  subtitle?: string;
  onClick: () => void;
}

export const ChipButton: React.FC<ChipButtonProps> = ({
  active,
  color,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-xl border px-3 py-2 text-left transition " +
        (active
          ? "border-white/35 bg-white/10"
          : "border-white/20 bg-black/20 hover:-translate-y-[1px] hover:bg-white/10")
      }
    >
      <div className="grid gap-1">
        <div
          className="h-[10px] w-[10px] rounded-full border-2 border-white/90 shadow"
          style={{
            backgroundColor: color,
            boxShadow: "0 0 0 3px rgba(255,255,255,.08)",
          }}
        />
        <div className="text-[12px] font-extrabold text-white/90">{title}</div>
        {subtitle && (
          <div className="text-[11px] font-semibold text-white/70">
            {subtitle}
          </div>
        )}
      </div>
    </button>
  );
};