import React, { useState } from 'react';
import { AlertCircle, User, DollarSign, Clock, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import ThemeToggle from './ThemeToggle';

const AttritionPredictor = () => {
  const [formData, setFormData] = useState({
    monthlyIncome: '0',
    overTime: 'No',
    age: '',
    dailyRate: '',
    monthlyRate: '0',
    hourlyRate: '',
    distanceFromHome: '',
    totalWorkingYears: '',
    yearsAtCompany: '',
    percentSalaryHike: '',
    numCompaniesWorked: '',
    yearsWithCurrManager: '',
    stockOptionLevel: '0',
    jobSatisfaction: '1',
    yearsInCurrentRole: '',
    yearsSinceLastPromotion: '',
    jobLevel: '1',
    environmentSatisfaction: '1',
    workLifeBalance: '1',
    relationshipSatisfaction: '1',
    jobInvolvement: '1',
    education: '1',
    maritalStatus: 'No',
    businessTravel: 'No',
    jobRole: 'No'
  });

  const [prediction, setPrediction] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predictionDetails, setPredictionDetails] = useState(null);

  // Inside handleSubmit function of AttritionPredictor.jsx
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      console.log('Submitting data:', formData); // Add this line
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Prediction failed');
      }

      const data = await response.json();
      console.log('Received response:', data); // Add this line
      setPrediction(data.prediction);
      setPredictionDetails(data);
      setShowResult(true);
    } catch (err) {
      console.error('Error details:', err); // Add this line
      setError(err.message || 'Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
};

const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Ensure numeric fields are treated as numbers
    const numericFields = ['monthlyIncome', 'age', 'dailyRate', 'monthlyRate', 'hourlyRate', 'totalWorkingYears', 'yearsAtCompany', 'yearsSinceLastPromotion'];
    
    const processedValue = numericFields.includes(name) 
      ? value === '' ? '0' : value
      : value;
      
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200";
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <ThemeToggle />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Employee Attrition Predictor
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter employee details to predict likelihood of attrition
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Personal Information Card */}
          <Card className="dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className={labelClasses}>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className={inputClasses}
                    min="18"
                    max="100"
                  />
                </div>
                <div>
                  <label className={labelClasses}>Education Level (1-5)</label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className={inputClasses}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compensation Card */}
          <Card className="dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <DollarSign className="h-5 w-5" />
                Compensation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className={labelClasses}>Monthly Income</label>
                  <input
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                    className={inputClasses}
                    required
                    min="0"
                    placeholder="Enter monthly income"
                    onBlur={(e) => {
                      if (!e.target.value) {
                        setFormData(prev => ({
                          ...prev,
                          monthlyIncome: '0'
                        }));
                      }
                    }}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Stock Option Level (0-3)</label>
                  <select
                    name="stockOptionLevel"
                    value={formData.stockOptionLevel}
                    onChange={handleInputChange}
                    className={inputClasses}
                  >
                    {[0, 1, 2, 3].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Details Card */}
          <Card className="dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Briefcase className="h-5 w-5" />
                Job Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className={labelClasses}>Overtime</label>
                  <select
                    name="overTime"
                    value={formData.overTime}
                    onChange={handleInputChange}
                    className={inputClasses}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Job Satisfaction (1-4)</label>
                  <select
                    name="jobSatisfaction"
                    value={formData.jobSatisfaction}
                    onChange={handleInputChange}
                    className={inputClasses}
                  >
                    {[1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Daily Rate</label>
                  <input
                    type="number"
                    name="dailyRate"
                    value={formData.dailyRate}
                    onChange={handleInputChange}
                    className={inputClasses}
                    min="0"
                  />
                </div>
                <div>
                  <label className={labelClasses}>Hourly Rate</label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    className={inputClasses}
                    min="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience & Tenure Card */}
          <Card className="dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Clock className="h-5 w-5" />
                Experience & Tenure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className={labelClasses}>Total Working Years</label>
                  <input
                    type="number"
                    name="totalWorkingYears"
                    value={formData.totalWorkingYears}
                    onChange={handleInputChange}
                    className={inputClasses}
                    min="0"
                  />
                </div>
                <div>
                  <label className={labelClasses}>Years at Company</label>
                  <input
                    type="number"
                    name="yearsAtCompany"
                    value={formData.yearsAtCompany}
                    onChange={handleInputChange}
                    className={inputClasses}
                    min="0"
                  />
                </div>
                <div>
                  <label className={labelClasses}>Years Since Last Promotion</label>
                  <input
                    type="number"
                    name="yearsSinceLastPromotion"
                    value={formData.yearsSinceLastPromotion}
                    onChange={handleInputChange}
                    className={inputClasses}
                    min="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {loading ? 'Processing...' : 'Predict Attrition Risk'}
          </button>
        </div>

        {error && (
          <div className="mt-8">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {loading && (
          <div className="mt-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Processing prediction...</p>
          </div>
        )}

        {showResult && predictionDetails && !loading && !error && (
          <div className="mt-8 space-y-4">
            <Alert variant={prediction === 'Yes' ? 'destructive' : 'success'}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Attrition Prediction Result</AlertTitle>
              <AlertDescription>
                {prediction === 'Yes' 
                  ? `High risk of attrition (${(predictionDetails.probability * 100).toFixed(1)}% probability). Consider implementing retention strategies.`
                  : `Low risk of attrition (${((1 - predictionDetails.probability) * 100).toFixed(1)}% retention probability). Employee shows positive retention indicators.`}
              </AlertDescription>
            </Alert>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors duration-200">
              <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Top Contributing Factors</h3>
              <ul className="space-y-3">
                {predictionDetails.top_factors.map((factor, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">{factor.factor.replace(/_/g, ' ')}</span>
                    <span className="text-gray-500 dark:text-gray-400">{(factor.importance * 100).toFixed(1)}% influence</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttritionPredictor;