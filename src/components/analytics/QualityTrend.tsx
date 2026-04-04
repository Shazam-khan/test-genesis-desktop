import { Card } from 'antd';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
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
        <AreaChart data={chartData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="gradQuality" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis domain={[0, 100]} unit="%" />
          <Tooltip
            formatter={(value: number) => `${value}%`}
            contentStyle={{ borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: 'none' }}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#8b5cf6"
            fill="url(#gradQuality)"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#8b5cf6' }}
            activeDot={{ r: 5, stroke: '#8b5cf6', strokeWidth: 2, fill: '#fff' }}
            name="Trustworthiness"
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
