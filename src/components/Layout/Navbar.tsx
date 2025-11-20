import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-cyber-purple">YOU</span>
          <span className="text-cyber-green">YOU</span>
        </Link>
        
        <div className="flex gap-6">
          <Link to="/roommates" className="text-gray-300 hover:text-cyber-green transition">
            👥 舍友管理
          </Link>
          <Link to="/radar" className="text-gray-300 hover:text-cyber-green transition">
            📡 舍友雷达
          </Link>
          <Link to="/translator" className="text-gray-300 hover:text-cyber-green transition">
            💬 沟通翻译
          </Link>
          <Link to="/gacha" className="text-gray-300 hover:text-cyber-green transition">
            🎰 家务扭蛋
          </Link>
        </div>
      </div>
    </nav>
  );
}
