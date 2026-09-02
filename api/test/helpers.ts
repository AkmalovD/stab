import pg from 'pg';

import { TEST_BASE_URL, TEST_DATABASE_URL } from './config.js';

const { Client } = pg;

export interface ApiResult<T = unknown> {
  status: number;
  body: T;
}

interface ApiOptions {
  token?: string;
  body?: unknown;
}

export async function api<T = unknown>(
  method: string,
  path: string,
  options: ApiOptions = {}
): Promise<ApiResult<T>> {
  const response = await fetch(`${TEST_BASE_URL}${path}`, {
    method,
    headers: {
      ...(options.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();
  let parsed: unknown = null;
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
  }

  return { status: response.status, body: parsed as T };
}

export interface Session {
  user: { id: string; email: string; displayName: string | null };
  accessToken: string;
  refreshToken: string;
}

export async function registerAndLogin(
  email: string,
  password = 'secret123',
  name = 'Test User'
): Promise<Session> {
  await api('POST', '/auth/register', { body: { name, email, password } });
  const login = await api<Session>('POST', '/auth/login', { body: { email, password } });
  return login.body;
}

export async function resetDb(): Promise<void> {
  const client = new Client({ connectionString: TEST_DATABASE_URL });
  await client.connect();
  await client.query('TRUNCATE "User" RESTART IDENTITY CASCADE');
  await client.end();
}
