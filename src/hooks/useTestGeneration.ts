import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { processUserStory, extractStoryElements, generateTestCode } from '../services/testGenerationService';
import type { GenerateTestCodeOptions } from '../types/execution';

export function useProcessUserStory() {
  return useMutation({
    mutationFn: ({ userStory, projectPath }: { userStory: string; projectPath: string }) =>
      processUserStory(userStory, projectPath),
    onMutate: () => {
      notification.info({ key: 'process-story', message: 'Generating test card...', duration: 0 });
    },
    onSuccess: () => {
      notification.success({ key: 'process-story', message: 'Test card generated' });
    },
    onError: (error) => {
      notification.error({ key: 'process-story', message: 'Test card generation failed', description: error.message });
    },
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
    onMutate: () => {
      notification.info({ key: 'generate-code', message: 'Generating test code...', description: 'Using RAG to retrieve relevant context.', duration: 0 });
    },
    onSuccess: () => {
      notification.success({ key: 'generate-code', message: 'Test code generated' });
    },
    onError: (error) => {
      notification.error({ key: 'generate-code', message: 'Code generation failed', description: error.message });
    },
  });
}
