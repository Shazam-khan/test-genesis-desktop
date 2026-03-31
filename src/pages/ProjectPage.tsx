import { useState } from 'react';
import { Typography, Divider } from 'antd';
import ProjectSelector from '../components/project/ProjectSelector';
import IndexingProgress from '../components/project/IndexingProgress';
import ProjectStats from '../components/project/ProjectStats';
import { useAppStore } from '../store/appStore';

export default function ProjectPage() {
  const [newProjectPath, setNewProjectPath] = useState<string | null>(null);
  const selectedProjectPath = useAppStore((s) => s.selectedProjectPath);

  const handleSelectNew = (path: string) => {
    setNewProjectPath(path);
  };

  return (
    <div>
      <Typography.Title level={3}>Projects</Typography.Title>
      <Typography.Paragraph type="secondary">
        Select an existing project or browse for a new one to index.
      </Typography.Paragraph>

      <ProjectSelector onSelectNew={handleSelectNew} />

      {newProjectPath && (
        <>
          <Divider />
          <IndexingProgress projectPath={newProjectPath} />
        </>
      )}

      {selectedProjectPath && (
        <>
          <Divider />
          <ProjectStats projectPath={selectedProjectPath} />
        </>
      )}
    </div>
  );
}
