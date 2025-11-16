
import React, { useState, useCallback } from 'react';
import type { BusinessPlan } from './types';
import { generateBusinessPlan } from './services/geminiService';
import BusinessIdeaForm from './components/BusinessIdeaForm';
import BusinessPlanDisplay from './components/BusinessPlanDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [businessIdea, setBusinessIdea] = useState<string>('');
  const [businessPlan, setBusinessPlan] = useState<BusinessPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = useCallback(async () => {
    if (!businessIdea.trim()) {
      setError('Please describe your Ai Virtual Laboratory concept.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setBusinessPlan(null);
    try {
      const plan = await generateBusinessPlan(businessIdea);
      setBusinessPlan(plan);
    } catch (e) {
      console.error(e);
      setError('Failed to generate business plan. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [businessIdea]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-brand-blue to-brand-green p-3 rounded-full shadow-lg mb-4">
            <SparklesIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            VARDIN LABS<sup className="text-2xl align-super">&trade;</sup> AI Business Plan Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Leverage Google's Gemini to craft a detailed business plan for your Ai Virtual Laboratory.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 transition-shadow duration-300 hover:shadow-2xl">
            <BusinessIdeaForm
              businessIdea={businessIdea}
              setBusinessIdea={setBusinessIdea}
              onSubmit={handleGeneratePlan}
              isLoading={isLoading}
            />
          </div>

          {isLoading && <LoadingSpinner />}
          
          {error && (
            <div className="mt-8 bg-red-100 dark:bg-red-900/20 border-l-4 border-brand-red text-red-700 dark:text-red-300 p-4 rounded-lg shadow-md" role="alert">
              <p className="font-bold">An Error Occurred</p>
              <p>{error}</p>
            </div>
          )}

          {businessPlan && !isLoading && (
            <div className="mt-12">
              <BusinessPlanDisplay plan={businessPlan} />
            </div>
          )}
        </div>
        
        <footer className="text-center mt-16 text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="font-bold text-base text-gray-700 dark:text-gray-300">A Vardin Infinity Ltd. Project</p>
            <p className="mt-2">Lead by Kervin Vardin, Director & Technology Innovation Lead.</p>
            <div className="my-2 text-xs">
                <span>Company Reg: C25224884</span> | <span>TAN: 28432042</span>
            </div>
            <div className="my-2">
                <a href="mailto:info@vardinlabs.com" className="hover:text-brand-blue dark:hover:text-blue-400">info@vardinlabs.com</a>
                <span className="mx-2">|</span>
                <a href="tel:+23054520559" className="hover:text-brand-blue dark:hover:text-blue-400">+230 54520559</a>
            </div>
            <p className="mt-4 text-xs">Powered by Google Gemini.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
