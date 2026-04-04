import { Row, Col, Progress, Statistic, Card, Typography } from 'antd';
import type { CoverageData } from '../../types/execution';

interface Props {
  coverage: CoverageData;
}

function getCoverageColor(pct: number): string {
  if (pct >= 80) return '#10b981';
  if (pct >= 50) return '#f59e0b';
  return '#ef4444';
}

export default function CoverageOverview({ coverage }: Props) {
  const metrics = [
    { label: 'Code Coverage', value: coverage.code_coverage },
    { label: 'Branch Coverage', value: coverage.branch_coverage },
    { label: 'Function Coverage', value: coverage.function_coverage },
  ];

  return (
    <Card size="small" title="Coverage Report" style={{ marginTop: 16 }}>
      <Row gutter={32} justify="center">
        {metrics.map((m) => (
          <Col key={m.label} style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={Math.round(m.value)}
              strokeColor={getCoverageColor(m.value)}
              size={120}
              strokeWidth={8}
            />
            <Typography.Text
              type="secondary"
              style={{ display: 'block', marginTop: 10, fontSize: 13, fontWeight: 500 }}
            >
              {m.label}
            </Typography.Text>
          </Col>
        ))}
        <Col style={{ display: 'flex', alignItems: 'center' }}>
          <Statistic
            title="Lines Covered"
            value={coverage.lines_covered}
            suffix={`/ ${coverage.lines_total}`}
            valueStyle={{ fontWeight: 700 }}
          />
        </Col>
      </Row>
    </Card>
  );
}
