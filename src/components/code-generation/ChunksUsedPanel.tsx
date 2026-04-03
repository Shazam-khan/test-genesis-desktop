import { Card, Statistic, Tag, Row, Col } from 'antd';
import { DatabaseOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { BusinessRuleValidation } from '../../types/execution';

interface Props {
  chunksUsed: number;
  scenariosCount?: number;
  businessRuleValidation?: BusinessRuleValidation | null;
}

export default function ChunksUsedPanel({ chunksUsed, scenariosCount, businessRuleValidation }: Props) {
  const rulesChecked = businessRuleValidation?.rules_checked ?? 0;
  const rulesPassed = businessRuleValidation?.rules_passed ?? 0;

  return (
    <Card size="small" title="RAG Context" style={{ marginTop: 16 }}>
      <Row gutter={24}>
        <Col>
          <Statistic
            title="Code Chunks Retrieved"
            value={chunksUsed}
            prefix={<DatabaseOutlined />}
          />
        </Col>
        {scenariosCount != null && scenariosCount > 0 && (
          <Col>
            <Statistic title="Scenarios Generated" value={scenariosCount} />
          </Col>
        )}
        {businessRuleValidation && rulesChecked > 0 && (
          <Col>
            <Statistic
              title="Business Rules"
              value={`${rulesPassed}/${rulesChecked}`}
              prefix={
                rulesPassed === rulesChecked ? (
                  <CheckCircleOutlined style={{ color: '#52c41a' }} />
                ) : (
                  <CloseCircleOutlined style={{ color: '#faad14' }} />
                )
              }
            />
          </Col>
        )}
      </Row>
      {businessRuleValidation && rulesChecked === 0 && (
        <div style={{ marginTop: 12 }}>
          <Tag color="blue">Business Rule Validation Available</Tag>
        </div>
      )}
    </Card>
  );
}
