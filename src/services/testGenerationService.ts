import api from './api';
import type { ProcessUserStoryResponse, StoryElements } from '../types/testCard';
import type { GenerateTestCodeResponse, GenerateTestCodeOptions, Scenario, BusinessRuleValidation } from '../types/execution';

export async function processUserStory(
  userStory: string,
  projectPath: string
): Promise<ProcessUserStoryResponse> {
  const { data } = await api.post<ProcessUserStoryResponse>('/process-user-story', {
    user_story: userStory,
    project_path: projectPath,
  });
  return data;
}

export async function extractStoryElements(userStory: string): Promise<StoryElements> {
  const { data } = await api.post<StoryElements>('/extract-story-elements', {
    user_story: userStory,
  });
  return data;
}

export async function generateTestCode(
  executionId: number,
  options: GenerateTestCodeOptions = {}
): Promise<GenerateTestCodeResponse> {
  const { data } = await api.post<GenerateTestCodeResponse>(
    `/generate-test-code/${executionId}`,
    options
  );
  return data;
}

export async function getScenarios(
  executionId: number
): Promise<{ success: boolean; scenarios: Scenario[]; count: number }> {
  const { data } = await api.get(`/get-scenarios/${executionId}`);
  return data;
}

export async function validateBusinessRules(
  executionId: number
): Promise<{ success: boolean; validation: BusinessRuleValidation }> {
  const { data } = await api.post(`/validate-business-rules/${executionId}`);
  return data;
}
