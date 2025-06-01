import { DiabetesFormData } from '../types';

export const formTemplates: Record<string, DiabetesFormData> = {
  "Healthy Profile": {
    pregnancies: 0,
    glucose: 85,
    bloodPressure: 70,
    skinThickness: 25,
    insulin: 80,
    bmi: 22.5,
    diabetesPedigreeFunction: 0.2,
    age: 28
  },
  "High Risk Profile": {
    pregnancies: 6,
    glucose: 195,
    bloodPressure: 95,
    skinThickness: 45,
    insulin: 350,
    bmi: 35.2,
    diabetesPedigreeFunction: 0.8,
    age: 52
  },
  "Moderate Risk Profile": {
    pregnancies: 3,
    glucose: 140,
    bloodPressure: 85,
    skinThickness: 32,
    insulin: 150,
    bmi: 28.5,
    diabetesPedigreeFunction: 0.5,
    age: 42
  },
  "Low Risk Profile": {
    pregnancies: 1,
    glucose: 100,
    bloodPressure: 80,
    skinThickness: 26,
    insulin: 100,
    bmi: 24.0,
    diabetesPedigreeFunction: 0.3,
    age: 35
  }
}; 