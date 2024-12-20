import joblib
from xgboost import XGBClassifier
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    # Load your data
    logger.info("Loading data...")
    data = pd.read_csv("../HR_Employee-Analytics.csv")
    
    # Create binary columns from categorical variables
    logger.info("Processing categorical variables...")
    data['OverTime_Yes'] = (data['OverTime'] == 'Yes').astype(int)
    data['MaritalStatus_Single'] = (data['MaritalStatus'] == 'Single').astype(int)
    data['BusinessTravel_Travel_Frequently'] = (data['BusinessTravel'] == 'Travel_Frequently').astype(int)
    data['JobRole_Sales Representative'] = (data['JobRole'] == 'Sales Representative').astype(int)

    # Define features to use
    features = ['MonthlyIncome', 'OverTime_Yes', 'Age', 'DailyRate', 'MonthlyRate', 'HourlyRate',
                'DistanceFromHome', 'TotalWorkingYears', 'YearsAtCompany', 'PercentSalaryHike',
                'NumCompaniesWorked', 'YearsWithCurrManager', 'StockOptionLevel', 'JobSatisfaction',
                'YearsInCurrentRole', 'YearsSinceLastPromotion', 'JobLevel', 'EnvironmentSatisfaction',
                'WorkLifeBalance', 'RelationshipSatisfaction', 'JobInvolvement', 'Education',
                'MaritalStatus_Single', 'BusinessTravel_Travel_Frequently', 'JobRole_Sales Representative']

    # Prepare the data
    logger.info("Preparing features...")
    X = data[features]
    y = (data['Attrition'] == 'Yes').astype(int)

    # Create Age_TotalWorkingYears feature
    X['Age_TotalWorkingYears'] = X['Age'] * X['TotalWorkingYears']

    # Split the data
    logger.info("Splitting data...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Scale the features
    logger.info("Scaling features...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Train the model
    logger.info("Training model...")
    model = XGBClassifier(
        learning_rate=0.1,
        max_depth=5,
        n_estimators=200,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42,
        scale_pos_weight=(y_train == 0).sum() / (y_train == 1).sum()
    )

    # Fit the model
    model.fit(X_train_scaled, y_train)

    # Save both the model and scaler
    logger.info("Saving model and scaler...")
    joblib.dump(model, 'xgb_model.joblib')
    joblib.dump(scaler, 'scaler.joblib')

    logger.info("Model and scaler saved successfully!")

    # Print some model evaluation metrics
    from sklearn.metrics import classification_report
    y_pred = model.predict(X_test_scaled)
    logger.info("\nModel Performance on Test Set:")
    logger.info("\n" + classification_report(y_test, y_pred))

except Exception as e:
    logger.error(f"An error occurred: {str(e)}")
    raise