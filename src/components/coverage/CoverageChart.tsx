import { Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { CoverageData } from '../../types/execution';

interface Props {
  coverage: CoverageData;
}

const COLORS = ['#1890ff', '#722ed1', '#13c2c2'];

export default function CoverageChart({ coverage }: Props) {
  const data = [
    { name: 'Code', value: Math.round(coverage.code_coverage) },
    { name: 'Branch', value: Math.round(coverage.branch_coverage) },
    { name: 'Function', value: Math.round(coverage.function_coverage) },
  ];

  return (
    <Card size="small" title="Coverage Comparison" style={{ marginTop: 16 }}>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} unit="%" />
          <Tooltip formatter={(value: number) => `${value}%`} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
