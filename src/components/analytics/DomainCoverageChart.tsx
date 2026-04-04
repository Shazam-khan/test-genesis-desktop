import { Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  domainCoverage: Record<string, number>;
}

const DOMAIN_LABELS: Record<string, string> = {
  INV: 'Inventory',
  PRC: 'Procurement',
  FIN: 'Finance',
  LOG: 'Logistics',
  ORD: 'Orders',
  AUD: 'Audit',
};

export default function DomainCoverageChart({ domainCoverage }: Props) {
  const data = Object.entries(domainCoverage).map(([domain, count]) => ({
    domain,
    label: DOMAIN_LABELS[domain] || domain,
    count,
  }));

  if (data.length === 0) return null;

  return (
    <Card size="small" title="SCM Domain Coverage">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="gradDomain" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} />
          <YAxis />
          <Tooltip
            contentStyle={{ borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: 'none' }}
          />
          <Bar
            dataKey="count"
            fill="url(#gradDomain)"
            radius={[6, 6, 0, 0]}
            name="Tests"
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
