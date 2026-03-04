// components/ui/TrayIcon.tsx
import React from 'react';
import { FiCheckCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi';
import type { TrayType } from '../../types';

interface TrayIconProps {
  type: TrayType;
  color?: string;

  /** ✅ 로고 이미지가 있으면 아이콘 대신 로고 표시 */
  logoSrc?: string;
  logoAlt?: string;
  size?: number; // 기본 20
  className?: string;
}

export const TrayIcon: React.FC<TrayIconProps> = ({
  type,
  color = '#fff',
  logoSrc,
  logoAlt = 'tray-logo',
  size = 20,
  className,
}) => {
  // ✅ logoSrc가 있으면 무조건 로고 표시
  if (logoSrc) {
    return (
      <img
        src={logoSrc}
        alt={logoAlt}
        width={size}
        height={size}
        draggable={false}
        className={className}
        style={{ display: 'block', objectFit: 'contain' }}
      />
    );
  }

  const iconProps = {
    size,
    color,
    strokeWidth: 2.5,
    className,
  };

  switch (type) {
    case 'success':
      return <FiCheckCircle {...iconProps} />;
    case 'error':
    case 'warning':
      return <FiAlertTriangle {...iconProps} />;
    case 'info':
    default:
      return <FiInfo {...iconProps} />;
  }
};