import { Progress, Typography, Tag, Space } from 'antd';
import { SafetyCertificateOutlined } from '@ant-design/icons';

interface Props {
  score: number | null;
  explanation: string | null;
  method: 'tlm' | 'fallback';
}

function getScoreColor(score: number): string {
  if (score >= 0.8) return '#10b981';
  if (score >= 0.5) return '#f59e0b';
  return '#ef4444';
}

export default function TrustworthinessGauge({ score, explanation, method }: Props) {
  const pct = score !== null ? Math.round(score * 100) : 0;
  const color = score !== null ? getScoreColor(score) : '#94a3b8';

  return (
    <Space direction="vertical" align="center" style={{ width: '100%', padding: 16 }}>
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
        size={130}
      />
      <Space style={{ marginTop: 8 }}>
        <SafetyCertificateOutlined style={{ color }} />
        <Typography.Text strong>Trustworthiness Score</Typography.Text>
      </Space>
      <Tag color={method === 'tlm' ? 'purple' : 'orange'} style={{ fontWeight: 500 }}>
        {method === 'tlm' ? 'CleanLab TLM' : 'Heuristic Fallback'}
      </Tag>
      {explanation && (
        <Typography.Paragraph
          type="secondary"
          style={{ textAlign: 'center', maxWidth: 400, marginTop: 8 }}
        >
          {explanation}
        </Typography.Paragraph>
      )}
    </Space>
  );
}
