import { Card } from 'antd';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import type { DailyStats } from '../../types/analytics';

interface Props {
  data: DailyStats[];
}

export default function TestGenerationTrend({ data }: Props) {
  return (
    <Card size="small" title="Test Generation Trend">
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="passed"
            stackId="1"
            stroke="#52c41a"
            fill="#52c41a"
            fillOpacity={0.6}
            name="Passed"
          />
          <Area
            type="monotone"
            dataKey="failed"
            stackId="1"
            stroke="#f5222d"
            fill="#f5222d"
            fillOpacity={0.6}
            name="Failed"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
