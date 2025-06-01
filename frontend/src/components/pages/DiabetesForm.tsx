import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { DiabetesFormData } from '../../types';
import { formTemplates } from '../../utils/formTemplates';
import { apiService } from '../../utils/api';

const DiabetesForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<DiabetesFormData>();

  const onSubmit: SubmitHandler<DiabetesFormData> = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      // Call the API to get prediction
      const result = await apiService.predictDiabetes(data);
      
      // Navigate to results page with the prediction data
      navigate('/results', { 
        state: { 
          probability: result.probability,
          prediction: result.prediction
        } 
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to get prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const applyTemplate = (templateName: string) => {
    const template = formTemplates[templateName];
    if (template) {
      Object.entries(template).forEach(([key, value]) => {
        setValue(key as keyof DiabetesFormData, value);
      });
    }
  };

  const inputClasses = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";
  const errorClasses = "text-red-500 text-sm mt-1";

  return (
    <motion.div 
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Diabetes Prediction Form</h2>
          <p className="text-indigo-100">Fill in your health parameters for assessment</p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Quick Templates</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(formTemplates).map((template) => (
                <motion.button
                  key={template}
                  onClick={() => applyTemplate(template)}
                  className="px-3 py-1 bg-gray-100 hover:bg-indigo-100 border border-gray-300 rounded-md text-sm transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {template}
                </motion.button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Pregnancies</label>
                <input 
                  type="number" 
                  className={inputClasses}
                  {...register("pregnancies", { required: true, min: 0 })}
                />
                {errors.pregnancies && <p className={errorClasses}>This field is required</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Glucose (mg/dL)</label>
                <input 
                  type="number" 
                  className={inputClasses}
                  {...register("glucose", { required: true, min: 0 })}
                />
                {errors.glucose && <p className={errorClasses}>This field is required</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Blood Pressure (mm Hg)</label>
                <input 
                  type="number" 
                  className={inputClasses}
                  {...register("bloodPressure", { required: true, min: 0 })}
                />
                {errors.bloodPressure && <p className={errorClasses}>This field is required</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Skin Thickness (mm)</label>
                <input 
                  type="number" 
                  className={inputClasses}
                  {...register("skinThickness", { required: true, min: 0 })}
                />
                {errors.skinThickness && <p className={errorClasses}>This field is required</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Insulin (mu U/ml)</label>
                <input 
                  type="number" 
                  className={inputClasses}
                  {...register("insulin", { required: true, min: 0 })}
                />
                {errors.insulin && <p className={errorClasses}>This field is required</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">BMI</label>
                <input 
                  type="number" 
                  step="0.1"
                  className={inputClasses}
                  {...register("bmi", { required: true, min: 0 })}
                />
                {errors.bmi && <p className={errorClasses}>This field is required</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Diabetes Pedigree Function</label>
                <input 
                  type="number" 
                  step="0.01"
                  className={inputClasses}
                  {...register("diabetesPedigreeFunction", { required: true, min: 0 })}
                />
                {errors.diabetesPedigreeFunction && <p className={errorClasses}>This field is required</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Age</label>
                <input 
                  type="number" 
                  className={inputClasses}
                  {...register("age", { required: true, min: 0 })}
                />
                {errors.age && <p className={errorClasses}>This field is required</p>}
              </div>
            </div>

            <motion.button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : "Predict Diabetes Risk"}
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default DiabetesForm; 