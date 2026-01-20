// components/editors/LayoutEditor.tsx

import React from 'react';
import type { ThemeMode, NavItem, SideItem, SidebarMode } from '../../types';
import { uid, clampStr } from '../../utils/helpers';

interface LayoutEditorProps {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  appTitle: string;
  setAppTitle: (title: string) => void;
  topNav: NavItem[];
  setTopNav: React.Dispatch<React.SetStateAction<NavItem[]>>;
  sidebarTitle: string;
  setSidebarTitle: (title: string) => void;
  sidebarMode: SidebarMode;
  setSidebarMode: (mode: SidebarMode) => void;
  sideItems: SideItem[];
  setSideItems: React.Dispatch<React.SetStateAction<SideItem[]>>;
  footerUserName: string;
  setFooterUserName: (name: string) => void;
  footerNotice: string;
  setFooterNotice: (notice: string) => void;
}

export const LayoutEditor: React.FC<LayoutEditorProps> = ({
  themeMode,
  setThemeMode,
  appTitle,
  setAppTitle,
  topNav,
  setTopNav,
  sidebarTitle,
  setSidebarTitle,
  sidebarMode,
  setSidebarMode,
  sideItems,
  setSideItems,
  footerUserName,
  setFooterUserName,
  footerNotice,
  setFooterNotice,
}) => {
  const addTopNav = () => setTopNav((p) => [...p, { id: uid('nav'), label: `메뉴${p.length + 1}` }]);
  const removeTopNav = (id: string) => setTopNav((p) => p.filter((x) => x.id !== id));
  const renameTopNav = (id: string, label: string) => setTopNav((p) => p.map((x) => (x.id === id ? { ...x, label } : x)));

  const addSidebarItem = () => {
    setSideItems((prev) => {
      const next = [...prev];
      if (sidebarMode === 'folder' || sidebarMode === 'mixed')
        next.push({ id: uid('side'), label: `폴더${next.length + 1}`, children: [] });
      else next.push({ id: uid('side'), label: `메뉴${next.length + 1}` });
      return next;
    });
  };

  const removeSidebarItem = (id: string) => setSideItems((p) => p.filter((x) => x.id !== id));
  const renameSidebarItem = (id: string, label: string) => setSideItems((p) => p.map((x) => (x.id === id ? { ...x, label } : x)));

  const addChild = (folderId: string) => {
    setSideItems((p) =>
      p.map((x) => {
        if (x.id !== folderId) return x;
        const children = x.children ?? [];
        return { ...x, children: [...children, { id: uid('side'), label: `하위${children.length + 1}` }] };
      })
    );
  };

  const removeChild = (folderId: string, childId: string) => {
    setSideItems((p) =>
      p.map((x) => {
        if (x.id !== folderId) return x;
        return { ...x, children: (x.children ?? []).filter((c) => c.id !== childId) };
      })
    );
  };

  const renameChild = (folderId: string, childId: string, label: string) => {
    setSideItems((p) =>
      p.map((x) => {
        if (x.id !== folderId) return x;
        return { ...x, children: (x.children ?? []).map((c) => (c.id === childId ? { ...c, label } : c)) };
      })
    );
  };

  return (
    <div className="grid gap-4">
      {/* Theme */}
      <div className="grid gap-2">
        <div className="text-[12px] font-extrabold text-white/85">테마 (Dark / White)</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setThemeMode('dark')}
            className={
              'rounded-xl border px-3 py-2 text-[13px] font-extrabold transition ' +
              (themeMode === 'dark' ? 'border-white/35 bg-white/10' : 'border-white/15 bg-white/5 hover:bg-white/10')
            }
          >
            Dark
          </button>
          <button
            type="button"
            onClick={() => setThemeMode('light')}
            className={
              'rounded-xl border px-3 py-2 text-[13px] font-extrabold transition ' +
              (themeMode === 'light' ? 'border-white/35 bg-white/10' : 'border-white/15 bg-white/5 hover:bg-white/10')
            }
          >
            White
          </button>
        </div>
      </div>

      {/* App Title */}
      <label className="grid gap-1">
        <span className="text-[12px] font-extrabold text-white/85">앱 타이틀</span>
        <input
          className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
          value={appTitle}
          onChange={(e) => setAppTitle(e.target.value)}
        />
      </label>

      {/* Topbar Nav */}
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <div className="text-[12px] font-extrabold text-white/85">Topbar 메뉴</div>
          <button
            type="button"
            onClick={addTopNav}
            className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
          >
            + 추가
          </button>
        </div>

        <div className="grid gap-2">
          {topNav.map((x) => (
            <div key={x.id} className="grid gap-2 rounded-2xl border border-white/15 bg-white/5 p-3">
              <div className="flex items-center gap-2">
                <input
                  className="flex-1 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                  value={x.label}
                  onChange={(e) => renameTopNav(x.id, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeTopNav(x.id)}
                  className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="grid gap-2">
        <label className="grid gap-1">
          <span className="text-[12px] font-extrabold text-white/85">Sidebar 제목</span>
          <input
            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
            value={sidebarTitle}
            onChange={(e) => setSidebarTitle(e.target.value)}
          />
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSidebarMode('folder')}
            className={
              'flex-1 rounded-xl border px-3 py-2 text-[12px] font-extrabold transition ' +
              (sidebarMode === 'folder' ? 'border-white/35 bg-white/10' : 'border-white/15 bg-white/5 hover:bg-white/10')
            }
          >
            폴더
          </button>
          <button
            type="button"
            onClick={() => setSidebarMode('flat')}
            className={
              'flex-1 rounded-xl border px-3 py-2 text-[12px] font-extrabold transition ' +
              (sidebarMode === 'flat' ? 'border-white/35 bg-white/10' : 'border-white/15 bg-white/5 hover:bg-white/10')
            }
          >
            단일
          </button>
          <button
            type="button"
            onClick={() => setSidebarMode('mixed')}
            className={
              'flex-1 rounded-xl border px-3 py-2 text-[12px] font-extrabold transition ' +
              (sidebarMode === 'mixed' ? 'border-white/35 bg-white/10' : 'border-white/15 bg-white/5 hover:bg-white/10')
            }
          >
            혼합
          </button>
          <button
            type="button"
            onClick={addSidebarItem}
            className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
          >
            +
          </button>
        </div>

        <div className="grid gap-2">
          {sideItems.map((it) => (
            <div key={it.id} className="grid gap-2 rounded-2xl border border-white/15 bg-white/5 p-3">
              <div className="flex items-center gap-2">
                <input
                  className="flex-1 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                  value={it.label}
                  onChange={(e) => renameSidebarItem(it.id, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeSidebarItem(it.id)}
                  className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
                >
                  삭제
                </button>
              </div>

              {(sidebarMode === 'folder' || sidebarMode === 'mixed') && (
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-semibold text-white/70">하위 메뉴 ({(it.children ?? []).length})</div>
                    <button
                      type="button"
                      onClick={() => addChild(it.id)}
                      className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
                    >
                      + 하위 추가
                    </button>
                  </div>

                  <div className="grid gap-2">
                    {(it.children ?? []).map((c) => (
                      <div key={c.id} className="flex items-center gap-2">
                        <input
                          className="flex-1 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
                          value={c.label}
                          onChange={(e) => renameChild(it.id, c.id, e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => removeChild(it.id, c.id)}
                          className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-extrabold transition hover:bg-white/10"
                        >
                          -
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="grid gap-2">
        <div className="text-[12px] font-extrabold text-white/85">Footer</div>
        
        <label className="grid gap-1">
          <span className="text-[11px] font-semibold text-white/70">사용자 이름</span>
          <input
            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
            value={footerUserName}
            onChange={(e) => setFooterUserName(e.target.value)}
          />
        </label>

        <label className="grid gap-1">
          <span className="text-[11px] font-semibold text-white/70">공지사항</span>
          <input
            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-[13px] font-semibold outline-none focus:border-white/35"
            value={footerNotice}
            onChange={(e) => setFooterNotice(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};