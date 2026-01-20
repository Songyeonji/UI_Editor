// components/ui/ProgramUploader.tsx

import React from 'react';
import { FiUpload } from 'react-icons/fi';
import { RiCloseFill } from 'react-icons/ri';

export interface ProgramFile {
  id: string;
  fileName: string;
  filePath: string;
  metadata?: any;
}

interface ProgramUploaderProps {
  programs: ProgramFile[];
  onAdd: (program: ProgramFile) => void;
  onRemove: (id: string) => void;
  disabled?: boolean;
}

export const ProgramUploader: React.FC<ProgramUploaderProps> = ({
  programs,
  onAdd,
  onRemove,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex rounded-xl shadow-sm border overflow-hidden h-9" style={{ borderColor: 'rgba(229, 231, 235, 1)' }}>
        <button
          type="button"
          onClick={() => {
            // 실제 구현에서는 파일 다이얼로그 열기
            const mockProgram: ProgramFile = {
              id: `prog_${Date.now()}`,
              fileName: 'program.exe',
              filePath: '/path/to/program.exe',
            };
            onAdd(mockProgram);
          }}
          disabled={disabled}
          className="px-3 bg-gray-100 text-gray-800 text-sm font-medium hover:bg-gray-200 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiUpload className="mr-1" size={14} />
          프로그램 추가
        </button>
        <div className="flex-1 px-3 flex items-center text-sm text-gray-600 bg-white">
          {programs.length === 0
            ? '선택된 프로그램이 없습니다'
            : `${programs.length}개의 프로그램이 선택됨`}
        </div>
      </div>

      {/* 선택된 프로그램 목록 */}
      {programs.length > 0 && (
        <div className="max-h-[70px] overflow-y-auto border rounded-xl bg-gray-50 pr-1" style={{ borderColor: 'rgba(229, 231, 235, 1)' }}>
          {programs.map((prog, index) => (
            <div
              key={prog.id}
              className="flex items-center justify-between p-2 border-b last:border-b-0"
              style={{ borderColor: 'rgba(229, 231, 235, 1)' }}
            >
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-900 truncate">
                  {index + 1}. {prog.fileName}
                </div>
              </div>
              {!disabled && (
                <button
                  type="button"
                  onClick={() => onRemove(prog.id)}
                  className="ml-2 text-red-600 hover:text-red-800 flex-shrink-0"
                  title="제거"
                >
                  <RiCloseFill size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};