export interface ConfidenceMetrics {
  has_required_fields: boolean;
  has_preconditions: boolean;
  has_positive_flow: boolean;
  has_acceptance_criteria: boolean;
  has_alternate_flow: boolean;
  field_coverage: number;
}

export interface CodeValidationResults {
  has_syntax_errors: boolean;
  has_imports: boolean;
  has_test_functions: boolean;
  has_assertions: boolean;
  imports: string[];
  test_functions: string[];
}

export interface TestCardEvaluation {
  trustworthiness_score: number | null;
  explanation: string | null;
  confidence_metrics: ConfidenceMetrics;
  evaluation_type: 'test_card';
  evaluation_method: 'tlm' | 'fallback';
}

export interface TestCodeEvaluation {
  trustworthiness_score: number | null;
  explanation: string | null;
  validation_results: CodeValidationResults;
  evaluation_type: 'test_code';
  evaluation_method: 'tlm' | 'fallback';
}

export interface EvaluationResponse {
  success: boolean;
  evaluation: TestCardEvaluation | TestCodeEvaluation;
}

export interface StoredEvaluation {
  id: number;
  execution_id: number;
  evaluation_type: string;
  trustworthiness_score: number | null;
  evaluation_details: Record<string, unknown>;
  created_at: string;
}

export interface GetEvaluationsResponse {
  success: boolean;
  evaluations: StoredEvaluation[];
}
