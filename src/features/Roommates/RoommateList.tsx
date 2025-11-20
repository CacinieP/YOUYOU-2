import { Link } from 'react-router-dom';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { useDormStore } from '../../store/useDormStore';
import { formatDate } from '../../utils/format';

export function RoommateList() {
  const { roommates, removeRoommate } = useDormStore();

  const handleDelete = (id: string, name: string) => {
    if (confirm(`确定要删除舍友"${name}"吗？`)) {
      removeRoommate(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">👥 舍友管理</h1>
          <Link to="/roommates/add">
            <Button>➕ 添加舍友</Button>
          </Link>
        </div>

        {roommates.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-2">还没有添加舍友</h3>
              <p className="text-gray-400 mb-6">
                添加舍友后，就可以使用雷达分析、家务扭蛋等功能了
              </p>
              <Link to="/roommates/add">
                <Button>立即添加</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roommates.map(roommate => (
              <Card key={roommate.id}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{roommate.name}</h3>
                    {roommate.mbti && (
                      <span className="inline-block bg-cyber-purple px-3 py-1 rounded-full text-sm">
                        {roommate.mbti}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(roommate.id, roommate.name)}
                    className="text-red-400 hover:text-red-300 text-2xl"
                  >
                    🗑️
                  </button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">😴 睡眠敏感度</span>
                    <span className="font-bold">{roommate.dimensions.sleepSensitivity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">🔊 噪音制造度</span>
                    <span className="font-bold">{roommate.dimensions.noiseLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">🧹 洁癖度</span>
                    <span className="font-bold">{roommate.dimensions.cleanliness}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">🌙 熬夜指数</span>
                    <span className="font-bold">{roommate.dimensions.nightOwl}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">🤝 社交度</span>
                    <span className="font-bold">{roommate.dimensions.social}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">🌡️ 温度偏好</span>
                    <span className="font-bold">{roommate.dimensions.temperature}°C</span>
                  </div>
                </div>

                {roommate.lastChoreDate && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">上次做家务</span>
                      <span className="text-cyber-green">
                        {formatDate(roommate.lastChoreDate)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <Link to={`/radar?roommate=${roommate.id}`} className="flex-1">
                    <Button variant="secondary" className="w-full text-sm">
                      📡 查看雷达
                    </Button>
                  </Link>
                  <Link to={`/roommates/edit/${roommate.id}`} className="flex-1">
                    <Button variant="secondary" className="w-full text-sm">
                      ✏️ 编辑
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/" className="text-gray-400 hover:text-cyber-green transition">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
