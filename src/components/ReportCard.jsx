import { Link } from 'react-router-dom';

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

const ReportCard = ({ report }) => {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-dainik ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-dainik-red/30">
      <div className="relative h-52 overflow-hidden">
        <img
          src={
            report.image ||
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
          }
          alt={report.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/15 to-black/60" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-dainik-red shadow">
          {formatDate(report.createdAt)}
        </span>
      </div>

      <div className="flex flex-1 flex-col space-y-3 px-5 pb-5 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dainik-gold">
          Daily Bulletin
        </p>
        <h3 className="text-xl font-extrabold leading-tight text-slate-900 line-clamp-2">
          {report.title}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-3">{report.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <Link
            to={`/reports/${report._id}`}
            className="inline-flex items-center gap-1 rounded-full bg-dainik-red/10 px-3 py-1.5 text-xs font-semibold text-dainik-red transition-all group-hover:bg-dainik-red group-hover:text-white"
          >
            Read More
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
          <div className="h-2 w-2 animate-pulse rounded-full bg-dainik-red/70" aria-hidden />
        </div>
      </div>
    </article>
  );
};

export default ReportCard;

