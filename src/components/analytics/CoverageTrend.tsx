import { Card } from 'antd';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import type { DailyStats } from '../../types/analytics';

interface Props {
  data: DailyStats[];
}

export default function CoverageTrend({ data }: Props) {
  return (
    <Card size="small" title="Coverage Trend">
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="gradCoverage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis domain={[0, 100]} unit="%" />
          <Tooltip
            formatter={(value: number) => `${value.toFixed(1)}%`}
            contentStyle={{ borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: 'none' }}
          />
          <Area
            type="monotone"
            dataKey="avg_coverage"
            stroke="#06b6d4"
            fill="url(#gradCoverage)"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#06b6d4' }}
            activeDot={{ r: 5, stroke: '#06b6d4', strokeWidth: 2, fill: '#fff' }}
            name="Avg Coverage"
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
