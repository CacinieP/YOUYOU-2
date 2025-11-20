import { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { translateToPolite, analyzeEmotionIntensity } from '../../core/nlp/politeTranslator';

export function Translator() {
  const [complaint, setComplaint] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [intensity, setIntensity] = useState(0);

  const handleTranslate = () => {
    if (!complaint.trim()) return;
    
    const results = translateToPolite(complaint);
    const emotionLevel = analyzeEmotionIntensity(complaint);
    
    setSuggestions(results);
    setIntensity(emotionLevel);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板！');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">💬 非暴力沟通翻译器</h1>

        <Card title="输入你的抱怨" className="mb-6">
          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="例如：他每天晚上打游戏太吵了，影响我睡觉..."
            className="w-full h-32 bg-gray-700 text-white rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-cyber-purple"
          />
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              情绪强度: 
              <span className={`ml-2 font-bold ${
                intensity > 70 ? 'text-red-400' : 
                intensity > 40 ? 'text-yellow-400' : 
                'text-green-400'
              }`}>
                {intensity}%
              </span>
            </div>
            <Button onClick={handleTranslate}>
              翻译成委婉建议
            </Button>
          </div>
        </Card>

        {suggestions.length > 0 && (
          <Card title="委婉建议（选择一个使用）">
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div 
                  key={index}
                  className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition cursor-pointer"
                  onClick={() => copyToClipboard(suggestion)}
                >
                  <div className="flex items-start justify-between">
                    <p className="flex-1">{suggestion}</p>
                    <button className="ml-4 text-cyber-green hover:text-cyber-purple">
                      📋
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-4 text-center">
              点击任意建议即可复制到剪贴板
            </p>
          </Card>
        )}

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>💡 提示：使用非暴力沟通原则，表达感受而非指责</p>
        </div>
      </div>
    </div>
  );
}
