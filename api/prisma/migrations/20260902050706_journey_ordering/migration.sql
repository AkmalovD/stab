-- AlterTable
ALTER TABLE "JourneyDocument" ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "JourneyTask" ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 0;
