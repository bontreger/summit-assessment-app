import { Route, Routes, Navigate } from 'react-router-dom';
import { AssessmentProvider } from './context/AssessmentContext';
import { SettingsProvider } from './context/SettingsContext';
import { AppLayout } from './components/AppLayout';
import { AssessmentPage } from './components/AssessmentPage';
import { ResultsPage } from './components/ResultsPage';
import { SettingsPage } from './components/SettingsPage';

export function App() {
  return (
    <SettingsProvider>
      <AssessmentProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/assessments/automation-maturity" replace />} />
            <Route path="assessments/:assessmentId" element={<AssessmentPage />} />
            <Route path="assessments/:assessmentId/results" element={<ResultsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </AssessmentProvider>
    </SettingsProvider>
  );
}
