import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';

import { api, registerAndLogin, resetDb } from './helpers.js';

interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  location?: string;
  university?: string;
  budget?: string;
  bio?: string;
}

describe('profile', () => {
  before(resetDb);

  it('requires authentication', async () => {
    const res = await api('GET', '/me/profile');
    assert.equal(res.status, 401);
  });

  it('returns the base profile for a new user', async () => {
    const session = await registerAndLogin('profile@example.com', 'secret123', 'Pat');
    const res = await api<UserProfile>('GET', '/me/profile', { token: session.accessToken });

    assert.equal(res.status, 200);
    assert.equal(res.body.email, 'profile@example.com');
    assert.equal(res.body.displayName, 'Pat');
    assert.equal(res.body.bio, undefined);
  });

  it('persists profile edits and merges user + profile fields', async () => {
    const session = await registerAndLogin('editor@example.com', 'secret123', 'Ed');

    const patch = await api<UserProfile>('PATCH', '/me/profile', {
      token: session.accessToken,
      body: {
        bio: 'Aspiring grad student',
        location: 'Tashkent',
        university: 'NUUz',
        budget: '$1200/mo',
        photoURL: 'https://img/x.png',
      },
    });
    assert.equal(patch.status, 200);
    assert.equal(patch.body.bio, 'Aspiring grad student');
    assert.equal(patch.body.location, 'Tashkent');
    assert.equal(patch.body.photoURL, 'https://img/x.png');

    const get = await api<UserProfile>('GET', '/me/profile', { token: session.accessToken });
    assert.equal(get.body.bio, 'Aspiring grad student');
    assert.equal(get.body.university, 'NUUz');
    assert.equal(get.body.budget, '$1200/mo');
  });

  it('rejects unknown fields with 400', async () => {
    const session = await registerAndLogin('strict@example.com', 'secret123', 'Sam');
    const res = await api('PATCH', '/me/profile', {
      token: session.accessToken,
      body: { nickname: 'hacker' },
    });
    assert.equal(res.status, 400);
  });
});
