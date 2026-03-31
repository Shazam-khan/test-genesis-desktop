import api from './api';
import type { IndexResult, ProjectStats, ProjectsResponse, ReindexFileResult } from '../types/project';

export async function indexProject(projectPath: string): Promise<IndexResult> {
  const { data } = await api.post<IndexResult>('/index', { project_path: projectPath });
  return data;
}

export async function getProjectStats(projectPath: string): Promise<ProjectStats> {
  const { data } = await api.post<ProjectStats>('/stats', { project_path: projectPath });
  return data;
}

export async function getProjects(): Promise<ProjectsResponse> {
  const { data } = await api.get<ProjectsResponse>('/projects');
  return data;
}

export async function reindexFile(projectPath: string, filePath: string): Promise<ReindexFileResult> {
  const { data } = await api.post<ReindexFileResult>('/reindex-file', {
    project_path: projectPath,
    file_path: filePath,
  });
  return data;
}

export async function deleteProjectIndex(projectPath: string): Promise<{ success: boolean }> {
  const { data } = await api.delete<{ success: boolean }>(`/index/${encodeURIComponent(projectPath)}`);
  return data;
}
