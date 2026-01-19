// types/index.ts

import type { ButtonVariant } from '../components/ui/Button';

export type TabKey = "tray" | "layout" | "content" | "approval";
export type TrayType = "info" | "success" | "warning" | "error";
export type ThemeMode = "dark" | "light";
export type SidebarMode = "flat" | "folder" | "mixed";
export type TableMode = "simple" | "checkable";
export type DropdownWidth = "full" | "half";
export type FormFieldType = "dropdown" | "input";

export interface NavItem {
  id: string;
  label: string;
}

export interface SideItem {
  id: string;
  label: string;
  children?: SideItem[];
}

export interface TableColumn {
  id: string;
  header: string;
  hasSwitch: boolean;
  cellType?: 'text' | 'switch' | 'status'; // ✅ 추가
  width?: number;
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
  defaultValue?: string; // 기본값 추가
  required: boolean;
  width: DropdownWidth;
  options?: DropdownOption[]; // dropdown일 때만 사용
}

export interface SearchFilterConfig {
  enabled: boolean;
  searchType: string;
  searchKeyword: string;
  searchOptions: Array<{ value: string; label: string }>;
}

export type { ButtonVariant };