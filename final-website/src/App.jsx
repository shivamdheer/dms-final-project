import { ThemeProvider } from './context/ThemeContext';
import AttritionPredictor from './components/AttritionPredictor';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <AttritionPredictor />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;