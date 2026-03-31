import { Card, List, Tag, Typography, Space, Empty } from 'antd';
import type { Recommendation } from '../../types/analytics';

const PRIORITY_COLOR: Record<string, string> = {
  high: 'red',
  medium: 'orange',
  low: 'blue',
};

const IMPACT_COLOR: Record<string, string> = {
  high: 'green',
  medium: 'gold',
  low: 'default',
};

interface Props {
  testRecommendations?: Recommendation[];
  domainRecommendations?: Recommendation[];
}

export default function RecommendationsList({ testRecommendations, domainRecommendations }: Props) {
  const all = [...(testRecommendations ?? []), ...(domainRecommendations ?? [])];

  if (!all.length) {
    return (
      <Card title="Recommendations" size="small">
        <Empty description="No recommendations available" />
      </Card>
    );
  }

  return (
    <Card title="Recommendations" size="small">
      <List
        dataSource={all}
        renderItem={(rec) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Space>
                  <Typography.Text strong>{rec.title}</Typography.Text>
                  <Tag color={PRIORITY_COLOR[rec.priority]}>{rec.priority}</Tag>
                  <Tag color={IMPACT_COLOR[rec.impact]}>Impact: {rec.impact}</Tag>
                  {rec.domain && <Tag>{rec.domain}</Tag>}
                </Space>
              }
              description={
                <>
                  <Typography.Paragraph style={{ margin: 0 }} type="secondary">
                    {rec.description}
                  </Typography.Paragraph>
                  <Typography.Text code>{rec.action}</Typography.Text>
                </>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
