import { Descriptions, Tag, Card, Spin } from 'antd';
import { useProjectStats } from '../../hooks/useProjects';
import { formatDate } from '../../utils/formatters';

interface Props {
  projectPath: string;
}

export default function ProjectStats({ projectPath }: Props) {
  const { data, isLoading } = useProjectStats(projectPath);

  if (isLoading) return <Spin style={{ display: 'block', margin: '24px auto' }} />;
  if (!data?.success) return null;

  return (
    <Card title="Project Statistics" size="small" style={{ marginTop: 16 }}>
      <Descriptions column={2} size="small" bordered>
        <Descriptions.Item label="Framework">
          <Tag color="blue">{data.framework}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Language">
          <Tag color="green">{data.language}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Indexed Files">{data.indexed_files}</Descriptions.Item>
        <Descriptions.Item label="Indexed Chunks">{data.indexed_chunks}</Descriptions.Item>
        <Descriptions.Item label="ChromaDB Chunks">{data.chroma_chunks}</Descriptions.Item>
        <Descriptions.Item label="Last Indexed">{formatDate(data.indexed_at)}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
