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

const KPI_CONFIG = [
  { key: 'total_tests', title: 'Total Tests', icon: <ExperimentOutlined />, gradient: 'kpi-card-brand', iconBg: 'rgba(99,102,241,0.1)', iconColor: '#6366f1' },
  { key: 'pass_rate', title: 'Pass Rate', suffix: '%', icon: <CheckCircleOutlined />, gradient: 'kpi-card-success', iconBg: 'rgba(16,185,129,0.1)', iconColor: '#10b981' },
  { key: 'average_coverage', title: 'Avg Coverage', suffix: '%', precision: 1, icon: <DashboardOutlined />, gradient: 'kpi-card-cyan', iconBg: 'rgba(6,182,212,0.1)', iconColor: '#06b6d4' },
  { key: 'average_trustworthiness', title: 'Avg Trust', icon: <SafetyCertificateOutlined />, gradient: 'kpi-card-violet', iconBg: 'rgba(139,92,246,0.1)', iconColor: '#8b5cf6', transform: (v: number) => Math.round(v * 100), suffix: '%' },
  { key: 'average_execution_time_ms', title: 'Avg Time', suffix: 'ms', precision: 0, icon: <ClockCircleOutlined />, gradient: 'kpi-card-warning', iconBg: 'rgba(245,158,11,0.1)', iconColor: '#f59e0b' },
  { key: 'failed_tests', title: 'Failed Tests', icon: <CloseCircleOutlined />, gradient: 'kpi-card-danger', iconBg: 'rgba(239,68,68,0.1)', iconColor: '#ef4444' },
  { key: 'indexed_files', title: 'Indexed Files', icon: <FileOutlined />, gradient: 'kpi-card-pink', iconBg: 'rgba(236,72,153,0.1)', iconColor: '#ec4899' },
  { key: 'indexed_chunks', title: 'Indexed Chunks', icon: <DatabaseOutlined />, gradient: 'kpi-card-brand', iconBg: 'rgba(99,102,241,0.1)', iconColor: '#6366f1' },
];

export default function KPIDashboard({ kpis }: Props) {
  return (
    <Row gutter={[16, 16]}>
      {KPI_CONFIG.map((item) => {
        const raw = kpis[item.key as keyof ProjectKPIs] as number;
        const value = item.transform ? item.transform(raw) : raw;

        return (
          <Col xs={12} sm={8} md={6} key={item.key}>
            <Card size="small" className={`card-hover-lift ${item.gradient}`}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: item.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    color: item.iconColor,
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <Statistic
                  title={item.title}
                  value={value}
                  suffix={item.suffix}
                  precision={item.precision}
                  valueStyle={{ fontSize: 22, fontWeight: 700 }}
                />
              </div>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
