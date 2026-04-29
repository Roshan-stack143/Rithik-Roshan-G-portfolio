import { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { LoginScreen } from './components/LoginScreen';
import { TransitionScreen } from './components/TransitionScreen';
import { Portfolio } from './components/Portfolio';
import { defaultProfile, UserProfile } from './types';

type AppState = 'loading' | 'login' | 'transition' | 'portfolio';

export default function App() {
  const [appState, setAppState] = useState<AppState>('loading');
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const handleUpdateProfile = (data: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  return (
    <>
      {appState === 'loading' && (
        <LoadingScreen onComplete={() => setAppState('login')} />
      )}
      
      {appState === 'login' && (
        <LoginScreen onComplete={() => setAppState('transition')} />
      )}
      
      {appState === 'transition' && (
        <TransitionScreen onComplete={() => setAppState('portfolio')} />
      )}
      
      {appState === 'portfolio' && (
        <Portfolio 
          profile={profile} 
          onUpdateProfile={handleUpdateProfile} 
        />
      )}
    </>
  );
}
