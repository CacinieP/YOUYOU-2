import { Link } from 'react-router-dom';
import { Card } from '../../components/UI/Card';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4">
          <span className="text-cyber-purple">YOU</span>
          <span className="text-cyber-green">YOU</span>
        </h1>
        <p className="text-center text-gray-400 mb-12">
          基于多维性格分析与博弈论的宿舍协作辅助系统
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/roommates">
            <Card className="hover:border-cyber-blue transition cursor-pointer h-full">
              <div className="text-4xl mb-4">👥</div>
              <h2 className="text-2xl font-bold mb-2">舍友管理</h2>
              <p className="text-gray-400">
                添加和管理你的舍友信息，设置性格维度
              </p>
            </Card>
          </Link>

          <Link to="/radar">
            <Card className="hover:border-cyber-purple transition cursor-pointer h-full">
              <div className="text-4xl mb-4">📡</div>
              <h2 className="text-2xl font-bold mb-2">舍友雷达</h2>
              <p className="text-gray-400">
                六维性格分析，计算你与舍友的兼容度和冲突点
              </p>
            </Card>
          </Link>

          <Link to="/translator">
            <Card className="hover:border-cyber-green transition cursor-pointer h-full">
              <div className="text-4xl mb-4">💬</div>
              <h2 className="text-2xl font-bold mb-2">沟通翻译器</h2>
              <p className="text-gray-400">
                将抱怨转换为委婉建议，非暴力沟通助手
              </p>
            </Card>
          </Link>

          <Link to="/gacha">
            <Card className="hover:border-cyber-pink transition cursor-pointer h-full">
              <div className="text-4xl mb-4">🎰</div>
              <h2 className="text-2xl font-bold mb-2">家务扭蛋机</h2>
              <p className="text-gray-400">
                游戏化家务分配，加权随机算法确保公平
              </p>
            </Card>
          </Link>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>💾 所有数据仅存储在您的浏览器中，安全隐私</p>
        </div>
      </div>
    </div>
  );
}
