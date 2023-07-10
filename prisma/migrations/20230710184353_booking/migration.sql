/*
  Warnings:

  - You are about to alter the column `status` on the `Room` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Room` MODIFY `status` ENUM('AVAILABLE', 'UNAVAILABLE') NOT NULL;
