import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8">Relevant Research</h2>
        <div className="space-y-8">
          
          <div className="border-l-2 border-blue-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Proactive Agents for Multi-Turn Text-to-Image Generation Under Uncertainty
            </h3>
            <p className="mb-2 text-sm leading-relaxed">
              Meera Hahn, Wenjun Zeng, Nithish Kannen, Rich Galt, Kartikeya Badola, Been Kim, Zi Wang.
              <br/>
              <em>International Conference on Machine Learning (ICML), 2025</em>
            </p>
            <div className="flex gap-4 text-sm font-medium">
              <a href="https://arxiv.org/abs/2412.06771" className="text-blue-400 hover:text-blue-300" target="_blank" rel="noreferrer">PDF</a>
              <a href="https://github.com/google-deepmind/proactive_t2i_agents" className="text-blue-400 hover:text-blue-300" target="_blank" rel="noreferrer">Code</a>
            </div>
          </div>

          <div className="border-l-2 border-emerald-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              QuestBench: Can LLMs ask the right question to acquire information in reasoning tasks?
            </h3>
            <p className="mb-2 text-sm leading-relaxed">
              Belinda Z. Li, Been Kim, Zi Wang.
              <br/>
              <em>Neural Information Processing Systems (NeurIPS 2025) Track on Datasets and Benchmarks</em>
            </p>
            <div className="flex gap-4 text-sm font-medium">
              <a href="https://arxiv.org/abs/2503.22674" className="text-emerald-400 hover:text-emerald-300" target="_blank" rel="noreferrer">PDF</a>
              <a href="https://github.com/google-deepmind/questbench" className="text-emerald-400 hover:text-emerald-300" target="_blank" rel="noreferrer">Code</a>
            </div>
          </div>

        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-sm">
          <p>© 2026 Zi Wang. Research visualization created for demonstration purposes. This page is created with Google AI Studio.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;