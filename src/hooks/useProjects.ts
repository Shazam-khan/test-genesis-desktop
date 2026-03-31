import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProjects, getProjectStats, indexProject, deleteProjectIndex } from '../services/projectService';

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projectStats'] });
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
