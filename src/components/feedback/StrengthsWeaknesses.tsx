import { Card, List, Typography, Empty } from 'antd';
import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';

interface Props {
  strengths: string[];
  weaknesses: string[];
}

export default function StrengthsWeaknesses({ strengths, weaknesses }: Props) {
  if (!strengths.length && !weaknesses.length) {
    return (
      <Card title="Strengths & Weaknesses" size="small">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No feedback available" />
      </Card>
    );
  }

  return (
    <Card title="Strengths & Weaknesses" size="small">
      {strengths.length > 0 && (
        <div className="feedback-strengths" style={{ padding: '12px 16px', marginBottom: 12 }}>
          <Typography.Text strong style={{ color: '#10b981', display: 'block', marginBottom: 8 }}>
            <CheckCircleOutlined style={{ marginRight: 6 }} />
            Strengths ({strengths.length})
          </Typography.Text>
          <List
            size="small"
            dataSource={strengths}
            renderItem={(item) => (
              <List.Item style={{ padding: '6px 0', borderBottom: 'none' }}>{item}</List.Item>
            )}
          />
        </div>
      )}
      {weaknesses.length > 0 && (
        <div className="feedback-weaknesses" style={{ padding: '12px 16px' }}>
          <Typography.Text strong style={{ color: '#f59e0b', display: 'block', marginBottom: 8 }}>
            <WarningOutlined style={{ marginRight: 6 }} />
            Weaknesses ({weaknesses.length})
          </Typography.Text>
          <List
            size="small"
            dataSource={weaknesses}
            renderItem={(item) => (
              <List.Item style={{ padding: '6px 0', borderBottom: 'none' }}>{item}</List.Item>
            )}
          />
        </div>
      )}
    </Card>
  );
}
