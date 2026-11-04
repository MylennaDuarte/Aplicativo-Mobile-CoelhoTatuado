// Cliente HTTP mínimo com fetch. Quando houver backend, os hooks trocam
// os dados mock por chamadas a este cliente (ou por axios, se preferir).

import { AppConfig } from '../../constants/config';

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request(path, init) {
  if (!AppConfig.apiUrl) {
    throw new ApiError(0, 'EXPO_PUBLIC_API_URL não configurada');
  }

  const response = await fetch(`${AppConfig.apiUrl}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init && init.headers),
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, `Erro ${response.status} em ${path}`);
  }

  return response.json();
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
};
