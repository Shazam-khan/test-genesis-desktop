import { useState } from 'react';
import { Input, Button, Space, Typography, Card } from 'antd';
import { SendOutlined, ScanOutlined } from '@ant-design/icons';
import { useExtractStoryElements } from '../../hooks/useTestGeneration';
import StoryElements from './StoryElements';

const { TextArea } = Input;

interface Props {
  onGenerate: (userStory: string) => void;
  isGenerating: boolean;
}

const EXAMPLE_STORIES = [
  'As a supply chain manager, I want to validate suppliers for orders over $10,000 so that I can ensure compliance with procurement policies.',
  'As a user, I want to add two numbers using the calculator so that I can get the correct sum.',
  'As a warehouse manager, I want to check inventory levels before processing orders so that I can prevent overselling.',
];

export default function UserStoryInput({ onGenerate, isGenerating }: Props) {
  const [userStory, setUserStory] = useState('');
  const extractMutation = useExtractStoryElements();

  const handleExtract = () => {
    if (userStory.trim()) {
      extractMutation.mutate(userStory.trim());
    }
  };

  const handleGenerate = () => {
    if (userStory.trim()) {
      onGenerate(userStory.trim());
    }
  };

  return (
    <div>
      <Typography.Title level={5}>Enter User Story</Typography.Title>
      <Typography.Paragraph type="secondary">
        Write a user story in the format: "As a [actor], I want to [action] so that [benefit]"
      </Typography.Paragraph>

      <TextArea
        rows={4}
        placeholder="As a [actor], I want to [action] so that [benefit]..."
        value={userStory}
        onChange={(e) => setUserStory(e.target.value)}
        style={{ marginBottom: 12 }}
      />

      <Space wrap style={{ marginBottom: 16 }}>
        {EXAMPLE_STORIES.map((story, i) => (
          <Button
            key={i}
            size="small"
            type="dashed"
            onClick={() => setUserStory(story)}
          >
            Example {i + 1}
          </Button>
        ))}
      </Space>

      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button
            icon={<ScanOutlined />}
            onClick={handleExtract}
            loading={extractMutation.isPending}
            disabled={!userStory.trim()}
          >
            Extract Elements
          </Button>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleGenerate}
            loading={isGenerating}
            disabled={!userStory.trim()}
          >
            Generate Test Card
          </Button>
        </Space>
      </div>

      {extractMutation.data && (
        <StoryElements elements={extractMutation.data.elements} />
      )}
    </div>
  );
}
