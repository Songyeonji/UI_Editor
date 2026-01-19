// components/ui/TrayIcon.tsx

import React from 'react';
import { FiCheckCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi';
import type { TrayType } from '../../types';

interface TrayIconProps {
  type: TrayType;
  color?: string;
}

export const TrayIcon: React.FC<TrayIconProps> = ({ type, color = '#fff' }) => {
  const iconProps = {
    size: 20,
    color,
    strokeWidth: 2.5,
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