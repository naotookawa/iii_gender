import { HistoryItem } from '../types';

export const exportToCSV = (historyItems: HistoryItem[]): void => {
  const headers = [
    '日時',
    '対象単語',
    '文脈',
    '学術性',
    '差別性',
    'カジュアル度',
    '判定理由'
  ];

  const rows: string[][] = [headers];

  historyItems.forEach(item => {
    const date = new Date(item.timestamp).toLocaleString('ja-JP');
    
    item.result.analyses.forEach(analysis => {
      rows.push([
        date,
        item.word,
        `"${analysis.context.replace(/"/g, '""')}"`,
        analysis.academic.toString(),
        analysis.discriminatory.toString(),
        analysis.casual.toString(),
        `"${analysis.reasoning.replace(/"/g, '""')}"`
      ]);
    });
  });

  const csvContent = rows.map(row => row.join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `gender-analysis-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};