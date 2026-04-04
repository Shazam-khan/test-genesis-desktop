import { Button, Card, Spin, Typography, Space } from 'antd';
import { PlayCircleOutlined, BarChartOutlined } from '@ant-design/icons';

interface Props {
  onExecute: () => void;
  onExecuteWithCoverage?: () => void;
  isExecuting: boolean;
  hasCode: boolean;
}

export default function ExecutionPanel({ onExecute, onExecuteWithCoverage, isExecuting, hasCode }: Props) {
  return (
    <Card size="small" style={{ marginBottom: 16 }}>
      <Space>
        <Button
          type="primary"
          icon={<PlayCircleOutlined />}
          onClick={onExecute}
          loading={isExecuting}
          disabled={!hasCode}
          size="large"
        >
          Run Tests
        </Button>
        {onExecuteWithCoverage && (
          <Button
            icon={<BarChartOutlined />}
            onClick={onExecuteWithCoverage}
            loading={isExecuting}
            disabled={!hasCode}
            size="large"
          >
            Run with Coverage
          </Button>
        )}
      </Space>

      {isExecuting && (
        <div style={{ textAlign: 'center', padding: 32 }}>
          <Spin size="large" />
          <Typography.Paragraph type="secondary" style={{ marginTop: 16 }}>
            Executing tests... This may take up to 5 minutes.
          </Typography.Paragraph>
        </div>
      )}
    </Card>
  );
}
