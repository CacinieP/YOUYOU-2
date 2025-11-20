import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { useDormStore } from '../../store/useDormStore';
import { MBTIType, PersonalityDimensions } from '../../types';
import { generateId } from '../../utils/format';

const MBTI_OPTIONS: MBTIType[] = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
];

export function AddRoommate() {
  const navigate = useNavigate();
  const { addRoommate } = useDormStore();
  
  const [name, setName] = useState('');
  const [mbti, setMbti] = useState<MBTIType | ''>('');
  const [dimensions, setDimensions] = useState<PersonalityDimensions>({
    sleepSensitivity: 50,
    noiseLevel: 50,
    cleanliness: 50,
    nightOwl: 50,
    temperature: 24,
    social: 50,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('请输入舍友姓名');
      return;
    }

    addRoommate({
      id: generateId(),
      name: name.trim(),
      mbti: mbti || undefined,
      dimensions,
    });

    alert('添加成功！');
    navigate('/roommates');
  };

  const updateDimension = (key: keyof PersonalityDimensions, value: number) => {
    setDimensions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">➕ 添加舍友</h1>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <h3 className="text-xl font-bold mb-4 text-cyber-green">基本信息</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  姓名 / 昵称 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例如：小明"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyber-purple"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  MBTI 类型（可选）
                </label>
                <select
                  value={mbti}
                  onChange={(e) => setMbti(e.target.value as MBTIType)}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyber-purple"
                >
                  <option value="">不知道 / 跳过</option>
                  {MBTI_OPTIONS.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          <Card className="mb-6">
            <h3 className="text-xl font-bold mb-4 text-cyber-green">性格维度</h3>
            <p className="text-sm text-gray-400 mb-6">
              根据你对舍友的了解，调整以下维度（0-100）
            </p>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">😴 睡眠敏感度</label>
                  <span className="text-cyber-purple font-bold">{dimensions.sleepSensitivity}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dimensions.sleepSensitivity}
                  onChange={(e) => updateDimension('sleepSensitivity', Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>睡得很死</span>
                  <span>一点声音就醒</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">🔊 噪音制造度</label>
                  <span className="text-cyber-purple font-bold">{dimensions.noiseLevel}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dimensions.noiseLevel}
                  onChange={(e) => updateDimension('noiseLevel', Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>非常安静</span>
                  <span>经常制造噪音</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">🧹 洁癖度</label>
                  <span className="text-cyber-purple font-bold">{dimensions.cleanliness}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dimensions.cleanliness}
                  onChange={(e) => updateDimension('cleanliness', Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>不太在意</span>
                  <span>极度洁癖</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">🌙 熬夜指数</label>
                  <span className="text-cyber-purple font-bold">{dimensions.nightOwl}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dimensions.nightOwl}
                  onChange={(e) => updateDimension('nightOwl', Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>早睡早起</span>
                  <span>深夜党</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">🤝 社交度</label>
                  <span className="text-cyber-purple font-bold">{dimensions.social}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dimensions.social}
                  onChange={(e) => updateDimension('social', Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>喜欢独处</span>
                  <span>社交达人</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">🌡️ 空调温度偏好</label>
                  <span className="text-cyber-purple font-bold">{dimensions.temperature}°C</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="30"
                  value={dimensions.temperature}
                  onChange={(e) => updateDimension('temperature', Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>16°C 冰箱</span>
                  <span>30°C 桑拿</span>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              ✅ 添加舍友
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => navigate('/roommates')}
              className="flex-1"
            >
              取消
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
