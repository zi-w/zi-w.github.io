import React, { useState, useRef, useEffect } from 'react';
import { BeliefNode, EntityType } from '../types';
import { INITIAL_BELIEF_GRAPH } from '../constants';

// Detailed Scenarios with adapted probabilities including Video Attributes
const SCENARIOS: Record<string, BeliefNode[]> = {
  'American': [
    {
      id: 'meal',
      label: 'Meal',
      type: EntityType.EXPLICIT,
      probability: 1.0,
      attributes: [
        { name: 'Cuisine', distribution: [{ value: 'American', probability: 1.0 }], lockedValue: 'American' }
      ]
    },
    {
      id: 'drink',
      label: 'Drink',
      type: EntityType.IMPLICIT,
      probability: 0.95,
      attributes: [
        { name: 'Type', distribution: [{ value: 'Coffee', probability: 0.5 }, { value: 'Orange Juice', probability: 0.4 }, { value: 'Tea', probability: 0.1 }] }
      ]
    },
    {
      id: 'utensils',
      label: 'Utensils',
      type: EntityType.IMPLICIT,
      probability: 1.0,
      attributes: [
        { name: 'Main Tool', distribution: [{ value: 'Fork/Knife', probability: 0.95 }, { value: 'Spoon', probability: 0.05 }] }
      ]
    },
    {
      id: 'video',
      label: 'Video',
      type: EntityType.BACKGROUND,
      probability: 1.0,
      attributes: [
        { name: 'Lighting', distribution: [{ value: 'Bright Morning', probability: 0.8 }, { value: 'Warm Indoor', probability: 0.2 }] }
      ]
    }
  ],
  'Chinese': [
    {
      id: 'meal',
      label: 'Meal',
      type: EntityType.EXPLICIT,
      probability: 1.0,
      attributes: [
        { name: 'Cuisine', distribution: [{ value: 'Chinese', probability: 1.0 }], lockedValue: 'Chinese' }
      ]
    },
    {
      id: 'drink',
      label: 'Drink',
      type: EntityType.IMPLICIT,
      probability: 0.95,
      attributes: [
        { name: 'Type', distribution: [{ value: 'Tea', probability: 0.7 }, { value: 'Soy Milk', probability: 0.25 }, { value: 'Water', probability: 0.05 }] }
      ]
    },
    {
      id: 'utensils',
      label: 'Utensils',
      type: EntityType.IMPLICIT,
      probability: 1.0,
      attributes: [
        { name: 'Main Tool', distribution: [{ value: 'Chopsticks', probability: 0.9 }, { value: 'Spoon', probability: 0.1 }] }
      ]
    },
    {
      id: 'video',
      label: 'Video',
      type: EntityType.BACKGROUND,
      probability: 1.0,
      attributes: [
        { name: 'Lighting', distribution: [{ value: 'Soft/Steam', probability: 0.7 }, { value: 'Bright', probability: 0.3 }] }
      ]
    }
  ],
  'Indian': [
    {
      id: 'meal',
      label: 'Meal',
      type: EntityType.EXPLICIT,
      probability: 1.0,
      attributes: [
        { name: 'Cuisine', distribution: [{ value: 'Indian', probability: 1.0 }], lockedValue: 'Indian' }
      ]
    },
    {
      id: 'drink',
      label: 'Drink',
      type: EntityType.IMPLICIT,
      probability: 0.9,
      attributes: [
        { name: 'Type', distribution: [{ value: 'Chai', probability: 0.6 }, { value: 'Lassi', probability: 0.3 }, { value: 'Water', probability: 0.1 }] }
      ]
    },
    {
      id: 'utensils',
      label: 'Utensils',
      type: EntityType.IMPLICIT,
      probability: 1.0,
      attributes: [
        { name: 'Main Tool', distribution: [{ value: 'Hands', probability: 0.6 }, { value: 'Spoon', probability: 0.3 }, { value: 'Fork', probability: 0.1 }] }
      ]
    },
    {
      id: 'video',
      label: 'Video',
      type: EntityType.BACKGROUND,
      probability: 1.0,
      attributes: [
        { name: 'Lighting', distribution: [{ value: 'Vibrant', probability: 0.8 }, { value: 'Natural', probability: 0.2 }] }
      ]
    }
  ],
  'European': [
    {
      id: 'meal',
      label: 'Meal',
      type: EntityType.EXPLICIT,
      probability: 1.0,
      attributes: [
        { name: 'Cuisine', distribution: [{ value: 'European', probability: 1.0 }], lockedValue: 'European' }
      ]
    },
    {
      id: 'drink',
      label: 'Drink',
      type: EntityType.IMPLICIT,
      probability: 0.95,
      attributes: [
        { name: 'Type', distribution: [{ value: 'Espresso', probability: 0.5 }, { value: 'Juice', probability: 0.3 }, { value: 'Tea', probability: 0.2 }] }
      ]
    },
    {
      id: 'utensils',
      label: 'Utensils',
      type: EntityType.IMPLICIT,
      probability: 1.0,
      attributes: [
        { name: 'Main Tool', distribution: [{ value: 'Fork/Knife', probability: 0.9 }, { value: 'Spoon', probability: 0.1 }] }
      ]
    },
    {
      id: 'video',
      label: 'Video',
      type: EntityType.BACKGROUND,
      probability: 1.0,
      attributes: [
        { name: 'Lighting', distribution: [{ value: 'Golden Hour', probability: 0.6 }, { value: 'Bright', probability: 0.4 }] }
      ]
    }
  ]
};

