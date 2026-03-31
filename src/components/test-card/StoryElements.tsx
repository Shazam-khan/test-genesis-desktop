import { Descriptions, Tag, Card } from 'antd';
import { UserOutlined, ThunderboltOutlined, TrophyOutlined } from '@ant-design/icons';

interface Props {
  elements: {
    actor: string;
    action: string;
    benefit: string;
    has_acceptance_criteria: boolean;
  };
}

export default function StoryElements({ elements }: Props) {
  return (
    <Card size="small" title="Extracted Story Elements" style={{ marginTop: 8 }}>
      <Descriptions column={1} size="small">
        <Descriptions.Item label={<><UserOutlined /> Actor</>}>
          {elements.actor}
        </Descriptions.Item>
        <Descriptions.Item label={<><ThunderboltOutlined /> Action</>}>
          {elements.action}
        </Descriptions.Item>
        <Descriptions.Item label={<><TrophyOutlined /> Benefit</>}>
          {elements.benefit}
        </Descriptions.Item>
        <Descriptions.Item label="Acceptance Criteria">
          <Tag color={elements.has_acceptance_criteria ? 'green' : 'orange'}>
            {elements.has_acceptance_criteria ? 'Detected' : 'Not found'}
          </Tag>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
