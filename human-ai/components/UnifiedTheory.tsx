import React from 'react';

const UnifiedTheory: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-8 text-slate-900 tracking-tight">
            The Core Challenge: <span className="gradient-text">Underspecification</span>
          </h2>
          <div className="prose prose-lg text-slate-600 leading-relaxed">
            <p className="mb-6">
              Research in Human-AI interaction often treats "intent" as a static input. However, human prompts are frequently underspecified. A request like <em>"Show me a breakfast"</em> contains thousands of hidden variables.
            </p>
            <p className="mb-4">
              Our research unifies two powerful concepts to solve this through <strong>Clarification</strong>:
            </p>
            <ul className="list-none space-y-4">
              <li className="pl-4 border-l-2 border-blue-500">
                <strong className="text-slate-900 block">1. Belief Graphs (Uncertainty)</strong> 
                Representing the AI's understanding as a probabilistic distribution. High entropy distributions signal <em>ambiguity</em> that needs resolution.
              </li>
              <li className="pl-4 border-l-2 border-emerald-500">
                <strong className="text-slate-900 block">2. Constraint Satisfaction (Necessity)</strong> 
                Formalizing reasoning tasks to identify <em>missing variables</em> required to solve the problem (e.g., finding X to solve for Y).
              </li>
            </ul>
            <p className="mt-6 text-slate-800 font-medium">
              By combining these, the agent can identify exactly <em>what</em> it doesn't know and ask the <em>right</em> question to align with the user's mental model.
            </p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100">
          <h3 className="text-xl font-semibold mb-8 text-center text-slate-800">Two Views of Uncertainty</h3>
          <div className="space-y-8">
            {/* View 1: Probabilistic */}
            <div className="relative group p-6 bg-slate-50 hover:bg-blue-50/50 rounded-2xl transition-colors cursor-default border border-slate-200/60">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-blue-700">The Generative View</span>
                <span className="text-xs font-bold font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded-md uppercase tracking-wider">Belief Graph</span>
              </div>
              <p className="text-sm text-slate-600 mb-4 italic">
                "I'm 40% sure you want American cuisine, but 20% sure you want Indian."
              </p>
              <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
                <div className="h-full bg-blue-500 w-[40%]"></div>
                <div className="h-full bg-indigo-400 w-[20%]"></div>
                <div className="h-full bg-slate-300 w-[40%]"></div>
              </div>
              <div className="mt-2 flex justify-between text-xs font-medium text-slate-500">
                <span className="text-blue-600">American</span>
                <span className="text-indigo-500">Indian</span>
                <span>Uncertain</span>
              </div>
            </div>

            {/* View 2: CSP */}
            <div className="relative group p-6 bg-slate-50 hover:bg-emerald-50/50 rounded-2xl transition-colors cursor-default border border-slate-200/60">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-emerald-700">The Reasoning View</span>
                <span className="text-xs font-bold font-mono bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md uppercase tracking-wider">CSP</span>
              </div>
              <p className="text-sm text-slate-600 mb-4 italic">
                "I have constraints A and B, but I am missing variable X to solve for Y."
              </p>
              <div className="flex items-center justify-center gap-3 font-mono text-base text-slate-700 bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
                <span className="bg-slate-100 px-2 py-1 rounded">Y</span>
                <span className="text-slate-400">=</span>
                <span className="bg-emerald-100 px-3 py-1 rounded text-emerald-800 font-bold animate-pulse">?</span>
                <span className="text-slate-400">+</span>
                <span>5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnifiedTheory;