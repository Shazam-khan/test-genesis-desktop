import { Button, Card, Row, Col, Spin, Alert, Space } from 'antd';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import { useEvaluateTestCard, useEvaluateTestCode } from '../../hooks/useEvaluations';
import TrustworthinessGauge from './TrustworthinessGauge';
import CodeValidationCard from './CodeValidationCard';
import type { TestCardEvaluation, TestCodeEvaluation } from '../../types/evaluation';

interface Props {
  executionId: number;
}

export default function EvaluationPanel({ executionId }: Props) {
  const cardEval = useEvaluateTestCard();
  const codeEval = useEvaluateTestCode();

  const isLoading = cardEval.isPending || codeEval.isPending;
  const hasResults = cardEval.data || codeEval.data;

  const handleEvaluate = () => {
    cardEval.mutate(executionId);
    codeEval.mutate(executionId);
  };

  const cardResult = cardEval.data?.evaluation?.evaluation_type === 'test_card'
    ? (cardEval.data.evaluation as TestCardEvaluation)
    : undefined;
  const codeResult = codeEval.data?.evaluation?.evaluation_type === 'test_code'
    ? (codeEval.data.evaluation as TestCodeEvaluation)
    : undefined;
  const error = cardEval.error || codeEval.error;

  return (
    <Card
      size="small"
      title={<><SafetyCertificateOutlined /> TLM Evaluation</>}
      style={{ marginTop: 16 }}
    >
      {!hasResults && !isLoading && (
        <Space direction="vertical" align="center" style={{ width: '100%', padding: 24 }}>
          <Button
            type="primary"
            icon={<SafetyCertificateOutlined />}
            onClick={handleEvaluate}
            size="large"
          >
            Evaluate with TLM
          </Button>
        </Space>
      )}

      {isLoading && (
        <div style={{ textAlign: 'center', padding: 32 }}>
          <Spin size="large" tip="Evaluating trustworthiness..." />
        </div>
      )}

      {error && (
        <Alert
          type="error"
          message="Evaluation failed"
          description={error instanceof Error ? error.message : 'Unknown error'}
          style={{ marginBottom: 16 }}
        />
      )}

      {hasResults && !isLoading && (
        <Row gutter={16}>
          <Col xs={24} md={12}>
            {cardResult && (
              <TrustworthinessGauge
                score={cardResult.trustworthiness_score}
                explanation={cardResult.explanation}
                method={cardResult.evaluation_method}
                title="Test Card Quality"
                description="How accurately and completely the AI-generated test card captures the requirements from the user story (scenarios, preconditions, expected results)."
                icon="card"
              />
            )}
          </Col>
          <Col xs={24} md={12}>
            {codeResult && 'validation_results' in codeResult && (
              <TrustworthinessGauge
                score={codeResult.trustworthiness_score}
                explanation={null}
                method={codeResult.evaluation_method}
                title="Test Code Quality"
                description="How well the generated test code implements and validates what is described in the test card. A low score means the code may not fully cover the test scenarios."
                icon="code"
              />
            )}
          </Col>
        </Row>
      )}

      {hasResults && !isLoading && codeResult && 'validation_results' in codeResult && (
        <div style={{ marginTop: 16 }}>
          <CodeValidationCard validation={codeResult.validation_results} />
        </div>
      )}
    </Card>
  );
}
