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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#1890ff" radius={[4, 4, 0, 0]} name="Tests" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
