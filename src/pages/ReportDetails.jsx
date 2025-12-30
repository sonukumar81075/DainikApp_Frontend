import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteReport, fetchReport, updateReport } from '../services/api';
import Loader from '../components/Loader';
import ReportForm from '../components/ReportForm';

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const { data } = await fetchReport(id);
        setReport(data);
      } catch (err) {
        setError('Unable to load report.');
      } finally {
        setLoading(false);
      }
    };
    loadReport();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      setSaving(true);
      const { data } = await updateReport(id, formData);
      setReport(data);
      setEditing(false);
    } catch (err) {
      setError('Update failed. Please retry.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this report?');
    if (!confirmed) return;
    try {
      await deleteReport(id);
      navigate('/');
    } catch (err) {
      setError('Delete failed. Please retry.');
    }
  };

  if (loading) return <Loader />;
  if (!report) return <p className="text-red-600">{error || 'Report not found.'}</p>;

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-xl bg-white shadow">
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={
              report.image ||
              'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80'
            }
            alt={report.title}
            className="h-full w-full object-cover"
          />
          <div className="gradient-overlay absolute inset-0" />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-xs uppercase tracking-[0.25em] text-dainik-gold">Feature Story</p>
            <h1 className="text-3xl font-extrabold leading-tight">{report.title}</h1>
            <p className="text-sm text-white/80">{formatDate(report.createdAt)}</p>
          </div>
        </div>

        <div className="space-y-4 p-6">
          {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

          {!editing ? (
            <>
              <p className="text-base leading-relaxed text-slate-700">{report.description}</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setEditing(true)}
                  className="rounded-lg bg-dainik-red px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#b71f1f]"
                >
                  Edit Report
                </button>
                <button
                  onClick={handleDelete}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <ReportForm
              initialData={{
                title: report.title,
                description: report.description,
                image: report.image
              }}
              onSubmit={handleUpdate}
              loading={saving}
              submitLabel="Update Report"
              existingImage={report.image}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ReportDetails;

