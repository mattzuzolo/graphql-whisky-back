# Migration `20210207200724-init`

This migration has been generated by Matthew Zuzolo at 2/7/2021, 3:07:24 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Producer" ADD COLUMN "alias" text   

ALTER TABLE "public"."Whisky" ADD COLUMN "alias" text   

CREATE UNIQUE INDEX "Producer.alias_unique" ON "public"."Producer"("alias")

CREATE UNIQUE INDEX "Whisky.alias_unique" ON "public"."Whisky"("alias")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210127030436-init..20210207200724-init
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -14,12 +14,12 @@
   id String @id @default(uuid())
   createdAt  DateTime  @default(now())
   updatedAt DateTime @updatedAt @default(now())
+  alias String? @unique
   name String @unique
   blended Boolean
   age Int? // Maybe default to zero?
-  
   abv Int? // we might not have this information
   // Relationship
   producerId  String
@@ -52,8 +52,9 @@
   id String @id @default(uuid())
   createdAt  DateTime  @default(now())
   updatedAt DateTime @updatedAt @default(now())
+  alias String? @unique
   name String @unique
   // Relationship
   whiskys Whisky[]
```


