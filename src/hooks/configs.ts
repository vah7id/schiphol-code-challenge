export const PORT = process.env.PORT || '3001';
export const API_HOST = process.env.API_HOST || `http://${window.location.hostname}`
export const API_URL = `${API_HOST}:${PORT}`;