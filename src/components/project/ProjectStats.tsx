import { useState } from 'react';
import { Descriptions, Tag, Card, Spin, Button, Input, Space, message, Popconfirm, Alert } from 'antd';
import { SyncOutlined, DeleteOutlined } from '@ant-design/icons';
import { useProjectStats, useReindexFile, useDeleteProjectIndex } from '../../hooks/useProjects';
import { useAppStore } from '../../store/appStore';
import { formatDate } from '../../utils/formatters';

interface Props {
  projectPath: string;
}

export default function ProjectStats({ projectPath }: Props) {
  const { data, isLoading } = useProjectStats(projectPath);
  const [reindexPath, setReindexPath] = useState('');
  const reindexMutation = useReindexFile();
  const deleteMutation = useDeleteProjectIndex();
  const setProject = useAppStore((s) => s.setProject);

  if (isLoading) return <Spin style={{ display: 'block', margin: '24px auto' }} />;
  if (!data?.success) return null;

  const handleReindex = () => {
    if (!reindexPath.trim()) return;
    reindexMutation.mutate(
      { projectPath, filePath: reindexPath.trim() },
      {
        onSuccess: (res) => {
          message.success(`Re-indexed ${res.file_path} (${res.chunks_added} chunks)`);
          setReindexPath('');
        },
      }
    );
  };

  const handleDelete = () => {
    deleteMutation.mutate(projectPath, {
      onSuccess: () => {
        message.success('Project index deleted');
        setProject(null, null);
      },
    });
  };

  return (
    <Card
      title="Project Statistics"
      size="small"
      style={{ marginTop: 16 }}
      extra={
        <Popconfirm
          title="Delete project index?"
          description="This will remove all indexed data for this project."
          onConfirm={handleDelete}
          okText="Delete"
          okButtonProps={{ danger: true }}
          cancelText="Cancel"
        >
          <Button size="small" danger icon={<DeleteOutlined />} loading={deleteMutation.isPending}>
            Delete Index
          </Button>
        </Popconfirm>
      }
    >
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

      <div style={{ marginTop: 16 }}>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder="File path to re-index (relative to project root)"
            value={reindexPath}
            onChange={(e) => setReindexPath(e.target.value)}
            onPressEnter={handleReindex}
          />
          <Button
            icon={<SyncOutlined />}
            onClick={handleReindex}
            loading={reindexMutation.isPending}
            disabled={!reindexPath.trim()}
          >
            Re-index File
          </Button>
        </Space.Compact>
      </div>

      {reindexMutation.isError && (
        <Alert
          type="error"
          message="Re-index failed"
          description={reindexMutation.error?.message}
          showIcon
          style={{ marginTop: 8 }}
          closable
        />
      )}
    </Card>
  );
}
