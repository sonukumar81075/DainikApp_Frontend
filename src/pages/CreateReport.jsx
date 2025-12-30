import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportForm from '../components/ReportForm';
import { createReport } from '../services/api';

const CreateReport = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData, resetForm) => {
    try {
      setError('');
      setLoading(true);
      await createReport(formData);
      resetForm();
      navigate('/');
    } catch (err) {
      setError('Could not publish report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dainik-red">
          Newsroom
        </p>
        <h1 className="text-3xl font-extrabold text-slate-900">Create Report</h1>
        <p className="text-sm text-slate-600">
          Publish a fresh update with a bold headline, hero image, and crisp summary.
        </p>
      </div>

      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      <div className="rounded-2xl bg-white p-6 shadow-dainik ring-1 ring-slate-100">
        <ReportForm onSubmit={handleSubmit} loading={loading} submitLabel="Publish Report" />
      </div>
    </section>
  );
};

export default CreateReport;

