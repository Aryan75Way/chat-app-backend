-- CreateTable
CREATE TABLE "_UserPendingRequests" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserPendingRequests_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserPendingRequests_B_index" ON "_UserPendingRequests"("B");

-- AddForeignKey
ALTER TABLE "_UserPendingRequests" ADD CONSTRAINT "_UserPendingRequests_A_fkey" FOREIGN KEY ("A") REFERENCES "Approval"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPendingRequests" ADD CONSTRAINT "_UserPendingRequests_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
