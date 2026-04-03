import { Typography, Card, Form, Input, InputNumber, Select, Button, Space, Divider, Popconfirm, message } from 'antd';
import { useAppStore } from '../store/appStore';
import type { AppSettings } from '../store/appStore';
import ThemeToggle from '../components/common/ThemeToggle';

const LLM_MODELS = [
  { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
  { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
  { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
];

export default function SettingsPage() {
  const settings = useAppStore((s) => s.settings);
  const updateSettings = useAppStore((s) => s.updateSettings);
  const resetSettings = useAppStore((s) => s.resetSettings);
  const [form] = Form.useForm<AppSettings>();

  const handleSave = (values: AppSettings) => {
    updateSettings(values);
    message.success('Settings saved');
  };

  const handleReset = () => {
    resetSettings();
    form.setFieldsValue(useAppStore.getState().settings);
    message.info('Settings reset to defaults');
  };

  return (
    <div style={{ maxWidth: 640 }}>
      <Typography.Title level={3}>Settings</Typography.Title>
      <Typography.Paragraph type="secondary">
        Configure the application and backend connection settings.
      </Typography.Paragraph>

      <Card title="Appearance" size="small" style={{ marginBottom: 16 }}>
        <Form.Item label="Theme">
          <ThemeToggle />
        </Form.Item>
      </Card>

      <Card title="Backend & LLM" size="small">
        <Form
          form={form}
          layout="vertical"
          initialValues={settings}
          onFinish={handleSave}
        >
          <Form.Item
            name="apiBaseUrl"
            label="API Base URL"
            rules={[
              { required: true, message: 'API URL is required' },
              { pattern: /^https?:\/\/.+/, message: 'Must be a valid HTTP(S) URL' },
            ]}
          >
            <Input placeholder="http://localhost:5000/api" />
          </Form.Item>

          <Form.Item name="llmModel" label="LLM Model">
            <Select options={LLM_MODELS} />
          </Form.Item>

          <Form.Item name="temperature" label="Temperature">
            <InputNumber min={0} max={2} step={0.1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="maxTokens" label="Max Tokens">
            <InputNumber min={256} max={32768} step={256} style={{ width: '100%' }} />
          </Form.Item>

          <Divider />

          <Form.Item name="executionTimeout" label="Execution Timeout (seconds)">
            <InputNumber min={10} max={600} step={10} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">Save Settings</Button>
              <Popconfirm
                title="Reset all settings?"
                description="This will restore all settings to their default values."
                onConfirm={handleReset}
                okText="Reset"
                cancelText="Cancel"
              >
                <Button>Reset to Defaults</Button>
              </Popconfirm>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
