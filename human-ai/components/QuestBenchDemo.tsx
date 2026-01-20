import React, { useState } from 'react';
import { QUEST_PROBLEMS } from '../constants';
import { QuestProblem } from '../types';

const MathVisualizer: React.FC<{ problem: QuestProblem; selectedOption: string | null }> = ({ selectedOption }) => (
  <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm md:text-base py-8">
    <div className="p-4 bg-white border border-slate-300 rounded-lg shadow-sm text-center min-w-[120px]">
      <div className="text-slate-500 text-xs mb-1">Target (Y)</div>
      <div className="font-bold text-slate-900">Current Eggs</div>
    </div>
    <div className="text-slate-400">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 5 12 12 19"></polyline></svg>
    </div>
    <div className="flex flex-col gap-2">
       <div className="p-3 bg-white border border-slate-300 rounded-lg shadow-sm font-mono text-center">
          (X + 5) - 3
       </div>
    </div>
    <div className="text-slate-400">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 5 12 12 19"></polyline></svg>
    </div>
    <div className={`p-4 rounded-lg shadow-sm text-center min-w-[120px] transition-colors duration-500 ${
      selectedOption === 'opt2' 
        ? 'bg-green-100 border border-green-300' 
        : 'bg-red-50 border border-red-200 border-dashed animate-pulse'
    }`}>
      <div className={`text-xs mb-1 ${selectedOption === 'opt2' ? 'text-green-700' : 'text-red-700'}`}>Variable X</div>
      <div className={`font-bold ${selectedOption === 'opt2' ? 'text-green-900' : 'text-red-900'}`}>
        {selectedOption === 'opt2' ? 'Initial Eggs' : '?'}
      </div>
    </div>
  </div>
);

