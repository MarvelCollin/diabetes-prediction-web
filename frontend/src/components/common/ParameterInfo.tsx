import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ParameterInfoProps } from '../../types/index';
import { useHealthParams } from '../../hooks/useHealthParams';
import { useChartData } from '../../hooks/useChartData';

const ParameterInfo: React.FC<ParameterInfoProps> = ({ name, value, title }) => {
  const { getStatusClass, getStatusBackgroundClass, getStatusLabel, getParameterRecommendations } = useHealthParams();
  const { generateParameterChartData, parameterChartOptions } = useChartData();
  
  const statusClass = getStatusClass(name, value);
  const unit = name !== 'bmi' ? name === 'glucose' ? 'mg/dL' : name === 'insulin' ? 'mu U/ml' : name === 'bloodPressure' ? 'mm Hg' : '' : '';
  const chart = generateParameterChartData(name, value);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 mb-5 shadow-sm">
      <div className="flex items-center justify-between mb-4 border-b pb-3">
        <div>
          <h4 className="text-lg font-medium text-gray-800">{title}</h4>
          <p className="text-xl font-semibold mt-1">
            <span className={statusClass}>{value}</span> {unit}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBackgroundClass(name, value)} ${statusClass}`}>
          {getStatusLabel(name, value)}
        </span>
      </div>
      
      <div className="mb-4">
        <div className="mb-6">
          <div className="h-20">
            <Bar data={chart.data} options={parameterChartOptions(title, chart)} />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
            <div className="text-green-600">
              <span className="font-medium">Normal:</span> {chart.normalRange.min}-{chart.normalRange.max}
            </div>
            <div className="text-orange-500 text-center">
              <span className="font-medium">Warning:</span> {chart.warningRange.min}-{chart.warningRange.max}
            </div>
            <div className="text-red-600 text-right">
              <span className="font-medium">High Risk:</span> {chart.dangerRange.min}+
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-md p-4">
          <h5 className="font-medium mb-3">What you should do:</h5>
          <ul className="list-disc space-y-2 pl-4">
            {getParameterRecommendations(name, value).map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ParameterInfo; 