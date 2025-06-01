
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

export interface PredictionResult {
  probability: number;
  prediction: boolean;
  formData: DiabetesFormData;
  risk_level?: string;
} 