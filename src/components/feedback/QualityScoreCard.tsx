import { Card, Progress, Space, Statistic, Tag, Row, Col } from 'antd';
import { formatDuration, formatPercentage } from '../../utils/formatters';
import type { QualityFeedback } from '../../types/analytics';

interface Props {
  feedback: QualityFeedback;
}

export default function QualityScoreCard({ feedback }: Props) {
  const { quality_score, metrics } = feedback;
  const color = quality_score >= 80 ? '#52c41a' : quality_score >= 50 ? '#faad14' : '#f5222d';
  const label = quality_score >= 80 ? 'Good' : quality_score >= 50 ? 'Fair' : 'Needs Improvement';

  return (
    <Card title="Quality Score" size="small">
      <Row gutter={16} align="middle">
        <Col>
          <Progress
            type="dashboard"
            percent={quality_score}
            strokeColor={color}
            size={120}
            format={(pct) => `${pct}%`}
          />
          <div style={{ textAlign: 'center', marginTop: 4 }}>
            <Tag color={color}>{label}</Tag>
          </div>
        </Col>
        <Col flex="auto">
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Statistic title="Status" value={metrics.status} valueStyle={{ fontSize: 14 }} />
            <Statistic
              title="Code Coverage"
              value={formatPercentage(metrics.code_coverage)}
              valueStyle={{ fontSize: 14 }}
            />
            <Statistic
              title="Test Coverage"
              value={formatPercentage(metrics.test_coverage)}
              valueStyle={{ fontSize: 14 }}
            />
            <Statistic
              title="Duration"
              value={formatDuration(metrics.duration_ms)}
              valueStyle={{ fontSize: 14 }}
            />
          </Space>
        </Col>
      </Row>
    </Card>
  );
}
