// types/index.ts

import type { ButtonVariant } from '../components/ui/Button';

export type TabKey = "tray" | "layout" | "content" | "approval" | "modal";
export type TrayType = "info" | "success" | "warning" | "error";
export type ThemeMode = "dark" | "light";
export type SidebarMode = "flat" | "folder" | "mixed";
export type TableMode = "simple" | "checkable";
export type DropdownWidth = "full" | "half";
export type FormFieldType = "dropdown" | "input";
export type ConfirmModalType = "info" | "warning" | "error" | "success" | "yesNo";
export type ModalHeaderType = "member" | "asset" | "department";

// 뱃지 variant (4가지 색상만)
export type BadgeVariant = 'blue' | 'yellow' | 'green' | 'red';

export interface StatusOptions {
  trueText?: string;
  falseText?: string;
}
export interface NavItem {
  id: string;
  label: string;
}

export interface SideItem {
  id: string;
  label: string;
  children?: SideItem[];
}
export interface CheckboxOption {
  id: string;
  label: string;
  checked: boolean;
}
export type CellType = 'text' | 'switch' | 'status' | 'badge';

export interface TableColumn {
  id: string;
  header: string;
  hasSwitch: boolean;
  cellType: CellType;
  width?: number;
  statusOptions?: StatusOptions;
  badgeOptions?: BadgeOptions;
}


export interface TableRow {
  id: string;
  cells: Record<string, string | boolean | BadgeOptions>;
}

export interface ExtraButton {
  id: string;
  label: string;
  variant: ButtonVariant;
}

export interface TrayMeta {
  accent: string;
  status: string;
}

export interface ThemeColors {
  bg: string;
  panel: string;
  header: string;
  hover: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
}

export interface DropdownOption {
  id: string;
  label: string;
}

export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  required: boolean;
  width: DropdownWidth;
  options?: DropdownOption[];
}

export interface SearchFilterConfig {
  enabled: boolean;
  searchType: string;
  searchKeyword: string;
  searchOptions: Array<{ value: string; label: string }>;
}

export interface ModalHeaderConfig {
  type: ModalHeaderType;
  title: string;
  subtitle?: string;
}

export interface SmallTableData {
  headers: string[];
  rows: string[][];
}

export interface DocumentFile {
  id: string;
  fileName: string;
  filePath: string;
  hashValue?: string;
}

export interface NoticeField {
  id: string;
  text: string;
  color: string; // 빨간색 등
}

export interface DatePickerConfig {
  enabled: boolean;
  selectedRange: {
    startDate: Date;
    endDate: Date;
    type: 'today' | 'yesterday' | 'last7days' | 'last30days' | 'thisMonth' | 'lastMonth' | 'custom';
    label: string;
  };
}
export interface ProgramFile {
  id: string;
  fileName: string;
  filePath: string;
  metadata?: any;
}


// 로그 모달용 - 로그 아이템 (날짜별 시간 목록)
export interface LogItem {
  date: string;
  times: string[];
}

// 로그 모달용 - 로그 모달 설정
export interface LogModalConfig {
  itemName: string;
  itemPath: string;
  detectionCount: number;
  blockedDate: string;
  logs: LogItem[];
}

// 뱃지 타입용 - 뱃지 옵션
export interface BadgeOptions {
  text: string;
  variant: BadgeVariant;  // blue | yellow | green | red
}

export type UploaderType = 'none' | 'document' | 'program';

export type { ButtonVariant };