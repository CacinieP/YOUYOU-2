import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { useDormStore } from '../../store/useDormStore';
import { selectChoreVictim, getChoreProb } from '../../core/algorithms/weightedRandom';
import { formatDate } from '../../utils/format';

export function Gacha() {
  const { roommates, updateLastChoreDate } = useDormStore();
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSpin = async () => {
    if (roommates.length === 0) {
      alert('请先添加舍友！');
      return;
    }

    setIsSpinning(true);
    setResult(null);

    // 模拟扭蛋动画
    await new Promise(resolve => setTimeout(resolve, 2000));

    const victim = selectChoreVictim(roommates);
    setResult(victim.name);
    updateLastChoreDate(victim.id, Date.now());
    setIsSpinning(false);
  };

  const probabilities = getChoreProb(roommates);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🎰 家务扭蛋机</h1>

        <Card className="mb-6">
          <div className="text-center">
            <div className="text-6xl mb-6">
              {isSpinning ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                >
                  🎲
                </motion.div>
              ) : result ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  🎉
                </motion.div>
              ) : (
                '🎰'
              )}
            </div>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <h2 className="text-3xl font-bold text-cyber-green mb-2">
                  恭喜 {result}！
                </h2>
                <p className="text-gray-400">你被选中做家务啦 😊</p>
              </motion.div>
            )}

            <Button 
              onClick={handleSpin} 
              disabled={isSpinning || roommates.length === 0}
              className="text-xl px-8 py-4"
            >
              {isSpinning ? '抽取中...' : '开始抽取'}
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="当前概率">
            {roommates.length === 0 ? (
              <p className="text-gray-400">暂无舍友数据</p>
            ) : (
              <div className="space-y-3">
                {roommates.map(rm => (
                  <div key={rm.id} className="flex items-center justify-between">
                    <span>{rm.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-cyber-purple h-2 rounded-full"
                          style={{ width: `${probabilities.get(rm.id) || 0}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-400 w-12 text-right">
                        {probabilities.get(rm.id)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card title="历史记录">
            {roommates.length === 0 ? (
              <p className="text-gray-400">暂无记录</p>
            ) : (
              <div className="space-y-2">
                {roommates
                  .filter(rm => rm.lastChoreDate)
                  .sort((a, b) => (b.lastChoreDate || 0) - (a.lastChoreDate || 0))
                  .map(rm => (
                    <div key={rm.id} className="flex justify-between text-sm">
                      <span>{rm.name}</span>
                      <span className="text-gray-400">
                        {formatDate(rm.lastChoreDate!)}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </Card>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>⚖️ 算法说明：距离上次做家务时间越久，被抽中概率越高</p>
        </div>
      </div>
    </div>
  );
}
