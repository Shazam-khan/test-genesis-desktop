import { useState } from 'react';
import { Space, Button, Typography, message } from 'antd';
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
    <div className="editor-chrome">
      {/* macOS-style chrome header */}
      <div className="editor-chrome-header">
        <span className="editor-dot red" />
        <span className="editor-dot yellow" />
        <span className="editor-dot green" />
        <Typography.Text type="secondary" style={{ fontSize: 12, marginLeft: 8, flex: 1 }}>
          Generated Test Code
        </Typography.Text>
        <Space size={4}>
          <Button
            size="small"
            type="text"
            icon={editable ? <EyeOutlined /> : <EditOutlined />}
            onClick={() => setEditable(!editable)}
          >
            {editable ? 'Read Only' : 'Edit'}
          </Button>
          <Button size="small" type="text" icon={<CopyOutlined />} onClick={handleCopy}>
            Copy
          </Button>
        </Space>
      </div>

      <Editor
        height="calc(100vh - 350px)"
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
          padding: { top: 12 },
        }}
      />

      <div style={{ padding: '6px 16px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-elevated)' }}>
        <Typography.Text type="secondary" style={{ fontSize: 11 }}>
          {code.split('\n').length} lines &middot; {monacoLang}
        </Typography.Text>
      </div>
    </div>
  );
}
