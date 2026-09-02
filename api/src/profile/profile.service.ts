import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async get(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toUserProfile(user);
  }

  async update(userId: string, dto: UpdateProfileDto) {
    const { displayName, photoURL, ...profileFields } = dto;

    if (displayName !== undefined || photoURL !== undefined) {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...(displayName !== undefined ? { displayName } : {}),
          ...(photoURL !== undefined ? { avatarUrl: photoURL } : {}),
        },
      });
    }

    await this.prisma.profile.upsert({
      where: { userId },
      create: { userId, ...profileFields },
      update: profileFields,
    });

    return this.get(userId);
  }

  private toUserProfile(user: {
    id: string;
    email: string;
    displayName: string | null;
    avatarUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    profile: {
      dateOfBirth: string | null;
      location: string | null;
      university: string | null;
      major: string | null;
      studyDestination: string | null;
      targetUniversity: string | null;
      budget: string | null;
      startDate: string | null;
      bio: string | null;
      updatedAt: Date;
    } | null;
  }) {
    const p = user.profile;
    return {
      uid: user.id,
      email: user.email,
      displayName: user.displayName ?? undefined,
      photoURL: user.avatarUrl ?? undefined,
      dateOfBirth: p?.dateOfBirth ?? undefined,
      location: p?.location ?? undefined,
      university: p?.university ?? undefined,
      major: p?.major ?? undefined,
      studyDestination: p?.studyDestination ?? undefined,
      targetUniversity: p?.targetUniversity ?? undefined,
      budget: p?.budget ?? undefined,
      startDate: p?.startDate ?? undefined,
      bio: p?.bio ?? undefined,
      createdAt: user.createdAt,
      updatedAt: p?.updatedAt ?? user.updatedAt,
    };
  }
}
