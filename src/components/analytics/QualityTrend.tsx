import { Card } from 'antd';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import type { QualityTrendPoint } from '../../types/analytics';

interface Props {
  data: QualityTrendPoint[];
}

export default function QualityTrend({ data }: Props) {
  const chartData = data.map((d) => ({
    ...d,
    score: Math.round(d.avg_trustworthiness * 100),
  }));

  return (
    <Card size="small" title="Quality Trend">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis domain={[0, 100]} unit="%" />
          <Tooltip formatter={(value: number) => `${value}%`} />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#722ed1"
            strokeWidth={2}
            dot={{ r: 3 }}
            name="Trustworthiness"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
