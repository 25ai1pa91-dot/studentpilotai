import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './components/ui/ToastProvider';
import { ErrorBoundary } from './components/feedback/ErrorBoundary';
import { DashboardLayout } from './components/layout/DashboardLayout';
import SkillGalaxyPage from './pages/SkillGalaxyPage';
import UniverseMapPage from './pages/UniverseMapPage';
import CampaignPage from './pages/CampaignPage';
import TodayPage from './pages/TodayPage';
import PlanPage from './pages/PlanPage';
import ProgressPage from './pages/ProgressPage';
import GapReportPage from './pages/GapReportPage';
import MentorPage from './pages/MentorPage';
import CareerJourneyPage from './pages/CareerJourneyPage';
import LearningWorkspacePage from './pages/LearningWorkspacePage';
import PracticeWorkspacePage from './pages/PracticeWorkspacePage';
import ResourceLibraryPage from './pages/ResourceLibraryPage';
import NotesSystemPage from './pages/NotesSystemPage';
import BookmarksPage from './pages/BookmarksPage';
import RevisionEnginePage from './pages/RevisionEnginePage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import PortfolioBuilderPage from './pages/PortfolioBuilderPage';
import MockInterviewPage from './pages/MockInterviewPage';
import CareerPage from './pages/CareerPage';
import AssessmentPage from './pages/AssessmentPage';
import ContestPage from './pages/ContestPage';
import LeaderboardPage from './pages/LeaderboardPage';
import PlacementPage from './pages/PlacementPage';
import AdminPage from './pages/AdminPage';
import { MissionEngine } from './components/mission/MissionEngine';
import { SplashScreen } from './pages/auth/SplashScreen';
import { WelcomePage } from './pages/auth/WelcomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { OTPVerificationPage } from './pages/auth/OTPVerificationPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { ProfileSetupPage } from './pages/auth/ProfileSetupPage';
import { OnboardingPage } from './pages/auth/OnboardingPage';
import { AIAnalysisScreen } from './pages/auth/AIAnalysisScreen';
import { useAuthStore } from './store/useAuthStore';

export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/welcome');
  const [showSplash, setShowSplash] = useState(true);
  const [showAiAnalysis, setShowAiAnalysis] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (window.location.pathname !== currentPath) {
      window.history.pushState(null, '', currentPath);
    }
  }, [currentPath]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    if (window.location.pathname === '/' && (!isAuthenticated || !user?.isOnboarded)) {
      setCurrentPath('/welcome');
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (showAiAnalysis) {
    return (
      <AIAnalysisScreen
        onComplete={() => {
          setShowAiAnalysis(false);
          setCurrentPath('/campaign');
        }}
      />
    );
  }

  const renderCurrentPage = () => {
    if (currentPath.startsWith('/mission/')) {
      const parts = currentPath.split('/');
      const skillId = parts[2] || 'html';
      const missionId = parts[3] || '1';
      return <MissionEngine skillId={skillId} missionId={missionId} />;
    }

    if (currentPath.startsWith('/universe/') || (currentPath.startsWith('/galaxy/') && currentPath !== '/galaxy')) {
      return <UniverseMapPage />;
    }

    switch (currentPath) {
      case '/':
      case '/welcome':
        return <WelcomePage onNavigate={setCurrentPath} />;
      case '/campaign':
        return <CampaignPage />;
      case '/login':
        return <LoginPage onNavigate={setCurrentPath} />;
      case '/signup':
        return <SignupPage onNavigate={setCurrentPath} />;
      case '/forgot-password':
        return <ForgotPasswordPage onNavigate={setCurrentPath} />;
      case '/verify-otp':
        return <OTPVerificationPage onNavigate={setCurrentPath} />;
      case '/reset-password':
        return <ResetPasswordPage onNavigate={setCurrentPath} />;
      case '/profile-setup':
        return <ProfileSetupPage onNavigate={setCurrentPath} />;
      case '/onboarding':
        return (
          <OnboardingPage
            onNavigate={setCurrentPath}
            onCompleteOnboarding={() => setShowAiAnalysis(true)}
          />
        );
      case '/galaxy':
        return <SkillGalaxyPage />;
      case '/journey':
      case '/roadmap':
        return <CareerJourneyPage />;
      case '/learn':
        return <LearningWorkspacePage />;
      case '/practice':
        return <PracticeWorkspacePage />;
      case '/resources':
        return <ResourceLibraryPage />;
      case '/notes':
        return <NotesSystemPage />;
      case '/bookmarks':
        return <BookmarksPage />;
      case '/revision':
        return <RevisionEnginePage />;
      case '/resume':
        return <ResumeBuilderPage />;
      case '/portfolio':
        return <PortfolioBuilderPage />;
      case '/interview':
      case '/mock-interview':
        return <MockInterviewPage />;
      case '/assessment':
        return <AssessmentPage />;
      case '/contest':
        return <ContestPage />;
      case '/leaderboard':
        return <LeaderboardPage />;
      case '/placement':
        return <PlacementPage />;
      case '/admin':
        return <AdminPage />;
      case '/career':
      case '/jobs':
      case '/internships':
      case '/applications':
      case '/job-recommendations':
        return <CareerPage />;
      case '/today':
        return <TodayPage />;
      case '/plan':
        return <PlanPage />;
      case '/progress':
        return <ProgressPage />;
      case '/gap-report':
        return <GapReportPage />;
      case '/mentor':
        return <MentorPage />;
      default:
        return <WelcomePage onNavigate={setCurrentPath} />;
    }
  };

  const isAuthRoute = [
    '/',
    '/welcome',
    '/login',
    '/signup',
    '/forgot-password',
    '/verify-otp',
    '/reset-password',
    '/profile-setup',
    '/onboarding',
  ].includes(currentPath);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        {isAuthRoute ? (
          renderCurrentPage()
        ) : (
          <DashboardLayout currentPath={currentPath} onNavigate={setCurrentPath}>
            {renderCurrentPage()}
          </DashboardLayout>
        )}
        <ToastProvider />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
