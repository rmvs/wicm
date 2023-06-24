-- CreateTable
CREATE TABLE "user_role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userRoleId" TEXT NOT NULL,
    CONSTRAINT "user_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES "user_role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "environment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "volume" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "network" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "serviceImageId" TEXT NOT NULL,
    "environmentId" TEXT NOT NULL,
    "volumeId" TEXT NOT NULL,
    "stackId" TEXT NOT NULL,
    CONSTRAINT "service_serviceImageId_fkey" FOREIGN KEY ("serviceImageId") REFERENCES "image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "service_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "environment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "service_volumeId_fkey" FOREIGN KEY ("volumeId") REFERENCES "volume" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "service_stackId_fkey" FOREIGN KEY ("stackId") REFERENCES "stack" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stack" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "networkId" TEXT NOT NULL,
    CONSTRAINT "stack_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "network" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_role_role_name_key" ON "user_role"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "service_volumeId_key" ON "service"("volumeId");

-- CreateIndex
CREATE UNIQUE INDEX "stack_networkId_key" ON "stack"("networkId");
