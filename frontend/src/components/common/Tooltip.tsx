import React from 'react';
import { TooltipProps } from '../../types/index';
import { useTooltip } from '../../hooks/useTooltip';

const Tooltip: React.FC<TooltipProps> = ({ id, text }) => {
  const { isTooltipActive, toggleTooltip } = useTooltip();
  const isActive = isTooltipActive(id);
  
  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="ml-2 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 font-semibold flex items-center justify-center text-xs focus:outline-none"
        onClick={(e) => {
          e.preventDefault();
          toggleTooltip(id);
        }}
      >
        ?
      </button>
      {isActive && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-6 z-10 w-48 md:w-64 bg-white p-3 rounded-md shadow-lg border text-sm text-gray-700">
          {text}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-t border-l"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip; 