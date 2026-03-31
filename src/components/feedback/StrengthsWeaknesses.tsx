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
        <>
          <Typography.Text strong style={{ color: '#52c41a' }}>
            <CheckCircleOutlined /> Strengths
          </Typography.Text>
          <List
            size="small"
            dataSource={strengths}
            renderItem={(item) => <List.Item style={{ padding: '4px 0' }}>{item}</List.Item>}
            style={{ marginBottom: 12 }}
          />
        </>
      )}
      {weaknesses.length > 0 && (
        <>
          <Typography.Text strong style={{ color: '#faad14' }}>
            <WarningOutlined /> Weaknesses
          </Typography.Text>
          <List
            size="small"
            dataSource={weaknesses}
            renderItem={(item) => <List.Item style={{ padding: '4px 0' }}>{item}</List.Item>}
          />
        </>
      )}
    </Card>
  );
}
