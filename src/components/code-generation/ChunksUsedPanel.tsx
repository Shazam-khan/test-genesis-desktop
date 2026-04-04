import { Card, Statistic, Tag, Row, Col } from 'antd';
import { DatabaseOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { BusinessRuleValidation } from '../../types/execution';

interface Props {
  chunksUsed: number;
  scenariosCount?: number;
  businessRuleValidation?: BusinessRuleValidation | null;
}

export default function ChunksUsedPanel({ chunksUsed, scenariosCount, businessRuleValidation }: Props) {
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
        {businessRuleValidation && (
          <Col>
            <Statistic
              title={`Rule: ${businessRuleValidation.rule_id}`}
              value={`${Math.round(businessRuleValidation.coverage_score * 100)}%`}
              prefix={
                businessRuleValidation.is_tested ? (
                  <CheckCircleOutlined style={{ color: '#10b981' }} />
                ) : (
                  <CloseCircleOutlined style={{ color: '#f59e0b' }} />
                )
              }
            />
          </Col>
        )}
      </Row>
      {businessRuleValidation && businessRuleValidation.missing_assertions.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <Tag color="orange">
            {businessRuleValidation.missing_assertions.length} missing assertion(s)
          </Tag>
        </div>
      )}
    </Card>
  );
}
