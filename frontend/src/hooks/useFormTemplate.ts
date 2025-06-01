import { UseFormSetValue } from 'react-hook-form';
import { DiabetesFormData } from '../types/index';
import { formTemplates } from '../utils/formTemplates';

export const useFormTemplate = (setValue: UseFormSetValue<DiabetesFormData>) => {
  const applyTemplate = (templateName: string) => {
    const template = formTemplates[templateName];
    if (template) {
      Object.entries(template).forEach(([key, value]) => {
        setValue(key as keyof DiabetesFormData, value);
      });
    }
  };
  
  return { applyTemplate };
}; 