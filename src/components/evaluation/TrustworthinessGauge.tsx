import { Progress, Typography, Tag, Space, Tooltip } from 'antd';
import { SafetyCertificateOutlined, FileTextOutlined, CodeOutlined, InfoCircleOutlined } from '@ant-design/icons';

interface Props {
  score: number | null;
  explanation: string | null;
  method: 'tlm' | 'fallback';
  title: string;
  description: string;
  icon?: 'card' | 'code';
}

function getScoreColor(score: number): string {
  if (score >= 0.8) return '#10b981';
  if (score >= 0.5) return '#f59e0b';
  return '#ef4444';
}

function getScoreLabel(score: number): string {
  if (score >= 0.8) return 'High';
  if (score >= 0.5) return 'Medium';
  return 'Low';
}

export default function TrustworthinessGauge({ score, explanation, method, title, description, icon = 'card' }: Props) {
  const pct = score !== null ? Math.round(score * 100) : 0;
  const color = score !== null ? getScoreColor(score) : '#94a3b8';
  const Icon = icon === 'code' ? CodeOutlined : FileTextOutlined;

  return (
    <Space direction="vertical" align="center" style={{ width: '100%', padding: 16, borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
      <Space align="center" style={{ marginBottom: 4 }}>
        <Icon style={{ color: '#a5b4fc', fontSize: 16 }} />
        <Typography.Text strong style={{ fontSize: 14 }}>{title}</Typography.Text>
        <Tooltip title={description}>
          <InfoCircleOutlined style={{ color: '#64748b', cursor: 'pointer' }} />
        </Tooltip>
      </Space>
      <Progress
        type="circle"
        percent={pct}
        strokeColor={color}
        strokeWidth={10}
        format={() => (
          <span style={{ fontSize: 24, fontWeight: 700, color }}>
            {score !== null ? `${pct}%` : 'N/A'}
          </span>
        )}
        size={120}
      />
      {score !== null && (
        <Tag color={pct >= 80 ? 'success' : pct >= 50 ? 'warning' : 'error'} style={{ fontWeight: 600, marginTop: 4 }}>
          {getScoreLabel(score)} Confidence
        </Tag>
      )}
      <Tag color={method === 'tlm' ? 'purple' : 'orange'} style={{ fontWeight: 500 }}>
        {method === 'tlm' ? 'CleanLab TLM' : 'Heuristic Fallback'}
      </Tag>
      {explanation && (
        <Typography.Paragraph
          type="secondary"
          style={{ textAlign: 'center', maxWidth: 320, marginTop: 4, fontSize: 12 }}
        >
          {explanation}
        </Typography.Paragraph>
      )}
    </Space>
  );
}
