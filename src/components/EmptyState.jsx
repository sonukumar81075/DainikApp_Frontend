const EmptyState = ({ message = 'No reports yet.' }) => (
  <div className="rounded-xl border border-dainik-sand bg-white px-6 py-10 text-center shadow-sm">
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dainik-red">Dainik Desk</p>
    <p className="mt-2 text-lg font-bold text-slate-900">{message}</p>
    <p className="text-sm text-slate-600">Publish your first update to get started.</p>
  </div>
);

export default EmptyState;

