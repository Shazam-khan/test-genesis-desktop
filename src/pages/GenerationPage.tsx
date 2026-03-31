import { useState } from 'react';
import { Steps, Typography, Alert, Button, Space } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useAppStore } from '../store/appStore';
import { useProcessUserStory, useGenerateTestCode } from '../hooks/useTestGeneration';
import { useExecuteTests, useExecuteWithCoverage } from '../hooks/useExecutions';
import UserStoryInput from '../components/test-card/UserStoryInput';
import TestCardViewer from '../components/test-card/TestCardViewer';
import GenerationControls from '../components/code-generation/GenerationControls';
import CodeEditor from '../components/code-generation/CodeEditor';
import ChunksUsedPanel from '../components/code-generation/ChunksUsedPanel';
import ExecutionPanel from '../components/execution/ExecutionPanel';
import ResultsSummary from '../components/execution/ResultsSummary';
import LogsViewer from '../components/execution/LogsViewer';
import EvaluationPanel from '../components/evaluation/EvaluationPanel';
import FeedbackPanel from '../components/feedback/FeedbackPanel';
import CoverageOverview from '../components/coverage/CoverageOverview';
import CoverageChart from '../components/coverage/CoverageChart';
import type { TestCard, TestCardValidation } from '../types/testCard';
import type { GenerateTestCodeOptions, ExecuteTestsResponse, CoverageData } from '../types/execution';

const STEPS = [
  { title: 'User Story' },
  { title: 'Test Card' },
  { title: 'Code Generation' },
  { title: 'Execution' },
];