const LogicVisualizer: React.FC<{ problem: QuestProblem; selectedOption: string | null }> = ({ selectedOption }) => {
  const isCorrect = selectedOption === 'opt_l_3';
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      <div className="flex-1 space-y-3">
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg shadow-sm">
          <h5 className="font-bold text-yellow-800 text-xs uppercase tracking-wider mb-2">Rules</h5>
          <ul className="text-sm space-y-1.5 text-yellow-900">
            <li>1. Smart → Jittery</li>
            <li>2. Strange & Jittery → Stubborn</li>
            <li className={`${isCorrect ? 'font-bold bg-yellow-100' : ''} transition-colors duration-300 rounded px-1 -mx-1`}>
              3. Jittery & Worried → Pleasant
            </li>
            <li>4. Pleasant → Worried</li>
          </ul>
        </div>
      </div>
      
      <div className="flex items-center text-slate-300 hidden md:block">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </div>

      <div className="flex-1 space-y-3">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm">
          <h5 className="font-bold text-blue-800 text-xs uppercase tracking-wider mb-2">Known Facts</h5>
          <ul className="text-sm space-y-1.5 text-blue-900">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>Alice is Smart</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>Alice is <span className="font-semibold">Not</span> Stubborn</li>
            <li className="pt-2 border-t border-blue-200 mt-2 text-slate-500 text-xs italic">
              Derived: Alice is Jittery
            </li>
          </ul>
        </div>
        
        <div className={`p-4 rounded-lg border shadow-sm transition-all duration-500 ${isCorrect ? 'bg-pink-100 border-pink-300' : 'bg-pink-50 border-pink-200'}`}>
          <h5 className="font-bold text-pink-800 text-xs uppercase tracking-wider mb-2">Goal Query</h5>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-pink-900">Is Alice Pleasant?</span>
            <div className={`px-2 py-1 rounded text-xs font-bold ${isCorrect ? 'bg-green-200 text-green-800' : 'bg-pink-200 text-pink-800'}`}>
              {isCorrect ? 'SOLVABLE' : 'UNK'}
            </div>
          </div>
          {isCorrect && (
            <div className="mt-2 text-xs text-pink-700 bg-pink-50/50 p-1.5 rounded animate-fade-in-up">
              Needs: "Worried"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PlanningVisualizer: React.FC<{ problem: QuestProblem; selectedOption: string | null }> = ({ selectedOption }) => {
  const isCorrect = selectedOption === 'opt_p_2';

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-around gap-8">
        {/* Initial State Visualization */}
        <div className="flex-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative">
           <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 text-center">Current State</h5>
           <div className="flex justify-center items-end gap-4 h-32 border-b-4 border-slate-700 pb-1">
              {/* Block A */}
              <div className="w-12 h-12 bg-blue-400 border-2 border-blue-600 rounded flex items-center justify-center font-bold text-white relative">
                A
                <div className="absolute -top-6 text-[10px] text-blue-600 font-mono bg-blue-50 px-1 rounded">Clear</div>
              </div>
              
              {/* Block B stack area */}
              <div className="relative">
                <div className="w-12 h-12 bg-pink-400 border-2 border-pink-600 rounded flex items-center justify-center font-bold text-white">
                   B
                </div>
                {/* Ambiguity Ghost */}
                <div className={`absolute bottom-full left-0 mb-1 w-12 h-12 border-2 border-dashed rounded flex items-center justify-center transition-all duration-300 ${isCorrect ? 'border-orange-400 bg-orange-50' : 'border-slate-300'}`}>
                   <span className={`text-2xl font-bold ${isCorrect ? 'text-orange-500' : 'text-slate-300'}`}>?</span>
                   {isCorrect && <div className="absolute -top-5 text-[10px] text-orange-600 whitespace-nowrap font-bold">Is D here?</div>}
                </div>
              </div>

               {/* Block C */}
               <div className="relative">
                <div className="w-12 h-12 bg-emerald-400 border-2 border-emerald-600 rounded flex items-center justify-center font-bold text-white">
                   C
                </div>
                {/* D is definitely not on C? Well, context says D is clear. */}
              </div>

               {/* Block D - if on table? We know D is clear. We don't know where it is. */}
               {!isCorrect && (
                 <div className="w-12 h-12 bg-orange-400 border-2 border-orange-600 rounded flex items-center justify-center font-bold text-white opacity-50">
                    D?
                 </div>
               )}
           </div>
        </div>

        <div className="flex items-center justify-center text-slate-300">
           <svg className="w-8 h-8 rotate-90 md:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </div>

        {/* Goal State */}
        <div className="flex-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm opacity-80">
           <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 text-center">Goal State</h5>
           <div className="flex justify-center items-end gap-4 h-32 border-b-4 border-slate-700 pb-1">
              <div className="relative">
                <div className="w-12 h-12 bg-blue-400 border-2 border-blue-600 rounded flex items-center justify-center font-bold text-white">A</div>
                <div className="absolute bottom-full mb-0.5 w-12 h-12 bg-pink-400 border-2 border-pink-600 rounded flex items-center justify-center font-bold text-white">B</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

const QuestBenchDemo: React.FC = () => {
  const [activeProblemIndex, setActiveProblemIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const problem = QUEST_PROBLEMS[activeProblemIndex];

  const handleSelect = (id: string) => {
    setSelectedOption(id);
  };

  const handleTabChange = (index: number) => {
    setActiveProblemIndex(index);
    setSelectedOption(null);
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">QuestBench: Reasoning with Missing Info</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            Reasoning isn't just about processing given facts. It's about identifying what is <em>not</em> given.
            We treat this as a <strong>Constraint Satisfaction Problem (CSP)</strong> where the agent must identify the minimal sufficient variable to ask about.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
             <a 
               href="https://arxiv.org/abs/2503.22674" 
               target="_blank" 
               rel="noreferrer"
               className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 hover:text-emerald-600 border border-slate-200 hover:border-emerald-200 rounded-lg text-sm font-semibold transition-all hover:shadow-sm"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
               Paper
             </a>
             <a 
               href="https://github.com/google-deepmind/questbench" 
               target="_blank" 
               rel="noreferrer"
               className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg text-sm font-semibold transition-all hover:shadow-sm"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
               Code
             </a>
             <a 
                href="https://huggingface.co/datasets/belindazli/QuestBench" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 hover:text-yellow-600 border border-slate-200 hover:border-yellow-200 rounded-lg text-sm font-semibold transition-all hover:shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                Dataset
              </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-slate-100 p-1 rounded-xl">
            {QUEST_PROBLEMS.map((prob, index) => (
              <button
                key={prob.id}
                onClick={() => handleTabChange(index)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeProblemIndex === index 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {prob.domain}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl shadow-xl border border-slate-200 overflow-hidden transition-all duration-300">
          {/* Problem Header */}
          <div className={`p-6 text-white transition-colors duration-500 ${
            problem.domain === 'Math' ? 'bg-slate-900' : 
            problem.domain === 'Logic' ? 'bg-indigo-900' : 
            'bg-slate-800'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2 py-1 text-xs font-bold rounded uppercase tracking-wide ${
                problem.domain === 'Math' ? 'bg-blue-500' :
                problem.domain === 'Logic' ? 'bg-indigo-500' : 'bg-emerald-500'
              }`}>
                {problem.domain}
              </span>
              <span className="text-slate-400 text-sm font-mono">ID: {problem.id}</span>
            </div>
            <p className="text-lg leading-relaxed font-light opacity-90">
              {problem.context}
            </p>
            <p className={`text-xl font-bold mt-5 pl-4 py-1 border-l-4 ${
              problem.domain === 'Math' ? 'border-blue-500 text-blue-100' :
              problem.domain === 'Logic' ? 'border-indigo-500 text-indigo-100' : 'border-emerald-500 text-emerald-100'
            }`}>
              Goal: {problem.underspecifiedPart}
            </p>
          </div>

          {/* Visualization of the Missing Link */}
          <div className="border-b border-slate-200 bg-slate-50/50">
            {problem.domain === 'Math' && <MathVisualizer problem={problem} selectedOption={selectedOption} />}
            {problem.domain === 'Logic' && <LogicVisualizer problem={problem} selectedOption={selectedOption} />}
            {problem.domain === 'Planning' && <PlanningVisualizer problem={problem} selectedOption={selectedOption} />}
          </div>

          {/* Options */}
          <div className="p-6 bg-white">
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Select the clarification question:</h4>
            <div className="space-y-3">
              {problem.options.map((option) => {
                const isSelected = selectedOption === option.id;
                let containerClass = "border-slate-200 hover:border-blue-300 hover:bg-slate-50";
                
                if (isSelected) {
                  containerClass = option.isCorrect 
                    ? "border-green-500 bg-green-50 ring-1 ring-green-500" 
                    : "border-red-500 bg-red-50 ring-1 ring-red-500";
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${containerClass}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected 
                          ? (option.isCorrect ? 'border-green-600 bg-green-600' : 'border-red-600 bg-red-600') 
                          : 'border-slate-300'
                      }`}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <div>
                        <div className={`font-medium ${isSelected ? (option.isCorrect ? 'text-green-900' : 'text-red-900') : 'text-slate-800'}`}>
                          {option.text}
                        </div>
                        {isSelected && (
                          <div className={`mt-2 text-sm ${option.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            {option.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestBenchDemo;