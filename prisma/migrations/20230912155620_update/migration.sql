/*
  Warnings:

  - Made the column `orderedBooks` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "order" ALTER COLUMN "orderedBooks" SET NOT NULL;
