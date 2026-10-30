export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'fintech' | 'ecommerce' | 'civic' | 'media';
  summary: string;
  image: string;
  wcagTarget: 'AAA' | 'AA';
  primaryTech: string[];
  keyChallenge: string;
  solution: string;
  wcagCriteria: {
    code: string;
    name: string;
    level: 'A' | 'AA' | 'AAA';
    description: string;
  }[];
  impactMetrics: {
    metric: string;
    label: string;
  }[];
  codeComparison: {
    inaccessibleTitle: string;
    inaccessibleCode: string;
    inaccessibleExplanation: string;
    accessibleTitle: string;
    accessibleCode: string;
    accessibleExplanation: string;
  };
  liveDemoType?: 'banking-stepper' | 'cart-drawer' | 'form-feedback' | 'media-controls';
}

export interface Article {
  id: string;
  title: string;
  date: string;
  readTime: string;
  topic: string;
  summary: string;
  slug: string;
}

export interface A11yPreferences {
  theme: 'light' | 'dark' | 'super-contrast' | 'soft';
  textSize: '100' | '115' | '130';
  dyslexiaFont: boolean;
  reducedMotion: boolean;
  enhancedFocus: boolean;
  screenReaderLogs: boolean;
  soundAnnounce: boolean;
}

export interface ScreenReaderLogEntry {
  id: string;
  timestamp: string;
  type: 'focus' | 'announcement' | 'action';
  message: string;
  role?: string;
  name?: string;
}
