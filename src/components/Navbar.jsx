import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const linkClasses = ({ isActive }) =>
  `px-3 py-2 text-sm font-semibold transition-colors rounded-md ${
    isActive ? 'text-dainik-red bg-dainik-sand' : 'text-slate-700 hover:text-dainik-red'
  }`;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2" onClick={close}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dainik-red text-white font-extrabold">
            D
          </div>
          <div className="leading-tight">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Dainik</p>
            <p className="text-lg font-bold text-slate-900">Daily Reports</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 sm:flex">
          <NavLink to="/" className={linkClasses} end>
            Home
          </NavLink>
          <NavLink to="/create" className={linkClasses}>
            New Report
          </NavLink>
        </nav>

        {/* Mobile menu button */}
        <button
          className="sm:hidden rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-dainik-red hover:text-dainik-red"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile sidebar */}
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden" onClick={close} />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl ring-1 ring-slate-200 transition-transform duration-200 sm:hidden">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-dainik-red text-white font-bold">
                  D
                </div>
                <div className="leading-tight">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Dainik</p>
                  <p className="text-base font-bold text-slate-900">Daily Reports</p>
                </div>
              </div>
              <button
                className="rounded-md px-2 py-1 text-sm font-semibold text-slate-600 hover:text-dainik-red"
                onClick={close}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <div className="px-4 py-2 space-y-2">
              <NavLink to="/" onClick={close} className={linkClasses} end>
                Home
              </NavLink>
              <NavLink to="/create" onClick={close} className={linkClasses}>
                New Report
              </NavLink>
            </div>
          </aside>
        </>
      )}
    </header>
  );
};

export default Navbar;

