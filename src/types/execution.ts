/** A generated scenario from Phase 2 */
export interface Scenario {
  id: string;
  name: string;
  description: string;
  module?: string;
  steps?: string[];
}

/** Business rule validation result */
export interface BusinessRuleValidation {
  rules_checked: number;
  rules_passed: number;
  rules_failed: number;
  details?: Array<{
    rule_id: string;
    passed: boolean;
    message?: string;
  }>;
}

/** Individual test result from parsing */
export interface TestResult {
  name: string;
  status: 'passed' | 'failed' | 'error';
  duration_ms?: number;
  message?: string;
}

/** Summary counts */
export interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  errors: number;
}

/** Response from POST /api/execute-tests/<id> */
export interface ExecuteTestsResponse {
  success: boolean;
  status: string;
  tests_run: number;
  tests_passed: number;
  tests_failed: number;
  duration_ms: number;
  test_results: TestResult[];
  summary: TestSummary;
  stdout?: string;
  stderr?: string;
}

/** Coverage data from POST /api/collect-coverage/<id> */
export interface CoverageData {
  code_coverage: number;
  branch_coverage: number;
  function_coverage: number;
  lines_covered: number;
  lines_total: number;
}

/** Response from POST /api/generate-test-code/<id> */
export interface GenerateTestCodeResponse {
  success: boolean;
  test_code: string;
  chunks_used: number;
  scenarios?: Scenario[];
  data_flow_tests?: string;
  business_rule_validation?: BusinessRuleValidation;
  execution_results?: ExecuteTestsResponse;
}

/** A test execution record from Supabase */
export interface TestExecution {
  id: number;
  project_id: number;
  test_card: Record<string, unknown> & { TestCardID?: string };
  test_code: string | null;
  status: string;
  duration_ms: number | null;
  stdout: string | null;
  stderr: string | null;
  code_coverage: number | null;
  test_coverage: number | null;
  test_suite: string | null;
  trustworthiness_score: number | null;
  timestamp: string;
}

/** Response from POST /api/test-executions */
export interface TestExecutionsResponse {
  success: boolean;
  count: number;
  executions: TestExecution[];
}

/** Options for generating test code */
export interface GenerateTestCodeOptions {
  approach?: 'single-query' | 'multi-query';
  enable_phase2?: boolean;
  auto_execute?: boolean;
}
