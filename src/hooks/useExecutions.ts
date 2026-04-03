import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { getExecutions, getExecution, executeTests, executeWithCoverage, collectCoverage } from '../services/executionService';

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
    onMutate: () => {
      notification.info({ key: 'execute-tests', message: 'Running tests...', description: 'This may take up to 5 minutes.', duration: 0 });
    },
    onSuccess: (data) => {
      const status = data.tests_failed > 0 ? 'warning' : 'success';
      notification[status]({ key: 'execute-tests', message: 'Tests completed', description: `${data.tests_passed} passed, ${data.tests_failed} failed` });
      queryClient.invalidateQueries({ queryKey: ['executions'] });
    },
    onError: (error) => {
      notification.error({ key: 'execute-tests', message: 'Test execution failed', description: error.message });
    },
  });
}

export function useExecuteWithCoverage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (executionId: number) => executeWithCoverage(executionId),
    onMutate: () => {
      notification.info({ key: 'execute-coverage', message: 'Running tests with coverage...', description: 'This may take up to 5 minutes.', duration: 0 });
    },
    onSuccess: (data) => {
      const status = data.tests_failed > 0 ? 'warning' : 'success';
      notification[status]({ key: 'execute-coverage', message: 'Tests completed with coverage', description: `${data.tests_passed} passed, ${data.tests_failed} failed` });
      queryClient.invalidateQueries({ queryKey: ['executions'] });
    },
    onError: (error) => {
      notification.error({ key: 'execute-coverage', message: 'Test execution failed', description: error.message });
    },
  });
}

export function useCollectCoverage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (executionId: number) => collectCoverage(executionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['executions'] });
    },
  });
}
