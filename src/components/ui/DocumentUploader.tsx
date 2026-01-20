// components/ui/DocumentUploader.tsx

import React from 'react';
import { FiUpload, FiLoader } from 'react-icons/fi';
import { RiCloseFill } from 'react-icons/ri';

export interface DocumentFile {
  id: string;
  fileName: string;
  filePath: string;
  hashValue?: string;
}

interface DocumentUploaderProps {
  documents: DocumentFile[];
  onAdd: (docs: DocumentFile[]) => void;
  onRemove: (id: string) => void;
  disabled?: boolean;
  isCalculating?: boolean;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  documents,
  onAdd,
  onRemove,
  disabled = false,
  isCalculating = false,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex rounded-xl shadow-sm border overflow-hidden h-9" style={{ borderColor: 'rgba(229, 231, 235, 1)' }}>
        <button
          type="button"
          onClick={() => {
            // 실제 구현에서는 파일 다이얼로그 열기
            const mockDocs: DocumentFile[] = [
              { id: `doc_${Date.now()}`, fileName: '문서1.pdf', filePath: '/path/to/doc1.pdf' },
            ];
            onAdd(mockDocs);
          }}
          disabled={isCalculating || disabled}
          className="px-3 bg-gray-100 text-gray-800 text-sm font-medium hover:bg-gray-200 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCalculating ? (
            <>
              <FiLoader className="mr-1 animate-spin" size={14} />
              해시 계산 중...
            </>
          ) : (
            <>
              <FiUpload className="mr-1" size={14} />
              문서 추가
            </>
          )}
        </button>
        <div className="flex-1 px-3 flex items-center text-sm text-gray-600 bg-white">
          {documents.length === 0
            ? '선택된 문서가 없습니다'
            : `${documents.length}개의 문서가 선택됨`}
        </div>
      </div>

      {/* 선택된 문서 목록 */}
      {documents.length > 0 && (
        <div className="max-h-[70px] overflow-y-auto border rounded-xl bg-gray-50 pr-1" style={{ borderColor: 'rgba(229, 231, 235, 1)' }}>
          {documents.map((doc, index) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-2 border-b last:border-b-0"
              style={{ borderColor: 'rgba(229, 231, 235, 1)' }}
            >
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-900 truncate">
                  {index + 1}. {doc.fileName}
                </div>
              </div>
              {!disabled && (
                <button
                  type="button"
                  onClick={() => onRemove(doc.id)}
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