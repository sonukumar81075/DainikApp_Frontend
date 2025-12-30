import { useEffect, useState } from 'react';
import ReportCard from '../components/ReportCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { fetchReports } from '../services/api';

const Home = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReports = async () => {
      try {
        const { data } = await fetchReports();
        setReports(data);
      } catch (err) {
        setError('Failed to load reports. Please refresh.');
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-dainik-red">
          Breaking Desk
        </p>
        <h1 className="text-3xl font-extrabold text-slate-900">Today&apos;s Highlights</h1>
        <p className="text-sm text-slate-600">
          Curated daily updates in a crisp, modern Dainik layout.
        </p>
      </div>

      {loading && <Loader />}
      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      {!loading && !error && reports.length === 0 && (
        <EmptyState message="No reports yet. Publish the first headline!" />
      )}

      <div className="grid auto-rows-fr items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <ReportCard key={report._id} report={report} />
        ))}
      </div>
    </section>
  );
};

export default Home;

