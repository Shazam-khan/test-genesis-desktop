import { Radio, Switch, Button, Space, Typography, Card } from 'antd';
import { CodeOutlined } from '@ant-design/icons';
import type { GenerateTestCodeOptions } from '../../types/execution';

interface Props {
  options: GenerateTestCodeOptions;
  onChange: (options: GenerateTestCodeOptions) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function GenerationControls({ options, onChange, onGenerate, isGenerating }: Props) {
  return (
    <Card size="small" style={{ marginBottom: 16 }}>
      <Typography.Title level={5}>Generation Options</Typography.Title>

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            RAG Approach
          </Typography.Text>
          <Radio.Group
            value={options.approach || 'multi'}
            onChange={(e) => onChange({ ...options, approach: e.target.value })}
          >
            <Radio.Button value="single">Single Query</Radio.Button>
            <Radio.Button value="multi">Multi Query</Radio.Button>
          </Radio.Group>
        </div>

        <Space size="large">
          <div>
            <Typography.Text type="secondary" style={{ marginRight: 8 }}>
              Phase 2 Enhancements
            </Typography.Text>
            <Switch
              checked={options.enable_phase2 ?? false}
              onChange={(checked) => onChange({ ...options, enable_phase2: checked })}
            />
          </div>

          <div>
            <Typography.Text type="secondary" style={{ marginRight: 8 }}>
              Auto-Execute
            </Typography.Text>
            <Switch
              checked={options.auto_execute ?? false}
              onChange={(checked) => onChange({ ...options, auto_execute: checked })}
            />
          </div>
        </Space>

        <Button
          type="primary"
          icon={<CodeOutlined />}
          onClick={onGenerate}
          loading={isGenerating}
          size="large"
        >
          Generate Test Code
        </Button>
      </Space>
    </Card>
  );
}
