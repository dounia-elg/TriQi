'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { questionsService } from '@/services/questions.service';
import { resultsService } from '@/services/results.service';
import { 
  ChevronRight, ChevronLeft, Send, Loader2, 
  CheckCircle2, AlertCircle, Sparkles, BrainCircuit 
} from 'lucide-react';

export default function OrientationTestPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; choiceIndex: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch Questions
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const data = await questionsService.getActive();
        setQuestions(data);
      } catch (err) {
        setError("Failed to load questions. Please check your connection.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const currentQuestion = questions[currentIndex];
  const selectedChoice = answers.find(a => a.questionId === currentQuestion?._id)?.choiceIndex;

  const handleSelect = (choiceIndex: number) => {
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === currentQuestion._id);
    
    if (existingIndex > -1) {
      newAnswers[existingIndex].choiceIndex = choiceIndex;
    } else {
      newAnswers.push({ questionId: currentQuestion._id, choiceIndex });
    }
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.length < questions.length) return;
    
    setIsSubmitting(true);
    try {
      await resultsService.submit(answers);
      // Small delay for effect
      setTimeout(() => {
        router.push('/dashboard');
        // Simple trick to ensure dashboard sees updated status
        setTimeout(() => window.location.reload(), 100);
      }, 1500);
    } catch (err) {
      setError("Failed to submit your test. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <Loader2 className="animate-spin text-[var(--primary)]" size={48} />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] p-6">
      <div className="bg-white p-8 rounded-4xl border-2 border-[var(--pink)] shadow-xl text-center max-w-md">
        <AlertCircle className="mx-auto text-[var(--pink)] mb-4" size={48} />
        <h2 className="text-2xl font-bold mb-2">Oops!</h2>
        <p className="text-[var(--text)] mb-6">{error}</p>
        <button onClick={() => window.location.reload()} className="btn-primary w-full">Try Again</button>
      </div>
    </div>
  );

  if (isSubmitting) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-center p-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--tint-blue)] rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--tint-pink)] rounded-full blur-3xl opacity-60 animate-pulse" />
      </div>
      <div className="relative z-10 scale-110">
        <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 animate-bounce">
          <BrainCircuit size={48} className="text-[var(--primary)]" />
        </div>
        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Lora, serif' }}>Analysing your profile...</h2>
        <p className="text-[var(--text)] text-lg">Our AI is matching your answers with thousands of career paths.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg)] relative overflow-hidden flex flex-col items-center py-12 px-4">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--tint-blue)] rounded-full blur-[120px] opacity-40 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--tint-lemon)] rounded-full blur-[120px] opacity-40 translate-y-1/2 -translate-x-1/3" />

      <div className="w-full max-w-3xl relative z-10">
        {/* Header & Progress */}
        <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[var(--primary)]">
                    <Sparkles size={20} />
                </div>
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'Lora, serif' }}>Orientation Test</h1>
            </div>
            
            <div className="flex items-center justify-between text-xs font-bold text-[var(--dim)] uppercase tracking-widest mb-3 px-1">
                <span>Progress</span>
                <span className="text-[var(--primary)]">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full bg-white rounded-full overflow-hidden shadow-inner border border-[var(--border)]">
                <div 
                  className="h-full bg-[var(--primary)] transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
            </div>
            <p className="mt-4 text-sm font-bold text-[var(--muted)]">Question {currentIndex + 1} of {questions.length}</p>
        </div>

        {/* Question Card */}
        <div className="bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-[40px] border border-white shadow-2xl shadow-blue-500/5 min-h-[400px] flex flex-col justify-between">
            <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--tint-blue)] text-[var(--primary)] text-[10px] font-bold uppercase tracking-widest mb-6">
                    {currentQuestion.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--ink)] leading-tight mb-10" style={{ fontFamily: 'Lora, serif' }}>
                    {currentQuestion.text}
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    {currentQuestion.choices.map((choice: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => handleSelect(idx)}
                          className={`group w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                            selectedChoice === idx 
                              ? "bg-[var(--tint-blue)] border-[var(--primary)] shadow-md" 
                              : "bg-white/50 border-[var(--border)] hover:border-[var(--primary)]"
                          }`}
                        >
                            <span className={`font-bold transition-colors ${selectedChoice === idx ? "text-[var(--primary)]" : "text-[var(--text)]"}`}>
                                {choice.text}
                            </span>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                selectedChoice === idx ? "bg-[var(--primary)] border-[var(--primary)]" : "border-[var(--border)] group-hover:border-[var(--primary)]"
                            }`}>
                                {selectedChoice === idx && <CheckCircle2 size={14} className="text-white" />}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-[var(--border)]">
                <button 
                  onClick={handleBack}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 font-bold px-6 py-3 rounded-full text-[var(--text)] hover:bg-[var(--bg)] disabled:opacity-30 transition-all"
                >
                    <ChevronLeft size={20} /> Back
                </button>

                {currentIndex === questions.length - 1 ? (
                    <button 
                      onClick={handleSubmit}
                      disabled={selectedChoice === undefined}
                      className="bg-[var(--primary)] text-white flex items-center gap-2 px-8 py-3.5 rounded-full font-bold shadow-lg shadow-blue-500/20 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:translate-y-0"
                    >
                        Finish & See My Results <Send size={18} />
                    </button>
                ) : (
                    <button 
                      onClick={handleNext}
                      disabled={selectedChoice === undefined}
                      className="bg-white border-2 border-[var(--primary)] text-[var(--primary)] flex items-center gap-2 px-8 py-3.5 rounded-full font-bold hover:bg-[var(--primary)] hover:text-white transition-all disabled:opacity-50"
                    >
                        Next <ChevronRight size={18} />
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
