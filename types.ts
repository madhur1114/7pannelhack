
export interface WingoRecord {
  issue: string;
  number: number;
  size: 'Big' | 'Small';
  color: 'Red' | 'Green' | 'Violet';
}

export interface PredictionResult {
  nextIssue: string;
  prediction: {
    size: 'Big' | 'Small';
    numbers: number[];
    color: 'Red' | 'Green';
    confidence: number;
  };
  analysis: string;
}

export enum AppTab {
  PREDICTOR = 'PREDICTOR',
  ANALYSIS = 'ANALYSIS',
  CHAT = 'CHAT',
  VISION = 'VISION',
  HISTORY = 'HISTORY'
}
