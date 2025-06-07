import { ApiResponse } from '../types';

export const analyzeText = async (text: string, targetWord: string, apiKey: string): Promise<ApiResponse> => {
  const prompt = `以下のテキスト内で「${targetWord}」という単語が使用されている文脈を分析し、その単語の使われ方を3つの軸で0-100点で評価してください。

【評価軸の定義】
- 学術性 (0-100): 
  * 0: 感情的・主観的な文脈での使用
  * 50: 一般的な説明・議論での使用
  * 100: 学術的・専門的な文脈での使用

- 差別性 (0-100):
  * 0: 中立的・肯定的な文脈での使用
  * 50: 軽微な批判的ニュアンスでの使用
  * 100: 明確に差別的・攻撃的な文脈での使用

- カジュアル度 (0-100):
  * 0: 非常にフォーマルな文脈での使用
  * 50: 標準的な文体での使用
  * 100: カジュアル・話し言葉での使用

【分析対象テキスト】
${text}

【対象単語】
${targetWord}

対象単語が複数回出現する場合は、それぞれの使用箇所を個別に評価してください。

【出力形式】
以下のJSON形式で回答してください：
{
  "word": "対象単語",
  "total_occurrences": 出現回数,
  "analyses": [
    {
      "context": "対象単語を含む文",
      "academic": 数値,
      "discriminatory": 数値,
      "casual": 数値,
      "reasoning": "この使用箇所の判定理由"
    }
  ],
  "overall_average": {
    "academic": 平均値,
    "discriminatory": 平均値,
    "casual": 平均値
  }
}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'あなたは言語学とジェンダー研究の専門家です。テキスト分析を客観的かつ学術的に行います。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'API呼び出しに失敗しました');
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    // JSONの抽出（マークダウンのコードブロックを考慮）
    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;
    
    return JSON.parse(jsonStr.trim());
  } catch (parseError) {
    throw new Error('APIレスポンスの解析に失敗しました。形式が正しくありません。');
  }
};