import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { DestinationQueryDto } from './dto/destination-query.dto.js';

@Injectable()
export class DestinationsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(query: DestinationQueryDto) {
    const filters: Record<string, unknown>[] = [];

    if (query.region && query.region !== 'All') {
      filters.push({ region: query.region });
    }
    if (query.budgetTier) {
      filters.push({ budgetTier: query.budgetTier });
    }
    if (query.language && query.language !== 'All') {
      filters.push({ languages: { has: query.language } });
    }
    if (query.search) {
      filters.push({
        OR: [
          { name: { contains: query.search, mode: 'insensitive' } },
          { country: { contains: query.search, mode: 'insensitive' } },
        ],
      });
    }

    return this.prisma.destination.findMany({
      where: filters.length ? { AND: filters } : undefined,
      orderBy: this.resolveOrder(query.sort),
    });
  }

  async findDetail(slug: string) {
    const detail = await this.prisma.cityDetail.findUnique({ where: { slug } });
    if (!detail) {
      throw new NotFoundException('Destination detail not found');
    }
    return detail;
  }

  private resolveOrder(sort?: string) {
    switch (sort) {
      case 'Budget: Low to High':
        return { monthlyBudgetMin: 'asc' as const };
      case 'Budget: High to Low':
        return { monthlyBudgetMax: 'desc' as const };
      case 'Scholarship Match':
        return { scholarshipMatch: 'desc' as const };
      default:
        return { universitiesCount: 'desc' as const };
    }
  }
}