export default function GenerationPage() {
  const selectedProjectPath = useAppStore((s) => s.selectedProjectPath);
  const [currentStep, setCurrentStep] = useState(0);

  // Step 1 → 2 data
  const [executionId, setExecutionId] = useState<number | null>(null);
  const [testCard, setTestCard] = useState<TestCard | null>(null);
  const [validation, setValidation] = useState<TestCardValidation | null>(null);

  // Step 2 → 3 data
  const [testCode, setTestCode] = useState('');
  const [chunksUsed, setChunksUsed] = useState(0);
  const [scenariosCount, setScenariosCount] = useState(0);
  const [businessRuleValidation, setBusinessRuleValidation] = useState<Record<string, unknown> | null>(null);
  const [genOptions, setGenOptions] = useState<GenerateTestCodeOptions>({
    approach: 'multi-query',
    enable_phase2: false,
    auto_execute: false,
  });

  // Step 3 → 4 data
  const [execResults, setExecResults] = useState<ExecuteTestsResponse | null>(null);
  const [coverageData, setCoverageData] = useState<CoverageData | null>(null);
  // Detected language for code editor
  const [language, setLanguage] = useState('python');

  const processStoryMutation = useProcessUserStory();
  const generateCodeMutation = useGenerateTestCode();
  const executeTestsMutation = useExecuteTests();
  const executeWithCoverageMutation = useExecuteWithCoverage();

  if (!selectedProjectPath) {
    return (
      <Alert
        type="warning"
        message="No Project Selected"
        description="Please go to the Projects page and select or index a project first."
        showIcon
      />
    );
  }

  // Step 1: Generate test card
  const handleGenerateTestCard = (userStory: string) => {
    processStoryMutation.mutate(
      { userStory, projectPath: selectedProjectPath },
      {
        onSuccess: (data) => {
          setTestCard(data.test_card);
          setValidation(data.validation);
          setExecutionId(data.execution_id);
          setCurrentStep(1);
        },
      }
    );
  };

  // Step 2 → 3: Generate code
  const handleGenerateCode = () => {
    if (executionId == null) return;
    generateCodeMutation.mutate(
      { executionId, options: genOptions },
      {
        onSuccess: (data) => {
          setTestCode(data.test_code);
          setChunksUsed(data.chunks_used);
          setScenariosCount(data.scenarios?.length ?? 0);
          setBusinessRuleValidation(data.business_rule_validation ?? null);

          // If auto-execute returned results, jump to step 4
          if (data.execution_results) {
            setExecResults(data.execution_results);
            setCurrentStep(3);
          } else {
            setCurrentStep(2);
          }
        },
      }
    );
  };

  // Step 3 → 4: Execute tests
  const handleExecuteTests = () => {
    if (executionId == null) return;
    executeTestsMutation.mutate(executionId, {
      onSuccess: (data) => {
        setExecResults(data);
        setCurrentStep(3);
      },
    });
  };

  // Step 3 → 4: Execute with coverage
  const handleExecuteWithCoverage = () => {
    if (executionId == null) return;
    executeWithCoverageMutation.mutate(executionId, {
      onSuccess: (data) => {
        setExecResults(data);
        if (data.coverage) setCoverageData(data.coverage);
        setCurrentStep(3);
      },
    });
  };

  // Reset pipeline
  const handleReset = () => {
    setCurrentStep(0);
    setExecutionId(null);
    setTestCard(null);
    setValidation(null);
    setTestCode('');
    setChunksUsed(0);
    setScenariosCount(0);
    setBusinessRuleValidation(null);
    setExecResults(null);
    setCoverageData(null);
    processStoryMutation.reset();
    generateCodeMutation.reset();
    executeTestsMutation.reset();
    executeWithCoverageMutation.reset();
  };

  return (
    <div>
      <Typography.Title level={3}>Test Generation Pipeline</Typography.Title>

      <Steps current={currentStep} items={STEPS} style={{ marginBottom: 32 }} />

      {/* Step 1: User Story Input */}
      {currentStep === 0 && (
        <UserStoryInput
          onGenerate={handleGenerateTestCard}
          isGenerating={processStoryMutation.isPending}
        />
      )}

      {/* Error for step 1 */}
      {processStoryMutation.isError && (
        <Alert
          type="error"
          message="Failed to generate test card"
          description={processStoryMutation.error?.message}
          showIcon
          style={{ marginTop: 16 }}
        />
      )}

      {/* Step 2: Test Card Viewer */}
      {currentStep === 1 && testCard && validation && (
        <div>
          <TestCardViewer testCard={testCard} validation={validation} />
          <div style={{ marginTop: 16, textAlign: 'right' }}>
            <Space>
              <Button icon={<ArrowLeftOutlined />} onClick={() => setCurrentStep(0)}>
                Back
              </Button>
              <Button type="primary" icon={<ArrowRightOutlined />} onClick={() => setCurrentStep(2)}>
                Next: Generate Code
              </Button>
            </Space>
          </div>
        </div>
      )}

      {/* Step 3: Code Generation */}
      {currentStep === 2 && (
        <div>
          <GenerationControls
            options={genOptions}
            onChange={setGenOptions}
            onGenerate={handleGenerateCode}
            isGenerating={generateCodeMutation.isPending}
          />

          {generateCodeMutation.isError && (
            <Alert
              type="error"
              message="Code generation failed"
              description={generateCodeMutation.error?.message}
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          {testCode && (
            <>
              <CodeEditor code={testCode} language={language} onChange={setTestCode} />
              <ChunksUsedPanel
                chunksUsed={chunksUsed}
                scenariosCount={scenariosCount}
                businessRuleValidation={businessRuleValidation}
              />
              <div style={{ marginTop: 16, textAlign: 'right' }}>
                <Space>
                  <Button icon={<ArrowLeftOutlined />} onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button type="primary" icon={<ArrowRightOutlined />} onClick={() => setCurrentStep(3)}>
                    Next: Execute
                  </Button>
                </Space>
              </div>
            </>
          )}
        </div>
      )}

      {/* Step 4: Execution */}
      {currentStep === 3 && (
        <div>
          {!execResults && (
            <ExecutionPanel
              onExecute={handleExecuteTests}
              onExecuteWithCoverage={handleExecuteWithCoverage}
              isExecuting={executeTestsMutation.isPending || executeWithCoverageMutation.isPending}
              hasCode={!!testCode}
            />
          )}

          {executeTestsMutation.isError && (
            <Alert
              type="error"
              message="Test execution failed"
              description={executeTestsMutation.error?.message}
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          {execResults && (
            <>
              <ResultsSummary results={execResults} />
              {coverageData && (
                <>
                  <CoverageOverview coverage={coverageData} />
                  <CoverageChart coverage={coverageData} />
                </>
              )}
              <LogsViewer stdout={execResults.stdout} stderr={execResults.stderr} />
              {executionId && <EvaluationPanel executionId={executionId} />}
              {executionId && <FeedbackPanel executionId={executionId} />}
            </>
          )}

          <div style={{ marginTop: 24, textAlign: 'right' }}>
            <Space>
              <Button icon={<ArrowLeftOutlined />} onClick={() => setCurrentStep(2)}>
                Back to Code
              </Button>
              <Button type="primary" onClick={handleReset}>
                New Test Generation
              </Button>
            </Space>
          </div>
        </div>
      )}
    </div>
  );
}
