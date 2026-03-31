import { Tag } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';

interface StatusBadgeProps {
  status: string | null | undefined;
}

const STATUS_CONFIG: Record<string, { color: string; icon: React.ReactNode }> = {
  PASSED: { color: 'success', icon: <CheckCircleOutlined /> },
  FAILED: { color: 'error', icon: <CloseCircleOutlined /> },
  ERROR: { color: 'warning', icon: <ExclamationCircleOutlined /> },
  PENDING: { color: 'default', icon: <ClockCircleOutlined /> },
  RUNNING: { color: 'processing', icon: <SyncOutlined spin /> },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = (status || 'UNKNOWN').toUpperCase();
  const config = STATUS_CONFIG[normalized] || { color: 'default', icon: null };

  return (
    <Tag color={config.color} icon={config.icon}>
      {normalized}
    </Tag>
  );
}
