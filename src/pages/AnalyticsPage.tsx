import { useState } from 'react';
import { Typography, Row, Col, Alert, Spin, Space, Empty, Button, Drawer } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { useAppStore } from '../store/appStore';
import { useProjectKPIs, useTrends, useRecommendations, useQualityReport } from '../hooks/useAnalytics';
import KPIDashboard from '../components/analytics/KPIDashboard';
import TrendDirectionTag from '../components/analytics/TrendDirectionTag';
import TestGenerationTrend from '../components/analytics/TestGenerationTrend';
import CoverageTrend from '../components/analytics/CoverageTrend';
import QualityTrend from '../components/analytics/QualityTrend';
import StatusDistribution from '../components/analytics/StatusDistribution';
import DomainCoverageChart from '../components/analytics/DomainCoverageChart';
import RecommendationsList from '../components/analytics/RecommendationsList';
import QualityReportView from '../components/analytics/QualityReportView';

export default function AnalyticsPage() {
  const selectedProjectPath = useAppStore((s) => s.selectedProjectPath);
  const kpisQuery = useProjectKPIs(selectedProjectPath);
  const trendsQuery = useTrends(selectedProjectPath);
  const recsQuery = useRecommendations(selectedProjectPath);
  const [reportOpen, setReportOpen] = useState(false);
  const reportQuery = useQualityReport(selectedProjectPath, reportOpen);

  if (!selectedProjectPath) {
    return (
      <Alert
        type="warning"
        message="No Project Selected"
        description="Please go to the Projects page and select a project first."
        showIcon
      />
    );
  }

  const isLoading = kpisQuery.isLoading || trendsQuery.isLoading;

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: 64 }}>
        <Spin size="large" tip="Loading analytics..." />
      </div>
    );
  }

  const kpis = kpisQuery.data?.project_kpis;
  const trends = trendsQuery.data?.trends;

  if (!kpis && !trends) {
    return <Empty description="No analytics data available yet. Run some test generations first." />;
  }

  return (
    <div>
      <Space style={{ marginBottom: 24 }}>
        <Typography.Title level={3} style={{ margin: 0 }}>Analytics Dashboard</Typography.Title>
        {trends?.generation && (
          <TrendDirectionTag direction={trends.generation.trend_direction} />
        )}
        <Button icon={<FileTextOutlined />} onClick={() => setReportOpen(true)}>
          Generate Report
        </Button>
      </Space>

      {kpis && <KPIDashboard kpis={kpis} />}

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {trends?.generation?.daily_stats && (
          <Col xs={24} lg={12}>
            <TestGenerationTrend data={trends.generation.daily_stats} />
          </Col>
        )}
        {trends?.generation?.daily_stats && (
          <Col xs={24} lg={12}>
            <CoverageTrend data={trends.generation.daily_stats} />
          </Col>
        )}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {trends?.generation?.status_distribution && (
          <Col xs={24} lg={8}>
            <StatusDistribution distribution={trends.generation.status_distribution} />
          </Col>
        )}
        {trends?.domain?.domain_coverage && (
          <Col xs={24} lg={8}>
            <DomainCoverageChart domainCoverage={trends.domain.domain_coverage} />
          </Col>
        )}
        {trends?.quality?.quality_over_time && (
          <Col xs={24} lg={8}>
            <QualityTrend data={trends.quality.quality_over_time} />
          </Col>
        )}
      </Row>

      {recsQuery.data?.recommendations && (
        <div style={{ marginTop: 16 }}>
          <RecommendationsList
            testRecommendations={recsQuery.data.recommendations.test}
            domainRecommendations={recsQuery.data.recommendations.domain}
          />
        </div>
      )}

      <Drawer
        title="Quality Report"
        placement="right"
        width={640}
        open={reportOpen}
        onClose={() => setReportOpen(false)}
      >
        {reportQuery.isLoading && (
          <div style={{ textAlign: 'center', padding: 48 }}>
            <Spin size="large" tip="Generating report..." />
          </div>
        )}
        {reportQuery.isError && (
          <Alert type="error" message="Failed to generate report" description={reportQuery.error?.message} showIcon />
        )}
        {reportQuery.data && <QualityReportView report={reportQuery.data} />}
      </Drawer>
    </div>
  );
}
