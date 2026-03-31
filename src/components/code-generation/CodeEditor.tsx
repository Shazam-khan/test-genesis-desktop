import { useState } from 'react';
import { Card, Space, Button, Typography, message } from 'antd';
import { CopyOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import { useAppStore } from '../../store/appStore';

interface Props {
  code: string;
  language: string;
  onChange?: (code: string) => void;
}

export default function CodeEditor({ code, language, onChange }: Props) {
  const [editable, setEditable] = useState(false);
  const resolvedTheme = useAppStore((s) => s.resolvedTheme);

  const monacoLang = language === 'python' ? 'python'
    : language === 'javascript' ? 'javascript'
    : language === 'typescript' ? 'typescript'
    : language === 'java' ? 'java' : 'plaintext';

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    message.success('Copied to clipboard');
  };

  return (
    <Card
      size="small"
      title="Generated Test Code"
      extra={
        <Space>
          <Button
            size="small"
            icon={editable ? <EyeOutlined /> : <EditOutlined />}
            onClick={() => setEditable(!editable)}
          >
            {editable ? 'Read Only' : 'Edit'}
          </Button>
          <Button size="small" icon={<CopyOutlined />} onClick={handleCopy}>
            Copy
          </Button>
        </Space>
      }
    >
      <Editor
        height="450px"
        language={monacoLang}
        value={code}
        onChange={(val) => onChange?.(val || '')}
        theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
        options={{
          readOnly: !editable,
          minimap: { enabled: false },
          fontSize: 13,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          automaticLayout: true,
        }}
      />
      <Typography.Text type="secondary" style={{ marginTop: 8, display: 'block' }}>
        {code.split('\n').length} lines
      </Typography.Text>
    </Card>
  );
}