interface ChatOption {
  value: string;
  label: string;
}

interface ChatMessage {
  id: number;
  role: 'user' | 'agent';
  text: string;
  options?: ChatOption[]; // If present, user must choose one
  selectedOption?: string; // Which one the user picked
}

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: 1, role: 'user', text: "Generate a video of a delicious breakfast." },
  { 
    id: 2, 
    role: 'agent', 
    text: "Which type of cuisine is the breakfast?", 
    options: [
      { value: 'American', label: 'American' },
      { value: 'Chinese', label: 'Chinese' },
      { value: 'Indian', label: 'Indian' },
      { value: 'European', label: 'European' }
    ]
  }
];

const BeliefGraphDemo: React.FC = () => {
  const [beliefState, setBeliefState] = useState<BeliefNode[]>(INITIAL_BELIEF_GRAPH);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleRestart = () => {
    setMessages(INITIAL_MESSAGES);
    setBeliefState(INITIAL_BELIEF_GRAPH);
  };

  const handleOptionClick = (msgId: number, option: ChatOption) => {
    if (messages.find(m => m.id === msgId)?.selectedOption) return;

    // 1. Mark option as selected
    setMessages(prev => prev.map(m => 
      m.id === msgId ? { ...m, selectedOption: option.value } : m
    ));

    // 2. Add user response
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: option.label }]);

    // 3. Update Belief Graph based on scenario
    if (SCENARIOS[option.value]) {
      setBeliefState(SCENARIOS[option.value]);
      
      // 4. Agent confirms
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          role: 'agent', 
          text: `Got it. I've updated the belief probabilities. Notice how 'Drink', 'Utensils' and 'Video' adapted to the ${option.value} context.` 
        }]);
      }, 600);
    }
  };

  const getEntityColor = (type: EntityType) => {
    switch (type) {
      case EntityType.EXPLICIT: return 'bg-blue-50 border-blue-200 text-blue-900';
      case EntityType.IMPLICIT: return 'bg-purple-50 border-purple-200 text-purple-900 border-dashed';
      case EntityType.BACKGROUND: return 'bg-slate-50 border-slate-200 text-slate-600';
    }
  };

  return (
    <section className="py-16 px-4 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold mb-3 tracking-wide uppercase">Interactive Demo</div>
          <h2 className="text-4xl font-bold mb-4 text-slate-900">Proactive Agents</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            Standard agents often make assumptions when faced with ambiguity. Our <strong>Proactive Agents</strong> instead maintain a probabilistic 
            Belief Graph to track uncertainty, asking targeted questions to resolve critical unknowns.
          </p>

          <div className="flex justify-center gap-4">
            <a 
              href="https://arxiv.org/abs/2412.06771" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-200 rounded-lg text-sm font-semibold transition-all hover:shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              Paper
            </a>
            <a 
              href="https://github.com/google-deepmind/proactive_t2i_agents" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg text-sm font-semibold transition-all hover:shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              Code
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Left: Chat Interface */}
          <div className="lg:col-span-5 flex flex-col h-full min-h-[500px] bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
            <div className="bg-white/80 backdrop-blur-md p-4 border-b border-slate-100 absolute top-0 w-full z-10 flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <span className="font-semibold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Agent Chat
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider hidden sm:inline-block">
                  Interact to see belief updates
                </span>
              </div>
              <button 
                onClick={handleRestart}
                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200"
                title="Restart conversation"
                aria-label="Restart conversation"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 21h5v-5"></path></svg>
              </button>
            </div>
            
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 pt-16 pb-4 bg-slate-50/50"
            >
              {messages.map((msg) => {
                // Special rendering for clarification questions
                if (msg.role === 'agent' && msg.options) {
                  return (
                    <div key={msg.id} className="animate-fade-in-up my-4">
                      <h3 className="text-base font-bold text-slate-900 mb-3 px-1 leading-snug">
                        {msg.text}
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {msg.options.map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => handleOptionClick(msg.id, opt)}
                            disabled={!!msg.selectedOption}
                            className={`text-center px-3 py-2.5 rounded-lg border transition-all duration-200 group ${
                              msg.selectedOption === opt.value
                                ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-inner'
                                : msg.selectedOption
                                  ? 'bg-slate-50 border-slate-200 text-slate-400 opacity-50 cursor-not-allowed'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5'
                            }`}
                          >
                            <span className="text-sm font-medium">{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }

                // Standard bubbles for other messages
                return (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-slate-900 text-white rounded-br-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Belief Graph Viz */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl border border-slate-100 p-6 flex flex-col h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 shrink-0">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Belief State</h3>
                <p className="text-xs text-slate-500 mt-0.5">Distributions over hidden variables</p>
              </div>
              
              <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5 px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Explicit
                </span>
                <span className="flex items-center gap-1.5 px-1.5 py-0.5 bg-purple-50 text-purple-700 rounded border border-purple-100 border-dashed">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> Implicit
                </span>
                <span className="flex items-center gap-1.5 px-1.5 py-0.5 bg-slate-50 text-slate-600 rounded border border-slate-200">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span> Backg.
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3 content-start flex-1">
              {beliefState.map((node) => (
                <div key={node.id} className={`p-3 rounded-xl border transition-all duration-500 ${getEntityColor(node.type)}`}>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-sm tracking-tight">{node.label}</h4>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 bg-white/50 rounded-md uppercase tracking-wider opacity-70">
                      {node.type}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {node.attributes.map((attr) => (
                      <div key={attr.name} className="bg-white/80 p-2 rounded-lg shadow-sm border border-slate-100/50 backdrop-blur-sm">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                          <span>{attr.name}</span>
                          {attr.lockedValue ? (
                            <span className="text-green-600 flex items-center gap-1 bg-green-50 px-1.5 rounded">
                              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                              Confirmed
                            </span>
                          ) : (
                            <span>Probability</span>
                          )}
                        </div>
                        
                        <div className="space-y-1.5">
                          {attr.distribution.map((dist) => (
                            <div key={dist.value} className="relative">
                              <div className="flex justify-between text-xs mb-0.5 z-10 relative">
                                <span className={`font-medium ${dist.probability > 0.6 ? 'text-slate-900' : 'text-slate-500'}`}>
                                  {dist.value}
                                </span>
                                <span className="font-mono text-slate-400 text-[10px]">{(dist.probability * 100).toFixed(0)}%</span>
                              </div>
                              <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                                    attr.lockedValue === dist.value ? 'bg-green-500' :
                                    node.type === EntityType.IMPLICIT ? 'bg-purple-400' : 
                                    node.type === EntityType.EXPLICIT ? 'bg-blue-400' : 'bg-slate-400'
                                  }`}
                                  style={{ width: `${dist.probability * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeliefGraphDemo;