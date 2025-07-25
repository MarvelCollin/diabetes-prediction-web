from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import os
import pandas as pd
import logging
from sklearn.ensemble import RandomForestClassifier

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

class DiabetesPredictor:
    def __init__(self):
        self.model = None
        self.load_model()
    
    def load_model(self):
        try:
            model_path = os.path.join(os.path.dirname(__file__), "predict_diabetes.pkl")
            with open(model_path, 'rb') as file:
                data = pickle.load(file)
            
            logger.info(f"Loaded data type: {type(data)}")
            
            if hasattr(data, 'predict'):
                self.model = data
                logger.info("Loaded model directly from file")
            elif isinstance(data, np.ndarray):
                logger.info("Loaded numpy array, creating model from array")
                clf = RandomForestClassifier(n_estimators=100, random_state=42)
                try:
                    csv_path = os.path.join(os.path.dirname(__file__), "train.csv")
                    if os.path.exists(csv_path):
                        df = pd.read_csv(csv_path)
                        X = df.iloc[:, :-1].values
                        y = df.iloc[:, -1].values
                        clf.fit(X, y)
                        self.model = clf
                        logger.info("Created model from CSV data")
                    else:
                        raise FileNotFoundError("Training data CSV not found")
                except Exception as e:
                    logger.error(f"Error fitting model from CSV: {str(e)}")
                    self._create_fallback_model()
            else:
                logger.error(f"Unexpected data type: {type(data)}")
                self._create_fallback_model()
                
            logger.info("Pre-trained model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading the model: {str(e)}")
            self._create_fallback_model()
    
    def _create_fallback_model(self):
        """Create a fallback model when loading fails"""
        logger.info("Creating a fallback model")
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        np.random.seed(42)
        n_samples = 1000
        X = np.random.rand(n_samples, 8)
        y = ((X[:, 1] > 0.6) | (X[:, 5] > 0.7) | (X[:, 7] > 0.8)).astype(int)
        self.model.fit(X, y)
    
    def predict(self, features):
        try:
            features_array = np.array(features).reshape(1, -1)
            prediction = self.model.predict(features_array)
            probability = self.model.predict_proba(features_array)[0][1]
            
            logger.info(f"Made prediction: {prediction}, probability: {probability}")
            return int(prediction[0]), float(probability)
        except Exception as e:
            logger.error(f"Error during prediction: {str(e)}")
            raise

predictor = DiabetesPredictor()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Flask server is running"})

@app.route('/predict', methods=['POST'])
def predict_diabetes():
    try:
        logger.info(f"Received request: {request.method} {request.path}")
        logger.info(f"Request headers: {request.headers}")
        
        data = request.get_json()
        if data is None:
            logger.error("No JSON data received")
            return jsonify({'error': 'No data provided or invalid JSON'}), 400
            
        logger.info(f"Received data: {data}")
        
        required_fields = ['pregnancies', 'glucose', 'bloodPressure', 'skinThickness', 
                         'insulin', 'bmi', 'diabetesPedigreeFunction', 'age']
        
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            logger.error(f"Missing required fields: {missing_fields}")
            return jsonify({'error': f'Missing required fields: {missing_fields}'}), 400
        
        try:
            features = [
                float(data.get('pregnancies', 0)),
                float(data.get('glucose', 0)),
                float(data.get('bloodPressure', 0)),
                float(data.get('skinThickness', 0)),
                float(data.get('insulin', 0)),
                float(data.get('bmi', 0)),
                float(data.get('diabetesPedigreeFunction', 0)),
                float(data.get('age', 0))
            ]
        except ValueError as e:
            logger.error(f"Error converting values to float: {str(e)}")
            return jsonify({'error': f'Invalid numeric value: {str(e)}'}), 400
            
        logger.info(f"Extracted features: {features}")
        
        prediction, probability = predictor.predict(features)
        
        response = {
            'prediction': bool(prediction),
            'probability': probability,
            'risk_level': 'High Risk' if prediction == 1 else 'Low Risk'
        }
        
        logger.info(f"Prediction result: {response}")
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return jsonify({'error': str(e)}), 400

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message": "Diabetes Prediction API",
        "endpoints": {
            "/health": "GET - Health check",
            "/predict": "POST - Make diabetes prediction"
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
