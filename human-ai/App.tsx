import React from 'react';
import Hero from './components/Hero';
import UnifiedTheory from './components/UnifiedTheory';
import BeliefGraphDemo from './components/BeliefGraphDemo';
import QuestBenchDemo from './components/QuestBenchDemo';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Hero />
      <UnifiedTheory />
      
      <div id="proact">
        <BeliefGraphDemo />
      </div>
      
      <div id="questbench">
        <QuestBenchDemo />
      </div>
      
      <Footer />
    </div>
  );
};

export default App;