import { Card } from 'antd';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import type { DailyStats } from '../../types/analytics';

interface Props {
  data: DailyStats[];
}

export default function CoverageTrend({ data }: Props) {
  return (
    <Card size="small" title="Coverage Trend">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis domain={[0, 100]} unit="%" />
          <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
          <Line
            type="monotone"
            dataKey="avg_coverage"
            stroke="#1890ff"
            strokeWidth={2}
            dot={{ r: 3 }}
            name="Avg Coverage"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
