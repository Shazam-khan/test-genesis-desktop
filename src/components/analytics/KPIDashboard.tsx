import { Row, Col, Card, Statistic } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExperimentOutlined,
  DashboardOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined,
  FileOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import type { ProjectKPIs } from '../../types/analytics';

interface Props {
  kpis: ProjectKPIs;
}

export default function KPIDashboard({ kpis }: Props) {
  const items = [
    {
      title: 'Total Tests',
      value: kpis.total_tests,
      icon: <ExperimentOutlined />,
    },
    {
      title: 'Pass Rate',
      value: kpis.pass_rate,
      suffix: '%',
      color: kpis.pass_rate >= 80 ? '#52c41a' : kpis.pass_rate >= 50 ? '#faad14' : '#f5222d',
      icon: <CheckCircleOutlined />,
    },
    {
      title: 'Avg Coverage',
      value: kpis.average_coverage,
      suffix: '%',
      precision: 1,
      color: kpis.average_coverage >= 70 ? '#52c41a' : '#faad14',
      icon: <DashboardOutlined />,
    },
    {
      title: 'Avg Trustworthiness',
      value: Math.round(kpis.average_trustworthiness * 100),
      suffix: '%',
      icon: <SafetyCertificateOutlined />,
    },
    {
      title: 'Avg Execution Time',
      value: kpis.average_execution_time_ms,
      suffix: 'ms',
      precision: 0,
      icon: <ClockCircleOutlined />,
    },
    {
      title: 'Failed Tests',
      value: kpis.failed_tests,
      color: kpis.failed_tests > 0 ? '#f5222d' : '#52c41a',
      icon: <CloseCircleOutlined />,
    },
    {
      title: 'Indexed Files',
      value: kpis.indexed_files,
      icon: <FileOutlined />,
    },
    {
      title: 'Indexed Chunks',
      value: kpis.indexed_chunks,
      icon: <DatabaseOutlined />,
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {items.map((item) => (
        <Col xs={12} sm={8} md={6} key={item.title}>
          <Card size="small">
            <Statistic
              title={item.title}
              value={item.value}
              suffix={item.suffix}
              precision={item.precision}
              valueStyle={item.color ? { color: item.color } : undefined}
              prefix={item.icon}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
