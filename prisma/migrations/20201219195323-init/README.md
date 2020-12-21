# Migration `20201219195323-init`

This migration has been generated by Matt Zuzolo at 12/19/2020, 2:53:23 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Style" ALTER COLUMN "name" DROP DEFAULT,
ALTER COLUMN "shortName" DROP DEFAULT,
ALTER COLUMN "countryId" DROP NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201219194349-init..20201219195323-init
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
@@ -29,17 +29,17 @@
 }
 model Style {
   id String @id @default(uuid())
-  name String @default("Single malt scotch whisky") // "Single malt scotch whisky", "Kentucky straight bourbon whiskey"
-  shortName String @default("Scotch whisky") // "Scotch whisky", "Bourbon whiskey" 
+  name String // "Single malt scotch whisky", "Kentucky straight bourbon whiskey"
+  shortName String // "Scotch whisky", "Bourbon whiskey" 
   // Relationship
   regionId  String?
   region    Region?  @relation(fields: [regionId], references: [id])
-  countryId  String
-  country    Country  @relation(fields: [countryId], references: [id])
+  countryId  String?
+  country    Country?  @relation(fields: [countryId], references: [id])
 }
 model Producer { // The Balvenie, Lagavulin, Buffalo Trace
   id String @id @default(uuid())
```

