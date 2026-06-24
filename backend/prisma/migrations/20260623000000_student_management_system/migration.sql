-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'PARTIAL', 'UNPAID');

-- AlterAdmin
ALTER TABLE "Admin" RENAME COLUMN "email" TO "username";
DROP INDEX IF EXISTS "Admin_email_key";
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
ALTER TABLE "Admin" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Admin" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterStudents
ALTER TABLE "students" RENAME COLUMN "dob" TO "dateOfBirth";
ALTER TABLE "students" RENAME COLUMN "course" TO "courseName";
ALTER TABLE "students" RENAME COLUMN "message" TO "remarks";
ALTER TABLE "students" RENAME COLUMN "enrollDate" TO "admissionDate";
ALTER TABLE "students" RENAME COLUMN "totalFee" TO "feeAmount";

ALTER TABLE "students" ADD COLUMN "gender" TEXT NOT NULL DEFAULT '';
ALTER TABLE "students" ADD COLUMN "guardianName" TEXT NOT NULL DEFAULT '';
ALTER TABLE "students" ADD COLUMN "guardianPhone" TEXT NOT NULL DEFAULT '';

UPDATE "students"
SET "paymentStatus" = CASE
  WHEN LOWER("paymentStatus") = 'paid' THEN 'PAID'
  WHEN LOWER("paymentStatus") = 'partial' THEN 'PARTIAL'
  ELSE 'UNPAID'
END;

ALTER TABLE "students" ALTER COLUMN "dateOfBirth" TYPE TIMESTAMP(3) USING "dateOfBirth"::timestamp;
ALTER TABLE "students" ALTER COLUMN "admissionDate" DROP DEFAULT;
ALTER TABLE "students" ALTER COLUMN "admissionDate" TYPE TIMESTAMP(3) USING COALESCE(NULLIF("admissionDate", ''), CURRENT_DATE::text)::timestamp;
ALTER TABLE "students" ALTER COLUMN "admissionDate" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "students" ALTER COLUMN "paymentStatus" DROP DEFAULT;
ALTER TABLE "students" ALTER COLUMN "paymentStatus" TYPE "PaymentStatus" USING "paymentStatus"::"PaymentStatus";
ALTER TABLE "students" ALTER COLUMN "paymentStatus" SET DEFAULT 'UNPAID';
ALTER TABLE "students" DROP COLUMN "amountPaid";
ALTER TABLE "students" DROP COLUMN "amountDue";
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");
