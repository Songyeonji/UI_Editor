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
export interface TableColumn {
  id: string;
  header: string;
  hasSwitch: boolean;
  cellType?: 'text' | 'switch' | 'status';
  width?: number;
  statusOptions?: { trueText: string; falseText: string }; // 추가
}

export interface TableRow {
  id: string;
  cells: { [colId: string]: string | boolean };
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

export interface ProgramFile {
  id: string;
  fileName: string;
  filePath: string;
  metadata?: any;
}

export type UploaderType = 'none' | 'document' | 'program';

export type { ButtonVariant };