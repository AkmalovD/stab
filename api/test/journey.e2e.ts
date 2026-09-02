import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';

import { api, registerAndLogin, resetDb } from './helpers.js';

interface JourneyProfile {
  id: number;
  full_name: string;
  destination_country: string;
  intended_start_date: string;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Phase {
  id: string;
  number: number;
  title: string;
  status: string;
  tasks: Task[];
}

interface Document {
  id: string;
  name: string;
  status: string;
}

const NEW_JOURNEY = {
  full_name: 'Alice',
  destination_country: 'United Kingdom',
  intended_start_date: '2026-09-01',
};

async function createJourney(token: string): Promise<number> {
  const res = await api<JourneyProfile>('POST', '/journey-profiles', { token, body: NEW_JOURNEY });
  return res.body.id;
}

describe('journey', () => {
  let token: string;

  before(async () => {
    await resetDb();
    const session = await registerAndLogin('journey@example.com');
    token = session.accessToken;
  });

  it('creates a profile with snake_case fields and a numeric id', async () => {
    const res = await api<JourneyProfile>('POST', '/journey-profiles', { token, body: NEW_JOURNEY });
    assert.equal(res.status, 201);
    assert.equal(res.body.full_name, 'Alice');
    assert.equal(res.body.destination_country, 'United Kingdom');
    assert.equal(res.body.intended_start_date, '2026-09-01');
    assert.equal(typeof res.body.id, 'number');
  });

  it('seeds six ordered phases with ordered tasks', async () => {
    const id = await createJourney(token);
    const res = await api<Phase[]>('GET', `/journey-profiles/${id}/phases`, { token });

    assert.equal(res.status, 200);
    assert.equal(res.body.length, 6);
    assert.deepEqual(
      res.body.map((phase) => phase.number),
      [1, 2, 3, 4, 5, 6]
    );
    assert.equal(res.body[0].tasks.length, 8);
    assert.equal(res.body[0].tasks[0].title, 'Research top universities in target country');
    assert.equal(res.body[0].status, 'in-progress');
    assert.equal(res.body[1].status, 'locked');
  });

  it('seeds fifteen ordered documents', async () => {
    const id = await createJourney(token);
    const res = await api<Document[]>('GET', `/journey-profiles/${id}/documents`, { token });

    assert.equal(res.status, 200);
    assert.equal(res.body.length, 15);
    assert.equal(res.body[0].name, 'Passport');
    assert.equal(res.body[1].name, 'Passport Photos');
  });

  it('lists and fetches the owner profiles', async () => {
    const id = await createJourney(token);

    const list = await api<JourneyProfile[]>('GET', '/journey-profiles', { token });
    assert.equal(list.status, 200);
    assert.ok(list.body.some((profile) => profile.id === id));

    const one = await api<JourneyProfile>('GET', `/journey-profiles/${id}`, { token });
    assert.equal(one.status, 200);
    assert.equal(one.body.id, id);
  });

  it('recomputes phase status when tasks are completed', async () => {
    const id = await createJourney(token);
    const phases = await api<Phase[]>('GET', `/journey-profiles/${id}/phases`, { token });
    const phaseOne = phases.body[0];
    const incomplete = phaseOne.tasks.filter((task) => !task.completed);

    let latest: Phase[] = phases.body;
    for (const task of incomplete) {
      const res = await api<Phase[]>('PATCH', `/journey-profiles/${id}/tasks/${task.id}`, {
        token,
        body: { completed: true },
      });
      assert.equal(res.status, 200);
      latest = res.body;
    }

    assert.equal(latest[0].status, 'completed');
    assert.notEqual(latest[1].status, 'locked');
  });

  it('updates a document status', async () => {
    const id = await createJourney(token);
    const documents = await api<Document[]>('GET', `/journey-profiles/${id}/documents`, { token });
    const target = documents.body.find((doc) => doc.status === 'missing');
    assert.ok(target);

    const res = await api<Document>('PATCH', `/journey-profiles/${id}/documents/${target.id}`, {
      token,
      body: { status: 'ready' },
    });
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'ready');
  });

  it('rejects an invalid document status with 400', async () => {
    const id = await createJourney(token);
    const documents = await api<Document[]>('GET', `/journey-profiles/${id}/documents`, { token });
    const res = await api('PATCH', `/journey-profiles/${id}/documents/${documents.body[0].id}`, {
      token,
      body: { status: 'archived' },
    });
    assert.equal(res.status, 400);
  });

  it('updates the profile via PUT', async () => {
    const id = await createJourney(token);
    const res = await api<JourneyProfile>('PUT', `/journey-profiles/${id}`, {
      token,
      body: { destination_country: 'Japan' },
    });
    assert.equal(res.status, 200);
    assert.equal(res.body.destination_country, 'Japan');
  });

  it('scopes profiles to their owner', async () => {
    const id = await createJourney(token);
    const other = await registerAndLogin('intruder@example.com');

    const get = await api('GET', `/journey-profiles/${id}`, { token: other.accessToken });
    assert.equal(get.status, 404);

    const phases = await api('GET', `/journey-profiles/${id}/phases`, { token: other.accessToken });
    assert.equal(phases.status, 404);

    const missing = await api('GET', '/journey-profiles/999999', { token });
    assert.equal(missing.status, 404);
  });

  it('deletes a profile', async () => {
    const id = await createJourney(token);

    const del = await api('DELETE', `/journey-profiles/${id}`, { token });
    assert.equal(del.status, 204);

    const after = await api('GET', `/journey-profiles/${id}`, { token });
    assert.equal(after.status, 404);
  });
});
