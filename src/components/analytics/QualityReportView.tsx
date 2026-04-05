import { Typography, Row, Col, Card, Statistic, Descriptions, Tag, List, Divider, Space } from 'antd';
import type { QualityReport } from '../../types/analytics';

interface Props {
  report: QualityReport;
}

export default function QualityReportView({ report }: Props) {
  const { summary, recommendations, insights, generated_at } = report;

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Typography.Text type="secondary">Generated: {new Date(generated_at).toLocaleString()}</Typography.Text>

      <Card title="Summary" size="small">
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="Total Tests" value={summary.total_tests} />
          </Col>
          <Col span={6}>
            <Statistic title="Pass Rate" value={`${(summary.pass_rate ?? 0).toFixed(1)}%`} />
          </Col>
          <Col span={6}>
            <Statistic title="Avg Coverage" value={`${(summary.average_coverage ?? 0).toFixed(1)}%`} />
          </Col>
          <Col span={6}>
            <Statistic title="Avg Trustworthiness" value={`${((summary.average_trustworthiness ?? 0) * 100).toFixed(1)}%`} />
          </Col>
        </Row>
      </Card>

      {insights.length > 0 && (
        <Card title="Key Insights" size="small">
          <List
            size="small"
            dataSource={insights}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Card>
      )}

      {recommendations.total_count > 0 && (
        <Card title={`Recommendations (${recommendations.total_count})`} size="small">
          {recommendations.test_improvements.length > 0 && (
            <>
              <Typography.Text strong>Test Improvements</Typography.Text>
              <Descriptions column={1} size="small" style={{ marginTop: 8, marginBottom: 16 }}>
                {recommendations.test_improvements.map((rec, i) => (
                  <Descriptions.Item
                    key={i}
                    label={
                      <Space>
                        <Tag color={rec.priority === 'high' ? 'red' : rec.priority === 'medium' ? 'orange' : 'blue'}>
                          {rec.priority}
                        </Tag>
                        {rec.title}
                      </Space>
                    }
                  >
                    {rec.description}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </>
          )}

          {recommendations.domain_improvements.length > 0 && (
            <>
              <Divider style={{ margin: '8px 0' }} />
              <Typography.Text strong>Domain Improvements</Typography.Text>
              <Descriptions column={1} size="small" style={{ marginTop: 8 }}>
                {recommendations.domain_improvements.map((rec, i) => (
                  <Descriptions.Item
                    key={i}
                    label={
                      <Space>
                        <Tag color={rec.priority === 'high' ? 'red' : rec.priority === 'medium' ? 'orange' : 'blue'}>
                          {rec.priority}
                        </Tag>
                        {rec.title}
                      </Space>
                    }
                  >
                    {rec.description}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </>
          )}
        </Card>
      )}
    </Space>
  );
}
