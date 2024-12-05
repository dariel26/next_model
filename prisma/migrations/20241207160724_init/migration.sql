-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "about" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);
