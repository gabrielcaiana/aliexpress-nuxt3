/*
  Warnings:

  - Made the column `created_at` on table `Addresses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Addresses" ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "created_at" SET NOT NULL;
