import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sliderbar';
import Home from './pages/Home';
import Crops from './pages/Crops';
import CropDetail from './components/crops/cropDetail';
import Guides from './pages/Guides';
import GuideDetail from './components/guides/GuideDeatail';
import Diagnosis from './pages/Diagnosis';
import Learning from './pages/Learning';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  useEffect(() => {
    // Initialize any global services or analytics here
  }, []);

  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 bg-gray-50">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/crops" element={<ProtectedRoute><Crops /></ProtectedRoute>} />
                  <Route path="/crops/:id" element={<ProtectedRoute><CropDetail /></ProtectedRoute>} />
                  <Route path="/guides" element={<ProtectedRoute><Guides /></ProtectedRoute>} />
                  <Route path="/guides/:id" element={<ProtectedRoute><GuideDetail /></ProtectedRoute>} />
                  <Route path="/diagnosis" element={<ProtectedRoute><Diagnosis /></ProtectedRoute>} />
                  <Route path="/learning" element={<ProtectedRoute><Learning /></ProtectedRoute>} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                </Routes>
              </main>
            </div>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
