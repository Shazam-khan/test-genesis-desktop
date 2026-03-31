import { useMutation, useQuery } from '@tanstack/react-query';
import { evaluateTestCard, evaluateTestCode, getEvaluation } from '../services/evaluationService';

export function useEvaluateTestCard() {
  return useMutation({
    mutationFn: (executionId: number) => evaluateTestCard(executionId),
  });
}

export function useEvaluateTestCode() {
  return useMutation({
    mutationFn: (executionId: number) => evaluateTestCode(executionId),
  });
}

export function useEvaluation(executionId: number | null) {
  return useQuery({
    queryKey: ['evaluation', executionId],
    queryFn: () => getEvaluation(executionId!),
    enabled: !!executionId,
  });
}
