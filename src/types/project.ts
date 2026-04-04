/** Response from POST /api/index */
export interface IndexResult {
  success: boolean;
  project_id: number;
  framework: string;
  language: string;
  indexed_files: number;
  indexed_chunks: number;
  duration_ms: number;
}

/** Response from POST /api/stats */
export interface ProjectStats {
  success: boolean;
  project_path: string;
  framework: string;
  language: string;
  indexed_files: number;
  indexed_chunks: number;
  indexed_at: string;
  chroma_chunks: number;
  test_stats: Record<string, unknown>;
}

/** Single project in GET /api/projects response */
export interface Project {
  id: number;
  project_path: string;
  framework: string;
  language: string;
  indexed_files: number;
  indexed_chunks: number;
  indexed_at: string;
  updated_at?: string;
}

/** Response from GET /api/projects */
export interface ProjectsResponse {
  success: boolean;
  projects: Project[];
  count: number;
}

/** Response from POST /api/reindex-file */
export interface ReindexFileResult {
  success: boolean;
  file_path: string;
  chunks_added: number;
}
