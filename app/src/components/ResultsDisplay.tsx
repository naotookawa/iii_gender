import React from 'react';
import { BarChart3, FileText, TrendingUp } from 'lucide-react';
import { ApiResponse } from '../types';
import ProgressBar from './ProgressBar';

interface ResultsDisplayProps {
  result: ApiResponse | null;
  isLoading: boolean;
  error: string | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">分析中です...</p>
            <p className="text-sm text-gray-400 mt-1">少々お待ちください</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <FileText className="h-5 w-5 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">エラー</h2>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gray-100 rounded-lg">
            <BarChart3 className="h-5 w-5 text-gray-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">分析結果</h2>
        </div>
        
        <div className="text-center py-12 text-gray-500">
          <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p>テキストを入力して分析を実行してください</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary-100 rounded-lg">
          <BarChart3 className="h-5 w-5 text-primary-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">分析結果</h2>
          <p className="text-sm text-gray-600">
            「{result.word}」の分析 ({result.total_occurrences}箇所検出)
          </p>
        </div>
      </div>

      {/* Overall Average */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">全体平均スコア</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProgressBar
            value={result.overall_average.academic}
            label="学術性"
            color="blue"
          />
          <ProgressBar
            value={result.overall_average.discriminatory}
            label="差別性"
            color="red"
          />
          <ProgressBar
            value={result.overall_average.casual}
            label="カジュアル度"
            color="green"
          />
        </div>
      </div>

      {/* Individual Analyses */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">各使用箇所の詳細分析</h3>
        
        {result.analyses.map((analysis, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 animate-slide-up">
            <div className="flex items-start space-x-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">使用文脈</h4>
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary-500">
                  <p className="text-gray-800 leading-relaxed">{analysis.context}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <ProgressBar
                value={analysis.academic}
                label="学術性"
                color="blue"
              />
              <ProgressBar
                value={analysis.discriminatory}
                label="差別性"
                color="red"
              />
              <ProgressBar
                value={analysis.casual}
                label="カジュアル度"
                color="green"
              />
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h5 className="font-medium text-amber-900 mb-2">判定理由</h5>
              <p className="text-amber-800 text-sm leading-relaxed">{analysis.reasoning}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;