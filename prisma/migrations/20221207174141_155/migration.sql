/*
  Warnings:

  - You are about to drop the column `fullName` on the `Authors` table. All the data in the column will be lost.
  - Added the required column `fullname` to the `Authors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Authors" DROP COLUMN "fullName",
ADD COLUMN     "fullname" TEXT NOT NULL;
