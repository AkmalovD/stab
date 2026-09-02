import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { api } from './helpers.js';

interface Destination {
  slug: string;
  region: string;
  budgetTier: string;
  languages: string[];
  monthlyBudgetMin: number;
}

interface City {
  id: string;
  costs: { rent: string };
  costBreakdown: { housing: number };
  metadata: { currency?: string };
}

interface Scholarship {
  id: string;
  studyLevel: string;
  country: string;
  deadline: string;
}

describe('destinations', () => {
  it('lists all seeded destinations', async () => {
    const res = await api<Destination[]>('GET', '/destinations');
    assert.equal(res.status, 200);
    assert.equal(res.body.length, 16);
  });

  it('filters by region and budget tier', async () => {
    const res = await api<Destination[]>('GET', '/destinations?region=Europe&budgetTier=Low%20Cost');
    assert.ok(res.body.length > 0);
    assert.ok(res.body.every((d) => d.region === 'Europe' && d.budgetTier === 'Low Cost'));
  });

  it('filters by language', async () => {
    const res = await api<Destination[]>('GET', '/destinations?language=French');
    assert.ok(res.body.some((d) => d.slug === 'paris'));
    assert.ok(res.body.every((d) => d.languages.includes('French')));
  });

  it('searches by name', async () => {
    const res = await api<Destination[]>('GET', '/destinations?search=tok');
    assert.deepEqual(
      res.body.map((d) => d.slug),
      ['tokyo']
    );
  });

  it('sorts by budget ascending', async () => {
    const res = await api<Destination[]>('GET', '/destinations?sort=Budget%3A%20Low%20to%20High');
    const budgets = res.body.map((d) => d.monthlyBudgetMin);
    const sorted = [...budgets].sort((a, b) => a - b);
    assert.deepEqual(budgets, sorted);
  });

  it('returns city detail with all sections', async () => {
    const res = await api<Record<string, unknown>>('GET', '/destinations/london');
    assert.equal(res.status, 200);
    for (const key of ['universities', 'costOfLiving', 'scholarships', 'housing', 'essentials', 'timeline', 'meta']) {
      assert.ok(key in res.body, `missing ${key}`);
    }
    assert.equal((res.body.universities as unknown[]).length, 2);
    assert.equal((res.body.meta as { currency: string }).currency, '£');
  });

  it('returns 404 for an unknown destination', async () => {
    const res = await api('GET', '/destinations/atlantis');
    assert.equal(res.status, 404);
  });
});

describe('cities', () => {
  it('lists all comparison cities', async () => {
    const res = await api<City[]>('GET', '/cities');
    assert.equal(res.status, 200);
    assert.equal(res.body.length, 6);
  });

  it('filters by ids and reconstructs the nested city shape', async () => {
    const res = await api<City[]>('GET', '/cities?ids=london,paris');
    assert.equal(res.body.length, 2);
    const london = res.body.find((c) => c.id === 'london');
    assert.ok(london);
    assert.equal(london.costs.rent, '$1,500/month');
    assert.equal(london.costBreakdown.housing, 1500);
    assert.equal(london.metadata.currency, 'GBP');
  });

  it('returns 404 for an unknown city', async () => {
    const res = await api('GET', '/cities/nowhere');
    assert.equal(res.status, 404);
  });
});

describe('scholarships', () => {
  it('lists all seeded scholarships', async () => {
    const res = await api<Scholarship[]>('GET', '/scholarships');
    assert.equal(res.status, 200);
    assert.equal(res.body.length, 12);
  });

  it('filters by study level including All Levels', async () => {
    const res = await api<Scholarship[]>('GET', '/scholarships?studyLevel=PhD');
    const ids = res.body.map((s) => s.id).sort();
    assert.deepEqual(ids, ['gates-cambridge', 'vanier']);
  });

  it('filters by country', async () => {
    const res = await api<Scholarship[]>('GET', '/scholarships?country=Germany');
    assert.ok(res.body.every((s) => s.country === 'Germany'));
    assert.ok(res.body.some((s) => s.id === 'daad'));
  });

  it('filters by field of study including All Fields', async () => {
    const res = await api<Scholarship[]>('GET', '/scholarships?fieldOfStudy=Engineering');
    assert.ok(res.body.some((s) => s.id === 'daad'));
    assert.ok(res.body.some((s) => s.id === 'chevening'));
  });

  it('searches across name, provider and description', async () => {
    const res = await api<Scholarship[]>('GET', '/scholarships?search=daad');
    assert.deepEqual(
      res.body.map((s) => s.id),
      ['daad']
    );
  });

  it('exposes filter aggregations', async () => {
    const res = await api<{
      countries: string[];
      studyLevels: string[];
      coverageTypes: string[];
      fieldsOfStudy: string[];
    }>('GET', '/scholarships/filters');
    assert.ok(res.body.countries.includes('Germany'));
    assert.deepEqual(res.body.studyLevels, ['Masters', 'PhD']);
    assert.deepEqual(res.body.coverageTypes, ['Full', 'Partial']);
    assert.ok(res.body.fieldsOfStudy.includes('Engineering'));
  });

  it('returns a single scholarship with a formatted deadline', async () => {
    const res = await api<Scholarship>('GET', '/scholarships/chevening');
    assert.equal(res.status, 200);
    assert.equal(res.body.id, 'chevening');
    assert.equal(res.body.deadline, '2025-11-07');
  });

  it('returns 404 for an unknown scholarship', async () => {
    const res = await api('GET', '/scholarships/nope');
    assert.equal(res.status, 404);
  });
});
