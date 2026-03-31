import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExecutions, getExecution, executeTests, executeWithCoverage } from '../services/executionService';

export function useExecutions(projectPath: string | null, limit = 20) {
  return useQuery({
    queryKey: ['executions', projectPath, limit],
    queryFn: () => getExecutions(projectPath!, limit),
    enabled: !!projectPath,
  });
}

export function useExecution(executionId: number | null) {
  return useQuery({
    queryKey: ['execution', executionId],
    queryFn: () => getExecution(executionId!),
    enabled: executionId != null,
  });
}

export function useExecuteTests() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (executionId: number) => executeTests(executionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['executions'] });
    },
  });
}

export function useExecuteWithCoverage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (executionId: number) => executeWithCoverage(executionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['executions'] });
    },
  });
}
