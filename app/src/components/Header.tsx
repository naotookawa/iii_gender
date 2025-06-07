import React from 'react';
import { Brain, Settings } from 'lucide-react';

interface HeaderProps {
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Brain className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                ジェンダー用語文脈分析ツール
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                テキスト内の用語使用を客観的に分析します
              </p>
            </div>
          </div>
          
          <button
            onClick={onSettingsClick}
            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
            title="API設定"
          >
            <Settings className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;