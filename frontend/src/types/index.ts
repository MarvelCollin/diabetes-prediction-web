import { ReactNode } from 'react';

export interface DiabetesFormData {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigreeFunction: number;
  age: number;
}

export interface PredictionResponse {
  prediction: boolean;
  probability: number;
  risk_level: string;
}

export interface LayoutProps {
  children: ReactNode;
}

export interface ParameterChartData {
  data: any;
  suggestions: string[];
  rangeMax: number;
  normalRange: { min: number; max: number };
  warningRange: { min: number; max: number };
  dangerRange: { min: number; max: number };
  unit: string;
  status: string;
}

export interface TooltipProps {
  id: string;
  text: string;
}

export interface ParameterInfoProps {
  name: string;
  value: number;
  title: string;
}

export interface HealthParamInfo {
  title: string;
  unit: string;
  normal: { min: number; max: number };
  prediabetic?: { min: number; max: number };
  diabetic?: { min: number; max: number };
  elevated?: { min: number; max: number };
  hypertension1?: { min: number; max: number };
  hypertension2?: { min: number; max: number };
  high?: { min: number; max: number };
  underweight?: { min: number; max: number };
  overweight?: { min: number; max: number };
  obese?: { min: number; max: number };
  minDisplay: number;
  maxDisplay: number;
  recommendations: {
    high: string[];
    normal: string[];
    low?: string[];
  };
} 