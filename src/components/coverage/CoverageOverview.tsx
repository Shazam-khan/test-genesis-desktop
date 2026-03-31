import { Row, Col, Progress, Statistic, Card, Typography } from 'antd';
import type { CoverageData } from '../../types/execution';

interface Props {
  coverage: CoverageData;
}

function getCoverageColor(pct: number): string {
  if (pct >= 80) return '#52c41a';
  if (pct >= 50) return '#faad14';
  return '#f5222d';
}

export default function CoverageOverview({ coverage }: Props) {
  const metrics = [
    { label: 'Code Coverage', value: coverage.code_coverage },
    { label: 'Branch Coverage', value: coverage.branch_coverage },
    { label: 'Function Coverage', value: coverage.function_coverage },
  ];

  return (
    <Card size="small" title="Coverage Report" style={{ marginTop: 16 }}>
      <Row gutter={24} justify="center">
        {metrics.map((m) => (
          <Col key={m.label} style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={Math.round(m.value)}
              strokeColor={getCoverageColor(m.value)}
              size={100}
            />
            <Typography.Text
              type="secondary"
              style={{ display: 'block', marginTop: 8, fontSize: 12 }}
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
          />
        </Col>
      </Row>
    </Card>
  );
}
