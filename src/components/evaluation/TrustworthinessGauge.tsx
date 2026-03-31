import { Progress, Typography, Tag, Space } from 'antd';
import { SafetyCertificateOutlined } from '@ant-design/icons';

interface Props {
  score: number | null;
  explanation: string | null;
  method: 'tlm' | 'fallback';
}

function getScoreColor(score: number): string {
  if (score >= 0.8) return '#52c41a';
  if (score >= 0.5) return '#faad14';
  return '#f5222d';
}

export default function TrustworthinessGauge({ score, explanation, method }: Props) {
  const pct = score !== null ? Math.round(score * 100) : 0;

  return (
    <Space direction="vertical" align="center" style={{ width: '100%', padding: 16 }}>
      <Progress
        type="circle"
        percent={pct}
        strokeColor={score !== null ? getScoreColor(score) : undefined}
        format={() => (
          <span style={{ fontSize: 20, fontWeight: 600 }}>
            {score !== null ? `${pct}%` : 'N/A'}
          </span>
        )}
        size={120}
      />
      <Space>
        <SafetyCertificateOutlined />
        <Typography.Text strong>Trustworthiness Score</Typography.Text>
      </Space>
      <Tag color={method === 'tlm' ? 'blue' : 'orange'}>
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
