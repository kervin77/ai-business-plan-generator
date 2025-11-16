
export interface MarketingPlan {
  onlinePresence: string[];
  contentMarketing: string[];
  partnerships: string[];
}

export interface TechnicalStack {
  coreApi: string;
  frontend: string;
  backend: string;
  database: string;
}

export interface DevelopmentMilestone {
  phase: string;
  milestones: string[];
}

export interface RiskAnalysisItem {
  risk: string;
  mitigation: string;
}

export interface BusinessPlan {
  title: string;
  executiveSummary: string;
  targetMarket: string;
  monetizationStrategy: string[];
  marketingPlan: MarketingPlan;
  technicalStack: TechnicalStack;
  developmentRoadmap: DevelopmentMilestone[];
  riskAnalysis: RiskAnalysisItem[];
}
