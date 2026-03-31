import api from './api';
import type {
  ProjectKPIsResponse,
  TrendsResponse,
  RecommendationsResponse,
  QualityReport,
  QualityFeedback,
} from '../types/analytics';

export async function getTrends(
  projectPath: string,
  trendType = 'all',
  days = 30,
): Promise<TrendsResponse> {
  const { data } = await api.get<TrendsResponse>(`/trends/${encodeURIComponent(projectPath)}`, {
    params: { trend_type: trendType, days },
  });
  return data;
}

export async function getRecommendations(
  projectPath: string,
  type = 'all',
): Promise<RecommendationsResponse> {
  const { data } = await api.get<RecommendationsResponse>(
    `/recommendations/${encodeURIComponent(projectPath)}`,
    { params: { type } },
  );
  return data;
}

export async function getProjectKPIs(projectPath: string): Promise<ProjectKPIsResponse> {
  const { data } = await api.get<ProjectKPIsResponse>(
    `/kpi-export/${encodeURIComponent(projectPath)}`,
  );
  return data;
}

export async function getExecutionKPIs(executionId: number) {
  const { data } = await api.get(`/kpi-export/execution/${executionId}`);
  return data;
}

export async function getQualityReport(projectPath: string): Promise<QualityReport> {
  const { data } = await api.get<QualityReport>(
    `/test-quality-report/${encodeURIComponent(projectPath)}`,
  );
  return data;
}

export async function getQualityFeedback(executionId: number): Promise<QualityFeedback> {
  const { data } = await api.get<QualityFeedback>(`/test-quality-feedback/${executionId}`);
  return data;
}

export async function getImprovementSuggestions(
  executionId: number,
): Promise<{ success: boolean; execution_id: number; suggestions: string[] }> {
  const { data } = await api.get(`/test-quality-feedback/${executionId}/suggestions`);
  return data;
}
