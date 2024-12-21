# Employee Attrition Predictor
#### A Data-Driven ML-Based Web Application

## Course Information
- **Course**: Database Systems (CSCI-GA.2433-001)
- **Instructor**: Jean-Claude Franchitti
- **Semester**: Fall 2024
- **Institution**: New York University, Courant Institute of Mathematical Sciences

## Team Members
| Name | NetID | NYU ID |
|------|--------|---------|
| Dedeepya Guntaka | dg4489 | N18304471 |
| Shivam Dheer | sd6080 | N18103074 |
| Varun Putta | vsp7221 | N10489122 |

## Project Overview
The Employee Attrition Predictor is a comprehensive web application that helps organizations identify and manage employee attrition risks. Using machine learning and data analytics, the system processes various employee metrics to predict the likelihood of attrition and provides actionable insights for HR managers.

### Key Features
- Interactive web interface with dark/light mode
- Real-time attrition risk prediction
- Detailed analysis of contributing factors
- Color-coded risk indicators
- Responsive design for all devices

## Technical Stack
- Frontend: React.js, Tailwind CSS
- Backend: Flask (Python)
- ML Model: XGBoost Classifier
- Additional Libraries: Pandas, NumPy, scikit-learn

## Installation and Setup

### Prerequisites
- Node.js (v18 or higher)
- Python 3.10 or higher
- Git

### Frontend Setup
```bash
# Navigate to project directory
cd final-website

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# For Windows:
venv\Scripts\activate
# For macOS/Linux:
source venv/bin/activate

# Install required packages
pip install -r requirements.txt

# Run Flask server
python app.py
```

## Usage Guide
1. Start both frontend and backend servers as described above
2. Access the application at `http://localhost:5173`
3. Enter employee details in the provided form:
   - Personal Information (Age, Education)
   - Compensation Details (Monthly Income, Stock Options)
   - Job Details (Overtime, Satisfaction)
   - Experience Metrics (Years at Company, etc.)
4. Click "Predict Attrition Risk" to view results
5. Review prediction results and contributing factors

## Project Structure
```
final-website/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── alert.jsx
│   │   │   └── card.jsx
│   │   ├── AttritionPredictor.jsx
│   │   ├── Footer.jsx
│   │   └── ThemeToggle.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   └── lib/
│       └── utils.js
├── backend/
│   ├── app.py
│   └── requirements.txt
└── README.md
```

## Additional Notes
- The system uses hardcoded prediction logic for demonstration purposes
- Frontend includes dark mode support for better accessibility
- All data processing is done in real-time with no persistent storage

## Contributing
This project was developed as part of the Database Systems course at NYU. For any queries or issues, please contact the team members.

## License
This project is for educational purposes only. All rights reserved.
