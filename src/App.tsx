// App.tsx
import { useEffect, useRef, useState } from 'react';
import { TrayPreview } from './components/preview/TrayPreview';
import { LayoutPreview } from './components/preview/LayoutPreview';
import { ContentPreview } from './components/preview/ContentPreview';
import { ApprovalPreview } from './components/preview/ApprovalPreview';
import { ModalPreview } from './components/preview/ModalPreview';
import { TrayEditor } from './components/editors/TrayEditor';
import { LayoutEditor } from './components/editors/LayoutEditor';
import { ContentEditor } from './components/editors/ContentEditor';
import { ApprovalEditor } from './components/editors/ApprovalEditor';
import { ModalEditor } from './components/editors/ModalEditor';
import { TRAY_META, THEME } from './constants/theme';
import { formatNow, uid } from './utils/helpers';
import type {
  TabKey,
  TrayType,
  ThemeMode,
  NavItem,
  SideItem,
  SidebarMode,
  TableMode,
  ExtraButton,
  TableColumn,
  TableRow,
  FormField,
  SearchFilterConfig,
  ConfirmModalType,
  ModalHeaderConfig,
  SmallTableData,
  UploaderType,
  DocumentFile,
  ProgramFile,
} from './types';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const STORAGE_KEY = 'design-playground-state';

