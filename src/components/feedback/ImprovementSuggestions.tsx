import { Card, List, Typography } from 'antd';
import { BulbOutlined } from '@ant-design/icons';

interface Props {
  suggestions: string[];
}

export default function ImprovementSuggestions({ suggestions }: Props) {
  if (!suggestions.length) return null;

  return (
    <Card
      title={
        <span>
          <BulbOutlined style={{ color: '#1890ff', marginRight: 8 }} />
          Improvement Suggestions
        </span>
      }
      size="small"
    >
      <List
        size="small"
        dataSource={suggestions}
        renderItem={(item, idx) => (
          <List.Item style={{ padding: '6px 0' }}>
            <Typography.Text>
              {idx + 1}. {item}
            </Typography.Text>
          </List.Item>
        )}
      />
    </Card>
  );
}
