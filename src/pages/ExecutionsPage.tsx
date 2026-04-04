import { Typography, Table, Alert, Tag, Space, Progress, Button, Skeleton, Card, message } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import FeedbackPanel from '../components/feedback/FeedbackPanel';
import type { ColumnsType } from 'antd/es/table';
import { useAppStore } from '../store/appStore';
import { useExecutions, useCollectCoverage } from '../hooks/useExecutions';
import StatusBadge from '../components/common/StatusBadge';
import { formatDuration, formatDate, formatPercentage } from '../utils/formatters';
import type { TestExecution } from '../types/execution';

const columns: ColumnsType<TestExecution> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 60,
  },
  {
    title: 'Test Card',
    dataIndex: 'test_card',
    key: 'test_card',
    ellipsis: true,
    render: (tc: Record<string, unknown>) =>
      tc?.TestCardID ? <Tag color="blue">{String(tc.TestCardID)}</Tag> : '—',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (status: string) => <StatusBadge status={status} />,
  },
  {
    title: 'Coverage',
    dataIndex: 'code_coverage',
    key: 'code_coverage',
    width: 100,
    render: (val: number | null) => formatPercentage(val),
  },
  {
    title: 'Duration',
    dataIndex: 'duration_ms',
    key: 'duration_ms',
    width: 100,
    render: (val: number | null) => formatDuration(val),
  },
  {
    title: 'Trustworthiness',
    dataIndex: 'trustworthiness_score',
    key: 'trustworthiness_score',
    width: 130,
    render: (val: number | null) => {
      if (val == null) return '—';
      const pct = Math.round(val * 100);
      const color = pct >= 80 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
      return <Progress type="circle" percent={pct} size={32} strokeColor={color} />;
    },
  },
  {
    title: 'Date',
    dataIndex: 'timestamp',
    key: 'timestamp',
    width: 180,
    render: (val: string) => formatDate(val),
  },
];

function ExpandedRow({ record }: { record: TestExecution }) {
  const collectCoverageMutation = useCollectCoverage();

  const handleCollectCoverage = () => {
    collectCoverageMutation.mutate(record.id, {
      onSuccess: (data) => {
        message.success(`Coverage collected: ${data.coverage.code_coverage}%`);
      },
    });
  };

  return (
    <div>
      {record.code_coverage == null && record.status === 'PASSED' && (
        <Button
          icon={<BarChartOutlined />}
          onClick={handleCollectCoverage}
          loading={collectCoverageMutation.isPending}
          style={{ marginBottom: 12 }}
          size="small"
        >
          Collect Coverage
        </Button>
      )}
      <FeedbackPanel executionId={record.id} />
    </div>
  );
}

export default function ExecutionsPage() {
  const selectedProjectPath = useAppStore((s) => s.selectedProjectPath);
  const { data, isLoading } = useExecutions(selectedProjectPath);

  if (!selectedProjectPath) {
    return (
      <Alert
        type="warning"
        message="No Project Selected"
        description="Please go to the Projects page and select a project first."
        showIcon
      />
    );
  }

  return (
    <div>
      <Typography.Title level={3}>Execution History</Typography.Title>
      <Typography.Paragraph type="secondary">
        View all test executions for the selected project.
      </Typography.Paragraph>

      <Table
        dataSource={data?.executions}
        columns={columns}
        loading={isLoading}
        rowKey="id"
        size="middle"
        pagination={{ pageSize: 15 }}
        expandable={{
          expandedRowRender: (record) => <ExpandedRow record={record} />,
        }}
      />
    </div>
  );
}
