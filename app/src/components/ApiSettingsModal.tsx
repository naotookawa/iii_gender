import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Key, Save } from 'lucide-react';
import { saveApiKey, getApiKey, removeApiKey } from '../utils/storage';

interface ApiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiSettingsModal: React.FC<ApiSettingsModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedKey = getApiKey();
      if (savedKey) {
        setApiKey(savedKey);
        setIsSaved(true);
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    if (apiKey.trim()) {
      saveApiKey(apiKey.trim());
      setIsSaved(true);
      setTimeout(() => {
        onClose();
      }, 500);
    }
  };

  const handleRemove = () => {
    removeApiKey();
    setApiKey('');
    setIsSaved(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Key className="h-5 w-5 text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">API設定</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OpenAI APIキー
            </label>
            <p className="text-sm text-gray-500 mb-3">
              分析機能を使用するには、OpenAI APIキーが必要です。
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline ml-1"
              >
                こちらから取得できます
              </a>
            </p>
            
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>注意:</strong> APIキーはお使いのブラウザにのみ保存され、外部には送信されません。
              セキュリティのため、定期的に更新することをお勧めします。
            </p>
          </div>
        </div>

        <div className="flex space-x-3 p-6 border-t border-gray-200">
          {isSaved && (
            <button
              onClick={handleRemove}
              className="px-4 py-2 text-warning-600 hover:text-warning-700 hover:bg-warning-50 rounded-lg transition-colors duration-200"
            >
              削除
            </button>
          )}
          
          <div className="flex-1" />
          
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            キャンセル
          </button>
          
          <button
            onClick={handleSave}
            disabled={!apiKey.trim()}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Save className="h-4 w-4" />
            <span>保存</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiSettingsModal;