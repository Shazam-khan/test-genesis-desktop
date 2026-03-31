import { useState } from 'react';
import { Button, Steps, Typography, Alert, Spin, Statistic, Row, Col, Card } from 'antd';
import { RocketOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useIndexProject } from '../../hooks/useProjects';
import { useAppStore } from '../../store/appStore';
import { formatDuration } from '../../utils/formatters';
import type { IndexResult } from '../../types/project';

interface Props {
  projectPath: string;
}

export default function IndexingProgress({ projectPath }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<IndexResult | null>(null);
  const indexMutation = useIndexProject();
  const setProject = useAppStore((s) => s.setProject);

  const steps = [
    { title: 'Detecting Framework' },
    { title: 'Scanning Files' },
    { title: 'Chunking Code' },
    { title: 'Storing Embeddings' },
    { title: 'Complete' },
  ];

  const handleIndex = async () => {
    setResult(null);
    setCurrentStep(0);

    // Simulate step progression while waiting for the single API call
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }, 2000);

    try {
      const res = await indexMutation.mutateAsync(projectPath);
      clearInterval(stepInterval);
      setCurrentStep(4);
      setResult(res);
      setProject(projectPath, res.project_id);
    } catch {
      clearInterval(stepInterval);
    }
  };

  return (
    <Card style={{ marginTop: 16 }}>
      <Typography.Title level={5}>
        Index Project: <Typography.Text code>{projectPath.split(/[/\\]/).pop()}</Typography.Text>
      </Typography.Title>

      <Steps
        current={indexMutation.isPending ? currentStep : result ? 4 : -1}
        items={steps}
        size="small"
        style={{ marginBottom: 24 }}
      />

      {!indexMutation.isPending && !result && (
        <Button type="primary" icon={<RocketOutlined />} onClick={handleIndex} size="large">
          Start Indexing
        </Button>
      )}

      {indexMutation.isPending && (
        <div style={{ textAlign: 'center', padding: 24 }}>
          <Spin size="large" />
          <Typography.Paragraph type="secondary" style={{ marginTop: 16 }}>
            Indexing project... This may take a moment.
          </Typography.Paragraph>
        </div>
      )}

      {indexMutation.isError && (
        <Alert
          type="error"
          message="Indexing Failed"
          description={indexMutation.error?.message || 'An unexpected error occurred'}
          showIcon
          style={{ marginTop: 16 }}
        />
      )}

      {result && (
        <div style={{ marginTop: 16 }}>
          <Alert
            type="success"
            message="Project Indexed Successfully"
            icon={<CheckCircleOutlined />}
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Row gutter={16}>
            <Col span={6}>
              <Statistic title="Framework" value={result.framework} />
            </Col>
            <Col span={6}>
              <Statistic title="Language" value={result.language} />
            </Col>
            <Col span={6}>
              <Statistic title="Files Indexed" value={result.indexed_files} />
            </Col>
            <Col span={6}>
              <Statistic title="Chunks Created" value={result.indexed_chunks} />
            </Col>
          </Row>
          <Typography.Text type="secondary" style={{ marginTop: 8, display: 'block' }}>
            Duration: {formatDuration(result.duration_ms)}
          </Typography.Text>
        </div>
      )}
    </Card>
  );
}
