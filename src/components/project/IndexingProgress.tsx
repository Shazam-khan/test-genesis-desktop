import { useState, useEffect, useRef } from 'react';
import { Button, Steps, Typography, Alert, Progress, Statistic, Row, Col, Card } from 'antd';
import { RocketOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useIndexProject } from '../../hooks/useProjects';
import { useAppStore } from '../../store/appStore';
import { formatDuration } from '../../utils/formatters';
import type { IndexResult } from '../../types/project';

interface Props {
  projectPath: string;
}

export default function IndexingProgress({ projectPath }: Props) {
  const [result, setResult] = useState<IndexResult | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexMutation = useIndexProject();
  const setProject = useAppStore((s) => s.setProject);

  const steps = [
    { title: 'Detecting Framework' },
    { title: 'Scanning Files' },
    { title: 'Chunking Code' },
    { title: 'Storing Embeddings' },
    { title: 'Complete' },
  ];

  // Derive current step from elapsed time (slows down as it progresses)
  const getStepFromElapsed = (ms: number): number => {
    if (ms < 1500) return 0;
    if (ms < 4000) return 1;
    if (ms < 8000) return 2;
    return 3; // Stays on "Storing Embeddings" until API completes
  };

  const currentStep = result ? 4 : getStepFromElapsed(elapsedMs);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleIndex = async () => {
    setResult(null);
    setElapsedMs(0);

    timerRef.current = setInterval(() => {
      setElapsedMs((prev) => prev + 500);
    }, 500);

    try {
      const res = await indexMutation.mutateAsync(projectPath);
      if (timerRef.current) clearInterval(timerRef.current);
      setResult(res);
      setProject(projectPath, res.project_id);
    } catch {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  return (
    <Card style={{ marginTop: 16 }}>
      <Typography.Title level={5}>
        Index Project: <Typography.Text code>{projectPath.split(/[/\\]/).pop()}</Typography.Text>
      </Typography.Title>

      <Steps
        current={indexMutation.isPending || result ? currentStep : -1}
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
          <Progress type="circle" percent={Math.min(95, Math.round((currentStep / 4) * 100))} />
          <Typography.Paragraph type="secondary" style={{ marginTop: 16 }}>
            {steps[currentStep]?.title}... This may take a moment.
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