export default function App() {
  const loadFromSession = () => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  };

  const saveToSession = (state: any) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

  const [tab, setTab] = useState<TabKey>(() => {
    const saved = loadFromSession();
    return saved?.tab || 'tray';
  });

  // Tray State
  const [trayType, setTrayType] = useState<TrayType>(() => loadFromSession()?.trayType || 'info');
  const trayMeta = TRAY_META[trayType];
  const [trayHeaderText, setTrayHeaderText] = useState(() => loadFromSession()?.trayHeaderText || 'D-BUGGER · 정보 안내');
  const [trayTitle, setTrayTitle] = useState(() => loadFromSession()?.trayTitle || '알림 제목입니다');
  const [trayMessage, setTrayMessage] = useState(() => loadFromSession()?.trayMessage || `여기에 알림 메시지 내용이 표시됩니다.\n여러 줄로 표시할 수 있습니다.`);
  const [trayTime, setTrayTime] = useState(() => formatNow());
  const [trayButtonText, setTrayButtonText] = useState(() => loadFromSession()?.trayButtonText || '확인하기');
  const [trayClosing, setTrayClosing] = useState(false);

  const closeTray = () => {
    setTrayClosing(true);
    setTimeout(() => setTrayClosing(false), 240);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (tab === 'tray' && e.key === 'Escape') closeTray();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [tab]);

  useEffect(() => {
    const isDefaultHeader = Object.values(TRAY_META).some((m) => trayHeaderText === `D-BUGGER · ${m.status}`);
    if (isDefaultHeader) setTrayHeaderText(`D-BUGGER · ${trayMeta.status}`);
  }, [trayType]);

  const resetTray = () => {
    setTrayType('info');
    setTrayHeaderText('D-BUGGER · 정보 안내');
    setTrayTitle('알림 제목입니다');
    setTrayMessage(`여기에 알림 메시지 내용이 표시됩니다.\n여러 줄로 표시할 수 있습니다.`);
    setTrayButtonText('확인하기');
    setTrayTime(formatNow());
  };

  // Layout State
  // Layout State
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => loadFromSession()?.themeMode || 'light');
  const theme = THEME[themeMode];
  const [appTitle, setAppTitle] = useState(() => loadFromSession()?.appTitle || 'D-BUGGER');
  const [topNav, setTopNav] = useState<NavItem[]>(() => loadFromSession()?.topNav || [
    { id: uid('nav'), label: '협업보호' },
    { id: uid('nav'), label: '불법접근' },
    { id: uid('nav'), label: '랜섬웨어' },
    { id: uid('nav'), label: '백업' },
  ]);
  const [activeTopNavId, setActiveTopNavId] = useState<string | null>(() => loadFromSession()?.activeTopNavId || null);
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>(() => loadFromSession()?.sidebarMode || 'mixed');
  const [sidebarTitle, setSidebarTitle] = useState(() => loadFromSession()?.sidebarTitle || 'Sidebar');
  const [sideItems, setSideItems] = useState<SideItem[]>(() => loadFromSession()?.sideItems || [
    { id: uid('side'), label: '폴더1', children: [{ id: uid('side'), label: '하위1' }, { id: uid('side'), label: '하위2' }] },
    { id: uid('side'), label: '단일 메뉴' },
    { id: uid('side'), label: '폴더2', children: [{ id: uid('side'), label: '하위1' }] },
  ]);
  const [activeSideId, setActiveSideId] = useState<string | null>(() => loadFromSession()?.activeSideId || null);
  const [footerUserName, setFooterUserName] = useState(() => loadFromSession()?.footerUserName || '관리자');
  const [footerNotice, setFooterNotice] = useState(() => loadFromSession()?.footerNotice || '시스템 공지: 정기 점검이 2024년 1월 25일 02:00~04:00에 진행됩니다.');

  // Content State
  const [listMenu, setListMenu] = useState(() => loadFromSession()?.listMenu || '');
  const [listSubMenu, setListSubMenu] = useState(() => loadFromSession()?.listSubMenu || '');
  const [listTitle, setListTitle] = useState(() => loadFromSession()?.listTitle || '콘텐츠 리스트');
  const [listSubtitle, setListSubtitle] = useState(() => loadFromSession()?.listSubtitle || '서브타이틀 설명 문구');
  const [menuItems, setMenuItems] = useState(() => loadFromSession()?.menuItems || ['필터', '정렬']);
  const [extraButtons, setExtraButtons] = useState<ExtraButton[]>(() => loadFromSession()?.extraButtons || [{ id: uid('btn'), label: '추가하기', variant: 'add' }]);
  const [showOverlay, setShowOverlay] = useState(() => loadFromSession()?.showOverlay || false);
  const [tableMode, setTableMode] = useState<TableMode>(() => loadFromSession()?.tableMode || 'simple');
  const [searchFilter, setSearchFilter] = useState<SearchFilterConfig>(() => loadFromSession()?.searchFilter || {
    enabled: true,
    searchType: 'all',
    searchKeyword: '',
    searchOptions: [
      { value: 'all', label: '전체' },
      { value: 'name', label: '이름' },
      { value: 'status', label: '상태' },
    ],
  });

  const [showContentPagination, setShowContentPagination] = useState(() => loadFromSession()?.showContentPagination || false);
  const [contentCurrentPage, setContentCurrentPage] = useState(() => loadFromSession()?.contentCurrentPage || 1);
  const [contentTotalPages, setContentTotalPages] = useState(() => loadFromSession()?.contentTotalPages || 5);
  const [showContentEmptyState, setShowContentEmptyState] = useState(() => loadFromSession()?.showContentEmptyState || false);
  const [contentEmptyStateMessage, setContentEmptyStateMessage] = useState(() => loadFromSession()?.contentEmptyStateMessage || '데이터가 없습니다.');

  const [columns, setColumns] = useState<TableColumn[]>(() => {
    const saved = loadFromSession();
    if (saved?.columns) return saved.columns;
    return [
      { id: uid('col'), header: '이름', hasSwitch: false, cellType: 'text' as const },
      { id: uid('col'), header: '상태', hasSwitch: true, cellType: 'switch' as const },
      { id: uid('col'), header: '접근권한', hasSwitch: false, cellType: 'status' as const },
    ];
  });

  const [rows, setRows] = useState<TableRow[]>(() => {
    const saved = loadFromSession();
    if (saved?.rows && saved?.columns) return saved.rows;
    const cols = saved?.columns || [];
    const defaultCols = cols.length < 3 ? [
      { id: uid('col'), header: '이름', hasSwitch: false, cellType: 'text' as const },
      { id: uid('col'), header: '상태', hasSwitch: true, cellType: 'switch' as const },
      { id: uid('col'), header: '접근권한', hasSwitch: false, cellType: 'status' as const },
    ] : cols;

    return [
      { id: uid('row'), cells: { [defaultCols[0].id]: '항목1', [defaultCols[1].id]: true, [defaultCols[2].id]: '허용' } },
      { id: uid('row'), cells: { [defaultCols[0].id]: '항목2', [defaultCols[1].id]: false, [defaultCols[2].id]: '차단' } },
      { id: uid('row'), cells: { [defaultCols[0].id]: '항목3', [defaultCols[1].id]: true, [defaultCols[2].id]: '허용' } },
    ];
  });

  // Approval State
  const [approvalTitle, setApprovalTitle] = useState(() => loadFromSession()?.approvalTitle || '승인 요청서');
  const [approvalSubtitle, setApprovalSubtitle] = useState(() => loadFromSession()?.approvalSubtitle || '필요한 정보를 입력하고 승인을 요청해주세요.');
  const [formFields, setFormFields] = useState<FormField[]>(() => loadFromSession()?.formFields || [
    { id: uid('field'), type: 'dropdown', label: '승인자', required: true, width: 'full', options: [{ id: uid('opt'), label: '홍길동 (부서장)' }, { id: uid('opt'), label: '김철수 (대표)' }] },
    { id: uid('field'), type: 'dropdown', label: '참조자', required: true, width: 'full', options: [{ id: uid('opt'), label: '이영희 (팀장)' }, { id: uid('opt'), label: '박민수 (과장)' }] },
    { id: uid('field'), type: 'input', label: '제목', placeholder: '승인 요청 제목을 입력하세요', defaultValue: '프로그램 실행 허용 요청', required: true, width: 'full' },
    { id: uid('field'), type: 'input', label: '사유', placeholder: '승인 요청 사유를 입력하세요', defaultValue: '업무상 필요한 프로그램이므로 실행 허용을 요청드립니다.', required: true, width: 'full' },
  ]);

  const [uploaderType, setUploaderType] = useState<UploaderType>(() => loadFromSession()?.uploaderType || 'none');
  const [documentFiles, setDocumentFiles] = useState<DocumentFile[]>(() => loadFromSession()?.documentFiles || []);
  const [programFiles, setProgramFiles] = useState<ProgramFile[]>(() => loadFromSession()?.programFiles || []);
  const [showPagination, setShowPagination] = useState(() => loadFromSession()?.showPagination || false);
  const [currentPage, setCurrentPage] = useState(() => loadFromSession()?.currentPage || 1);
  const [totalPages, setTotalPages] = useState(() => loadFromSession()?.totalPages || 5);
  const [showEmptyState, setShowEmptyState] = useState(() => loadFromSession()?.showEmptyState || false);
  const [emptyStateMessage, setEmptyStateMessage] = useState(() => loadFromSession()?.emptyStateMessage || '데이터가 없습니다.');

  // Modal State
  const [modalType, setModalType] = useState<'confirm' | 'general'>(() => loadFromSession()?.modalType || 'confirm');
  const [confirmType, setConfirmType] = useState<ConfirmModalType>(() => loadFromSession()?.confirmType || 'warning');
  const [modalTitle, setModalTitle] = useState(() => loadFromSession()?.modalTitle || '주의');
  const [modalMessage, setModalMessage] = useState(() => loadFromSession()?.modalMessage || '이 작업을 진행하시겠습니까?');
  const [confirmButtonText, setConfirmButtonText] = useState(() => loadFromSession()?.confirmButtonText || '확인');
  const [cancelButtonText, setCancelButtonText] = useState(() => loadFromSession()?.cancelButtonText || '취소');
  const [showCancelButton, setShowCancelButton] = useState(() => loadFromSession()?.showCancelButton !== undefined ? loadFromSession().showCancelButton : true);
  const [showModalEmptyState, setShowModalEmptyState] = useState(() => loadFromSession()?.showModalEmptyState || false);
  const [modalEmptyStateMessage, setModalEmptyStateMessage] = useState(() => loadFromSession()?.modalEmptyStateMessage || '데이터가 없습니다.');
  const [showTable, setShowTable] = useState(() => loadFromSession()?.showTable || false);
  const [tableData, setTableData] = useState<SmallTableData>(() => loadFromSession()?.tableData || {
    headers: ['PC 이름', 'PC 닉네임', '타입'],
    rows: [['데스크탑-01', 'DEV-01', 'PC'], ['노트북-02', 'LAP-01', 'Laptop']],
  });
  const [modalHeader, setModalHeader] = useState<ModalHeaderConfig>(() => loadFromSession()?.modalHeader || { type: 'member', title: '홍길동', subtitle: '개발팀' });
  const [showModalHeader, setShowModalHeader] = useState(() => loadFromSession()?.showModalHeader !== undefined ? loadFromSession().showModalHeader : true);
  const [modalSize, setModalSize] = useState<ModalSize>(() => loadFromSession()?.modalSize || 'lg');
  const [modalHeight, setModalHeight] = useState(() => loadFromSession()?.modalHeight || 400);
  const [showModalPagination, setShowModalPagination] = useState(() => loadFromSession()?.showModalPagination || false);
  const [modalCurrentPage, setModalCurrentPage] = useState(() => loadFromSession()?.modalCurrentPage || 1);
  const [modalTotalPages, setModalTotalPages] = useState(() => loadFromSession()?.modalTotalPages || 5);

  const [previewScale, setPreviewScale] = useState(0.75);
  const previewWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = previewWrapRef.current;
    if (!el) return;
    const calc = () => setPreviewScale(0.75);
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    window.addEventListener('resize', calc);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', calc);
    };
  }, []);
  useEffect(() => {
    const state = {
      tab, trayType, trayHeaderText, trayTitle, trayMessage, trayButtonText,
      themeMode, appTitle, topNav, activeTopNavId, sidebarMode, sidebarTitle, sideItems, activeSideId, footerUserName, footerNotice,
      listMenu, listSubMenu, listTitle, listSubtitle, menuItems, extraButtons, showOverlay, tableMode, searchFilter, columns, rows,
      showContentPagination, contentCurrentPage, contentTotalPages, showContentEmptyState, contentEmptyStateMessage,
      approvalTitle, approvalSubtitle, formFields, uploaderType, documentFiles, programFiles, showPagination, currentPage, totalPages, showEmptyState, emptyStateMessage,
      modalType, confirmType, modalTitle, modalMessage, confirmButtonText, cancelButtonText, showCancelButton, showModalEmptyState, modalEmptyStateMessage,
      showTable, tableData, modalHeader, showModalHeader, modalSize, modalHeight, showModalPagination, modalCurrentPage, modalTotalPages
    };
    saveToSession(state);
  }, [
    tab, trayType, trayHeaderText, trayTitle, trayMessage, trayButtonText,
    themeMode, appTitle, topNav, activeTopNavId, sidebarMode, sidebarTitle, sideItems, activeSideId, footerUserName, footerNotice,
    listMenu, listSubMenu, listTitle, listSubtitle, menuItems, extraButtons, showOverlay, tableMode, searchFilter, columns, rows,
    showContentPagination, contentCurrentPage, contentTotalPages, showContentEmptyState, contentEmptyStateMessage,
    approvalTitle, approvalSubtitle, formFields, uploaderType, documentFiles, programFiles, showPagination, currentPage, totalPages, showEmptyState, emptyStateMessage,
    modalType, confirmType, modalTitle, modalMessage, confirmButtonText, cancelButtonText, showCancelButton, showModalEmptyState, modalEmptyStateMessage,
    showTable, tableData, modalHeader, showModalHeader, modalSize, modalHeight, showModalPagination, modalCurrentPage, modalTotalPages
  ]);

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-40 -top-48 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-[-220px] top-24 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
      </div>

      <header className="relative mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-5">
        <div className="grid gap-1">
          <div className="text-[18px] font-black tracking-tight">디자인 미리보기 Playground</div>
          <div className="text-[12px] font-semibold text-white/65">
            탭으로 전환해서 트레이 알림 / 레이아웃 / 콘텐츠 / 승인 / 모달을 동시에 편집해보자.
          </div>
        </div>

        <div className="flex items-center gap-2">
          {(['tray', 'layout', 'content', 'approval', 'modal'] as const).map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)}
              className={'rounded-xl border px-4 py-2 text-[13px] font-extrabold transition ' + (tab === t ? 'border-white/35 bg-white/10' : 'border-white/15 bg-white/5 hover:bg-white/10')}>
              {t === 'tray' ? '트레이' : t === 'layout' ? '레이아웃' : t === 'content' ? '콘텐츠' : t === 'approval' ? '승인' : '모달'}
            </button>
          ))}
        </div>
      </header>

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-4 px-4 pb-10 lg:grid-cols-[1fr_420px]">
        <section className="w-full overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,.25)] backdrop-blur">
          <header className="flex items-center justify-between gap-2 border-b border-white/15 px-4 py-3">
            <h2 className="text-[14px] font-extrabold tracking-tight">
              {tab === 'tray' ? '트레이 알림' : tab === 'layout' ? '레이아웃' : tab === 'content' ? '콘텐츠' : tab === 'approval' ? '승인 양식' : '모달'} 미리보기
            </h2>
            <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[12px] font-semibold text-white/80">
              {tab === 'tray' ? trayType.toUpperCase() : tab === 'layout' ? themeMode.toUpperCase() : tab === 'content' ? tableMode.toUpperCase() : tab === 'approval' ? 'FORM' : modalType.toUpperCase()}
            </span>
          </header>

          <div className="p-4">
            {tab === 'tray' && <TrayPreview trayType={trayType} trayMeta={trayMeta} trayHeaderText={trayHeaderText} trayTitle={trayTitle} trayMessage={trayMessage} trayTime={trayTime} trayButtonText={trayButtonText} trayClosing={trayClosing} onClose={closeTray} />}
            {tab === 'layout' && (
              <div className="grid gap-4">
                <div className="text-[13px] font-semibold leading-relaxed text-white/75">아래는 "앱 레이아웃(Topbar + Sidebar + Content)"을 1200×800 고정 프레임으로 미리보는 화면이야.</div>
                <div ref={previewWrapRef} className="relative h-[650px] w-[1200px] max-w-full overflow-hidden rounded-2xl border border-white/15 bg-white/5">
                  <LayoutPreview
                    theme={theme}
                    appTitle={appTitle}
                    topNav={topNav}
                    activeTopNavId={activeTopNavId}
                    onTopNavClick={setActiveTopNavId}
                    sidebarTitle={sidebarTitle}
                    sidebarMode={sidebarMode}
                    sideItems={sideItems}
                    activeSideId={activeSideId}
                    onSideClick={setActiveSideId}
                    footerUserName={footerUserName}
                    footerNotice={footerNotice}
                    previewScale={previewScale}
                  />
                  <div className="absolute bottom-3 right-3 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-bold text-white/70">1200×800 · scale {Math.round(previewScale * 100)}%</div>
                </div>
              </div>
            )}
            {tab === 'content' && (
              <div className="grid gap-4">
                <div className="text-[13px] font-semibold leading-relaxed text-white/75">아래는 "콘텐츠 섹션(리스트 헤더 + 테이블)"을 900×650 고정 프레임으로 미리보는 화면이야.</div>
                <div ref={previewWrapRef} className="relative h-[650px] w-[900px] max-w-full overflow-hidden rounded-2xl border border-white/15 bg-white/5">
                  <ContentPreview
                    theme={theme} listMenu={listMenu} listSubMenu={listSubMenu} listTitle={listTitle} listSubtitle={listSubtitle} menuItems={menuItems} extraButtons={extraButtons} tableMode={tableMode} columns={columns} rows={rows} showOverlay={showOverlay} searchFilter={searchFilter} showPagination={showContentPagination} currentPage={contentCurrentPage} totalPages={contentTotalPages} showEmptyState={showContentEmptyState} emptyStateMessage={contentEmptyStateMessage} previewScale={previewScale} />
                  <div className="absolute bottom-3 right-3 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-bold text-white/70">900×650 · scale {Math.round(previewScale * 100)}%</div>
                </div>
              </div>
            )}
            {tab === 'approval' && (
              <div className="grid gap-4">
                <div className="text-[13px] font-semibold leading-relaxed text-white/75">아래는 "승인 양식"을 500×700 고정 프레임으로 미리보는 화면이야.</div>
                <div ref={previewWrapRef} className="relative h-[700px] w-[500px] max-w-full overflow-hidden rounded-2xl border border-white/15 bg-white/5">
                  <ApprovalPreview theme={theme} approvalTitle={approvalTitle} approvalSubtitle={approvalSubtitle} formFields={formFields} uploaderType={uploaderType} documentFiles={documentFiles} programFiles={programFiles} showPagination={showPagination} showEmptyState={showEmptyState} emptyStateMessage={emptyStateMessage} currentPage={currentPage} totalPages={totalPages} previewScale={previewScale} />
                  <div className="absolute bottom-3 right-3 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-bold text-white/70">500×700 · scale {Math.round(previewScale * 100)}%</div>
                </div>
              </div>
            )}
            {tab === 'modal' && (
              <div className="grid gap-4">
                <div className="text-[13px] font-semibold leading-relaxed text-white/75">아래는 "모달"을 900×600 프레임에 표시하는 화면이야.</div>
                <div ref={previewWrapRef} className="relative h-[600px] w-[900px] max-w-full overflow-hidden rounded-2xl border border-white/15 bg-black/20">
                  <ModalPreview theme={theme} modalType={modalType} confirmType={confirmType} modalTitle={modalTitle} modalMessage={modalMessage} confirmButtonText={confirmButtonText} cancelButtonText={cancelButtonText} showCancelButton={showCancelButton} showEmptyState={showModalEmptyState} emptyStateMessage={modalEmptyStateMessage} showTable={showTable} tableData={tableData} modalHeader={modalHeader} showModalHeader={showModalHeader} modalSize={modalSize} modalHeight={modalHeight} showPagination={showModalPagination} currentPage={modalCurrentPage} totalPages={modalTotalPages} previewScale={previewScale} />
                  <div className="absolute bottom-3 right-3 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[12px] font-bold text-white/70">900×600 영역</div>
                </div>
              </div>
            )}
          </div>
        </section>

        <aside className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,.25)] backdrop-blur">
          <header className="flex items-center justify-between gap-2 border-b border-white/15 px-4 py-3">
            <h2 className="text-[14px] font-extrabold tracking-tight">오른쪽 설정 패널</h2>
            <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[12px] font-semibold text-white/80">
              {tab === 'tray' ? 'Tray' : tab === 'layout' ? 'Layout' : tab === 'content' ? 'Content' : tab === 'approval' ? 'Approval' : 'Modal'}
            </span>
          </header>

          <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-4">
            {tab === 'tray' && <TrayEditor trayType={trayType} setTrayType={setTrayType} trayHeaderText={trayHeaderText} setTrayHeaderText={setTrayHeaderText} trayTitle={trayTitle} setTrayTitle={setTrayTitle} trayMessage={trayMessage} setTrayMessage={setTrayMessage} trayButtonText={trayButtonText} setTrayButtonText={setTrayButtonText} onUpdateTime={() => setTrayTime(formatNow())} onReset={resetTray} />}
            {tab === 'layout' && <LayoutEditor
              themeMode={themeMode}
              setThemeMode={setThemeMode}
              appTitle={appTitle}
              setAppTitle={setAppTitle}
              topNav={topNav}
              setTopNav={setTopNav}
              sidebarTitle={sidebarTitle}
              setSidebarTitle={setSidebarTitle}
              sidebarMode={sidebarMode}
              setSidebarMode={setSidebarMode}
              sideItems={sideItems}
              setSideItems={setSideItems}
              footerUserName={footerUserName}
              setFooterUserName={setFooterUserName}
              footerNotice={footerNotice}
              setFooterNotice={setFooterNotice}
            />}
            {tab === 'content' && <ContentEditor listMenu={listMenu} setListMenu={setListMenu} listSubMenu={listSubMenu} setListSubMenu={setListSubMenu} listTitle={listTitle} setListTitle={setListTitle} listSubtitle={listSubtitle} setListSubtitle={setListSubtitle} menuItems={menuItems} setMenuItems={setMenuItems} extraButtons={extraButtons} setExtraButtons={setExtraButtons} tableMode={tableMode} setTableMode={setTableMode} columns={columns} setColumns={setColumns} rows={rows} setRows={setRows} showOverlay={showOverlay} setShowOverlay={setShowOverlay} searchFilter={searchFilter} setSearchFilter={setSearchFilter} showContentPagination={showContentPagination} setShowContentPagination={setShowContentPagination} showContentEmptyState={showContentEmptyState} setShowContentEmptyState={setShowContentEmptyState} contentEmptyStateMessage={contentEmptyStateMessage} setContentEmptyStateMessage={setContentEmptyStateMessage} contentCurrentPage={contentCurrentPage} setContentCurrentPage={setContentCurrentPage} contentTotalPages={contentTotalPages} setContentTotalPages={setContentTotalPages} />}
            {tab === 'approval' && <ApprovalEditor approvalTitle={approvalTitle} setApprovalTitle={setApprovalTitle} approvalSubtitle={approvalSubtitle} setApprovalSubtitle={setApprovalSubtitle} formFields={formFields} setFormFields={setFormFields} uploaderType={uploaderType} setUploaderType={setUploaderType} documentFiles={documentFiles} setDocumentFiles={setDocumentFiles} programFiles={programFiles} setProgramFiles={setProgramFiles} showPagination={showPagination} setShowPagination={setShowPagination} showEmptyState={showEmptyState} setShowEmptyState={setShowEmptyState} emptyStateMessage={emptyStateMessage} setEmptyStateMessage={setEmptyStateMessage} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} setTotalPages={setTotalPages} />}
            {tab === 'modal' && <ModalEditor modalType={modalType} setModalType={setModalType} confirmType={confirmType} setConfirmType={setConfirmType} modalTitle={modalTitle} setModalTitle={setModalTitle} modalMessage={modalMessage} setModalMessage={setModalMessage} confirmButtonText={confirmButtonText} setConfirmButtonText={setConfirmButtonText} cancelButtonText={cancelButtonText} setCancelButtonText={setCancelButtonText} showCancelButton={showCancelButton} setShowCancelButton={setShowCancelButton} showEmptyState={showModalEmptyState} setShowEmptyState={setShowModalEmptyState} emptyStateMessage={modalEmptyStateMessage} setEmptyStateMessage={setModalEmptyStateMessage} showTable={showTable} setShowTable={setShowTable} tableData={tableData} setTableData={setTableData} modalHeader={modalHeader} setModalHeader={setModalHeader} showModalHeader={showModalHeader} setShowModalHeader={setShowModalHeader} modalSize={modalSize} setModalSize={setModalSize} modalHeight={modalHeight} setModalHeight={setModalHeight} showPagination={showModalPagination} setShowPagination={setShowModalPagination} currentPage={modalCurrentPage} setCurrentPage={setModalCurrentPage} totalPages={modalTotalPages} setTotalPages={setModalTotalPages} />}
          </div>
        </aside>
      </div>
    </div>
  );
}