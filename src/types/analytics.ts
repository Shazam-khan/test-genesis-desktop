export interface ProjectKPIs {
  total_tests: number;
  passed_tests: number;
  failed_tests: number;
  pass_rate: number;
  average_coverage: number;
  average_execution_time_ms: number;
  total_evaluations: number;
  average_trustworthiness: number;
  indexed_files: number;
  indexed_chunks: number;
  framework: string;
  language: string;
}

export interface ProjectKPIsResponse {
  success: boolean;
  project_path: string;
  project_kpis: ProjectKPIs;
  exported_at: string;
}

export interface ExecutionKPIs {
  status: string;
  duration_ms: number;
  code_coverage: number;
  test_coverage: number;
  trustworthiness_score: number;
  test_suite: string;
  created_at: string;
  evaluation?: {
    trustworthiness_score: number;
    evaluation_type: string;
  };
}

export interface DailyStats {
  date: string;
  total: number;
  passed: number;
  failed: number;
  avg_coverage: number;
}

export interface TrendData {
  success: boolean;
  project_path: string;
  period_days: number;
  total_generated: number;
  success_rate: number;
  average_coverage: number;
  daily_stats: DailyStats[];
  status_distribution: Record<string, number>;
  trend_direction: 'improving' | 'declining' | 'stable' | 'insufficient_data';
}

export interface DomainCoverage {
  success: boolean;
  project_path: string;
  domain_coverage: Record<string, number>;
  total_domains_covered: number;
  recommendations: string[];
}

export interface QualityTrendPoint {
  date: string;
  avg_trustworthiness: number;
  count: number;
}

export interface QualityTrendData {
  success: boolean;
  project_path: string;
  average_trustworthiness: number;
  quality_over_time: QualityTrendPoint[];
  trend_direction: 'improving' | 'declining' | 'stable' | 'insufficient_data';
}

export interface TrendsResponse {
  success: boolean;
  project_path: string;
  trends: {
    generation?: TrendData;
    domain?: DomainCoverage;
    quality?: QualityTrendData;
  };
}

export interface Recommendation {
  type: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action: string;
  impact: 'high' | 'medium' | 'low';
  domain?: string;
}

export interface RecommendationsResponse {
  success: boolean;
  project_path: string;
  recommendations: {
    test?: Recommendation[];
    domain?: Recommendation[];
  };
}

export interface QualityReport {
  success: boolean;
  project_path: string;
  report_type: string;
  generated_at: string;
  summary: {
    total_tests: number;
    pass_rate: number;
    average_coverage: number;
    average_trustworthiness: number;
  };
  kpis: ProjectKPIs;
  trends: {
    test_generation: TrendData;
    domain_coverage: DomainCoverage;
    quality: QualityTrendData;
  };
  recommendations: {
    test_improvements: Recommendation[];
    domain_improvements: Recommendation[];
    total_count: number;
  };
  insights: string[];
}

export interface QualityFeedback {
  success: boolean;
  execution_id: number;
  quality_score: number;
  metrics: {
    status: string;
    code_coverage: number;
    test_coverage: number;
    duration_ms: number;
  };
  feedback: string[];
  strengths: string[];
  weaknesses: string[];
}
