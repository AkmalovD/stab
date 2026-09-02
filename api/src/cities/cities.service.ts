import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

interface CityRow {
  slug: string;
  name: string;
  country: string;
  imageUrl: string;
  flag: string;
  costOfLiving: string;
  costsRent: string;
  costsFood: string;
  costsTransport: string;
  costsTuition: string;
  housing: number;
  food: number;
  transport: number;
  entertainment: number;
  utilities: number;
  population: number | null;
  climate: string | null;
  language: string | null;
  currency: string | null;
  timezone: string | null;
  studentPopulation: number | null;
}

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(ids?: string) {
    const slugs = ids
      ? ids
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean)
      : undefined;

    const cities = await this.prisma.city.findMany({
      where: slugs ? { slug: { in: slugs } } : undefined,
      orderBy: { name: 'asc' },
    });

    return cities.map((city) => this.toCity(city));
  }

  async findOne(slug: string) {
    const city = await this.prisma.city.findUnique({ where: { slug } });
    if (!city) {
      throw new NotFoundException('City not found');
    }
    return this.toCity(city);
  }

  private toCity(city: CityRow) {
    return {
      id: city.slug,
      name: city.name,
      country: city.country,
      imageUrl: city.imageUrl,
      flag: city.flag,
      costOfLiving: city.costOfLiving,
      costs: {
        rent: city.costsRent,
        food: city.costsFood,
        transport: city.costsTransport,
        tuition: city.costsTuition,
      },
      costBreakdown: {
        housing: city.housing,
        food: city.food,
        transport: city.transport,
        entertainment: city.entertainment,
        utilities: city.utilities,
      },
      metadata: {
        population: city.population ?? undefined,
        climate: city.climate ?? undefined,
        language: city.language ?? undefined,
        currency: city.currency ?? undefined,
        timezone: city.timezone ?? undefined,
        studentPopulation: city.studentPopulation ?? undefined,
      },
    };
  }
}
