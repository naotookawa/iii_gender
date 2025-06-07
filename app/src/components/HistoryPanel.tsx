import React from 'react';
import { History, Download, Trash2, Calendar } from 'lucide-react';
import { HistoryItem } from '../types';
import { exportToCSV } from '../utils/export';

interface HistoryPanelProps {
  history: HistoryItem[];
  onClearHistory: () => void;
  onSelectHistoryItem: (item: HistoryItem) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  onClearHistory,
  onSelectHistoryItem
}) => {
  const handleExport = () => {
    if (history.length > 0) {
      exportToCSV(history);
    }
  };

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gray-100 rounded-lg">
            <History className="h-5 w-5 text-gray-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">分析履歴</h2>
        </div>
        
        <div className="text-center py-8 text-gray-500">
          <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>分析履歴はまだありません</p>
          <p className="text-sm mt-1">分析を実行すると履歴が表示されます</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <History className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">分析履歴</h2>
            <p className="text-sm text-gray-600">{history.length}件の分析結果</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleExport}
            className="flex items-center space-x-1 px-3 py-2 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200"
            title="CSVエクスポート"
          >
            <Download className="h-4 w-4" />
            <span>エクスポート</span>
          </button>
          
          <button
            onClick={onClearHistory}
            className="flex items-center space-x-1 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="履歴をクリア"
          >
            <Trash2 className="h-4 w-4" />
            <span>クリア</span>
          </button>
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {history.slice(0, 5).map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectHistoryItem(item)}
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-colors duration-200 group"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 group-hover:text-primary-700">
                  「{item.word}」の分析
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {item.result.total_occurrences}箇所検出
                </p>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(item.timestamp).toLocaleDateString('ja-JP')}
              </span>
            </div>
            
            <div className="flex space-x-4 text-xs text-gray-600">
              <span>学術性: {Math.round(item.result.overall_average.academic)}</span>
              <span>差別性: {Math.round(item.result.overall_average.discriminatory)}</span>
              <span>カジュアル度: {Math.round(item.result.overall_average.casual)}</span>
            </div>
            
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {item.text.substring(0, 100)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;