// components/preview/LayoutPreview.tsx

import React from 'react';
import { SidebarTree } from '../ui/SidebarTree';
import type { NavItem, SideItem, ThemeColors } from '../../types';

interface LayoutPreviewProps {
  theme: ThemeColors;
  appTitle: string;
  topNav: NavItem[];
  activeTopNavId: string | null;
  onTopNavClick: (id: string) => void;
  sidebarTitle: string;
  sidebarMode: 'flat' | 'folder' | 'mixed';
  sideItems: SideItem[];
  activeSideId: string | null;
  onSideClick: (id: string) => void;
  footerUserName: string;
  footerNotice: string;
  previewScale: number;
}

export const LayoutPreview: React.FC<LayoutPreviewProps> = ({
  theme: t,
  appTitle,
  topNav,
  activeTopNavId,
  onTopNavClick,
  sidebarTitle,
  sidebarMode,
  sideItems,
  activeSideId,
  onSideClick,
  footerUserName,
  footerNotice,
  previewScale,
}) => {
  const accent = t.accent;

  // Mixed 모드: 폴더는 폴더로, 단일 아이템은 flat으로
  const renderSidebar = () => {
    if (sidebarMode === 'folder') {
      return (
        <SidebarTree
          items={sideItems}
          accent={accent}
          textColor={t.text}
          hoverBg={t.hover}
          borderColor={t.border}
          onPick={onSideClick}
          activeId={activeSideId}
        />
      );
    }

    if (sidebarMode === 'flat') {
      const flatItems: SideItem[] = [];
      for (const it of sideItems) {
        flatItems.push({ id: it.id, label: it.label });
        for (const c of it.children ?? []) {
          flatItems.push({ id: c.id, label: `${it.label} / ${c.label}` });
        }
      }

      return (
        <div className="grid gap-1">
          {flatItems.map((it) => {
            const isActive = activeSideId === it.id;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => onSideClick(it.id)}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[13px] font-extrabold transition"
                style={{
                  color: isActive ? accent : t.text,
                  backgroundColor: isActive ? `${accent}22` : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = t.hover;
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span
                  className="grid h-6 w-6 place-items-center rounded-lg"
                  style={{ border: `1px solid ${t.border}`, color: accent }}
                >
                  •
                </span>
                <span className="truncate">{it.label}</span>
              </button>
            );
          })}
        </div>
      );
    }

    // Mixed 모드
    return (
      <div className="grid gap-1">
        {sideItems.map((it) => {
          const hasChildren = !!it.children?.length;
          
          if (hasChildren) {
            // 폴더는 트리로
            return (
              <SidebarTree
                key={it.id}
                items={[it]}
                accent={accent}
                textColor={t.text}
                hoverBg={t.hover}
                borderColor={t.border}
                onPick={onSideClick}
                activeId={activeSideId}
              />
            );
          }

          // 단일 아이템은 flat으로
          const isActive = activeSideId === it.id;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => onSideClick(it.id)}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[13px] font-extrabold transition"
              style={{
                color: isActive ? accent : t.text,
                backgroundColor: isActive ? `${accent}22` : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = t.hover;
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span
                className="grid h-6 w-6 place-items-center rounded-lg"
                style={{ border: `1px solid ${t.border}`, color: accent }}
              >
                •
              </span>
              <span className="truncate">{it.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: 1200,
        height: 800,
        transform: `translate(-50%, -50%) scale(${previewScale})`,
        transformOrigin: 'center',
      }}
    >
      <div className="h-full w-full overflow-hidden rounded-2xl" style={{ backgroundColor: t.bg, color: t.text }}>
        {/* Topbar */}
        <div className="flex h-14 items-center" style={{ backgroundColor: t.header, borderBottom: `1px solid ${t.border}` }}>
          <div className="flex w-[260px] items-center gap-1">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-xl font-black"
              style={{ backgroundColor: accent, color: 'white' }}
              title="Menu"
            >
              ☰
            </button>
            <div className="text-[15px] font-black">{appTitle || 'D-BUGGER'}</div>
          </div>

          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-1">
              {topNav.map((x) => {
                const isActive = activeTopNavId === x.id;
                return (
                  <button
                    key={x.id}
                    type="button"
                    onClick={() => onTopNavClick(x.id)}
                    className="rounded-xl px-3 py-2 text-[13px] font-extrabold transition"
                    style={{
                      color: isActive ? accent : t.text,
                      backgroundColor: isActive ? `${accent}22` : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = t.hover;
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {x.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <div
                className="grid h-9 w-9 place-items-center rounded-xl"
                style={{ backgroundColor: t.hover, border: `1px solid ${t.border}` }}
                title="Icon"
              >
                ◎
              </div>
              <div
                className="grid h-9 w-9 place-items-center rounded-xl"
                style={{ backgroundColor: t.hover, border: `1px solid ${t.border}` }}
                title="Icon"
              >
                ◌
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex h-[calc(800px-56px-48px)]">
          {/* Sidebar */}
          <aside className="w-[260px] p-4" style={{ backgroundColor: t.panel, borderRight: `1px solid ${t.border}` }}>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
              <div className="text-[12px] font-extrabold" style={{ color: t.muted }}>
                {sidebarTitle} 
              </div>
            </div>

            {renderSidebar()}
          </aside>

          {/* Content */}
          <main className="flex-1 p-5" style={{ backgroundColor: t.bg }}>
            <div className="h-full rounded-2xl p-5" style={{ backgroundColor: t.panel, border: `1px solid ${t.border}` }}>
              <div className="text-[15px] font-black">콘텐츠 영역</div>
              <div className="mt-2 text-[13px] font-semibold leading-relaxed" style={{ color: t.muted }}>
                Topbar/Sidebar는 오른쪽 패널에서 추가/수정 가능.
                <br />
                클릭하면 활성화 스타일이 적용돼.
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="h-20 rounded-2xl" style={{ backgroundColor: t.hover, border: `1px solid ${t.border}` }} />
                ))}
              </div>
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="flex h-12 items-center" style={{ backgroundColor: t.panel, borderTop: `1px solid ${t.border}` }}>
          {/* User Area - 사이드바와 동일한 너비 */}
          <div className="flex w-[260px] items-center justify-center" style={{ borderRight: `1px solid ${t.border}` }}>
            <div className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-full text-[11px] font-black text-white" style={{ backgroundColor: accent }}>
                U
              </div>
              <div className="text-[12px] font-extrabold">{footerUserName}</div>
            </div>
          </div>

          {/* Notice Area */}
          <div className="flex flex-1 items-center px-4">
            <div className="w-full rounded-lg px-3 py-1 text-[12px] font-semibold" style={{ backgroundColor: `${accent}11`, color: accent }}>
              {footerNotice}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};