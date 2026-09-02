import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller.js';
import { AuthModule } from './auth/auth.module.js';
import { CitiesModule } from './cities/cities.module.js';
import { DestinationsModule } from './destinations/destinations.module.js';
import { JourneyModule } from './journey/journey.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProfileModule } from './profile/profile.module.js';
import { ScholarshipsModule } from './scholarships/scholarships.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    // Loads .env into a ConfigService that any provider can inject.
    // isGlobal spares every other module from re-importing this one.
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    ProfileModule,
    JourneyModule,
    DestinationsModule,
    CitiesModule,
    ScholarshipsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
