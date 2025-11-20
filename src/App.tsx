import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Layout/Navbar';
import { Dashboard } from './features/Dashboard/Dashboard';
import { Radar } from './features/Radar/Radar';
import { Translator } from './features/Translator/Translator';
import { Gacha } from './features/Gacha/Gacha';
import { RoommateList } from './features/Roommates/RoommateList';
import { AddRoommate } from './features/Roommates/AddRoommate';
import { EditRoommate } from './features/Roommates/EditRoommate';

function App() {
  return (
    <BrowserRouter basename="/YOUYOU-2">
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/roommates" element={<RoommateList />} />
          <Route path="/roommates/add" element={<AddRoommate />} />
          <Route path="/roommates/edit/:id" element={<EditRoommate />} />
          <Route path="/radar" element={<Radar />} />
          <Route path="/translator" element={<Translator />} />
          <Route path="/gacha" element={<Gacha />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
