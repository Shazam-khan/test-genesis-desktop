import api from './api';
import type { EvaluationResponse, GetEvaluationsResponse } from '../types/evaluation';

export async function evaluateTestCard(executionId: number): Promise<EvaluationResponse> {
  const { data } = await api.post<EvaluationResponse>(`/evaluate-test-card/${executionId}`);
  return data;
}

export async function evaluateTestCode(executionId: number): Promise<EvaluationResponse> {
  const { data } = await api.post<EvaluationResponse>(`/evaluate-test-code/${executionId}`);
  return data;
}

export async function getEvaluation(
  executionId: number,
  evaluationType?: string,
): Promise<GetEvaluationsResponse> {
  const params = evaluationType ? { evaluation_type: evaluationType } : {};
  const { data } = await api.get<GetEvaluationsResponse>(`/get-evaluation/${executionId}`, { params });
  return data;
}
