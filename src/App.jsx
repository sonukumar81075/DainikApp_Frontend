import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateReport from './pages/CreateReport';
import ReportDetails from './pages/ReportDetails';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pb-16 pt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateReport />} />
          <Route path="/reports/:id" element={<ReportDetails />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
