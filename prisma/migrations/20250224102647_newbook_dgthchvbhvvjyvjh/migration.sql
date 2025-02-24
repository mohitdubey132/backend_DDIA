-- CreateEnum
CREATE TYPE "USER_TYPE" AS ENUM ('admin', 'user', 'staff');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userType" "USER_TYPE" NOT NULL DEFAULT 'user',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "book_valume" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books_in_library" (
    "id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,

    CONSTRAINT "books_in_library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allotment" (
    "id" TEXT NOT NULL,
    "book_allocated_to" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "allotmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnDate" TIMESTAMP(3),

    CONSTRAINT "allotment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "books_in_library" ADD CONSTRAINT "books_in_library_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allotment" ADD CONSTRAINT "allotment_book_allocated_to_fkey" FOREIGN KEY ("book_allocated_to") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allotment" ADD CONSTRAINT "allotment_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books_in_library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
