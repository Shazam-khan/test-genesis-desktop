import api from './api';
import type {
  ExecuteTestsResponse,
  TestExecution,
  TestExecutionsResponse,
  CoverageData,
} from '../types/execution';

export async function executeTests(executionId: number): Promise<ExecuteTestsResponse> {
  const { data } = await api.post<ExecuteTestsResponse>(`/execute-tests/${executionId}`);
  return data;
}

export async function executeWithCoverage(
  executionId: number
): Promise<ExecuteTestsResponse & { coverage: CoverageData }> {
  const { data } = await api.post(`/execute-with-coverage/${executionId}`);
  return data;
}

export async function getExecutions(
  projectPath: string,
  limit = 20,
  status?: string
): Promise<TestExecutionsResponse> {
  const { data } = await api.post<TestExecutionsResponse>('/test-executions', {
    project_path: projectPath,
    limit,
    ...(status && { status }),
  });
  return data;
}

export async function getExecution(executionId: number): Promise<{ success: boolean; execution: TestExecution }> {
  const { data } = await api.get(`/test-execution/${executionId}`);
  return data;
}

export async function updateExecution(
  executionId: number,
  updates: Partial<Pick<TestExecution, 'test_code' | 'status' | 'duration_ms' | 'stdout' | 'stderr' | 'code_coverage' | 'test_coverage' | 'test_suite'>>
): Promise<{ success: boolean }> {
  const { data } = await api.put(`/test-execution/${executionId}`, updates);
  return data;
}

export async function collectCoverage(
  executionId: number
): Promise<{ success: boolean; coverage: CoverageData }> {
  const { data } = await api.post(`/collect-coverage/${executionId}`);
  return data;
}
