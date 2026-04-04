import { Card } from 'antd';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Props {
  distribution: Record<string, number>;
}

const STATUS_COLORS: Record<string, string> = {
  PASSED: '#10b981',
  FAILED: '#ef4444',
  ERROR: '#f59e0b',
  PENDING: '#94a3b8',
};

export default function StatusDistribution({ distribution }: Props) {
  const data = Object.entries(distribution)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }));

  if (data.length === 0) return null;

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card size="small" title="Status Distribution">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={95}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || '#6366f1'} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: 'none' }}
          />
          <Legend />
          {/* Center label */}
          <text x="50%" y="48%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 24, fontWeight: 700, fill: 'var(--text-primary)' }}>
            {total}
          </text>
          <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 11, fill: 'var(--text-secondary)' }}>
            Total
          </text>
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
