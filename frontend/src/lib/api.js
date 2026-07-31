import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('admin_token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('admin_token');
  }
}

const token = localStorage.getItem('admin_token');
if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Generic fetch helpers
export async function fetchOne(endpoint) {
  const { data } = await api.get(endpoint);
  return data;
}
export async function fetchMany(endpoint, params = {}) {
  const { data } = await api.get(endpoint, { params });
  return data;
}
export async function saveOne(endpoint, body) {
  const { data } = await api.put(endpoint, body);
  return data;
}
export async function createOne(endpoint, body) {
  const { data } = await api.post(endpoint, body);
  return data;
}
export async function updateOne(endpoint, id, body) {
  const { data } = await api.put(`${endpoint}/${id}`, body);
  return data;
}
export async function deleteOne(endpoint, id) {
  const { data } = await api.delete(`${endpoint}/${id}`);
  return data;
}
export async function reorder(endpoint, orders) {
  const { data } = await api.put(`${endpoint}/reorder`, { orders });
  return data;
}

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  setAuthToken(data.token);
  return data;
}

export async function sendMessage(payload) {
  const { data } = await api.post('/messages', payload);
  return data;
}

export async function sendChat(message) {
  const { data } = await api.post('/chat', { message });
  return data;
}

export async function uploadImage(file) {
  const fd = new FormData();
  fd.append('image', file);
  const { data } = await api.post('/upload/image', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
  return data;
}
export async function uploadResume(file) {
  const fd = new FormData();
  fd.append('resume', file);
  const { data } = await api.post('/upload/resume', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
  return data;
}

export default api;
