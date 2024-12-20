from flask import Flask, request, jsonify
from flask_cors import CORS
import xgboost as xgb
import numpy as np
import pandas as pd
import joblib
import os
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the trained model and scaler
MODEL_PATH = 'xgb_model.joblib'
SCALER_PATH = 'scaler.joblib'

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    logger.info("Model and scaler loaded successfully")
except Exception as e:
    logger.error(f"Error loading model or scaler: {str(e)}")
    raise

@app.route('/')
def home():
    return jsonify({"status": "API is running"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Log received data
        data = request.json
        logger.debug(f"Received data: {data}")

        # Create feature list
        required_features = [
            'MonthlyIncome', 'OverTime_Yes', 'Age', 'DailyRate', 'MonthlyRate', 
            'HourlyRate', 'TotalWorkingYears', 'YearsAtCompany', 'StockOptionLevel', 
            'JobSatisfaction', 'YearsSinceLastPromotion', 'Education'
        ]

        # Verify all required fields are present
        for feature in required_features:
            if feature not in data and feature.lower() not in data:
                raise ValueError(f"Missing required feature: {feature}")

        # Create input DataFrame
        input_data = pd.DataFrame([{
            'MonthlyIncome': float(data['monthlyIncome']),
            'OverTime_Yes': 1 if data['overTime'] == 'Yes' else 0,
            'Age': float(data['age']),
            'DailyRate': float(data['dailyRate']),
            'MonthlyRate': float(data.get('monthlyRate', data['monthlyIncome'])),
            'HourlyRate': float(data['hourlyRate']),
            'DistanceFromHome': float(data.get('distanceFromHome', 0)),
            'TotalWorkingYears': float(data['totalWorkingYears']),
            'YearsAtCompany': float(data['yearsAtCompany']),
            'PercentSalaryHike': float(data.get('percentSalaryHike', 10)),
            'NumCompaniesWorked': float(data.get('numCompaniesWorked', 0)),
            'YearsWithCurrManager': float(data.get('yearsWithCurrManager', data['yearsAtCompany'])),
            'StockOptionLevel': int(data['stockOptionLevel']),
            'JobSatisfaction': int(data['jobSatisfaction']),
            'YearsInCurrentRole': float(data.get('yearsInCurrentRole', data['yearsAtCompany'])),
            'YearsSinceLastPromotion': float(data['yearsSinceLastPromotion']),
            'JobLevel': int(data.get('jobLevel', 1)),
            'EnvironmentSatisfaction': int(data.get('environmentSatisfaction', 3)),
            'WorkLifeBalance': int(data.get('workLifeBalance', 3)),
            'RelationshipSatisfaction': int(data.get('relationshipSatisfaction', 3)),
            'JobInvolvement': int(data.get('jobInvolvement', 3)),
            'Education': int(data['education']),
            'MaritalStatus_Single': 1 if data.get('maritalStatus', 'No') == 'Yes' else 0,
            'BusinessTravel_Travel_Frequently': 1 if data.get('businessTravel', 'No') == 'Yes' else 0,
            'JobRole_Sales Representative': 1 if data.get('jobRole', 'No') == 'Yes' else 0
        }])

        logger.debug(f"Created input DataFrame with shape: {input_data.shape}")

        # Add feature engineering
        input_data['Age_TotalWorkingYears'] = input_data['Age'] * input_data['TotalWorkingYears']
        logger.debug("Added engineered features")

        # Scale the features
        input_scaled = scaler.transform(input_data)
        logger.debug("Scaled features")

        # Make prediction
        prediction = model.predict(input_scaled)[0]
        probability = model.predict_proba(input_scaled)[0][1]
        logger.debug(f"Made prediction: {prediction}, probability: {probability}")

        # Get feature importances
        feature_importances = dict(zip(input_data.columns, model.feature_importances_))
        top_factors = sorted(feature_importances.items(), key=lambda x: x[1], reverse=True)[:3]
        
        response = {
            'prediction': 'Yes' if prediction == 1 else 'No',
            'probability': float(probability),
            'top_factors': [{'factor': factor, 'importance': float(importance)} 
                          for factor, importance in top_factors]
        }
        
        logger.debug(f"Sending response: {response}")
        return jsonify(response)

    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 400

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)