/*
  Warnings:

  - A unique constraint covering the columns `[group_id,name]` on the table `group_users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "group_users_group_id_name_key" ON "group_users"("group_id", "name");
