import { Card, Row, Col, Statistic, Table } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import StatusBadge from '../common/StatusBadge';
import { formatDuration } from '../../utils/formatters';
import type { ExecuteTestsResponse } from '../../types/execution';

interface Props {
  results: ExecuteTestsResponse;
}

const columns = [
  {
    title: 'Test Name',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (status: string) => <StatusBadge status={status} />,
  },
  {
    title: 'Duration',
    dataIndex: 'duration_ms',
    key: 'duration_ms',
    width: 100,
    render: (ms: number) => formatDuration(ms),
  },
];

export default function ResultsSummary({ results }: Props) {
  return (
    <div>
      <Card size="small" style={{ marginBottom: 16 }}>
        <Row gutter={16} align="middle">
          <Col>
            <StatusBadge status={results.status} />
          </Col>
          <Col>
            <Statistic
              title="Passed"
              value={results.tests_passed}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Col>
          <Col>
            <Statistic
              title="Failed"
              value={results.tests_failed}
              valueStyle={{ color: '#f5222d' }}
              prefix={<CloseCircleOutlined />}
            />
          </Col>
          <Col>
            <Statistic
              title="Total"
              value={results.tests_run}
            />
          </Col>
          <Col>
            <Statistic
              title="Duration"
              value={formatDuration(results.duration_ms)}
              prefix={<ClockCircleOutlined />}
            />
          </Col>
        </Row>
      </Card>

      {results.test_results && results.test_results.length > 0 && (
        <Table
          dataSource={results.test_results.map((r, i) => ({ ...r, key: i }))}
          columns={columns}
          size="small"
          pagination={false}
        />
      )}
    </div>
  );
}
