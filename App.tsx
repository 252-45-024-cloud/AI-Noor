import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ScholarChat from './components/ScholarChat';
import MediaStudio from './components/MediaStudio';
import LiveConversation from './components/LiveConversation';
import AudioTools from './components/AudioTools';
import QuranBrowser from './components/QuranBrowser';
import HadithBrowser from './components/HadithBrowser';
import TafsirReader from './components/TafsirReader';
import LoginScreen from './components/LoginScreen';
import { AppView, UI_TRANSLATIONS } from './types';
import { useApp } from './contexts/AppContext';

const App: React.FC = () => {
  const { isLoggedIn, settings } = useApp();
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const t = UI_TRANSLATIONS[settings.language];

  // Handle Dark Mode Class on Body/HTML
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  const renderView = () => {
    switch (activeView) {
      case AppView.DASHBOARD:
        return <Dashboard setActiveView={setActiveView} />;
      case AppView.SCHOLAR_CHAT:
        return <ScholarChat />;
      case AppView.QURAN:
        return <QuranBrowser />;
      case AppView.HADITH:
        return <HadithBrowser />;
      case AppView.TAFSIR:
        return <TafsirReader />;
      case AppView.MEDIA_ANALYSIS:
        return <MediaStudio />; 
      case AppView.LIVE_CONVERSATION:
        return <LiveConversation />;
      case AppView.AUDIO_TOOLS:
        return <AudioTools />;
      default:
        return <Dashboard setActiveView={setActiveView} />;
    }
  };

  return (
    <div className={`flex h-screen w-full overflow-hidden bg-stone-50 dark:bg-stone-900 font-arabic transition-colors`}>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={(view) => {
          setActiveView(view);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 h-full relative flex flex-col w-full">
         {/* Mobile Header */}
         <div className="md:hidden p-4 bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 flex items-center justify-between shrink-0 shadow-sm z-10">
             <button 
               onClick={() => setIsSidebarOpen(true)}
               className="p-2 -ml-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700"
             >
               <span className="material-icons text-2xl">menu</span>
             </button>
             <span className="font-bold text-lg text-emerald-800 dark:text-emerald-400">{t.appTitle}</span>
             <div className="w-8" /> {/* Spacer for centering */}
         </div>

         {/* Content Area */}
         <div className="flex-1 overflow-hidden relative">
            {renderView()}
         </div>
      </main>
      
      {/* Google Material Icons CDN */}
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    </div>
  );
};

export default App;