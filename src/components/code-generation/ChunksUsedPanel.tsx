import { Card, Statistic, Typography } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';

interface Props {
  chunksUsed: number;
  scenariosCount?: number;
  businessRuleValidation?: Record<string, unknown> | null;
}

export default function ChunksUsedPanel({ chunksUsed, scenariosCount, businessRuleValidation }: Props) {
  return (
    <Card size="small" title="RAG Context" style={{ marginTop: 16 }}>
      <Statistic
        title="Code Chunks Retrieved"
        value={chunksUsed}
        prefix={<DatabaseOutlined />}
      />
      {scenariosCount != null && scenariosCount > 0 && (
        <Statistic
          title="Scenarios Generated"
          value={scenariosCount}
          style={{ marginTop: 16 }}
        />
      )}
      {businessRuleValidation && (
        <div style={{ marginTop: 16 }}>
          <Typography.Text type="secondary">Business Rule Validation: Available</Typography.Text>
        </div>
      )}
    </Card>
  );
}
