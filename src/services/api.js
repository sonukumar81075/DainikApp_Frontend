import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const fetchReports = () => api.get('/reports');
export const fetchReport = (id) => api.get(`/reports/${id}`);
export const createReport = (formData) =>
  api.post('/reports', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateReport = (id, formData) =>
  api.put(`/reports/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteReport = (id) => api.delete(`/reports/${id}`);

