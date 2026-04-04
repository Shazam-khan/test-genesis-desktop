import { useState } from 'react';
import { Steps, Typography, Alert, Button, Space, Row, Col, Tabs, Spin } from 'antd';
import {
  ArrowLeftOutlined,
  ReloadOutlined,
  PlayCircleOutlined,
  BarChartOutlined,
  CodeOutlined,
  FileTextOutlined,
  FundOutlined,
  BugOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { useAppStore } from '../store/appStore';
import { useProcessUserStory, useGenerateTestCode } from '../hooks/useTestGeneration';
import { useExecuteTests, useExecuteWithCoverage } from '../hooks/useExecutions';
import UserStoryInput from '../components/test-card/UserStoryInput';
import TestCardViewer from '../components/test-card/TestCardViewer';
import GenerationControls from '../components/code-generation/GenerationControls';
import CodeEditor from '../components/code-generation/CodeEditor';
import ChunksUsedPanel from '../components/code-generation/ChunksUsedPanel';
import ResultsSummary from '../components/execution/ResultsSummary';
import LogsViewer from '../components/execution/LogsViewer';
import EvaluationPanel from '../components/evaluation/EvaluationPanel';
import FeedbackPanel from '../components/feedback/FeedbackPanel';
import CoverageOverview from '../components/coverage/CoverageOverview';
import CoverageChart from '../components/coverage/CoverageChart';
import type { TestCard, TestCardValidation } from '../types/testCard';
import type { GenerateTestCodeOptions, ExecuteTestsResponse, CoverageData, BusinessRuleValidation } from '../types/execution';

const STEPS = [
  { title: 'User Story' },
  { title: 'Test Card' },
  { title: 'Code & Execution' },
];

export default function GenerationPage() {
  const selectedProjectPath = useAppStore((s) => s.selectedProjectPath);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState('setup');

  // Step 1 → 2 data
  const [executionId, setExecutionId] = useState<number | null>(null);
  const [testCard, setTestCard] = useState<TestCard | null>(null);
  const [validation, setValidation] = useState<TestCardValidation | null>(null);

  // Step 3 data (merged code + execution)
  const [testCode, setTestCode] = useState('');
  const [chunksUsed, setChunksUsed] = useState(0);
  const [scenariosCount, setScenariosCount] = useState(0);
  const [businessRuleValidation, setBusinessRuleValidation] = useState<BusinessRuleValidation | null>(null);
  const [genOptions, setGenOptions] = useState<GenerateTestCodeOptions>({
    approach: 'multi',
    enable_phase2: false,
    auto_execute: false,
  });
  const [execResults, setExecResults] = useState<ExecuteTestsResponse | null>(null);
  const [coverageData, setCoverageData] = useState<CoverageData | null>(null);
  const [language] = useState('python');

  const processStoryMutation = useProcessUserStory();
  const generateCodeMutation = useGenerateTestCode();
  const executeTestsMutation = useExecuteTests();
  const executeWithCoverageMutation = useExecuteWithCoverage();

  const isExecuting = executeTestsMutation.isPending || executeWithCoverageMutation.isPending;

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

  // Step 3: Generate code
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

          if (data.execution_results) {
            setExecResults(data.execution_results);
            setActiveTab('output');
          }
        },
      }
    );
  };

  // Step 3: Execute tests
  const handleExecuteTests = () => {
    if (executionId == null) return;
    executeTestsMutation.mutate(executionId, {
      onSuccess: (data) => {
        setExecResults(data);
        setActiveTab('output');
      },
    });
  };

  // Step 3: Execute with coverage
  const handleExecuteWithCoverage = () => {
    if (executionId == null) return;
    executeWithCoverageMutation.mutate(executionId, {
      onSuccess: (data) => {
        setExecResults(data);
        if (data.coverage) setCoverageData(data.coverage);
        setActiveTab('output');
      },
    });
  };

  // Reset pipeline
  const handleReset = () => {
    setCurrentStep(0);
    setActiveTab('setup');
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

  // Build right-pane tabs for step 3
  const buildRightPaneTabs = () => {
    const items = [
      {
        key: 'setup',
        label: <span><CodeOutlined /> Setup</span>,
        children: (
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
                style={{ marginTop: 12 }}
                action={
                  <Button size="small" icon={<ReloadOutlined />} onClick={handleGenerateCode}>
                    Retry
                  </Button>
                }
              />
            )}
            {testCode && (
              <div style={{ marginTop: 16 }}>
                <Space>
                  <Button
                    type="primary"
                    icon={<PlayCircleOutlined />}
                    onClick={handleExecuteTests}
                    loading={isExecuting}
                    size="large"
                  >
                    Run Tests
                  </Button>
                  <Button
                    icon={<BarChartOutlined />}
                    onClick={handleExecuteWithCoverage}
                    loading={isExecuting}
                    size="large"
                  >
                    Run with Coverage
                  </Button>
                </Space>
                {isExecuting && (
                  <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <Spin />
                    <Typography.Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
                      Executing tests...
                    </Typography.Text>
                  </div>
                )}
              </div>
            )}
          </div>
        ),
      },
    ];

    if (execResults) {
      items.push({
        key: 'output',
        label: <span><FileTextOutlined /> Output</span>,
        children: <ResultsSummary results={execResults} />,
      });
    }

    if (coverageData) {
      items.push({
        key: 'coverage',
        label: <span><FundOutlined /> Coverage</span>,
        children: (
          <div>
            <CoverageOverview coverage={coverageData} />
            <CoverageChart coverage={coverageData} />
          </div>
        ),
      });
    }

    if (execResults) {
      items.push({
        key: 'logs',
        label: <span><BugOutlined /> Logs</span>,
        children: <LogsViewer stdout={execResults.stdout} stderr={execResults.stderr} />,
      });
    }

    if (executionId && execResults) {
      items.push({
        key: 'evaluation',
        label: <span><SafetyCertificateOutlined /> Evaluation</span>,
        children: (
          <div>
            <EvaluationPanel executionId={executionId} />
            <div style={{ marginTop: 16 }}>
              <FeedbackPanel executionId={executionId} />
            </div>
          </div>
        ),
      });
    }

    return items;
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
          action={
            <Button size="small" icon={<ReloadOutlined />} onClick={() => processStoryMutation.reset()}>
              Dismiss
            </Button>
          }
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
              <Button type="primary" onClick={() => { setCurrentStep(2); setActiveTab('setup'); }}>
                Next: Code & Execution
              </Button>
            </Space>
          </div>
        </div>
      )}

      {/* Step 3: Code & Execution (split-pane) */}
      {currentStep === 2 && (
        <div>
          <Row gutter={16}>
            {/* Left pane: Code Editor */}
            <Col span={14}>
              {testCode ? (
                <>
                  <CodeEditor code={testCode} language={language} onChange={setTestCode} />
                  <ChunksUsedPanel
                    chunksUsed={chunksUsed}
                    scenariosCount={scenariosCount}
                    businessRuleValidation={businessRuleValidation}
                  />
                </>
              ) : (
                <div
                  style={{
                    height: 'calc(100vh - 280px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed var(--border-color)',
                    borderRadius: 12,
                    background: 'var(--bg-elevated)',
                  }}
                >
                  <Typography.Text type="secondary">
                    Generate code using the Setup panel →
                  </Typography.Text>
                </div>
              )}
            </Col>

            {/* Right pane: Tabs (Setup / Output / Coverage / Logs / Evaluation) */}
            <Col span={10}>
              <div
                style={{
                  height: 'calc(100vh - 280px)',
                  overflow: 'auto',
                  border: '1px solid var(--border-color)',
                  borderRadius: 12,
                  padding: '0 16px',
                  background: 'var(--bg-surface)',
                }}
              >
                <Tabs
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  size="small"
                  items={buildRightPaneTabs()}
                  style={{ height: '100%' }}
                />
              </div>
            </Col>
          </Row>

          {/* Bottom navigation */}
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
            <Button icon={<ArrowLeftOutlined />} onClick={() => setCurrentStep(1)}>
              Back to Test Card
            </Button>
            <Button type="primary" onClick={handleReset}>
              New Test Generation
            </Button>
          </div>

          {executeTestsMutation.isError && (
            <Alert
              type="error"
              message="Test execution failed"
              description={executeTestsMutation.error?.message}
              showIcon
              style={{ marginTop: 12 }}
              action={
                <Button size="small" icon={<ReloadOutlined />} onClick={handleExecuteTests}>
                  Retry
                </Button>
              }
            />
          )}
        </div>
      )}
    </div>
  );
}
