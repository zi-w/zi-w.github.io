import React from 'react';
import { HERO_TITLE, HERO_SUBTITLE } from '../constants';

const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white pt-20 pb-24 px-4 border-b border-slate-100 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-full text-sm font-medium transition-transform hover:scale-105 cursor-default shadow-sm">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          Research Showcase
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
          {HERO_TITLE}
        </h1>
        
        <p className="text-xl text-slate-500 leading-relaxed font-light mb-12 max-w-3xl mx-auto">
          {HERO_SUBTITLE}
        </p>

        {/* Buttons Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          {/* Main CTA - Proactive Co-creator */}
          <a 
            href="https://aistudio.google.com/apps/bundled/proactive_co_creator?showAssistant=true&showPreview=true" 
            target="_blank" 
            rel="noreferrer"
            className="group relative px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-3 overflow-hidden"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient"></div>
            
            <span className="relative z-10 flex items-center gap-2">
              Try Proactive Co-creator
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </span>
          </a>

          {/* Secondary Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href="#proact" 
              onClick={(e) => scrollToSection(e, 'proact')}
              className="px-6 py-4 bg-white text-slate-700 hover:text-blue-700 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl text-lg font-semibold transition-all hover:shadow-md flex items-center justify-center gap-2 min-w-[200px] cursor-pointer"
            >
              Explore Proactive Agents
              <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </a>
            <a 
              href="#questbench" 
              onClick={(e) => scrollToSection(e, 'questbench')}
              className="px-6 py-4 bg-white text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 rounded-xl text-lg font-semibold transition-all hover:shadow-md flex items-center justify-center gap-2 min-w-[180px] cursor-pointer"
            >
              Try QuestBench
              <svg className="w-5 h-5 text-slate-400 group-hover:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;