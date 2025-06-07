import React from 'react';
import { FileText, Wand2, RotateCcw } from 'lucide-react';
import { sampleTexts } from '../data/samples';

interface TextInputProps {
  targetWord: string;
  setTargetWord: (word: string) => void;
  text: string;
  setText: (text: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  targetWord,
  setTargetWord,
  text,
  setText,
  onAnalyze,
  isLoading
}) => {
  const wordCount = text.length;
  const occurrenceCount = text.toLowerCase().split(targetWord.toLowerCase()).length - 1;

  const handleSampleSelect = (sampleText: string) => {
    setText(sampleText);
  };

  const handleClear = () => {
    setText('');
    setTargetWord('フェミニズム');
  };

  const highlightText = (text: string, word: string) => {
    if (!word.trim()) return text;
    
    const regex = new RegExp(`(${word})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary-100 rounded-lg">
          <FileText className="h-5 w-5 text-primary-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">テキスト分析</h2>
      </div>

      {/* Target Word Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          分析対象単語
        </label>
        <input
          type="text"
          value={targetWord}
          onChange={(e) => setTargetWord(e.target.value)}
          placeholder="フェミニズム"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
        />
      </div>

      {/* Sample Texts */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          サンプルテキスト
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {sampleTexts.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSampleSelect(sample.content)}
              className="p-3 text-left border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200 group"
            >
              <div className="font-medium text-sm text-gray-900 group-hover:text-primary-700">
                {sample.title}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {sample.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Text Area */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">
            分析対象テキスト
          </label>
          <button
            onClick={handleClear}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <RotateCcw className="h-4 w-4" />
            <span>クリア</span>
          </button>
        </div>
        
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="分析したい文章を入力してください..."
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
          />
          
          {/* Highlighted overlay */}
          {text && targetWord && (
            <div className="absolute inset-0 px-4 py-3 pointer-events-none overflow-hidden rounded-lg">
              <div className="whitespace-pre-wrap text-transparent leading-normal">
                {highlightText(text, targetWord)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex space-x-6 text-sm text-gray-600">
          <span>文字数: <span className="font-medium">{wordCount.toLocaleString()}</span></span>
          <span>
            「{targetWord}」の出現回数: 
            <span className={`font-medium ml-1 ${occurrenceCount > 0 ? 'text-primary-600' : 'text-gray-400'}`}>
              {occurrenceCount}回
            </span>
          </span>
        </div>
        
        <button
          onClick={onAnalyze}
          disabled={!text.trim() || !targetWord.trim() || isLoading}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          <Wand2 className="h-5 w-5" />
          <span>{isLoading ? '分析中...' : '分析実行'}</span>
        </button>
      </div>
    </div>
  );
};

export default TextInput;