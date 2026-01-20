// components/ui/SidebarTree.tsx

import React, { useState } from 'react';
import type { SideItem } from '../../types';

interface SidebarTreeProps {
  items: SideItem[];
  accent: string;
  textColor: string;
  hoverBg: string;
  borderColor: string;
  onPick: (id: string) => void;
  activeId: string | null;
}

export const SidebarTree: React.FC<SidebarTreeProps> = ({
  items,
  accent,
  textColor,
  hoverBg,
  borderColor,
  onPick,
  activeId,
}) => {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  // 하위 메뉴 중에 활성화된 아이템이 있는지 확인하는 함수
  const hasActiveChild = (item: SideItem): boolean => {
    if (!item.children?.length) return false;
    
    for (const child of item.children) {
      if (child.id === activeId) return true;
      if (hasActiveChild(child)) return true;
    }
    
    return false;
  };

  const Row = ({ item, depth }: { item: SideItem; depth: number }) => {
    const hasChildren = !!item.children?.length;
    const isOpen = !!open[item.id];
    const isActive = activeId === item.id;
    const isParentOfActive = hasActiveChild(item); // 하위에 활성화된 아이템이 있는지

    return (
      <div>
        <button
          type="button"
          onClick={() => {
            onPick(item.id);
            if (hasChildren) toggle(item.id);
          }}
          className="group flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[13px] font-extrabold transition"
          style={{
            paddingLeft: 10 + depth * 14,
            color: (isActive || isParentOfActive) ? accent : textColor,
            backgroundColor: (isActive || isParentOfActive) ? `${accent}22` : "transparent",
          }}
          onMouseEnter={(e) => {
            if (!isActive && !isParentOfActive) e.currentTarget.style.backgroundColor = hoverBg;
          }}
          onMouseLeave={(e) => {
            if (!isActive && !isParentOfActive)
              e.currentTarget.style.backgroundColor = (isActive || isParentOfActive)
                ? `${accent}22`
                : "transparent";
          }}
        >
          <span
            className="grid h-5 w-5 place-items-center rounded-md border"
            style={{ borderColor, color: accent }}
            title={hasChildren ? (isOpen ? "폴더 닫기" : "폴더 열기") : "메뉴"}
          >
            {hasChildren ? (isOpen ? "▾" : "▸") : "•"}
          </span>
          <span className="flex-1 truncate">{item.label}</span>
        </button>

        {hasChildren && isOpen && (
          <div className="mt-1 grid gap-1">
            {item.children!.map((c) => (
              <Row key={c.id} item={c} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid gap-1">
      {items.map((it) => (
        <Row key={it.id} item={it} depth={0} />
      ))}
    </div>
  );
};