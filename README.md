# Diabetes Prediction App

A web application that helps predict diabetes risk based on health parameters using machine learning algorithms. Users can input their health metrics to receive personalized risk assessments and recommendations.

## Features

- **Health Parameter Input**: Enter personal health data including glucose levels, BMI, blood pressure, etc.
- **Quick Input Templates**: Pre-defined templates for rapid data entry
- **Real-time Predictions**: Get instant diabetes risk prediction with probability scores
- **Visualized Results**: View your health metrics and risk levels through interactive charts
- **Personalized Recommendations**: Receive tailored health recommendations based on your parameters
- **Parameter Explanations**: Informative tooltips explaining each health metric and its significance
- **API Status Monitoring**: Real-time monitoring of API connection status

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for UI styling
- Framer Motion for animations
- Chart.js for data visualization
- React Hook Form for form management
- React Router for navigation
- Axios for API communication

### Backend
- RESTful API with health prediction model
- Health check endpoint for monitoring status

## Project Structure

```
DiabetesPredictionApp/
├── frontend/             # React TypeScript application
│   ├── public/           # Static assets
│   └── src/              # Source code
│       ├── components/   # UI components
│       │   ├── common/   # Reusable components
│       │   ├── layout/   # Layout components
│       │   └── pages/    # Page components
│       ├── hooks/        # Custom React hooks
│       ├── types/        # TypeScript interface definitions
│       └── utils/        # Utility functions
├── ai/                   # ML model and prediction service
└── docker-compose.yml    # Docker configuration
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Docker (for running the complete stack)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/DiabetesPredictionApp.git
   cd DiabetesPredictionApp
   ```

2. Install frontend dependencies
   ```bash
   cd frontend
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

### Running with Docker

To run the complete application including the AI prediction service:

```bash
docker-compose up
```

This will start both the frontend and backend services, accessible at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:9002

## API Endpoints

- `GET /health`: Health check endpoint
- `POST /predict`: Prediction endpoint accepting health parameters

## Using the Application

1. Navigate to the home page and click "Get Started"
2. Fill in your health parameters (or select a template)
3. Submit the form to generate your diabetes risk prediction
4. Review your results with visualized metrics and recommendations
5. Take action based on the personalized health suggestions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributors

- [Your Name](https://github.com/yourusername)

## Acknowledgments

- Diabetes dataset from the National Institute of Diabetes and Digestive and Kidney Diseases
- UI design inspired by modern healthcare applications
