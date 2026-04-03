import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { getProjects, getProjectStats, indexProject, deleteProjectIndex, reindexFile } from '../services/projectService';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
}

export function useProjectStats(projectPath: string | null) {
  return useQuery({
    queryKey: ['projectStats', projectPath],
    queryFn: () => getProjectStats(projectPath!),
    enabled: !!projectPath,
  });
}

export function useIndexProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectPath: string) => indexProject(projectPath),
    onMutate: () => {
      notification.info({ key: 'indexing', message: 'Indexing project...', description: 'This may take a moment.', duration: 0 });
    },
    onSuccess: (data) => {
      notification.success({ key: 'indexing', message: 'Project indexed', description: `${data.indexed_files} files, ${data.indexed_chunks} chunks` });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projectStats'] });
    },
    onError: (error) => {
      notification.error({ key: 'indexing', message: 'Indexing failed', description: error.message });
    },
  });
}

export function useDeleteProjectIndex() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectPath: string) => deleteProjectIndex(projectPath),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useReindexFile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ projectPath, filePath }: { projectPath: string; filePath: string }) =>
      reindexFile(projectPath, filePath),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectStats'] });
    },
  });
}
