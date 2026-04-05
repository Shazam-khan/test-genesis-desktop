import { Button, Card, List, Typography, Tag, Space, Empty, Skeleton } from 'antd';
import { FolderOpenOutlined, ReloadOutlined } from '@ant-design/icons';
import { useProjects } from '../../hooks/useProjects';
import { useAppStore } from '../../store/appStore';
import { formatDate } from '../../utils/formatters';
import type { Project } from '../../types/project';

interface Props {
  onSelectNew: (path: string) => void;
}

export default function ProjectSelector({ onSelectNew }: Props) {
  const { data, isLoading, refetch } = useProjects();
  const { selectedProjectPath, setProject } = useAppStore();

  const handleBrowse = async () => {
    if (!window.electron) {
      alert('Directory picker is only available in the desktop app (Electron). Please run via "npm run dev" and use the Electron window, not a browser.');
      return;
    }
    const path = await window.electron.selectDirectory();
    if (path) {
      onSelectNew(path);
    }
  };

  const handleSelectExisting = (project: Project) => {
    setProject(project.project_path, project.id);
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<FolderOpenOutlined />} onClick={handleBrowse}>
          Select Project Folder
        </Button>
        <Button icon={<ReloadOutlined />} onClick={() => refetch()}>
          Refresh
        </Button>
      </Space>

      {isLoading ? (
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
          dataSource={[1, 2, 3]}
          renderItem={() => (
            <List.Item>
              <Card size="small">
                <Skeleton active paragraph={{ rows: 2 }} />
              </Card>
            </List.Item>
          )}
        />
      ) : data?.projects && data.projects.length > 0 ? (
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
          dataSource={data.projects}
          renderItem={(project) => (
            <List.Item>
              <Card
                hoverable
                size="small"
                className="card-hover-lift"
                onClick={() => handleSelectExisting(project)}
                style={{
                  borderColor:
                    selectedProjectPath === project.project_path ? '#6366f1' : undefined,
                  borderWidth: selectedProjectPath === project.project_path ? 2 : 1,
                  boxShadow:
                    selectedProjectPath === project.project_path
                      ? '0 0 0 3px rgba(99, 102, 241, 0.15), var(--surface-shadow)'
                      : undefined,
                }}
              >
                <Typography.Text strong ellipsis style={{ display: 'block', marginBottom: 8 }}>
                  {project.project_path.split(/[/\\]/).filter(Boolean).pop()}
                </Typography.Text>
                <Typography.Text type="secondary" ellipsis style={{ display: 'block', fontSize: 12, marginBottom: 8 }}>
                  {project.project_path}
                </Typography.Text>
                <Space wrap>
                  <Tag color="purple">{project.framework}</Tag>
                  <Tag color="cyan">{project.language}</Tag>
                  <Tag>{project.indexed_files} files</Tag>
                  <Tag>{project.indexed_chunks} chunks</Tag>
                </Space>
                <div style={{ marginTop: 8 }}>
                  <Typography.Text type="secondary" style={{ fontSize: 11 }}>
                    Indexed: {formatDate(project.indexed_at)}
                  </Typography.Text>
                </div>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Empty
          description={isLoading ? 'Loading projects...' : 'No indexed projects yet'}
          style={{ marginTop: 48 }}
        />
      )}
    </div>
  );
}
