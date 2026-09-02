import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateJourneyProfileDto } from './dto/create-journey-profile.dto.js';
import { UpdateJourneyProfileDto } from './dto/update-journey-profile.dto.js';
import { documentTemplates, journeyPhaseTemplates } from './journey.templates.js';

interface JourneyProfileRow {
  id: number;
  fullName: string;
  destinationCountry: string;
  intendedStartDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class JourneyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateJourneyProfileDto) {
    const profile = await this.prisma.journeyProfile.create({
      data: {
        userId,
        fullName: dto.full_name,
        destinationCountry: dto.destination_country,
        intendedStartDate: new Date(dto.intended_start_date),
        phases: {
          create: journeyPhaseTemplates.map((phase) => ({
            number: phase.number,
            title: phase.title,
            description: phase.description,
            timeframe: phase.timeframe,
            status: 'not-started',
            icon: phase.icon,
            tasks: {
              create: phase.tasks.map((task, index) => ({
                position: index,
                title: task.title,
                description: task.description,
                completed: task.completed,
                priority: task.priority,
                category: task.category,
              })),
            },
          })),
        },
        documents: {
          create: documentTemplates.map((doc, index) => ({
            position: index,
            name: doc.name,
            category: doc.category,
            status: doc.status,
            required: doc.required,
            expiryDate: doc.expiryDate ? new Date(doc.expiryDate) : null,
          })),
        },
      },
    });

    await this.recomputeStatuses(profile.id);
    return this.serializeProfile(profile);
  }

  async findAll(userId: string) {
    const profiles = await this.prisma.journeyProfile.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
    return profiles.map((profile) => this.serializeProfile(profile));
  }

  async findOne(userId: string, id: number) {
    const profile = await this.requireProfile(userId, id);
    return this.serializeProfile(profile);
  }

  async update(userId: string, id: number, dto: UpdateJourneyProfileDto) {
    await this.requireProfile(userId, id);

    const profile = await this.prisma.journeyProfile.update({
      where: { id },
      data: {
        ...(dto.full_name !== undefined ? { fullName: dto.full_name } : {}),
        ...(dto.destination_country !== undefined
          ? { destinationCountry: dto.destination_country }
          : {}),
        ...(dto.intended_start_date !== undefined
          ? { intendedStartDate: new Date(dto.intended_start_date) }
          : {}),
      },
    });

    return this.serializeProfile(profile);
  }

  async remove(userId: string, id: number) {
    await this.requireProfile(userId, id);
    await this.prisma.journeyProfile.delete({ where: { id } });
  }

  async getPhases(userId: string, id: number) {
    await this.requireProfile(userId, id);
    return this.loadPhases(id);
  }

  async toggleTask(userId: string, id: number, taskId: string, completed: boolean) {
    await this.requireProfile(userId, id);

    const task = await this.prisma.journeyTask.findFirst({
      where: { id: taskId, phase: { journeyProfileId: id } },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.prisma.journeyTask.update({
      where: { id: taskId },
      data: { completed },
    });

    await this.recomputeStatuses(id);
    return this.loadPhases(id);
  }

  async getDocuments(userId: string, id: number) {
    await this.requireProfile(userId, id);
    return this.loadDocuments(id);
  }

  async updateDocument(userId: string, id: number, documentId: string, status: string) {
    await this.requireProfile(userId, id);

    const document = await this.prisma.journeyDocument.findFirst({
      where: { id: documentId, journeyProfileId: id },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    const updated = await this.prisma.journeyDocument.update({
      where: { id: documentId },
      data: { status },
    });

    return this.serializeDocument(updated);
  }

  private async requireProfile(userId: string, id: number): Promise<JourneyProfileRow> {
    const profile = await this.prisma.journeyProfile.findFirst({
      where: { id, userId },
    });

    if (!profile) {
      throw new NotFoundException('Journey profile not found');
    }

    return profile;
  }

  private async recomputeStatuses(journeyProfileId: number) {
    const phases = await this.prisma.journeyPhase.findMany({
      where: { journeyProfileId },
      orderBy: { number: 'asc' },
      include: { tasks: true },
    });

    let previousCompleted = true;

    for (const phase of phases) {
      let status: string;

      if (!previousCompleted) {
        status = 'locked';
      } else if (phase.tasks.length > 0 && phase.tasks.every((task) => task.completed)) {
        status = 'completed';
      } else if (phase.tasks.some((task) => task.completed)) {
        status = 'in-progress';
      } else {
        status = 'not-started';
      }

      if (status !== phase.status) {
        await this.prisma.journeyPhase.update({ where: { id: phase.id }, data: { status } });
      }

      previousCompleted = status === 'completed';
    }
  }

  private async loadPhases(journeyProfileId: number) {
    const phases = await this.prisma.journeyPhase.findMany({
      where: { journeyProfileId },
      orderBy: { number: 'asc' },
      include: { tasks: { orderBy: { position: 'asc' } } },
    });

    return phases.map((phase) => ({
      id: phase.id,
      number: phase.number,
      title: phase.title,
      description: phase.description,
      timeframe: phase.timeframe,
      status: phase.status,
      icon: phase.icon,
      tasks: phase.tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        priority: task.priority,
        category: task.category,
      })),
    }));
  }

  private async loadDocuments(journeyProfileId: number) {
    const documents = await this.prisma.journeyDocument.findMany({
      where: { journeyProfileId },
      orderBy: { position: 'asc' },
    });
    return documents.map((document) => this.serializeDocument(document));
  }

  private serializeProfile(profile: JourneyProfileRow) {
    return {
      id: profile.id,
      full_name: profile.fullName,
      destination_country: profile.destinationCountry,
      intended_start_date: profile.intendedStartDate.toISOString().slice(0, 10),
      created_at: profile.createdAt.toISOString(),
      updated_at: profile.updatedAt.toISOString(),
    };
  }

  private serializeDocument(document: {
    id: string;
    name: string;
    category: string;
    status: string;
    required: boolean;
    expiryDate: Date | null;
  }) {
    return {
      id: document.id,
      name: document.name,
      category: document.category,
      status: document.status,
      required: document.required,
      expiryDate: document.expiryDate ? document.expiryDate.toISOString().slice(0, 10) : undefined,
    };
  }
}
