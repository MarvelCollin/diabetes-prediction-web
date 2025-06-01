import { ChartOptions } from 'chart.js';
import { ParameterChartData } from '../types/index';

export const useChartData = () => {
  const generateParameterChartData = (name: string, value: number): ParameterChartData => {
    let suggestions: string[] = [];
    let rangeMax = 0;
    let normalRange = { min: 0, max: 0 };
    let warningRange = { min: 0, max: 0 };
    let dangerRange = { min: 0, max: 0 };
    let unit = '';
    
    switch(name) {
      case 'glucose':
        unit = 'mg/dL';
        rangeMax = 200;
        normalRange = { min: 70, max: 99 };
        warningRange = { min: 100, max: 125 };
        dangerRange = { min: 126, max: 200 };
        
        if (value >= 126) {
          suggestions = [
            "Consult with healthcare provider immediately",
            "Monitor blood glucose regularly",
            "Reduce refined carbohydrate intake"
          ];
        } else if (value >= 100) {
          suggestions = [
            "Schedule a follow-up medical check",
            "Reduce sugar consumption",
            "Increase physical activity"
          ];
        } else {
          suggestions = [
            "Maintain current healthy habits",
            "Continue regular check-ups"
          ];
        }
        break;
        
      case 'insulin':
        unit = 'mu U/ml';
        rangeMax = 300;
        normalRange = { min: 16, max: 166 };
        warningRange = { min: 167, max: 250 };
        dangerRange = { min: 251, max: 300 };
        
        if (value > 166) {
          suggestions = [
            "Consult with endocrinologist",
            "Review and adjust dietary habits",
            "Regular insulin monitoring recommended"
          ];
        } else {
          suggestions = [
            "Maintain healthy diet and exercise",
            "Continue periodic screening"
          ];
        }
        break;
        
      case 'bmi':
        rangeMax = 40;
        normalRange = { min: 18.5, max: 24.9 };
        warningRange = { min: 25, max: 29.9 };
        dangerRange = { min: 30, max: 40 };
        
        if (value >= 30) {
          suggestions = [
            "Weight management program recommended",
            "Consider nutritional counseling",
            "Increase physical activity gradually"
          ];
        } else if (value >= 25) {
          suggestions = [
            "Moderate diet adjustments advised",
            "Regular exercise program recommended"
          ];
        } else if (value < 18.5) {
          suggestions = [
            "Consider nutritional consultation",
            "Healthy weight gain plan may be beneficial"
          ];
        } else {
          suggestions = [
            "Maintain current weight",
            "Continue balanced diet and regular exercise"
          ];
        }
        break;
        
      default:
        suggestions = [];
    }
    
    const getStatusFromValue = () => {
      if (value >= dangerRange.min) return 'High Risk';
      if (value >= warningRange.min) return 'Moderate Risk';
      return 'Normal';
    };
    
    const getValueColor = () => {
      if (value >= dangerRange.min) return 'rgba(239, 68, 68, 0.7)';
      if (value >= warningRange.min) return 'rgba(249, 115, 22, 0.7)';
      return 'rgba(34, 197, 94, 0.7)';
    };
    
    return {
      data: {
        labels: [''],
        datasets: [
          {
            data: [value],
            backgroundColor: [getValueColor()],
            borderColor: [getValueColor().replace('0.7', '1')],
            borderWidth: 1,
            borderRadius: 6,
          },
          {
            data: [rangeMax],
            backgroundColor: 'rgba(229, 231, 235, 0.5)',
            borderWidth: 0,
            borderRadius: 6,
            barPercentage: 1.0,
            categoryPercentage: 1.0,
          }
        ],
      },
      suggestions,
      rangeMax,
      normalRange,
      warningRange,
      dangerRange,
      unit,
      status: getStatusFromValue()
    };
  };

  const generateOverallRiskChart = (probabilityPercentage: number) => {
    const getBarColor = (risk: number) => {
      if (risk >= 70) return 'rgba(239, 68, 68, 0.7)';
      if (risk >= 40) return 'rgba(249, 115, 22, 0.7)';
      return 'rgba(34, 197, 94, 0.7)';
    };
    
    return {
      labels: [''],
      datasets: [
        {
          data: [probabilityPercentage],
          backgroundColor: [getBarColor(probabilityPercentage)],
          borderColor: [getBarColor(probabilityPercentage).replace('0.7', '1')],
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    };
  };

  const parameterChartOptions = (name: string, param: ParameterChartData): ChartOptions<'bar'> => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y' as const,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              if (context.datasetIndex === 0) {
                return `Your value: ${context.raw} ${param.unit}`;
              }
              return '';
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: param.rangeMax,
          title: {
            display: false
          },
          ticks: {
            callback: function(this: any, value: any) {
              return value;
            },
            autoSkip: true,
            maxTicksLimit: 10,
            padding: 5,
            font: {
              size: 10
            }
          },
          grid: {
            display: true,
            color: (context: any) => {
              const value = context.tick.value;
              if (value === param.normalRange.max) return 'rgba(34, 197, 94, 0.5)';
              if (value === param.warningRange.max) return 'rgba(249, 115, 22, 0.5)';
              return 'rgba(229, 231, 235, 0.3)';
            }
          }
        },
        y: {
          display: false
        }
      }
    };
  };
  
  const overallRiskChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `Diabetes Risk: ${context.raw}%`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Risk Level (%)'
        },
        ticks: {
          stepSize: 20,
          callback: function(value) {
            return value + '%';
          }
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  };

  return {
    generateParameterChartData,
    generateOverallRiskChart,
    parameterChartOptions,
    overallRiskChartOptions
  };
}; 