import { Card, Collapse, Tag, Typography, Descriptions, Progress, Alert, Space, List } from 'antd';
import {
  CheckCircleOutlined,
  WarningOutlined,
  ExperimentOutlined,
} from '@ant-design/icons';
import type { TestCard, TestCardValidation } from '../../types/testCard';

interface Props {
  testCard: TestCard;
  validation: TestCardValidation;
}

export default function TestCardViewer({ testCard, validation }: Props) {
  return (
    <div>
      {/* Header */}
      <Card size="small" style={{ marginBottom: 16 }}>
        <Space wrap>
          <Tag color="blue" style={{ fontSize: 14, padding: '4px 12px' }}>
            {testCard.TestCardID}
          </Tag>
          {testCard.SCMDomainRuleID && (
            <Tag color="purple">{testCard.SCMDomainRuleID}</Tag>
          )}
        </Space>

        <Descriptions column={2} size="small" style={{ marginTop: 16 }}>
          <Descriptions.Item label="Domain Actor">{testCard.DomainActor}</Descriptions.Item>
          <Descriptions.Item label="Core Action">{testCard.CoreAction}</Descriptions.Item>
          <Descriptions.Item label="Target Object">{testCard.TargetObject}</Descriptions.Item>
          <Descriptions.Item label="Unit Under Test">
            <Typography.Text code>{testCard.UnitUnderTest}</Typography.Text>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Source User Story */}
      <Card size="small" title="Source User Story" style={{ marginBottom: 16 }}>
        <Typography.Paragraph italic>{testCard.SourceUserStory}</Typography.Paragraph>
      </Card>

      {/* Preconditions */}
      <Card size="small" title="Preconditions" style={{ marginBottom: 16 }}>
        <List
          size="small"
          dataSource={testCard.Preconditions}
          renderItem={(item, index) => (
            <List.Item>
              <Typography.Text>
                <Tag>{index + 1}</Tag> {item}
              </Typography.Text>
            </List.Item>
          )}
        />
      </Card>

      {/* Positive Flow */}
      <Card
        size="small"
        title={
          <Space>
            <CheckCircleOutlined style={{ color: '#52c41a' }} />
            Positive Flow
          </Space>
        }
        style={{ marginBottom: 16 }}
      >
        <Typography.Paragraph>{testCard.PositiveFlow.Description}</Typography.Paragraph>
        <Typography.Text strong>Acceptance Criteria:</Typography.Text>
        <List
          size="small"
          dataSource={testCard.PositiveFlow.AcceptanceCriteria}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>
                <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                {item}
              </Typography.Text>
            </List.Item>
          )}
        />
      </Card>

      {/* Alternate Flow */}
      <Card
        size="small"
        title={
          <Space>
            <WarningOutlined style={{ color: '#faad14' }} />
            Alternate Flow (Negative Cases)
          </Space>
        }
        style={{ marginBottom: 16 }}
      >
        <Typography.Paragraph>{testCard.AlternateFlow.Description}</Typography.Paragraph>
        <Collapse
          items={testCard.AlternateFlow.NegativeCases.map((nc, idx) => ({
            key: idx,
            label: (
              <Space>
                <Tag color="red">{nc.Type}</Tag>
                <Typography.Text ellipsis style={{ maxWidth: 400 }}>
                  {nc.Scenario}
                </Typography.Text>
              </Space>
            ),
            children: (
              <div>
                <Typography.Paragraph>
                  <strong>Scenario:</strong> {nc.Scenario}
                </Typography.Paragraph>
                <Typography.Paragraph>
                  <strong>Expected Result:</strong> {nc.ExpectedResult}
                </Typography.Paragraph>
              </div>
            ),
          }))}
        />
      </Card>

      {/* Validation */}
      <Card
        size="small"
        title={
          <Space>
            <ExperimentOutlined />
            Validation
          </Space>
        }
      >
        <Space align="start" size={32}>
          <div style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={Math.round(validation.completeness_score * 100)}
              size={80}
              status={validation.is_valid ? 'success' : 'exception'}
            />
            <Typography.Text style={{ display: 'block', marginTop: 8 }} type="secondary">
              Completeness
            </Typography.Text>
          </div>
          <div>
            {validation.errors.length > 0 && (
              <Alert
                type="error"
                message="Validation Errors"
                description={
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    {validation.errors.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                }
                style={{ marginBottom: 8 }}
              />
            )}
            {validation.warnings.length > 0 && (
              <Alert
                type="warning"
                message="Warnings"
                description={
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    {validation.warnings.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
                }
              />
            )}
            {validation.is_valid && validation.errors.length === 0 && validation.warnings.length === 0 && (
              <Alert type="success" message="Test card is valid and complete" showIcon />
            )}
          </div>
        </Space>
      </Card>
    </div>
  );
}
