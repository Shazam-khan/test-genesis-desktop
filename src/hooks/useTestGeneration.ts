import { useMutation } from '@tanstack/react-query';
import { processUserStory, extractStoryElements, generateTestCode } from '../services/testGenerationService';
import type { GenerateTestCodeOptions } from '../types/execution';

export function useProcessUserStory() {
  return useMutation({
    mutationFn: ({ userStory, projectPath }: { userStory: string; projectPath: string }) =>
      processUserStory(userStory, projectPath),
  });
}

export function useExtractStoryElements() {
  return useMutation({
    mutationFn: (userStory: string) => extractStoryElements(userStory),
  });
}

export function useGenerateTestCode() {
  return useMutation({
    mutationFn: ({ executionId, options }: { executionId: number; options?: GenerateTestCodeOptions }) =>
      generateTestCode(executionId, options),
  });
}
