import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// Pages
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { AssessmentPage } from '@/pages/AssessmentPage';
import { StudyPlanPage } from '@/pages/StudyPlanPage';
import { PracticePage } from '@/pages/PracticePage';
import { ReviewPage } from '@/pages/ReviewPage';
import { MockTestPage } from '@/pages/MockTestPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { AITutorPage } from '@/pages/AITutorPage';
import { ProfilePage } from '@/pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/study-plan" element={<StudyPlanPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/practice/:topicId" element={<PracticePage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/mock-tests" element={<MockTestPage />} />
          <Route path="/mock-tests/:testId" element={<MockTestPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/ai-tutor" element={<AITutorPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
