import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { ScholarshipQueryDto } from './dto/scholarship-query.dto.js';

interface ScholarshipRow {
  slug: string;
  name: string;
  provider: string;
  country: string;
  amount: string;
  coverage: string;
  deadline: Date;
  studyLevel: string;
  fieldOfStudy: string[];
  eligibleCountries: string[];
  description: string;
  requirements: string[];
  applicationUrl: string;
  difficulty: string;
  type: string | null;
}

@Injectable()
export class ScholarshipsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: ScholarshipQueryDto) {
    const filters: Record<string, unknown>[] = [];

    if (query.country) {
      filters.push({ country: query.country });
    }
    if (query.coverage) {
      filters.push({ coverage: query.coverage });
    }
    if (query.studyLevel) {
      filters.push({ OR: [{ studyLevel: query.studyLevel }, { studyLevel: 'All Levels' }] });
    }
    if (query.fieldOfStudy) {
      filters.push({
        OR: [{ fieldOfStudy: { has: query.fieldOfStudy } }, { fieldOfStudy: { has: 'All Fields' } }],
      });
    }
    if (query.search) {
      filters.push({
        OR: [
          { name: { contains: query.search, mode: 'insensitive' } },
          { provider: { contains: query.search, mode: 'insensitive' } },
          { description: { contains: query.search, mode: 'insensitive' } },
        ],
      });
    }

    const upcomingOnly = query.upcomingOnly === 'true';
    if (upcomingOnly) {
      filters.push({ deadline: { gt: new Date() } });
    }

    const scholarships = await this.prisma.scholarship.findMany({
      where: filters.length ? { AND: filters } : undefined,
      orderBy: upcomingOnly ? { deadline: 'asc' } : { name: 'asc' },
    });

    return scholarships.map((scholarship) => this.toScholarship(scholarship));
  }

  async getFilters() {
    const rows = await this.prisma.scholarship.findMany({
      select: { country: true, studyLevel: true, coverage: true, fieldOfStudy: true },
    });

    const fields = new Set<string>();
    rows.forEach((row) => row.fieldOfStudy.forEach((field) => fields.add(field)));

    return {
      countries: this.unique(rows.map((row) => row.country)),
      studyLevels: this.unique(rows.map((row) => row.studyLevel)),
      coverageTypes: this.unique(rows.map((row) => row.coverage)),
      fieldsOfStudy: Array.from(fields).sort(),
    };
  }

  async findOne(slug: string) {
    const scholarship = await this.prisma.scholarship.findUnique({ where: { slug } });
    if (!scholarship) {
      throw new NotFoundException('Scholarship not found');
    }
    return this.toScholarship(scholarship);
  }

  private unique(values: string[]) {
    return Array.from(new Set(values)).sort();
  }

  private toScholarship(scholarship: ScholarshipRow) {
    return {
      id: scholarship.slug,
      type: scholarship.type ?? undefined,
      name: scholarship.name,
      provider: scholarship.provider,
      country: scholarship.country,
      amount: scholarship.amount,
      coverage: scholarship.coverage,
      deadline: scholarship.deadline.toISOString().slice(0, 10),
      studyLevel: scholarship.studyLevel,
      fieldOfStudy: scholarship.fieldOfStudy,
      eligibleCountries: scholarship.eligibleCountries,
      description: scholarship.description,
      requirements: scholarship.requirements,
      applicationUrl: scholarship.applicationUrl,
      difficulty: scholarship.difficulty,
    };
  }
}
