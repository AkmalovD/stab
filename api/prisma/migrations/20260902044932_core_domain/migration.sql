-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarUrl" TEXT;

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dateOfBirth" TEXT,
    "location" TEXT,
    "university" TEXT,
    "major" TEXT,
    "studyDestination" TEXT,
    "targetUniversity" TEXT,
    "budget" TEXT,
    "startDate" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JourneyProfile" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "destinationCountry" TEXT NOT NULL,
    "intendedStartDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JourneyProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JourneyPhase" (
    "id" TEXT NOT NULL,
    "journeyProfileId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timeframe" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "JourneyPhase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JourneyTask" (
    "id" TEXT NOT NULL,
    "phaseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "priority" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "JourneyTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JourneyDocument" (
    "id" TEXT NOT NULL,
    "journeyProfileId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "expiryDate" TIMESTAMP(3),

    CONSTRAINT "JourneyDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destination" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "budgetTier" TEXT NOT NULL,
    "monthlyBudgetMin" INTEGER NOT NULL,
    "monthlyBudgetMax" INTEGER NOT NULL,
    "universitiesCount" INTEGER NOT NULL,
    "scholarshipMatch" INTEGER NOT NULL,
    "tags" TEXT[],
    "languages" TEXT[],
    "hasDetailPage" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "City" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "costOfLiving" TEXT NOT NULL,
    "costsRent" TEXT NOT NULL,
    "costsFood" TEXT NOT NULL,
    "costsTransport" TEXT NOT NULL,
    "costsTuition" TEXT NOT NULL,
    "housing" INTEGER NOT NULL,
    "food" INTEGER NOT NULL,
    "transport" INTEGER NOT NULL,
    "entertainment" INTEGER NOT NULL,
    "utilities" INTEGER NOT NULL,
    "population" INTEGER,
    "climate" TEXT,
    "language" TEXT,
    "currency" TEXT,
    "timezone" TEXT,
    "studentPopulation" INTEGER,

    CONSTRAINT "City_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "CityDetail" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "universities" JSONB NOT NULL,
    "costOfLiving" JSONB NOT NULL,
    "scholarships" JSONB NOT NULL,
    "housing" JSONB NOT NULL,
    "essentials" JSONB NOT NULL,
    "timeline" JSONB NOT NULL,
    "meta" JSONB NOT NULL,

    CONSTRAINT "CityDetail_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "Scholarship" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "coverage" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "studyLevel" TEXT NOT NULL,
    "fieldOfStudy" TEXT[],
    "eligibleCountries" TEXT[],
    "description" TEXT NOT NULL,
    "requirements" TEXT[],
    "applicationUrl" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "type" TEXT,

    CONSTRAINT "Scholarship_pkey" PRIMARY KEY ("slug")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "JourneyProfile_userId_idx" ON "JourneyProfile"("userId");

-- CreateIndex
CREATE INDEX "JourneyPhase_journeyProfileId_idx" ON "JourneyPhase"("journeyProfileId");

-- CreateIndex
CREATE INDEX "JourneyTask_phaseId_idx" ON "JourneyTask"("phaseId");

-- CreateIndex
CREATE INDEX "JourneyDocument_journeyProfileId_idx" ON "JourneyDocument"("journeyProfileId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JourneyProfile" ADD CONSTRAINT "JourneyProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JourneyPhase" ADD CONSTRAINT "JourneyPhase_journeyProfileId_fkey" FOREIGN KEY ("journeyProfileId") REFERENCES "JourneyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JourneyTask" ADD CONSTRAINT "JourneyTask_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "JourneyPhase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JourneyDocument" ADD CONSTRAINT "JourneyDocument_journeyProfileId_fkey" FOREIGN KEY ("journeyProfileId") REFERENCES "JourneyProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
