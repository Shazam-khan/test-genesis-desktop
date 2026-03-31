import { Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, MinusOutlined } from '@ant-design/icons';

interface Props {
  direction: 'improving' | 'declining' | 'stable' | 'insufficient_data';
}

const config = {
  improving: { color: 'green', icon: <ArrowUpOutlined />, label: 'Improving' },
  declining: { color: 'red', icon: <ArrowDownOutlined />, label: 'Declining' },
  stable: { color: 'blue', icon: <MinusOutlined />, label: 'Stable' },
  insufficient_data: { color: 'default', icon: <MinusOutlined />, label: 'Insufficient Data' },
};

export default function TrendDirectionTag({ direction }: Props) {
  const c = config[direction];
  return (
    <Tag color={c.color} icon={c.icon}>
      {c.label}
    </Tag>
  );
}
