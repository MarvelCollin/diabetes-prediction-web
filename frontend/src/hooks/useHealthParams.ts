import { HealthParamInfo } from '../types/index';

export const useHealthParams = () => {
  const healthParams: Record<string, HealthParamInfo> = {
    glucose: {
      title: "Glucose Level",
      unit: "mg/dL",
      normal: { min: 70, max: 99 },
      prediabetic: { min: 100, max: 125 },
      diabetic: { min: 126, max: 400 },
      minDisplay: 50,
      maxDisplay: 200,
      recommendations: {
        high: [
          "Reduce intake of refined sugars and carbohydrates",
          "Increase fiber consumption through vegetables and whole grains",
          "Consider regular blood glucose monitoring",
          "Consult with a healthcare provider about your glucose levels"
        ],
        normal: [
          "Continue maintaining a balanced diet with limited sugars",
          "Regular exercise helps maintain healthy glucose levels"
        ]
      }
    },
    bloodPressure: {
      title: "Blood Pressure",
      unit: "mm Hg",
      normal: { min: 90, max: 120 },
      elevated: { min: 121, max: 129 },
      hypertension1: { min: 130, max: 139 },
      hypertension2: { min: 140, max: 180 },
      minDisplay: 80,
      maxDisplay: 180,
      recommendations: {
        high: [
          "Reduce sodium intake (aim for less than 1,500 mg per day)",
          "Adopt the DASH diet (rich in fruits, vegetables, and low-fat dairy)",
          "Regular physical activity (at least 150 minutes per week)",
          "Limit alcohol consumption and avoid smoking"
        ],
        normal: [
          "Maintain a healthy diet low in sodium",
          "Continue regular exercise to control blood pressure"
        ]
      }
    },
    insulin: {
      title: "Insulin",
      unit: "mu U/ml",
      normal: { min: 16, max: 166 },
      high: { min: 167, max: 1000 },
      minDisplay: 0,
      maxDisplay: 300,
      recommendations: {
        high: [
          "Reduce consumption of processed foods and added sugars",
          "Eat smaller, more frequent meals throughout the day",
          "Include protein with each meal to help regulate insulin levels",
          "Consider consulting with an endocrinologist"
        ],
        normal: [
          "Continue eating balanced meals with protein, healthy fats, and complex carbohydrates",
          "Regular physical activity helps maintain insulin sensitivity"
        ]
      }
    },
    bmi: {
      title: "BMI",
      unit: "",
      underweight: { min: 0, max: 18.4 },
      normal: { min: 18.5, max: 24.9 },
      overweight: { min: 25, max: 29.9 },
      obese: { min: 30, max: 40 },
      minDisplay: 15,
      maxDisplay: 40,
      recommendations: {
        high: [
          "Focus on a caloric deficit through diet and exercise",
          "Aim for 150-300 minutes of moderate exercise per week",
          "Consider working with a dietitian for a personalized weight management plan",
          "Focus on sustainable lifestyle changes rather than rapid weight loss"
        ],
        normal: [
          "Continue maintaining a balanced diet and regular exercise routine",
          "Focus on quality nutrition and strength training for overall health"
        ],
        low: [
          "Increase caloric intake with nutrient-dense foods",
          "Focus on protein intake and strength training",
          "Consider consulting with a dietitian for a personalized plan"
        ]
      }
    }
  };

  const getStatusClass = (name: string, value: number): string => {
    if (!value) return 'text-gray-400';
    
    switch (name) {
      case 'glucose':
        if (value >= healthParams.glucose.diabetic!.min) return 'text-red-500';
        if (value >= healthParams.glucose.prediabetic!.min) return 'text-orange-500';
        return 'text-green-500';
      case 'bloodPressure':
        if (value >= healthParams.bloodPressure.hypertension2!.min) return 'text-red-500';
        if (value >= healthParams.bloodPressure.hypertension1!.min) return 'text-orange-500';
        if (value >= healthParams.bloodPressure.elevated!.min) return 'text-yellow-500';
        return 'text-green-500';
      case 'insulin':
        if (value > healthParams.insulin.normal.max) return 'text-red-500';
        return 'text-green-500';
      case 'bmi':
        if (value >= healthParams.bmi.obese!.min) return 'text-red-500';
        if (value >= healthParams.bmi.overweight!.min) return 'text-orange-500';
        if (value < healthParams.bmi.normal.min) return 'text-yellow-500';
        return 'text-green-500';
      default:
        return 'text-gray-400';
    }
  };
  
  const getStatusBackgroundClass = (name: string, value: number): string => {
    if (!value) return 'bg-gray-200';
    
    switch (name) {
      case 'glucose':
        if (value >= healthParams.glucose.diabetic!.min) return 'bg-red-100';
        if (value >= healthParams.glucose.prediabetic!.min) return 'bg-orange-100';
        return 'bg-green-100';
      case 'bloodPressure':
        if (value >= healthParams.bloodPressure.hypertension2!.min) return 'bg-red-100';
        if (value >= healthParams.bloodPressure.hypertension1!.min) return 'bg-orange-100';
        if (value >= healthParams.bloodPressure.elevated!.min) return 'bg-yellow-100';
        return 'bg-green-100';
      case 'insulin':
        if (value > healthParams.insulin.normal.max) return 'bg-red-100';
        return 'bg-green-100';
      case 'bmi':
        if (value >= healthParams.bmi.obese!.min) return 'bg-red-100';
        if (value >= healthParams.bmi.overweight!.min) return 'bg-orange-100';
        if (value < healthParams.bmi.normal.min) return 'bg-yellow-100';
        return 'bg-green-100';
      default:
        return 'bg-gray-200';
    }
  };

  const getStatusLabel = (name: string, value: number): string => {
    if (!value) return 'No data';
    
    switch (name) {
      case 'glucose':
        if (value >= healthParams.glucose.diabetic!.min) return 'High Risk';
        if (value >= healthParams.glucose.prediabetic!.min) return 'Moderate Risk';
        return 'Normal';
      case 'bloodPressure':
        if (value >= healthParams.bloodPressure.hypertension2!.min) return 'Hypertension Stage 2';
        if (value >= healthParams.bloodPressure.hypertension1!.min) return 'Hypertension Stage 1';
        if (value >= healthParams.bloodPressure.elevated!.min) return 'Elevated';
        return 'Normal';
      case 'insulin':
        if (value > healthParams.insulin.normal.max) return 'High';
        return 'Normal';
      case 'bmi':
        if (value >= healthParams.bmi.obese!.min) return 'Obese';
        if (value >= healthParams.bmi.overweight!.min) return 'Overweight';
        if (value < healthParams.bmi.normal.min) return 'Underweight';
        return 'Normal';
      default:
        return 'Unknown';
    }
  };

  const getParameterRecommendations = (name: string, value: number): string[] => {
    if (!value) return [];
    
    const param = healthParams[name];
    if (!param) return [];

    switch (name) {
      case 'glucose':
        if (value >= healthParams.glucose.prediabetic!.min) {
          return param.recommendations.high;
        }
        return param.recommendations.normal;
      case 'bloodPressure':
        if (value >= healthParams.bloodPressure.elevated!.min) {
          return param.recommendations.high;
        }
        return param.recommendations.normal;
      case 'insulin':
        if (value > healthParams.insulin.normal.max) {
          return param.recommendations.high;
        }
        return param.recommendations.normal;
      case 'bmi':
        if (value >= healthParams.bmi.overweight!.min) {
          return param.recommendations.high;
        } else if (value < healthParams.bmi.normal.min && param.recommendations.low) {
          return param.recommendations.low;
        }
        return param.recommendations.normal;
      default:
        return [];
    }
  };

  return {
    healthParams,
    getStatusClass,
    getStatusBackgroundClass,
    getStatusLabel,
    getParameterRecommendations
  };
}; 