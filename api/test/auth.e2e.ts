import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';

import { api, resetDb, type Session } from './helpers.js';

describe('auth', () => {
  before(resetDb);

  it('registers a new user and returns tokens', async () => {
    const res = await api<Session>('POST', '/auth/register', {
      body: { name: 'Alice', email: 'alice@example.com', password: 'secret123' },
    });

    assert.equal(res.status, 201);
    assert.equal(res.body.user.email, 'alice@example.com');
    assert.equal(res.body.user.displayName, 'Alice');
    assert.ok(res.body.accessToken);
    assert.ok(res.body.refreshToken);
  });

  it('rejects a duplicate email with 409', async () => {
    const res = await api('POST', '/auth/register', {
      body: { name: 'Alice Again', email: 'alice@example.com', password: 'secret123' },
    });
    assert.equal(res.status, 409);
  });

  it('rejects registration with a short password (400)', async () => {
    const res = await api('POST', '/auth/register', {
      body: { name: 'Bob', email: 'bob@example.com', password: '123' },
    });
    assert.equal(res.status, 400);
  });

  it('rejects an unknown property (400)', async () => {
    const res = await api('POST', '/auth/register', {
      body: { name: 'Carol', email: 'carol@example.com', password: 'secret123', role: 'admin' },
    });
    assert.equal(res.status, 400);
  });

  it('logs in with valid credentials', async () => {
    const res = await api<Session>('POST', '/auth/login', {
      body: { email: 'alice@example.com', password: 'secret123' },
    });
    assert.equal(res.status, 200);
    assert.ok(res.body.accessToken);
    assert.ok(res.body.refreshToken);
  });

  it('rejects a wrong password with 401', async () => {
    const res = await api('POST', '/auth/login', {
      body: { email: 'alice@example.com', password: 'wrongpass' },
    });
    assert.equal(res.status, 401);
  });

  it('returns the current user with a valid token and 401 without', async () => {
    const login = await api<Session>('POST', '/auth/login', {
      body: { email: 'alice@example.com', password: 'secret123' },
    });

    const authed = await api('GET', '/auth/me', { token: login.body.accessToken });
    assert.equal(authed.status, 200);

    const anon = await api('GET', '/auth/me');
    assert.equal(anon.status, 401);
  });

  it('rotates refresh tokens and rejects reuse of the old one', async () => {
    const login = await api<Session>('POST', '/auth/login', {
      body: { email: 'alice@example.com', password: 'secret123' },
    });
    const oldRefresh = login.body.refreshToken;

    const rotated = await api<Session>('POST', '/auth/refresh', {
      body: { refreshToken: oldRefresh },
    });
    assert.equal(rotated.status, 200);
    assert.ok(rotated.body.refreshToken);
    assert.notEqual(rotated.body.refreshToken, oldRefresh);

    const reuse = await api('POST', '/auth/refresh', { body: { refreshToken: oldRefresh } });
    assert.equal(reuse.status, 401);
  });

  it('revokes the refresh token on logout', async () => {
    const login = await api<Session>('POST', '/auth/login', {
      body: { email: 'alice@example.com', password: 'secret123' },
    });
    const refreshToken = login.body.refreshToken;

    const logout = await api('POST', '/auth/logout', { body: { refreshToken } });
    assert.equal(logout.status, 204);

    const afterLogout = await api('POST', '/auth/refresh', { body: { refreshToken } });
    assert.equal(afterLogout.status, 401);
  });
});
