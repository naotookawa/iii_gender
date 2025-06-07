export interface AnalysisResult {
  context: string;
  academic: number;
  discriminatory: number;
  casual: number;
  reasoning: string;
}

export interface ApiResponse {
  word: string;
  total_occurrences: number;
  analyses: AnalysisResult[];
  overall_average: {
    academic: number;
    discriminatory: number;
    casual: number;
  };
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  word: string;
  text: string;
  result: ApiResponse;
}

export interface SampleText {
  id: string;
  title: string;
  content: string;
  description: string;
}