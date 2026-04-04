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
          <defs>
            <linearGradient id="gradPassed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="gradFailed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis />
          <Tooltip
            contentStyle={{ borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: 'none' }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="passed"
            stackId="1"
            stroke="#10b981"
            fill="url(#gradPassed)"
            strokeWidth={2}
            name="Passed"
            animationDuration={800}
          />
          <Area
            type="monotone"
            dataKey="failed"
            stackId="1"
            stroke="#ef4444"
            fill="url(#gradFailed)"
            strokeWidth={2}
            name="Failed"
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
