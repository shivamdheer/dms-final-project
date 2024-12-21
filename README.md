# Employee Attrition Predictor

### A Data-Driven Machine Learning Web Application

---

## **Course Information**
- **Course**: Database Systems (CSCI-GA.2433-001)
- **Instructor**: Jean-Claude Franchitti
- **Semester**: Fall 2024
- **Institution**: New York University, Courant Institute of Mathematical Sciences

---

## **Team Members**
| Name              | NetID   | NYU ID     |
|-------------------|---------|------------|
| Dedeepya Guntaka  | dg4489  | N18304471  |
| Shivam Dheer      | sd6080  | N18103074  |
| Varun Putta       | vsp7221 | N10489122  |

---

## **Project Overview**
The **Employee Attrition Predictor** is a comprehensive web application designed to assist organizations in identifying employees at risk of attrition. By leveraging machine learning models and data analytics, this system predicts the likelihood of employee turnover and provides actionable insights to help HR teams develop effective retention strategies.

### **Key Features**
- **Interactive User Interface**: Includes light and dark mode options for enhanced accessibility and user comfort.
- **Real-Time Predictions**: Delivers immediate attrition risk assessments based on user inputs.
- **Detailed Contributing Factors**: Highlights key factors influencing the prediction (e.g., income, job satisfaction).
- **Color-Coded Risk Indicators**: Clear visual cues for low, medium, and high attrition risks.
- **Responsive Design**: Optimized for use on desktops, tablets, and mobile devices.

---

## **Technical Stack**
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Flask (Python)
- **Machine Learning Model**: XGBoost Classifier
- **Additional Libraries**: Pandas, NumPy, scikit-learn, Axios
- **Version Control**: Git and GitHub

---

## **Installation and Setup**

### **Prerequisites**
Ensure the following are installed on your system:
- Node.js (v18 or higher)
- Python (v3.10 or higher)
- Git

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd final-website
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### **Backend Setup**
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   - **Windows**:
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - **macOS/Linux**:
     ```bash
     python -m venv venv
     source venv/bin/activate
     ```
3. Install the required Python libraries:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Flask server:
   ```bash
   python app.py
   ```

---

## **Usage Guide**
1. Start both the frontend and backend servers as described above.
2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```
3. Use the form to enter employee details in the following categories:
   - **Personal Information**: Age, Education Level.
   - **Compensation Details**: Monthly Income, Stock Options.
   - **Job Details**: Overtime Status, Job Satisfaction.
   - **Experience Metrics**: Years at Company, Total Working Years, etc.
4. Click the **"Predict Attrition Risk"** button.
5. Review the prediction results, including the likelihood of attrition and the top contributing factors.

---

## **Project Structure**
The project directory is structured as follows:

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

---

## **Additional Notes**
- The machine learning model currently uses pre-defined logic for demonstration purposes but can be extended for real-world datasets.
- Frontend features include seamless theme toggling and responsive layouts for accessibility.
- All data processing is done in real-time, with no persistent storage to ensure privacy and security.

---

## **Contributing**
This project was developed as part of the Database Systems course at NYU. Contributions are welcome to extend or improve the system. For queries or issues, please contact any of the team members.

---

## **License**
This project is licensed for educational use only. Redistribution or use beyond this scope is not permitted without prior authorization.

---

## **Resource Links**
- **Original Dataset**: [Dataset on Kaggle]([https://www.kaggle.com/](https://www.kaggle.com/datasets/rishikeshkonapure/hr-analytics-prediction)) 
- **GitHub Repository**: [GitHub Repo]([https://github.com/](https://github.com/shivamdheer/dms-final-project)) 

