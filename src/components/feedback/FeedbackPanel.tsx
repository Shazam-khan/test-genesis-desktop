import { Alert, Spin, Space, Typography, Row, Col } from 'antd';
import { useQualityFeedback, useImprovementSuggestions } from '../../hooks/useAnalytics';
import QualityScoreCard from './QualityScoreCard';
import StrengthsWeaknesses from './StrengthsWeaknesses';
import ImprovementSuggestions from './ImprovementSuggestions';

interface Props {
  executionId: number;
}

export default function FeedbackPanel({ executionId }: Props) {
  const feedbackQuery = useQualityFeedback(executionId);
  const suggestionsQuery = useImprovementSuggestions(executionId);

  if (feedbackQuery.isLoading || suggestionsQuery.isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: 24 }}>
        <Spin tip="Loading feedback..." />
      </div>
    );
  }

  if (feedbackQuery.isError || suggestionsQuery.isError) {
    return (
      <Alert
        type="error"
        message="Failed to load quality feedback"
        description={feedbackQuery.error?.message || suggestionsQuery.error?.message}
        showIcon
      />
    );
  }

  const feedback = feedbackQuery.data;
  const suggestions = suggestionsQuery.data?.suggestions ?? [];

  if (!feedback) return null;

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%', marginTop: 16 }}>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Quality Feedback
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <QualityScoreCard feedback={feedback} />
        </Col>
        <Col xs={24} lg={12}>
          <StrengthsWeaknesses
            strengths={feedback.strengths}
            weaknesses={feedback.weaknesses}
          />
        </Col>
      </Row>

      {feedback.feedback.length > 0 && (
        <Alert
          type="info"
          message="Feedback Details"
          description={
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {feedback.feedback.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          }
        />
      )}

      <ImprovementSuggestions suggestions={suggestions} />
    </Space>
  );
}
