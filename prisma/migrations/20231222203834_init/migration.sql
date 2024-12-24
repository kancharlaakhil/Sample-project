CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cohort" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "dateJoined" DATETIME NOT NULL,
    "lastLogin" DATETIME NOT NULL,
    "status" BOOLEAN NOT NULL
);