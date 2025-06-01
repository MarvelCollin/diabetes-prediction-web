import { useState } from 'react';

export const useTooltip = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  
  const toggleTooltip = (id: string | null) => {
    setActiveTooltip(activeTooltip === id ? null : id);
  };
  
  const closeAllTooltips = () => {
    setActiveTooltip(null);
  };
  
  const isTooltipActive = (id: string): boolean => {
    return activeTooltip === id;
  };
  
  return {
    activeTooltip,
    toggleTooltip,
    closeAllTooltips,
    isTooltipActive,
  };
}; 