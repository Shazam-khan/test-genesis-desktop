import { useQuery } from '@tanstack/react-query';
import {
  getTrends,
  getRecommendations,
  getProjectKPIs,
  getQualityReport,
  getQualityFeedback,
  getImprovementSuggestions,
} from '../services/analyticsService';

export function useProjectKPIs(projectPath: string | null) {
  return useQuery({
    queryKey: ['projectKPIs', projectPath],
    queryFn: () => getProjectKPIs(projectPath!),
    enabled: !!projectPath,
  });
}

export function useTrends(projectPath: string | null, trendType = 'all', days = 30) {
  return useQuery({
    queryKey: ['trends', projectPath, trendType, days],
    queryFn: () => getTrends(projectPath!, trendType, days),
    enabled: !!projectPath,
  });
}

export function useRecommendations(projectPath: string | null) {
  return useQuery({
    queryKey: ['recommendations', projectPath],
    queryFn: () => getRecommendations(projectPath!),
    enabled: !!projectPath,
  });
}

export function useQualityReport(projectPath: string | null, enabled = false) {
  return useQuery({
    queryKey: ['qualityReport', projectPath],
    queryFn: () => getQualityReport(projectPath!),
    enabled: !!projectPath && enabled,
  });
}

export function useQualityFeedback(executionId: number | null) {
  return useQuery({
    queryKey: ['qualityFeedback', executionId],
    queryFn: () => getQualityFeedback(executionId!),
    enabled: !!executionId,
  });
}

export function useImprovementSuggestions(executionId: number | null) {
  return useQuery({
    queryKey: ['improvementSuggestions', executionId],
    queryFn: () => getImprovementSuggestions(executionId!),
    enabled: !!executionId,
  });
}
