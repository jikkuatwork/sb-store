export interface Model {
  id: string;
  title: string;
  category: string;
  kind: string;
  tags: string[];
  inferenceEndpoints?: string[];
  shortDescription: string;
  thumbnailUrl: string;
  githubUrl: string;
  modelUrl: string;
  machineType: string;
  highlighted: boolean;
  pricingInfoOverride?: string;
  creditsRequired: number;
}