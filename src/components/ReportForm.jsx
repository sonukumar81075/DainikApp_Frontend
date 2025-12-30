import { useState } from 'react';

const defaultState = { title: '', description: '' };

const ReportForm = ({
  initialData = defaultState,
  onSubmit,
  loading,
  submitLabel = 'Publish Report',
  existingImage
}) => {
  const [formData, setFormData] = useState(initialData);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    if (file) {
      data.append('image', file);
    }
    await onSubmit(data, () => {
      setFormData(defaultState);
      setFile(null);
      e.target.reset();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-dainik-red">
            Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter headline"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm transition focus:border-dainik-red focus:outline-none focus:ring-2 focus:ring-dainik-red/30"
          />
        </div>

        <div className="md:col-span-1">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-dainik-red">
            Image Upload
          </label>
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 transition hover:border-dainik-red hover:bg-white">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full cursor-pointer"
            />
            {existingImage && !file && (
              <p className="mt-2 text-[11px] text-slate-500">
                Current image will remain if not replaced.
              </p>
            )}
          </div>
        </div>

        <div className="md:col-span-1">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-dainik-red">
            Preview
          </label>
          <div className="h-28 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : existingImage ||
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
              }
              alt="preview"
              className="h-full w-full object-cover"
            />
          
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-dainik-red">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="6"
            placeholder="Write the full report..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm transition focus:border-dainik-red focus:outline-none focus:ring-2 focus:ring-dainik-red/30"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-dainik-red to-[#b71f1f] px-4 py-3 text-white font-semibold shadow-dainik transition hover:shadow-lg disabled:opacity-60"
      >
        {loading ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
};

export default ReportForm;

