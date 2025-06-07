import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import Header from './components/Header';
import ApiSettingsModal from './components/ApiSettingsModal';
import TextInput from './components/TextInput';
import ResultsDisplay from './components/ResultsDisplay';
import HistoryPanel from './components/HistoryPanel';
import { ApiResponse, HistoryItem } from './types';
import { getApiKey, saveHistory, getHistory } from './utils/storage';
import { analyzeText } from './utils/openai';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [targetWord, setTargetWord] = useState('フェミニズム');
  const [text, setText] = useState('');
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleAnalyze = async () => {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      setError('APIキーが設定されていません。設定ボタンからOpenAI APIキーを設定してください。');
      return;
    }

    if (!text.trim() || !targetWord.trim()) {
      setError('分析対象テキストと単語を入力してください。');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await analyzeText(text, targetWord, apiKey);
      setResult(analysisResult);
      
      // Save to history
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        word: targetWord,
        text: text,
        result: analysisResult
      };
      
      const newHistory = [historyItem, ...history].slice(0, 10); // Keep only latest 10
      setHistory(newHistory);
      saveHistory(newHistory);
      
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : '分析中にエラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setTargetWord(item.word);
    setText(item.text);
    setResult(item.result);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSettingsClick={() => setIsSettingsOpen(true)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input */}
          <div className="lg:col-span-2 space-y-6">
            <TextInput
              targetWord={targetWord}
              setTargetWord={setTargetWord}
              text={text}
              setText={setText}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />
            
            <ResultsDisplay
              result={result}
              isLoading={isLoading}
              error={error}
            />
          </div>
          
          {/* Right Column - History */}
          <div className="lg:col-span-1">
            <HistoryPanel
              history={history}
              onClearHistory={handleClearHistory}
              onSelectHistoryItem={handleSelectHistoryItem}
            />
          </div>
        </div>

        {/* API Key Warning */}
        {!getApiKey() && (
          <div className="fixed bottom-6 right-6 bg-amber-100 border border-amber-400 text-amber-800 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-up max-w-sm">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium">APIキーが未設定です</p>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="text-amber-900 underline hover:text-amber-700"
              >
                今すぐ設定する
              </button>
            </div>
          </div>
        )}
      </main>

      <ApiSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}

export default App;