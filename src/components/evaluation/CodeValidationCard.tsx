import { Card, List, Tag, Typography, Space } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import type { CodeValidationResults } from '../../types/evaluation';

interface Props {
  validation: CodeValidationResults;
}

export default function CodeValidationCard({ validation }: Props) {
  const checks = [
    { label: 'Has Imports', passed: validation.has_imports },
    { label: 'Has Test Functions', passed: validation.has_test_functions },
    { label: 'Has Assertions', passed: validation.has_assertions },
    { label: 'No Syntax Errors', passed: !validation.has_syntax_errors },
  ];

  return (
    <Card size="small" title={<><CodeOutlined /> Code Validation</>}>
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <Space wrap>
          {checks.map((c) => (
            <Tag
              key={c.label}
              icon={c.passed ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
              color={c.passed ? 'success' : 'error'}
            >
              {c.label}
            </Tag>
          ))}
        </Space>

        {validation.test_functions.length > 0 && (
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Detected Test Functions
            </Typography.Text>
            <List
              size="small"
              dataSource={validation.test_functions}
              renderItem={(fn) => (
                <List.Item style={{ padding: '4px 0' }}>
                  <Typography.Text code>{fn}</Typography.Text>
                </List.Item>
              )}
            />
          </div>
        )}

        {validation.imports.length > 0 && (
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Detected Imports
            </Typography.Text>
            <div style={{ marginTop: 4 }}>
              {validation.imports.map((imp) => (
                <Tag key={imp} style={{ marginBottom: 4 }}>{imp}</Tag>
              ))}
            </div>
          </div>
        )}
      </Space>
    </Card>
  );
}
