export const useTooltipDefinitions = () => {
  const tooltips = {
    pregnancies: {
      label: "The number of pregnancies a person has had. More pregnancies may increase diabetes risk.",
      inputHelp: "Enter the number of times you've been pregnant. Enter 0 if you've never been pregnant or you're male."
    },
    glucose: {
      label: "The amount of sugar in your blood, measured after fasting for at least 8 hours. High levels may indicate diabetes.",
      inputHelp: "Enter your blood sugar level from a fasting blood test. Normal is below 100 mg/dL."
    },
    bloodPressure: {
      label: "The force of blood pressing against your artery walls. High blood pressure is linked to diabetes risk.",
      inputHelp: "Enter your systolic blood pressure (the top number). This measures blood pressure when your heart beats."
    },
    skinThickness: {
      label: "A measurement of fat under the skin. Higher values can indicate higher body fat and diabetes risk.",
      inputHelp: "Enter the thickness of your skin fold, usually measured at the back of your arm (triceps). If you don't know, use 20-30 as average."
    },
    insulin: {
      label: "A hormone that helps control blood sugar. High insulin levels may indicate insulin resistance, a precursor to diabetes.",
      inputHelp: "Enter your insulin level from a blood test. If you don't know, use 80-100 as average."
    },
    bmi: {
      label: "Body Mass Index - measures body fat based on height and weight. Higher values indicate obesity, a risk factor for diabetes.",
      inputHelp: "BMI = weight(kg) / height²(m²). If you don't know, you can find BMI calculators online by searching 'BMI calculator'."
    },
    diabetesPedigreeFunction: {
      label: "A score that indicates the genetic influence of diabetes in your family. Higher scores mean stronger family history of diabetes.",
      inputHelp: "This is a calculation based on family history of diabetes. Higher values mean more relatives with diabetes. Use 0.3-0.4 if unsure."
    },
    age: {
      label: "Your current age. Diabetes risk increases with age, especially after 45.",
      inputHelp: "Enter your current age in years."
    }
  };

  return { tooltips };
}; 