import { Card, Collapse, Typography } from 'antd';

interface Props {
  stdout: string | null | undefined;
  stderr: string | null | undefined;
}

export default function LogsViewer({ stdout, stderr }: Props) {
  if (!stdout && !stderr) return null;

  const items = [];

  if (stdout) {
    items.push({
      key: 'stdout',
      label: 'Standard Output',
      children: (
        <pre className="log-content" style={{ maxHeight: 400, overflow: 'auto', margin: 0 }}>
          {stdout}
        </pre>
      ),
    });
  }

  if (stderr) {
    items.push({
      key: 'stderr',
      label: (
        <Typography.Text type="danger">Standard Error</Typography.Text>
      ),
      children: (
        <pre
          className="log-content"
          style={{ maxHeight: 400, overflow: 'auto', margin: 0, color: 'var(--log-error-color)' }}
        >
          {stderr}
        </pre>
      ),
    });
  }

  return (
    <Card size="small" title="Execution Logs" style={{ marginTop: 16 }}>
      <Collapse items={items} defaultActiveKey={stderr ? ['stderr'] : ['stdout']} />
    </Card>
  );
}
